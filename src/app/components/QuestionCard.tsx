import { motion } from 'motion/react';

interface QuestionCardProps {
  question: string;
  answers: string[];
  correctAnswer: number;
  revealCorrect?: boolean;
  selectedAnswer?: number | null;
  onAnswer: (selectedIndex: number) => void;
}

const COLOR_THEMES = [
  {
    bg: 'bg-sky-50',
    text: 'text-sky-900',
    border: 'border-sky-200',
    hover: 'hover:bg-sky-100',
    chip: 'bg-sky-100 text-sky-700',
  },
  {
    bg: 'bg-violet-50',
    text: 'text-violet-900',
    border: 'border-violet-200',
    hover: 'hover:bg-violet-100',
    chip: 'bg-violet-100 text-violet-700',
  },
  {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-200',
    hover: 'hover:bg-amber-100',
    chip: 'bg-amber-100 text-amber-700',
  },
  {
    bg: 'bg-teal-50',
    text: 'text-teal-900',
    border: 'border-teal-200',
    hover: 'hover:bg-teal-100',
    chip: 'bg-teal-100 text-teal-700',
  },
  {
    bg: 'bg-pink-50',
    text: 'text-pink-900',
    border: 'border-pink-200',
    hover: 'hover:bg-pink-100',
    chip: 'bg-pink-100 text-pink-700',
  },
  {
    bg: 'bg-indigo-50',
    text: 'text-indigo-900',
    border: 'border-indigo-200',
    hover: 'hover:bg-indigo-100',
    chip: 'bg-indigo-100 text-indigo-700',
  },
  {
    bg: 'bg-orange-50',
    text: 'text-orange-900',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-100',
    chip: 'bg-orange-100 text-orange-700',
  },
  {
    bg: 'bg-cyan-50',
    text: 'text-cyan-900',
    border: 'border-cyan-200',
    hover: 'hover:bg-cyan-100',
    chip: 'bg-cyan-100 text-cyan-700',
  },
];

export default function QuestionCard({ question, answers, correctAnswer, onAnswer, revealCorrect = false, selectedAnswer = null }: QuestionCardProps) {
  const handleAnswerClick = (index: number) => {
    if (revealCorrect) return;
    onAnswer(index);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl"
    >
      {/* Question */}
      <div className="bg-white rounded-3xl p-4 md:p-6 lg:p-7 xl:p-8 2xl:p-10 shadow-2xl mb-3 md:mb-4 xl:mb-5">
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-800 text-center leading-snug">
          {question}
        </h2>
      </div>

      {/* Answer options */}
      <div className="space-y-2 md:space-y-3 xl:space-y-4">
        {answers.map((answer, index) => {
          const isCorrect = revealCorrect && index === correctAnswer;
          const isSelected = revealCorrect && selectedAnswer === index && !isCorrect;
          const theme = COLOR_THEMES[index % COLOR_THEMES.length];
          const base = 'w-full rounded-2xl py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-10 text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold shadow-lg transition-colors duration-200 text-left border';
          const state = isCorrect
            ? 'bg-green-50 border-green-500 text-green-700 ring-2 ring-green-300 shadow-[0_0_18px_rgba(74,222,128,0.45)] animate-[pulse_1.2s_ease-in-out_infinite]'
            : isSelected
              ? 'bg-red-50 border-red-400 text-red-700'
              : `${theme.bg} ${theme.text} ${theme.border} ${theme.hover}`;
          const chipBase = 'mr-3 inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 rounded-full font-bold text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl';
          const chipState = isCorrect
            ? 'bg-green-100 text-green-700'
            : isSelected
              ? 'bg-red-100 text-red-700'
              : theme.chip;

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerClick(index)}
              disabled={revealCorrect}
              className={`${base} ${state}`}
            >
              <span className={`${chipBase} ${chipState}`}>{String.fromCharCode(65 + index)}</span>
              {answer}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
