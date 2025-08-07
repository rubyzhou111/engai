'use client';

import { useState } from 'react';
import Button from '../../components/ui/Button';

interface RecordingInterfaceProps {
  onRecordingComplete: (data: any) => void;
}

export default function RecordingInterface({ onRecordingComplete }: RecordingInterfaceProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedText, setSelectedText] = useState(0);

  const practiceTexts = [
    {
      title: '日常对话',
      text: "Hello, how are you today? I'm doing well, thank you for asking.",
      difficulty: '初级',
      phonetics: '/həˈləʊ, haʊ ɑr ju təˈdeɪ? aɪm ˈduɪŋ wɛl, θæŋk ju fɔr ˈæskɪŋ./'
    },
    {
      title: '商务场景',
      text: "I'd like to schedule a meeting to discuss the quarterly report and budget allocation.",
      difficulty: '中级',
      phonetics: '/aɪd laɪk tu ˈskɛdʒul ə ˈmitɪŋ tu dɪˈskʌs ðə ˈkwɔrtərli rɪˈpɔrt ænd ˈbʌdʒɪt ˌæləˈkeɪʃən./'
    },
    {
      title: '学术讨论',
      text: "The hypothesis suggests that environmental factors significantly influence behavioral patterns in this species.",
      difficulty: '高级',
      phonetics: '/ðə haɪˈpɑθəsɪs səˈdʒɛsts ðæt ɪnˌvaɪrənˈmɛntəl ˈfæktərz sɪgˈnɪfɪkəntli ˈɪnfluəns bɪˈheɪvjərəl ˈpætərnz ɪn ðɪs ˈspiʃiz./'
    }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    setTimeout(() => {
      setIsRecording(false);
      clearInterval(interval);
      
      // 模拟分析结果
      const mockData = {
        overallScore: 85,
        fluency: 82,
        accuracy: 88,
        clarity: 85,
        errors: [
          { word: 'schedule', position: 12, correction: '/ˈskɛdʒul/', userPronunciation: '/ˈskɛdʊl/' },
          { word: 'discuss', position: 25, correction: '/dɪˈskʌs/', userPronunciation: '/ˈdɪskʌs/' }
        ],
        text: practiceTexts[selectedText].text,
        audioUrl: 'mock-audio-url'
      };
      
      onRecordingComplete(mockData);
    }, 5000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case '初级': return 'bg-green-100 text-green-600';
      case '中级': return 'bg-yellow-100 text-yellow-600';
      case '高级': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="px-4 space-y-6">
      {/* 选择练习文本 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">选择练习文本</h3>
        
        <div className="space-y-3 mb-6">
          {practiceTexts.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedText(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedText === index 
                  ? 'border-[#4361EE] bg-blue-50' 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                  {item.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">{item.text}</p>
              <p className="text-xs text-gray-500 font-mono">{item.phonetics}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 录音提示 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#4361EE] to-[#64E9EE] rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-mic-line text-3xl text-white"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">准备录音</h3>
          <p className="text-gray-600 text-sm">请大声朗读上面选中的文本，我们将为您提供详细的发音分析</p>
        </div>

        {/* 录音提示 */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <i className="ri-information-line text-white text-sm"></i>
            </div>
            <div className="text-sm text-blue-700">
              <div className="font-medium mb-1">录音小贴士：</div>
              <ul className="space-y-1 text-xs">
                <li>• 保持安静的环境，避免背景噪音</li>
                <li>• 手机距离嘴部20-30厘米</li>
                <li>• 语速适中，发音清晰</li>
                <li>• 自然阅读，不要过分夸张</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 录音控制 */}
        {!isRecording ? (
          <Button 
            onClick={handleStartRecording}
            className="w-full h-14"
          >
            <i className="ri-mic-line mr-2"></i>
            开始录音
          </Button>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse relative">
              <i className="ri-stop-fill text-3xl text-white"></i>
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
            </div>
            <div className="text-lg font-semibold text-gray-900 mb-1">正在录音中...</div>
            <div className="text-2xl font-mono text-red-500">
              {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:
              {(recordingTime % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600 mt-2">请朗读上方选中的文本</div>
          </div>
        )}
      </div>

      {/* 历史记录 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">最近练习</h3>
        
        <div className="space-y-3">
          {[
            { text: '日常对话练习', score: 88, date: '2024-01-15', time: '14:30' },
            { text: '商务场景对话', score: 82, date: '2024-01-14', time: '16:45' },
            { text: '学术讨论练习', score: 79, date: '2024-01-13', time: '10:20' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">{item.text}</div>
                <div className="text-xs text-gray-500">{item.date} {item.time}</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.score >= 85 ? 'bg-green-100 text-green-600' :
                  item.score >= 70 ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {item.score}分
                </div>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                  <i className="ri-play-line text-gray-600"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}