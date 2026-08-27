import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { CheckCircle, RotateCcw, Shield, ShieldX, Star, XCircle } from 'lucide-react';
import SpinWheel from '../components/SpinWheel';
import QuestionCard from '../components/QuestionCard';
import Modal from '../components/Modal';
import { type Question, QUESTIONS_BY_SEGMENT } from '../data/questions';
import { useLanguage } from '../LanguageContext';

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
    const newCorrect = shuffledIdx.findIndex((origIdx) => origIdx === q.correctAnswer);
    return {
      id: q.id,
      question: q.question,
      answers: newAnswers,
      correctAnswer: newCorrect,
    } as Question;
  });
  return qShuffled;
};

// A player can spin at most twice: the guaranteed first spin, plus a bonus
// second spin that is only unlocked by answering both first-spin questions
// correctly (see handleContinue below).
const MAX_SPINS = 2;

// Terminal states distinguish failing the first chance from failing the
// second, while the win route is reserved for two fully correct chances.
type GameState = 'spinning' | 'selected' | 'question' | 'correct' | 'gameOver' | 'niceTry';

export default function Game() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
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

  const handleSpinClick = () => {
    // Guard against spinning once the turn has ended or once both spins
    // have already been used, in addition to the button not being rendered
    // in those states.
    if (spinCount >= MAX_SPINS || isSpinning || gameState === 'gameOver' || gameState === 'niceTry') return;
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
      setGameState('selected');
    }, 500);
    setTimeout(() => {
      setGameState('question');
    }, 1500);
  };

  const handleAnswer = (selectedIndex: number) => {
    if (!currentQuestion) return;
    const isCorrect = selectedIndex === currentQuestion.correctAnswer;
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
      window.setTimeout(() => setGameState(spinCount < MAX_SPINS ? 'gameOver' : 'niceTry'), 1000);
    }
  };

  const restartGame = () => {
    window.location.href = '/';
  };

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

    // All questions in this spin were answered correctly, so this is
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
  const completedQuestions = currentQuestionIndex + (selectedAnswer !== null ? 1 : 0);
  const displayedSpin = gameState === 'spinning' ? spinCount + 1 : spinCount;
  const spinButtonEnabled = !isSpinning && spinCount < MAX_SPINS && gameState !== 'gameOver' && gameState !== 'niceTry';

  return (
    <motion.div
      className="police-pattern relative h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-4 md:px-8 md:py-5 lg:px-12 lg:py-6 bg-[#003A70] text-foreground"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      <div className="w-full flex flex-col gap-5 items-center max-w-7xl">
        {selectedSegment && (
          <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mb-3 xl:mb-4">
            <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    {t.spinProgress(displayedSpin, MAX_SPINS)}
                </span>
                <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    •
                  </span>
                  <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                    {t.questionProgress(currentQuestionIndex + 1, totalQuestions)}
                </span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-[#D71920]" />
                  <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{correctAnswers}</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-[#BCCCDC]" />
                  <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">{wrongAnswers}</span>
                </div>
              </div>
            </div>
            <div className="h-3 xl:h-4 2xl:h-5 bg-[#0057A8] rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${(completedQuestions / progressTotal) * 100}%`,
                  background: 'var(--police-green)',
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
                {spinCount === 0 ? t.spinWheel : t.bonusSpin}
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
                    className="mt-6 md:mt-8 rounded-full border-2 border-white py-3 sm:py-3.5 md:py-4 lg:py-5 xl:py-6 2xl:py-8 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-20 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold shadow-2xl"
                    style={{ background: 'var(--police-blue)', color: 'var(--white)' }}
                    animate={{ borderColor: ['rgba(255, 255, 255, 0.55)', '#FFFFFF', 'rgba(255, 255, 255, 0.55)'] }}
                    transition={{ borderColor: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {t.spin}
                  </motion.button>
                </div>
              )}
            </div>
          )}

          {gameState === 'selected' && selectedSegment && (
            <motion.div
              className="flex min-h-[18rem] w-full max-w-lg flex-col items-center justify-center rounded-2xl border border-[#D8E4ED] bg-white px-8 py-10 text-center shadow-lg"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Shield className="mb-3 h-12 w-12 text-[#0057A8]" strokeWidth={1.8} />
              <p className="text-lg font-semibold uppercase tracking-wide text-[#486581]">{t.selectedNumber}</p>
              <p className="mt-1 text-7xl font-bold text-[#003A70]">{selectedSegment}</p>
            </motion.div>
          )}

          {gameState === 'question' && currentQuestion && (
            <QuestionCard
              question={currentQuestion.question[language]}
              answers={currentQuestion.answers.map((answer) => answer[language])}
              correctAnswer={currentQuestion.correctAnswer}
              selectedAnswer={selectedAnswer}
              revealCorrect={revealAnswer}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      </div>

      <Modal isOpen={gameState === 'correct'}>
        <div className="text-center space-y-3">
          <CheckCircle className="w-14 h-14 md:w-16 md:h-16 xl:w-20 xl:h-20 text-[#D71920] mx-auto" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#D71920] mb-2">{t.correct}!</h2>
          <button
            onClick={handleContinue}
            className="w-full bg-[#0057A8] text-white rounded-xl py-3 sm:py-3.5 md:py-4 px-5 text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl xl:py-5 2xl:py-6 font-bold shadow-lg hover:bg-[#003A70] transition-colors"
          >
            {t.continue}
          </button>
        </div>
      </Modal>

      <Modal isOpen={gameState === 'gameOver' || gameState === 'niceTry'}>
        <div className="text-center space-y-3">
          {gameState === 'gameOver' ? (
            <ShieldX className="w-14 h-14 md:w-16 md:h-16 xl:w-20 xl:h-20 text-[#6B7C93] mx-auto" strokeWidth={1.8} />
          ) : (
            <span className="relative inline-flex">
              <Shield className="w-14 h-14 md:w-16 md:h-16 xl:w-20 xl:h-20 text-[#0057A8]" strokeWidth={1.8} />
              <Star className="absolute -right-2 -top-2 h-5 w-5 md:h-6 md:w-6 text-[#218653]" fill="currentColor" />
            </span>
          )}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#003A70] mb-2">
            {gameState === 'gameOver' ? t.gameOver : t.niceTry}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl">
            {gameState === 'gameOver' ? t.betterLuck : t.secondRoundThanks}
          </p>
          <button
            onClick={restartGame}
            className="w-full bg-[#0057A8] text-white rounded-xl py-3 sm:py-3.5 md:py-4 px-5 text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-bold shadow-lg hover:bg-[#003A70] transition-colors"
          >
            <RotateCcw className="mr-2 inline-block h-5 w-5 md:h-6 md:w-6" />
            {t.playAgain}
          </button>
        </div>
      </Modal>
    </motion.div>
  );
}

