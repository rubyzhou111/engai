'use client';

import AIAvatar from './AIAvatar';

interface MessageBubbleProps {
  message: {
    id: number;
    type: 'user' | 'ai';
    content: string;
    translation?: string;
    timestamp: Date;
    score?: number;
    aiCharacter?: string;
  };
  showTranslation?: boolean;
}

export default function MessageBubble({ message, showTranslation }: MessageBubbleProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!isUser && (
        <AIAvatar character={message.aiCharacter || 'friendly-barista'} />
      )}
      
      <div className={`max-w-[280px] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-3 rounded-2xl relative ${
            isUser
              ? 'bg-gradient-to-r from-[#4361EE] to-[#64E9EE] text-white'
              : 'bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm'
          }`}
        >
          <div className="text-sm leading-relaxed">{message.content}</div>
          
          {/* AI消息的播放按钮 */}
          {!isUser && (
            <button className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#4361EE] rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
              <i className="ri-play-fill text-white text-sm ml-0.5"></i>
            </button>
          )}
          
          {/* 用户消息的评分 */}
          {isUser && message.score && (
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-xs font-bold text-[#4361EE]">{message.score}</span>
            </div>
          )}
        </div>
        
        {/* 翻译文本 */}
        {showTranslation && message.translation && !isUser && (
          <div className="mt-2 px-3 py-2 bg-yellow-50 text-yellow-800 rounded-xl text-sm max-w-[260px]">
            {message.translation}
          </div>
        )}
        
        {/* 时间戳 */}
        <div className="mt-1 text-xs text-gray-500">
          {message.timestamp.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
        
        {/* 用户消息的详细评分 */}
        {isUser && message.score && (
          <div className="mt-2 flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">流利度 {message.score}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">准确度 {message.score + 5}%</span>
            </div>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="w-10 h-10 bg-gradient-to-br from-[#4361EE] to-[#64E9EE] rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">You</span>
        </div>
      )}
    </div>
  );
}