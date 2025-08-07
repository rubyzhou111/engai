'use client';

import { useState, useRef, useEffect } from 'react';
import VoiceVisualizer from './VoiceVisualizer';
import MessageBubble from './MessageBubble';
import AIAvatar from './AIAvatar';

type MessageType = 'user' | 'ai';

interface Message {
  id: number;
  type: MessageType;
  content: string;
  translation?: string;
  timestamp: Date;
  score?: number;
  aiCharacter?: string;
}

interface ChatInterfaceProps {
  scenario: {
    id: string;
    title: string;
    level: string;
    background: string;
  };
}

export default function ChatInterface({ scenario }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! Welcome to our coffee shop. What would you like to order today?',
      translation: '你好！欢迎来到我们的咖啡店。今天你想点什么？',
      timestamp: new Date(),
      aiCharacter: 'friendly-barista'
    }
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [currentAudioLevel, setCurrentAudioLevel] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hints = [
    "I'd like a cappuccino, please.",
    "Can I have a large coffee?", 
    "What do you recommend?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleStartRecording = () => {
    setIsRecording(true);
    const interval = setInterval(() => {
      setCurrentAudioLevel(Math.random() * 100);
    }, 100);

    setTimeout(() => {
      setIsRecording(false);
      setIsAIThinking(true);
      clearInterval(interval);
      setCurrentAudioLevel(0);

      const userMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content: 'I would like a cappuccino and a croissant, please.',
        translation: '我想要一杯卡布奇诺和一个面包',
        aiCharacter: '',
        timestamp: new Date(),
        score: 85
      };

      setMessages(prev => [...prev, userMessage]);

      setTimeout(() => {
        setIsAIThinking(false);

        const aiMessage: Message = {
          id: messages.length + 2,
          type: 'ai',
          content: 'Great choice! Would you like that cappuccino with regular milk or would you prefer a plant-based alternative?',
          translation: '很好的选择！你想要普通牛奶的卡布奇诺还是植物奶的？',
          timestamp: new Date(),
          aiCharacter: 'friendly-barista'
        };

        setMessages(prev => [...prev, aiMessage]);
      }, 2000);
    }, 3000);
  };

  const handleUserStuck = () => {
    setShowHints(true);
    setTimeout(() => setShowHints(false), 5000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* 情境标签 */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-gray-900">{scenario.title}</span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500">{scenario.level}</span>
          </div>
          <button 
            onTouchStart={() => setShowTranslation(true)}
            onTouchEnd={() => setShowTranslation(false)}
            onMouseDown={() => setShowTranslation(true)}
            onMouseUp={() => setShowTranslation(false)}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
          >
            <i className="ri-translate-line mr-1"></i>
            长按翻译
          </button>
        </div>
      </div>

      {/* 背景虚化区域 */}
      <div className="flex-1 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-30"
          style={{
            backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7Bscenario.background%7D&width=400&height=600&seq=chat-bg-01&orientation=portrait)`
          }}
        ></div>

        {/* 对话区域 */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                showTranslation={showTranslation}
              />
            ))}

            {isAIThinking && (
              <div className="flex items-center space-x-3 px-4">
                <AIAvatar isThinking={true} character="friendly-barista" />
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 提示词浮动按钮 */}
          {showHints && (
            <div className="absolute bottom-24 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="text-sm font-medium text-gray-700 mb-3">试试这些表达：</div>
              <div className="space-y-2">
                {hints.map((hint, index) => (
                  <button 
                    key={index}
                    className="w-full text-left px-3 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm hover:bg-blue-100 transition-colors"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 录音控制区域 */}
          <div className="bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleUserStuck}
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <i className="ri-lightbulb-line text-xl text-gray-600"></i>
              </button>

              <div className="flex-1 mx-4">
                <VoiceVisualizer 
                  isRecording={isRecording}
                  audioLevel={currentAudioLevel}
                  onStartRecording={handleStartRecording}
                />
              </div>

              <button className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-settings-line text-xl text-gray-600"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 翻译遮罩层 */}
      {showTranslation && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-900 mb-2">实时翻译</div>
              <div className="text-gray-600">
                {messages[messages.length - 1]?.translation || '等待翻译...'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
