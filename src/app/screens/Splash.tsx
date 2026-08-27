import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield } from 'lucide-react';
import { motion } from 'motion/react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="h-screen overflow-hidden flex items-center justify-center px-4 py-8 md:py-12"
      style={{
        background: 'linear-gradient(135deg, var(--police-blue-dark) 0%, var(--police-blue) 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <motion.div
            className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full p-1"
              style={{ background: 'conic-gradient(var(--police-blue) 0deg 150deg, var(--white) 150deg 300deg, var(--police-green) 300deg 330deg, var(--white) 330deg 360deg)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="h-full w-full rounded-full bg-[#0057A8]" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 flex h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 items-center justify-center rounded-full bg-white"
            >
              <Shield className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 text-[#0057A8]" strokeWidth={1.8} />
            </motion.div>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Sri Lanka Police Spin Quiz
        </motion.h1>

        <p className="mt-6 text-sm md:text-base text-white/80">Preparing the quiz...</p>
      </div>
    </motion.div>
  );
}