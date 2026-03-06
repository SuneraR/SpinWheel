import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { CheckCircle, XCircle, Frown } from 'lucide-react';
import SpinWheel from '../components/SpinWheel';
import QuestionCard from '../components/QuestionCard';
import Modal from '../components/Modal';
import { type Question, QUESTIONS_BY_SEGMENT } from '../data/questions';


const shuffleQuestions = (questions: Question[]) => {
  const arr = [...questions];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

type GameState = 'spinning' | 'question' | 'correct' | 'wrong' | 'gameover';

const SPIN_COLORS = ['#13FFAA', '#1E67C6', '#CE84CF', '#DD335C'];

export default function Game() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>('spinning');
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const wrongTimeoutRef = useRef<number | null>(null);
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

  const handleSpinClick = () => {
    setIsSpinning(true);
  };

  const handleSpinComplete = (segment: number) => {
    setIsSpinning(false);
    setSelectedSegment(segment);
    setCurrentQuestions(shuffleQuestions(QUESTIONS_BY_SEGMENT[segment] || []));
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setSelectedAnswer(null);
    setRevealAnswer(false);
    setTimeout(() => {
      setGameState('question');
    }, 500);
  };

  useEffect(() => () => {
    if (wrongTimeoutRef.current !== null) {
      clearTimeout(wrongTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    correctSoundRef.current = new Audio('/src/sounds/correct.mp3');
    wrongSoundRef.current = new Audio('/src/sounds/wrong.mp3');
    return () => {
      correctSoundRef.current = null;
      wrongSoundRef.current = null;
    };
  }, []);

  const handleAnswer = (selectedIndex: number) => {
    if (!currentQuestion) return;
    const isCorrect = selectedIndex === currentQuestion.correct;
    setSelectedAnswer(selectedIndex);
    setRevealAnswer(true);

    if (isCorrect) {
      if (wrongTimeoutRef.current !== null) {
        clearTimeout(wrongTimeoutRef.current);
        wrongTimeoutRef.current = null;
      }
      if (correctSoundRef.current) {
        correctSoundRef.current.currentTime = 0;
        correctSoundRef.current.play().catch(() => {});
      }
      setCorrectAnswers(prev => prev + 1);
      setGameState('correct');
    } else {
      if (wrongSoundRef.current) {
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play().catch(() => {});
      }
      setWrongAnswers(prev => prev + 1);
      if (wrongTimeoutRef.current !== null) {
        clearTimeout(wrongTimeoutRef.current);
      }
      wrongTimeoutRef.current = window.setTimeout(() => {
        setGameState('gameover');
      }, 2000);
    }
  };

  const answeredCount = correctAnswers + wrongAnswers;

  const handleClaimWin = () => {
    const totalPlayed = Math.max(1, answeredCount);
    navigate('/win', {
      state: {
        correctAnswers,
        wrongAnswers,
        totalQuestions: totalPlayed,
      },
    });
  };

  const handleNextQuestion = () => {
    const next = currentQuestionIndex + 1;
    if (next >= totalQuestions) {
      handleClaimWin();
      return;
    }
    setCurrentQuestionIndex(next);
    setSelectedAnswer(null);
    setRevealAnswer(false);
    setGameState('question');
  };

  const handleBackToWheel = () => {
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setCurrentQuestionIndex(0);
    setSelectedSegment(null);
    setSelectedAnswer(null);
    setRevealAnswer(false);
    setGameState('spinning');
  };

  const handlePlayAgain = () => {
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setCurrentQuestionIndex(0);
    setSelectedSegment(null);
    setSelectedAnswer(null);
    setRevealAnswer(false);
    setGameState('spinning');
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const totalQuestions = currentQuestions.length;
  const progressTotal = Math.max(totalQuestions, 1);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex flex-col items-center justify-center px-4 py-4 md:px-8 md:py-5 lg:px-12 lg:py-6">
      <div className="w-full flex flex-col gap-5 items-center max-w-7xl">
      {/* Progress bar */}
      {selectedSegment && (
        <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mb-3 xl:mb-4">
          <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
            <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Segment {selectedSegment}</span>
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
          <div className="h-3 xl:h-4 2xl:h-5 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / progressTotal) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex items-center justify-center w-full px-2">
        {gameState === 'spinning' && (
          <div className="text-center">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-6 md:mb-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              Spin the Wheel!
            </motion.h2>
            <SpinWheel onSpinComplete={handleSpinComplete} isSpinning={isSpinning} />
            {!isSpinning && (
              <div className="inline-flex">
                <motion.button
                  onClick={handleSpinClick}
                  className="mt-6 md:mt-8 bg-white text-purple-600 rounded-full py-3 sm:py-3.5 md:py-4 lg:py-5 xl:py-6 2xl:py-8 px-8 sm:px-10 md:px-12 lg:px-14 xl:px-16 2xl:px-20 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold shadow-2xl"
                  animate={{ color: SPIN_COLORS }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
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

      {/* Correct Answer Modal */}
      <Modal isOpen={gameState === 'correct'}>
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 md:w-20 md:h-20 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 text-green-500 mx-auto" />
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-800 mb-2">Correct!</h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl">You can claim your win now or try the next question.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={handleClaimWin}
              className="w-full bg-purple-600 text-white rounded-2xl py-3 sm:py-3.5 md:py-4 px-5 text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl xl:py-5 2xl:py-6 font-bold shadow-lg hover:bg-purple-700 transition-colors"
            >
              Claim Win
            </button>
            <button
              onClick={handleNextQuestion}
              className="w-full bg-white text-purple-600 rounded-2xl py-3 sm:py-3.5 md:py-4 px-5 text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl xl:py-5 2xl:py-6 font-bold shadow-lg hover:bg-purple-50 transition-colors"
            >
              Next Question
            </button>
          </div>
        </div>
      </Modal>

      {/* Wrong Answer Modal */}
      {/* Game Over Modal */}
      <Modal isOpen={gameState === 'gameover'}>
        <div className="text-center">
          <Frown className="w-16 h-16 md:w-20 md:h-20 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-800 mb-4">Game Over</h2>
          <p className="text-gray-600 font-semibold mb-2 text-base sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl">
           👏 Great Effort
          </p>
          <p className="text-gray-600 mb-6 text-base sm:text-lg md:text-lg xl:text-xl 2xl:text-2xl">
            You have not completed the challenge!
          </p>
          <button
            onClick={handlePlayAgain}
            className="w-full bg-purple-600 text-white rounded-2xl py-3 sm:py-3.5 md:py-4 px-5 md:px-6 text-base sm:text-lg md:text-lg lg:text-xl font-bold shadow-lg hover:bg-purple-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </Modal>
    </div>
  );
}