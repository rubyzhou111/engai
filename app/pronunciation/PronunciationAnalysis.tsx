'use client';

import { useState } from 'react';

interface AnalysisData {
  overallScore: number;
  fluency: number;
  accuracy: number;
  clarity: number;
  errors: Array<{
    word: string;
    position: number;
    correction: string;
    userPronunciation: string;
  }>;
  text: string;
  audioUrl: string;
}

interface PronunciationAnalysisProps {
  data: AnalysisData;
}

export default function PronunciationAnalysis({ data }: PronunciationAnalysisProps) {
  const [activeError, setActiveError] = useState<number | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 85) return 'from-green-400 to-green-600';
    if (score >= 70) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const renderTextWithErrors = () => {
    const words = data.text.split(' ');
    return words.map((word, index) => {
      const error = data.errors.find(e => e.word.toLowerCase() === word.toLowerCase().replace(/[.,!?]/g, ''));
      const isActive = error && activeError === data.errors.indexOf(error);
      
      return (
        <span
          key={index}
          className={`inline-block mr-2 mb-1 px-2 py-1 rounded-lg transition-all cursor-pointer ${
            error 
              ? isActive
                ? 'bg-red-200 text-red-800 shadow-md transform scale-105'
                : 'bg-red-100 text-red-700 hover:bg-red-150'
              : 'text-gray-700'
          }`}
          onClick={() => {
            if (error) {
              const errorIndex = data.errors.indexOf(error);
              setActiveError(activeError === errorIndex ? null : errorIndex);
            }
          }}
        >
          {word}
          {error && (
            <div className="inline-block w-2 h-2 bg-red-500 rounded-full ml-1 animate-pulse"></div>
          )}
        </span>
      );
    });
  };

  return (
    <div className="px-4 space-y-6">
      {/* 总体评分 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gray-200"></div>
          <div 
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${getScoreBackground(data.overallScore)}`}
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + (data.overallScore / 100) * 50}% 0%, ${50 + (data.overallScore / 100) * 50 * Math.cos(2 * Math.PI * data.overallScore / 100)}% ${50 - (data.overallScore / 100) * 50 * Math.sin(2 * Math.PI * data.overallScore / 100)}%, 50% 50%)`
            }}
          ></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <div className={`text-3xl font-bold ${getScoreColor(data.overallScore)}`}>
              {data.overallScore}
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">整体评分</h3>
        <p className="text-gray-600 text-sm">
          {data.overallScore >= 85 ? '表现优秀！发音很标准' : 
           data.overallScore >= 70 ? '不错的表现，还有提升空间' : 
           '需要多加练习，继续努力！'}
        </p>
      </div>

      {/* 三维评估雷达图 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">详细分析</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(data.fluency)} mb-1`}>
              {data.fluency}
            </div>
            <div className="text-sm text-gray-600">流利度</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getScoreBackground(data.fluency)}`}
                style={{ width: `${data.fluency}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(data.accuracy)} mb-1`}>
              {data.accuracy}
            </div>
            <div className="text-sm text-gray-600">准确度</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getScoreBackground(data.accuracy)}`}
                style={{ width: `${data.accuracy}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${getScoreColor(data.clarity)} mb-1`}>
              {data.clarity}
            </div>
            <div className="text-sm text-gray-600">清晰度</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getScoreBackground(data.clarity)}`}
                style={{ width: `${data.clarity}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 雷达图占位 */}
        <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center relative overflow-hidden">
          <img 
            src="https://readdy.ai/api/search-image?query=pronunciation%20analysis%20radar%20chart%20visualization%2C%20three%20dimensional%20assessment%20chart%20showing%20fluency%20accuracy%20clarity%20scores%2C%20modern%20UI%20design%2C%20colorful%20data%20visualization%2C%20professional%20analytics%20display&width=300&height=200&seq=radar-chart-01&orientation=landscape"
            alt="发音分析雷达图"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* 文本回放与错误标记 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">朗读文本</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#4361EE] text-white rounded-xl hover:bg-[#3651DD] transition-colors">
            <i className="ri-play-line"></i>
            <span>播放录音</span>
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-4 leading-relaxed">
          {renderTextWithErrors()}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <div className="w-3 h-3 bg-red-100 rounded-full mr-2"></div>
          <span>点击红色标记的单词查看发音纠正</span>
        </div>
      </div>

      {/* 错误详情 */}
      {data.errors.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">发音纠正建议</h3>
          
          <div className="space-y-4">
            {data.errors.map((error, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  activeError === index 
                    ? 'border-red-200 bg-red-50' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => setActiveError(activeError === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{error.word}</h4>
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <i className="ri-play-fill text-white text-sm"></i>
                    </button>
                    <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <i className="ri-play-fill text-white text-sm"></i>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-red-600 font-medium mb-1">你的发音</div>
                    <div className="font-mono bg-red-50 px-3 py-2 rounded-lg">
                      {error.userPronunciation}
                    </div>
                  </div>
                  <div>
                    <div className="text-green-600 font-medium mb-1">标准发音</div>
                    <div className="font-mono bg-green-50 px-3 py-2 rounded-lg">
                      {error.correction}
                    </div>
                  </div>
                </div>
                
                {activeError === index && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-700">
                      <div className="font-medium mb-1">发音技巧：</div>
                      <p>注意舌位和口型的变化，多练习标准音标的发音方式。</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 改进建议 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">个性化建议</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-check-line text-white text-sm"></i>
            </div>
            <div>
              <div className="font-medium mb-1">重点练习单词</div>
              <div className="text-white/90">专门练习今天标记错误的单词，重复朗读至熟练</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-check-line text-white text-sm"></i>
            </div>
            <div>
              <div className="font-medium mb-1">语速控制</div>
              <div className="text-white/90">适当放慢语速，确保每个音节都发音清晰</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-check-line text-white text-sm"></i>
            </div>
            <div>
              <div className="font-medium mb-1">每日练习</div>
              <div className="text-white/90">建议每天练习15-20分钟，坚持一周会有明显进步</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}