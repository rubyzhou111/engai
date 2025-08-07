'use client';

interface AIAvatarProps {
  character?: string;
  isThinking?: boolean;
}

export default function AIAvatar({ character = 'friendly-barista', isThinking = false }: AIAvatarProps) {
  const characterImages = {
    'friendly-barista': '3D cartoon barista character, friendly coffee shop worker, smiling expression, wearing apron, realistic 3D rendering, professional look, warm lighting',
    'business-mentor': '3D cartoon business mentor, professional suit, confident expression, office environment, leadership posture, realistic rendering',
    'travel-guide': '3D cartoon travel guide character, casual outdoor clothing, helpful expression, tourism professional, friendly demeanor'
  };

  return (
    <div className="relative">
      <div className={`w-10 h-10 rounded-full overflow-hidden ${isThinking ? 'animate-pulse' : ''}`}>
        <img 
          src={`https://readdy.ai/api/search-image?query=$%7BcharacterImages%5Bcharacter%5D%20%7C%7C%20characterImages%5Bfriendly-barista%5D%7D&width=50&height=50&seq=ai-avatar-${character}&orientation=squarish`}
          alt="AI Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* AI思考状态的光效 */}
      {isThinking && (
        <div className="absolute inset-0 rounded-full border-2 border-[#64E9EE] animate-spin"></div>
      )}
      
      {/* 在线状态指示 */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}