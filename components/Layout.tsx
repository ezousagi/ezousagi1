import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, isAudioEnabled, toggleAudio }) => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-gray-800 relative overflow-hidden flex flex-col">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Header / Audio Control */}
      <header className="absolute top-0 right-0 p-4 z-50">
        <button 
          onClick={toggleAudio}
          className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-gray-200 text-gray-600 hover:bg-white/80 transition-colors"
          aria-label={isAudioEnabled ? "Mute audio" : "Enable audio"}
        >
          {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-400 relative z-10">
        &copy; {new Date().getFullYear()} 年末おみくじ
      </footer>
    </div>
  );
};