import { useNavigate } from 'react-router';
import { Play, Trophy, Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex flex-col items-center justify-center px-4 py-4 md:py-6 lg:py-8">
      <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl w-full text-center flex flex-col items-center">
        {/* Decorative elements */}
        <div className="mb-3 md:mb-4 flex justify-center gap-4 lg:gap-6">
          <Sparkles className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-yellow-300 animate-pulse" />
          <Trophy className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-yellow-300" />
          <Sparkles className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-yellow-300 animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-1 md:mb-2">
          Spin Quiz
        </h1>
        <p className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white/90 mb-4 md:mb-6">
          Test your knowledge!
        </p>

        {/* Main illustration */}
        <div className="mb-4 md:mb-6 relative">
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-72 xl:h-72 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-64 xl:h-64 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-xl">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 text-white" />
            </div>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={() => navigate('/game')}
          className="w-full bg-white text-purple-600 rounded-full py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8 px-5 sm:px-6 md:px-8 lg:px-10 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-3"
        >
          <Play className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" fill="currentColor" />
          Start Game
        </button>

        {/* Additional info */}
        <div className="mt-3 md:mt-4 text-white/80">
          <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Spin the wheel • Answer questions • Win!</p>
        </div>
      </div>
    </div>
  );
}
