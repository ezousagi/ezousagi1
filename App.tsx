import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, RotateCcw, ChevronRight, Sparkles } from 'lucide-react';
import { Layout } from './components/Layout';
import { Button } from './components/Button';
import { CHOICES, FORTUNE_DATA, DEFAULT_FORTUNE } from './constants';
import { Choice, FortuneResult, ScreenState } from './types';

// Simple Audio Mock
const playSound = (type: 'click' | 'result' | 'bgm') => {
  // In a real app, use AudioContext or HTMLAudioElement
  // This is just a placeholder logic to respect the "Audio" requirement interface
  console.log(`Playing sound: ${type}`);
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('SPLASH');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // -- Handlers --

  const toggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
  };

  const handleStart = () => {
    if (isAudioEnabled) playSound('click');
    setScreen('QUESTION');
  };

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    if (isAudioEnabled) playSound('click');
    setScreen('LOADING');
  };

  const handleReset = () => {
    setScreen('SPLASH');
    setSelectedChoice(null);
    setResult(null);
  };

  // Determine result when entering LOADING state
  useEffect(() => {
    if (screen === 'LOADING' && selectedChoice) {
      // Simulate network/processing delay
      const timer = setTimeout(() => {
        const potentialResults = FORTUNE_DATA[selectedChoice.id] || [];
        const randomResult = potentialResults.length > 0 
          ? potentialResults[Math.floor(Math.random() * potentialResults.length)]
          : DEFAULT_FORTUNE;
        
        setResult(randomResult);
        if (isAudioEnabled) playSound('result');
        setScreen('RESULT');
      }, 2500); // 2.5s animation duration

      return () => clearTimeout(timer);
    }
  }, [screen, selectedChoice, isAudioEnabled]);

  // -- Render Helpers --

  const renderSplash = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center flex flex-col items-center gap-8"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-red-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <img 
          src="https://picsum.photos/seed/omikuji_hero/200/200" 
          alt="Illustration" 
          className="w-48 h-48 rounded-full shadow-xl object-cover border-4 border-white relative z-10"
        />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-sm font-medium tracking-widest text-pink-500 uppercase">Year-End Fortune</h2>
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          年末おみくじ<br />
          <span className="text-xl font-normal mt-2 block">今年もおつかれさまでした</span>
        </h1>
        <p className="text-gray-500 text-sm max-w-xs mx-auto pt-2">
          一年を振り返り、あなたの頑張りを<br/>優しく包み込むおみくじです。
        </p>
      </div>

      <Button onClick={handleStart} className="px-10 py-4 text-lg shadow-lg shadow-pink-200">
        おみくじを引く
        <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </motion.div>
  );

  const renderQuestion = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">今年はどんな一年でしたか？</h2>
        <p className="text-gray-500 text-sm mt-1">直感で選んでください</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {CHOICES.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleChoice(choice)}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-200 group text-center h-32"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">{choice.icon}</span>
            <span className="text-sm font-bold text-gray-700">{choice.label}</span>
            <span className="text-[10px] text-gray-400 mt-1">{choice.description}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderLoading = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center text-center space-y-8"
    >
      <div className="relative">
        {/* Shaking Animation */}
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            y: [0, -5, 0, -5, 0]
          }}
          transition={{ 
            duration: 0.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl filter drop-shadow-xl"
        >
          🎁
        </motion.div>
        <motion.div 
          className="absolute -top-4 -right-4 text-yellow-400"
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        >
          <Sparkles size={32} />
        </motion.div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-700 animate-pulse">運勢を読み解いています...</h3>
        <p className="text-sm text-gray-400">深呼吸をしてお待ちください</p>
      </div>
    </motion.div>
  );

  const renderResult = () => {
    if (!result) return null;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
          {/* Header Image */}
          <div className="h-40 w-full bg-gray-100 relative">
             <img 
              src={`https://picsum.photos/seed/${result.artKey}/400/200`} 
              alt="Fortune Art" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
               <div className="inline-block bg-white/90 backdrop-blur px-6 py-1 rounded-full shadow-sm border border-gray-100">
                  <span className="text-2xl font-bold text-red-500 tracking-widest">{result.fortune}</span>
               </div>
            </div>
          </div>

          <div className="p-6 pt-2 space-y-6 text-center">
            {/* Message */}
            <div>
              <p className="text-gray-700 font-medium leading-relaxed">
                {result.message}
              </p>
            </div>

            {/* Details Box */}
            <div className="bg-[#fdfbf7] rounded-xl p-4 space-y-3 border border-stone-100 text-left">
              <div className="flex items-start gap-3">
                <span className="text-lg">💡</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Advice</h4>
                  <p className="text-sm text-gray-700 font-medium">{result.advice}</p>
                </div>
              </div>
              
              <div className="h-px bg-gray-200 w-full"></div>

              <div className="flex items-start gap-3">
                <span className="text-lg">🎨</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Lucky Color</h4>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                      style={{ backgroundColor: result.luckyColorCode }}
                    ></div>
                    <p className="text-sm text-gray-700">{result.lucky}</p>
                  </div>
                </div>
              </div>

               <div className="h-px bg-gray-200 w-full"></div>

              <div className="flex items-start gap-3">
                <span className="text-lg">✨</span>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Lucky Action</h4>
                  <p className="text-sm text-gray-700">{result.action}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1 text-sm py-2"
                onClick={() => alert("画像を保存しました（デモ）")}
              >
                <Download size={16} className="mr-2" /> 保存
              </Button>
              <Button 
                variant="primary" 
                className="flex-1 text-sm py-2"
                onClick={() => {
                   if (navigator.share) {
                     navigator.share({
                       title: '年末おみくじ',
                       text: `私の年末運勢は【${result.fortune}】でした！ #年末おみくじ`,
                       url: window.location.href
                     }).catch(console.error);
                   } else {
                     alert("共有機能はモバイル端末でご利用いただけます");
                   }
                }}
              >
                <Share2 size={16} className="mr-2" /> 共有
              </Button>
            </div>
            
            <button 
              onClick={handleReset}
              className="text-gray-400 text-xs flex items-center justify-center gap-1 mx-auto hover:text-gray-600 transition-colors"
            >
              <RotateCcw size={12} /> 最初に戻る
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Layout isAudioEnabled={isAudioEnabled} toggleAudio={toggleAudio}>
      <AnimatePresence mode="wait">
        {screen === 'SPLASH' && (
          <motion.div key="splash" className="w-full">
            {renderSplash()}
          </motion.div>
        )}
        {screen === 'QUESTION' && (
           <motion.div key="question" className="w-full">
            {renderQuestion()}
          </motion.div>
        )}
        {screen === 'LOADING' && (
           <motion.div key="loading" className="w-full">
            {renderLoading()}
          </motion.div>
        )}
        {screen === 'RESULT' && (
           <motion.div key="result" className="w-full flex justify-center">
            {renderResult()}
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default App;