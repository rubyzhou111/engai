'use client';

interface LearningCardProps {
  studyTime: number;
  streakDays: number;
  aiScore: number;
  progress: number;
}

export default function LearningCard({ studyTime, streakDays, aiScore, progress }: LearningCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#4361EE] to-[#64E9EE] rounded-3xl p-6 text-white mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">今日学习</h3>
            <p className="text-white/80 text-sm">继续保持良好的学习节奏</p>
          </div>
          <div className="bg-white/20 rounded-full px-3 py-1">
            <span className="text-sm font-medium">Level 4</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{studyTime}min</div>
            <div className="text-white/80 text-sm">学习时长</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{streakDays}</div>
            <div className="text-white/80 text-sm">连续打卡</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{aiScore}</div>
            <div className="text-white/80 text-sm">AI评分</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>今日进度</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}