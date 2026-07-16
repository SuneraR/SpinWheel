import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { CheckCircle, XCircle } from 'lucide-react';
import SpinWheel from '../components/SpinWheel';
import QuestionCard from '../components/QuestionCard';
import Modal from '../components/Modal';
import { type Question, QUESTIONS_BY_SEGMENT } from '../data/questions';

const shuffleArray = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const shuffleQuestions = (questions: Question[]) => {
  // Shuffle questions order and also shuffle each question's answers while
  // preserving which answer is correct by remapping the correct index.
  const qShuffled = shuffleArray(questions).map((q) => {
    const indices = q.answers.map((_, idx) => idx);
    const shuffledIdx = shuffleArray(indices);
    const newAnswers = shuffledIdx.map((i) => q.answers[i]);
    const newCorrect = shuffledIdx.findIndex((origIdx) => origIdx === q.correct);
    return {
      question: q.question,
      answers: newAnswers,
      correct: newCorrect,
    } as Question;
  });
  return qShuffled;
};

// A player can spin at most twice: the guaranteed first spin, plus a bonus
// second spin that is only unlocked by answering both first-spin questions
// correctly (see handleContinue below).
const MAX_SPINS = 2;

// 'turnComplete' is the terminal state for players who never earn a second
// chance - they missed a question on the very first spin. It's shown right
// before we reload the page for the next player.
//
// Players who DO reach the bonus (second) spin never see 'turnComplete' -
// once they're on their second spin, however it ends (right or wrong),
// they're routed to the /win results screen instead. See handleContinue.
type GameState = 'spinning' | 'question' | 'correct' | 'wrong' | 'turnComplete';

export default function Game() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('spinning');
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  // Segments already used this session - excluded from future spins so the
  // second spin can never land back on the first spin's segment.
  const [usedSegments, setUsedSegments] = useState<number[]>([]);
  const [spinCount, setSpinCount] = useState(0);
  // Whether the player answered both first-spin questions correctly and
  // therefore unlocked the bonus second spin. Tracked explicitly (rather
  // than inferred) so it's easy to surface in the UI and reason about.
  const [earnedSecondSpin, setEarnedSecondSpin] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    correctSoundRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/correct.mp3`);
    wrongSoundRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/wrong.mp3`);
    return () => {
      correctSoundRef.current = null;
      wrongSoundRef.current = null;
    };
  }, []);

  // Once the turn is complete, show the message for 3 seconds, then hard
  // refresh the browser. A full reload clears all React state, guaranteeing
  // a clean slate for the next player (spinCount, usedSegments, answers, etc).
  useEffect(() => {
    if (gameState !== 'turnComplete') return;
    const timer = setTimeout(() => {
      window.location.reload();
    }, 3000);
    return () => clearTimeout(timer);
  }, [gameState]);

  const handleSpinClick = () => {
    // Guard against spinning once the turn has ended or once both spins
    // have already been used, in addition to the button not being rendered
    // in those states.
    if (spinCount >= MAX_SPINS || isSpinning || gameState === 'turnComplete') return;
    setIsSpinning(true);
  };

  const handleSpinComplete = (segment: number) => {
    setIsSpinning(false);
    setSelectedSegment(segment);
    setUsedSegments((prev) => (prev.includes(segment) ? prev : [...prev, segment]));
    setSpinCount((prev) => prev + 1);

    const questionsForSegment = QUESTIONS_BY_SEGMENT[segment];

    // Defensive check: if this segment has no questions, log it loudly instead
    // of silently rendering a blank/broken screen.
    if (!questionsForSegment || questionsForSegment.length === 0) {
      console.error(
        `[Game] No questions found for segment ${segment}. Available keys:`,
        Object.keys(QUESTIONS_BY_SEGMENT)
      );
    }

    setCurrentQuestions(shuffleQuestions(questionsForSegment || []));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setRevealAnswer(false);
    setTimeout(() => {
      setGameState('question');
    }, 500);
  };

  const handleAnswer = (selectedIndex: number) => {
    if (!currentQuestion) return;
    const isCorrect = selectedIndex === currentQuestion.correct;
    setSelectedAnswer(selectedIndex);
    setRevealAnswer(true);

    if (isCorrect) {
      if (correctSoundRef.current) {
        correctSoundRef.current.currentTime = 0;
        correctSoundRef.current.play().catch(() => {});
      }
      setCorrectAnswers((prev) => prev + 1);
      window.setTimeout(() => setGameState('correct'), 1000);
    } else {
      if (wrongSoundRef.current) {
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play().catch(() => {});
      }
      setWrongAnswers((prev) => prev + 1);
      window.setTimeout(() => setGameState('wrong'), 1000);
    }
  };

  // Ends the player's turn WITHOUT a Win screen: used only when the player
  // never made it past the first spin, so there's nothing to celebrate yet.
  // Shows the "preparing for next player" message, then a page reload
  // (handled by the useEffect above) resets everything.
  const endTurn = () => {
    setGameState('turnComplete');
  };

  // Sends the player to the results screen. Only called once the player has
  // reached the bonus (second) spin - i.e. they "entered the second chance" -
  // regardless of how that second spin's questions went.
  const finishSession = () => {
    const totalAnswered = correctAnswers + wrongAnswers;
    navigate('/win', {
      state: {
        correctAnswers,
        wrongAnswers,
        totalQuestions: totalAnswered,
      },
    });
  };

  const handleContinue = () => {
    const wasWrong = gameState === 'wrong';

    // A wrong answer on the very first spin ends the turn immediately with
    // no Win screen - the player never earned a second chance.
    if (wasWrong && spinCount < MAX_SPINS) {
      endTurn();
      return;
    }

    // A wrong answer on the bonus (second) spin - the player DID reach the
    // second chance, so they still get the Win screen with their final tally.
    if (wasWrong && spinCount >= MAX_SPINS) {
      finishSession();
      return;
    }

    // Correct answer from here on.
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < totalQuestions) {
      // Still one more question left in this segment - keep going.
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setRevealAnswer(false);
      setGameState('question');
      return;
    }

    // Both questions in this spin were answered correctly, so this is
    // either:
    //  - the end of the first spin -> award the bonus second spin, or
    //  - the end of the second (bonus) spin -> show the Win screen.
    if (spinCount < MAX_SPINS) {
      setEarnedSecondSpin(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setRevealAnswer(false);
      setGameState('spinning');
    } else {
      finishSession();
    }
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const totalQuestions = currentQuestions.length;
  const progressTotal = Math.max(totalQuestions, 1);
  const spinButtonEnabled = !isSpinning && spinCount < MAX_SPINS && gameState !== 'turnComplete';

  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-4 md:px-8 md:py-5 lg:px-12 lg:py-6 bg-background text-foreground">
      <div className="w-full flex flex-col gap-5 items-center max-w-7xl">
        {selectedSegment && (
          <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mb-3 xl:mb-4">
            <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Spin {spinCount}/{MAX_SPINS} · Segment {selectedSegment}
                </span>
                <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                  Question {currentQuestionIndex + 1}/{totalQuestions}
                </span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-green-400" />
                  <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{correctAnswers}</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-red-400" />
                  <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{wrongAnswers}</span>
                </div>
              </div>
            </div>
            <div className="h-3 xl:h-4 2xl:h-5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${((currentQuestionIndex + 1) / progressTotal) * 100}%`,
                  background: 'linear-gradient(90deg, var(--chart-1), var(--chart-2))',
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-center w-full px-2">
          {gameState === 'spinning' && (
            <div className="text-center">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-6 md:mb-8"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {spinCount === 0 ? 'Spin the Wheel!' : 'Bonus Spin!'}
              </motion.h2>
              {/* {spinCount > 0 && earnedSecondSpin && (
                <p className="text-white/90 text-base md:text-lg lg:text-xl font-semibold mb-3">
                  Great job - you earned a second spin!
                </p>
              )} */}
              <SpinWheel onSpinComplete={handleSpinComplete} isSpinning={isSpinning} usedSegments={usedSegments} />
              {spinButtonEnabled && (
                <div className="inline-flex">
                  <motion.button
                    onClick={handleSpinClick}
                    className="mt-6 md:mt-8 rounded-full py-3 sm:py-3.5 md:py-4 lg:py-5 xl:py-6 2xl:py-8 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-20 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold shadow-2xl"
                    style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    SPIN
                  </motion.button>
                </div>
              )}
            </div>
          )}

          {gameState === 'question' && currentQuestion && (
            <QuestionCard
              question={currentQuestion.question}
              answers={currentQuestion.answers}
              correctAnswer={currentQuestion.correct}
              selectedAnswer={selectedAnswer}
              revealCorrect={revealAnswer}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      </div>

      <Modal isOpen={gameState === 'correct'}>
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 md:w-20 md:h-20 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 text-green-500 mx-auto" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-800 mb-2">Correct!</h2>
          <button
            onClick={handleContinue}
            className="w-full bg-purple-600 text-white rounded-2xl py-3 sm:py-3.5 md:py-4 px-5 text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl xl:py-5 2xl:py-6 font-bold shadow-lg hover:bg-purple-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </Modal>

      <Modal isOpen={gameState === 'wrong'}>
        <div className="text-center space-y-4">
          <XCircle className="w-16 h-16 md:w-20 md:h-20 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 text-red-500 mx-auto" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-800 mb-2">Not Quite!</h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl">Your turn ends here.</p>
          <button
            onClick={handleContinue}
            className="w-full bg-purple-600 text-white rounded-2xl py-3 sm:py-3.5 md:py-4 px-5 text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl xl:py-5 2xl:py-6 font-bold shadow-lg hover:bg-purple-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </Modal>

      {/* Shown once the player's turn is fully over - either a wrong answer
          ended it early, or they completed the bonus spin. No button here;
          the page reloads automatically after a short delay. */}
      <Modal isOpen={gameState === 'turnComplete'}>
        <div className="text-center space-y-4">
          <Sparkles />
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-800 mb-2">
            Your turn is complete.
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl">
            Preparing for the next player...
          </p>
        </div>
      </Modal>
    </div>
  );
}

// Small inline sparkle icon so the turn-complete modal doesn't need a new
// top-level import wired through the whole file diff.
function Sparkles() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-14 h-14 md:w-16 md:h-16 mx-auto text-purple-500"
      fill="currentColor"
    >
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" />
    </svg>
  );
}