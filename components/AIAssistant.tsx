'use client';

import { useState } from 'react';

export default function AIAssistant() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);
  
  const encouragementMessages = [
    "太棒了！你的发音越来越标准了！",
    "继续加油！你正在快速进步！",
    "Great job! 你的语调很自然！",
    "Perfect! 这个表达很地道！"
  ];
  
  const handleClick = () => {
    setIsAnimating(true);
    setShowEncouragement(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    
    setTimeout(() => {
      setShowEncouragement(false);
    }, 3000);
  };
  
  return (
    <div className="fixed bottom-24 right-4 z-40">
      {showEncouragement && (
        <div className="absolute bottom-16 right-0 bg-white rounded-2xl p-3 shadow-lg border border-gray-100 min-w-48 animate-bounce">
          <div className="text-sm text-gray-700 font-medium">
            {encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]}
          </div>
          <div className="absolute bottom-1 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}
      
      <button
        onClick={handleClick}
        className={`w-14 h-14 bg-gradient-to-br from-[#4361EE] to-[#64E9EE] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isAnimating ? 'scale-110 shadow-xl' : 'hover:scale-105'
        }`}
      >
        <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-full">
          <img 
            src="https://readdy.ai/api/search-image?query=3D%20cartoon%20AI%20robot%20assistant%20character%20with%20friendly%20expression%2C%20cute%20round%20design%2C%20blue%20and%20white%20color%20scheme%2C%20floating%20in%20space%20with%20gentle%20smile%2C%20centered%20composition%2C%20soft%20lighting%2C%20minimalist%20background&width=100&height=100&seq=ai-assistant-01&orientation=squarish"
            alt="AI Assistant"
            className="w-full h-full object-cover"
          />
        </div>
        
        {isAnimating && (
          <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
        )}
      </button>
      
      <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#4361EE]/20 to-[#64E9EE]/20 animate-pulse -z-10"></div>
    </div>
  );
}