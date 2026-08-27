import { useLocation } from 'react-router';
import { Award, RotateCcw, Shield, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

// This screen is only ever reached by players who made it to the bonus
// (second) spin - see Game.tsx's finishSession(). With 4 total questions
// (2 guaranteed + 2 bonus), the only possible outcomes here are:
//   4/4 = 100%, 3/4 = 75%, or 2/4 = 50% accuracy.
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

  const isWin = wrongAnswers === 0 && totalQuestions > 0;

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

  // Keep the unattended event display moving to the next player while still
  // giving players time to use the explicit restart action.
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/'; // or '/home' — whatever your game's starting route is
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-center px-4 py-8 md:p-10 lg:p-16 relative bg-gradient-to-br from-[#003A70] to-[#0057A8]"
    >
      {isWin &&
        confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${piece.x}%`,
              top: -20,
              backgroundColor: ['#FFFFFF', '#218653', '#EAF4FB', '#8FD3B0', '#D71920'][
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
                <Award className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 text-white mx-auto" strokeWidth={1.6} />
                <Star className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-[#8FD3B0] absolute -top-1 -right-1" fill="currentColor" />
              </>
            ) : (
              <Shield className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 text-white mx-auto" strokeWidth={1.6} />
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
          className="bg-white rounded-xl p-4 md:p-6 lg:p-8 xl:p-10 mb-4 md:mb-5 border-2 border-[#D8E4ED] w-full"
        >
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="rounded-lg bg-[#EAF4FB] border border-[#D8E4ED] p-3 md:p-5">
              <p className="text-[#D71920] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{correctAnswers}</p>
              <p className="text-[#102A43] text-sm md:text-base lg:text-lg font-semibold">Correct</p>
            </div>
            <div className="rounded-lg bg-[#F7FAFC] border border-[#D8E4ED] p-3 md:p-5">
              <p className="text-[#486581] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{wrongAnswers}</p>
              <p className="text-[#102A43] text-sm md:text-base lg:text-lg font-semibold">Incorrect</p>
            </div>
            <div className="rounded-lg bg-[#EAF7EF] border border-[#8FD3B0] p-3 md:p-5">
              <p className="text-[#176B45] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{accuracy}%</p>
              <p className="text-[#102A43] text-sm md:text-base lg:text-lg font-semibold">Accuracy</p>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          onClick={() => { window.location.href = '/'; }}
          className="w-full max-w-md rounded-xl bg-white text-[#003A70] py-3 md:py-4 px-6 text-lg md:text-xl font-bold shadow-lg hover:bg-[#EAF4FB] transition-colors"
        >
          <RotateCcw className="mr-2 inline-block h-5 w-5 md:h-6 md:w-6" />
          PLAY AGAIN
        </motion.button>

        {/* Session auto-resets for the next player after a short delay,
            so no "Play Again" click is needed. */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-white/90 text-sm md:text-base lg:text-lg font-semibold"
        >
          Preparing for the next player...
        </motion.p>
      </div>
    </div>
  );
}