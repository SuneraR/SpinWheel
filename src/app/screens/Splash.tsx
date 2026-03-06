import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 px-4 py-8 md:py-12">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-purple-500" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Spin Quiz</h1>
        <div className="flex gap-2 justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
