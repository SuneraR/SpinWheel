import { useLocation, useNavigate } from 'react-router';
import { Trophy, Sparkles, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export default function Win() {
  const navigate = useNavigate();
  const location = useLocation();
  const resultState = (location.state as {
    correctAnswers?: number;
    wrongAnswers?: number;
    totalQuestions?: number;
  }) || {};

  const correctAnswers = resultState.correctAnswers ?? 0;
  const totalQuestions = resultState.totalQuestions ?? 0;
  const wrongAnswers = resultState.wrongAnswers ?? 0;
  const answeredQuestions = Math.max(correctAnswers + wrongAnswers, totalQuestions);
  const accuracyBase = totalQuestions || answeredQuestions;
  const accuracy = accuracyBase > 0 ? Math.round((correctAnswers / accuracyBase) * 100) : 0;
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Generate confetti positions
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti(pieces);
  }, []);

  useEffect(() => {
    winSoundRef.current = new Audio('/src/sounds/win.mp3');
    winSoundRef.current.volume = 0.9;
    winSoundRef.current.play().catch(() => {});
    return () => {
      winSoundRef.current = null;
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 flex items-center justify-center px-4 py-8 md:p-10 lg:p-16 relative">
      {/* Confetti */}
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${piece.x}%`,
            top: -20,
            backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8B94'][
              Math.floor(Math.random() * 5)
            ],
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 360, 720],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: piece.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="max-w-3xl w-full text-center relative z-10 px-2 flex flex-col items-center">
        {/* Trophy animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="mb-2 md:mb-3"
        >
          <div className="relative inline-block">
            <Trophy className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 text-yellow-300 mx-auto drop-shadow-2xl" fill="currentColor" />
            <Sparkles className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white absolute -top-1 -right-1 animate-pulse" />
            <Sparkles className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white absolute -bottom-1 -left-1 animate-pulse" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-1 md:mb-2"
        >
          You Win!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/90 mb-4 md:mb-5"
        >
          You finished with {accuracy}% accuracy.
        </motion.p>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 md:p-6 lg:p-8 xl:p-10 mb-4 md:mb-5 border-2 border-white/30 w-full"
        >
          <div className="flex justify-around gap-4">
            <div>
              <Star className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-yellow-300 mx-auto mb-1" fill="currentColor" />
              <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{correctAnswers}/{answeredQuestions}</p>
              <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-xl">Questions</p>
            </div>
            <div>
              <Trophy className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-yellow-300 mx-auto mb-1" fill="currentColor" />
              <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">{accuracy}%</p>
              <p className="text-white/80 text-sm md:text-base lg:text-lg xl:text-xl">Accuracy</p>
            </div>
          </div>
        </motion.div>

        {/* Play again button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/home')}
          className="w-full bg-white text-orange-600 rounded-full py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-8 px-6 md:px-8 lg:px-10 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold shadow-2xl"
        >
          Play Again
        </motion.button>
      </div>
    </div>
  );
}