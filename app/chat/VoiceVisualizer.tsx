'use client';

interface VoiceVisualizerProps {
  isRecording: boolean;
  audioLevel: number;
  onStartRecording: () => void;
}

export default function VoiceVisualizer({ isRecording, audioLevel, onStartRecording }: VoiceVisualizerProps) {
  // 生成音频波形条
  const generateWaveBars = () => {
    const bars = [];
    for (let i = 0; i < 20; i++) {
      const height = isRecording 
        ? Math.max(4, (Math.sin(Date.now() / 100 + i) + 1) * audioLevel / 4)
        : Math.random() * 8 + 4;
      
      bars.push(
        <div
          key={i}
          className={`w-1 bg-gradient-to-t from-[#4361EE] to-[#64E9EE] rounded-full transition-all duration-100 ${
            isRecording ? 'opacity-100' : 'opacity-30'
          }`}
          style={{ 
            height: `${height}px`,
            animationDelay: `${i * 50}ms`
          }}
        />
      );
    }
    return bars;
  };

  return (
    <div className="flex items-center justify-center">
      {!isRecording ? (
        <button
          onClick={onStartRecording}
          className="w-16 h-16 bg-gradient-to-br from-[#4361EE] to-[#64E9EE] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform active:scale-95"
        >
          <i className="ri-mic-line text-2xl text-white"></i>
        </button>
      ) : (
        <div className="flex items-center space-x-8">
          {/* 录音按钮 - 录音时变为停止按钮 */}
          <button
            onClick={() => {}}
            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse relative"
          >
            <i className="ri-stop-fill text-2xl text-white"></i>
            {/* 呼吸灯效果 */}
            <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
          </button>

          {/* 实时波形显示 */}
          <div className="flex items-end space-x-1 h-12">
            {generateWaveBars()}
          </div>

          {/* 录音时长 */}
          <div className="text-sm font-mono text-gray-600">
            00:{String(Math.floor(Date.now() / 1000) % 60).padStart(2, '0')}
          </div>
        </div>
      )}

      {/* 录音状态指示 */}
      {isRecording && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>正在录音...</span>
          </div>
        </div>
      )}
    </div>
  );
}