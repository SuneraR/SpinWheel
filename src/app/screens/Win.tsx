import { useLocation } from 'react-router';
import { Trophy, Sparkles, Star, Medal } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

// This screen is only ever reached by players who made it to the bonus
// (second) spin - see Game.tsx's finishSession(). With 4 total questions
// (2 guaranteed + 2 bonus), the only possible outcomes here are:
//   4/4 = 100%, 3/4 = 75%, or 2/4 = 50% accuracy.
const WIN_THRESHOLD = 75;

export default function Win() {
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

  // Tiered outcome messaging, driven purely by accuracy.
  const isWin = accuracy >= WIN_THRESHOLD;

  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Confetti is a celebration effect - only show it for an actual win.
    if (!isWin) return;
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setConfetti(pieces);
  }, [isWin]);

  useEffect(() => {
    // Only play the celebratory win sound for an actual win.
    if (!isWin) return;
    winSoundRef.current = new Audio(`${import.meta.env.BASE_URL}sounds/win.mp3`);
    winSoundRef.current.volume = 0.9;
    winSoundRef.current.play().catch(() => {});
    return () => {
      winSoundRef.current = null;
    };
  }, [isWin]);

  // Show the player's results for 3 seconds, then hard-refresh the browser
  // back to the start route. This clears all React state so the next player
  // starts a clean session, rather than relying on a "Play Again" click.
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/'; // or '/home' — whatever your game's starting route is
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`h-screen overflow-hidden flex items-center justify-center px-4 py-8 md:p-10 lg:p-16 relative ${
        isWin
          ? 'bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500'
          : 'bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-500'
      }`}
    >
      {isWin &&
        confetti.map((piece) => (
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
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="mb-2 md:mb-3"
        >
          <div className="relative inline-block">
            {isWin ? (
              <>
                <Trophy className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 text-yellow-300 mx-auto drop-shadow-2xl" fill="currentColor" />
                <Sparkles className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white absolute -top-1 -right-1 animate-pulse" />
                <Sparkles className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white absolute -bottom-1 -left-1 animate-pulse" />
              </>
            ) : (
              <Medal className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 text-white mx-auto drop-shadow-2xl" fill="currentColor" />
            )}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-1 md:mb-2"
        >
          {isWin ? 'You Win!' : 'So Close!'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/90 mb-4 md:mb-5"
        >
          {isWin
            ? `You finished with ${accuracy}% accuracy.`
            : `You finished with ${accuracy}% accuracy - nice try, give it another go!`}
        </motion.p>

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

        {/* Session auto-resets for the next player after a short delay,
            so no "Play Again" click is needed. */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-white/90 text-base md:text-lg lg:text-xl font-semibold"
        >
          Preparing for the next player...
        </motion.p>
      </div>
    </div>
  );
}