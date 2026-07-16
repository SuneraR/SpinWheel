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

const MAX_SPINS = 2;

type GameState = 'spinning' | 'question' | 'correct' | 'wrong';

export default function Game() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('spinning');
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [usedSegments, setUsedSegments] = useState<number[]>([]);
  const [spinCount, setSpinCount] = useState(0);
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
    if (spinCount >= MAX_SPINS || isSpinning) return;
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

  // Sends the player's final tally to the /win screen. Uses functional
  // updates' latest values via closure - correctAnswers/wrongAnswers are
  // already up to date by the time this runs (called after setGameState).
  const finishSession = (finalCorrect: number, finalWrong: number) => {
    const total = finalCorrect + finalWrong;
    navigate('/win', {
      state: {
        correctAnswers: finalCorrect,
        wrongAnswers: finalWrong,
        totalQuestions: total,
      },
    });
  };

  const handleContinue = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setRevealAnswer(false);
      setGameState('question');
      return;
    }

    // Finished both questions for this segment.
    if (spinCount < MAX_SPINS) {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setRevealAnswer(false);
      setGameState('spinning');
    } else {
      // Both spins used and all questions answered - go to results.
      finishSession(correctAnswers, wrongAnswers);
    }
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const totalQuestions = currentQuestions.length;
  const progressTotal = Math.max(totalQuestions, 1);

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
                {spinCount === 0 ? 'Spin the Wheel!' : 'Spin Again!'}
              </motion.h2>
              <SpinWheel onSpinComplete={handleSpinComplete} isSpinning={isSpinning} usedSegments={usedSegments} />
              {!isSpinning && spinCount < MAX_SPINS && (
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
          <p className="text-gray-600 text-base sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl">Let's keep going.</p>
          <button
            onClick={handleContinue}
            className="w-full bg-purple-600 text-white rounded-2xl py-3 sm:py-3.5 md:py-4 px-5 text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl xl:py-5 2xl:py-6 font-bold shadow-lg hover:bg-purple-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
}