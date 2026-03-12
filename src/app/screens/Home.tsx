import { useNavigate } from 'react-router';
import { Play, Trophy, Sparkles, Joystick } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex flex-col items-center justify-center px-4 py-4 md:py-6 lg:py-8">
      <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl w-full text-center flex flex-col items-center">

        {/* Decorative icons */}
        <motion.div
          className="mb-3 md:mb-4 flex justify-center gap-4 lg:gap-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            <Sparkles className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-yellow-300" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.15 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Trophy className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-yellow-300" />
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          >
            <Sparkles className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-yellow-300" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-1 md:mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
        >
          Spin Quiz
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white/90 mb-4 md:mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        >
          Test your knowledge!
        </motion.p>

        {/* Main illustration */}
        <motion.div
          className="mb-4 md:mb-6 relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.5 }}
        >
          {/* Rotating outer ring */}
          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            {/* Inner pulsing circle */}
            <motion.div
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-64 xl:h-64 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-xl"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Counter-rotate the icon so it stays upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                <Joystick className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Start button */}
        <motion.button
          onClick={() => navigate('/game')}
          className="w-full bg-white text-purple-600 rounded-full py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8 px-5 sm:px-6 md:px-8 lg:px-10 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold shadow-2xl flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Play className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" fill="currentColor" />
          Start Game
        </motion.button>

        {/* Additional info */}
        <motion.div
          className="mt-3 md:mt-4 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Spin the wheel • Answer questions • Win!</p>
        </motion.div>

      </div>
    </div>
  );
}
