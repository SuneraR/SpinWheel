import { useNavigate } from 'react-router';
import { ArrowRight, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function Splash() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.div
      className="police-pattern relative h-screen overflow-hidden flex items-center justify-center px-4 py-8 md:py-12"
      style={{
        background: 'linear-gradient(135deg, var(--police-blue-dark) 0%, var(--police-blue) 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-3xl w-full">
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
         Spin Quiz by Mt. Lavinia Police Division
        </motion.h1>

        <motion.p
          className="mt-6 text-sm md:text-base text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          {t.officialChallenge}
        </motion.p>
        <p className="mt-2 text-xs md:text-sm text-white/60">{t.loading}</p>
        <div className="mt-7">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">{t.selectLanguage}</p>
          <div className="flex justify-center gap-3">
            {(['en', 'si'] as const).map((option) => (
              <motion.button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                whileTap={{ scale: 0.97 }}
                className={`min-w-32 rounded-lg border-2 px-5 py-3 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8FD3B0] md:min-w-40 md:text-lg ${
                  language === option
                    ? 'border-white bg-[#0057A8] text-white'
                    : 'border-white/80 bg-white text-[#003A70] hover:bg-[#EAF4FB]'
                }`}
              >
                {option === 'en' ? 'English' : 'සිංහල'}
              </motion.button>
            ))}
          </div>
        </div>
        <motion.button
          type="button"
          onClick={() => navigate('/game')}
          className="mx-auto mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border-2 border-white bg-white px-8 py-3 text-lg font-bold text-[#003A70] shadow-lg transition-colors hover:bg-[#EAF4FB] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8FD3B0] active:scale-[0.97] md:min-h-16 md:px-12 md:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
          {t.tapToStart}
        </motion.button>
      </div>
    </motion.div>
  );
}