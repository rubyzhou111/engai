'use client';

import TopNavigation from '../components/TopNavigation';
import BottomNavigation from '../components/BottomNavigation';
import LearningCard from '../components/LearningCard';
import AIAssistant from '../components/AIAssistant';
import Button from '../components/ui/Button';
import Link from 'next/link';

export default function Home() {
  const quickActions = [
    {
      icon: 'ri-message-3-line',
      title: '自由对话',
      subtitle: '随心畅聊练口语',
      href: '/chat',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: 'ri-book-open-line',
      title: '主题训练',
      subtitle: '情景式专项练习',
      href: '/courses',
      color: 'from-green-500 to-blue-500'
    },
    {
      icon: 'ri-mic-line',
      title: '发音诊所',
      subtitle: 'AI纠正发音问题',
      href: '/pronunciation',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: 'ri-bar-chart-line',
      title: '学习报告',
      subtitle: '查看进步轨迹',
      href: '/report',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const recommendedTopics = [
    {
      title: '商务会议沟通',
      level: '中级',
      duration: '15分钟',
      completed: false,
      image: 'Business meeting scene with professional people discussing in modern office environment, realistic corporate setting, soft lighting, professional atmosphere, centered composition'
    },
    {
      title: '咖啡店点单',
      level: '初级',
      duration: '10分钟',
      completed: true,
      image: 'Coffee shop interior with barista and customer interaction, cozy atmosphere, warm lighting, realistic coffee shop setting, centered composition'
    },
    {
      title: '机场出行对话',
      level: '中级',
      duration: '12分钟',
      completed: false,
      image: 'Airport terminal scene with travelers and staff, modern aviation environment, bright lighting, professional travel setting, centered composition'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation 
        title="AI英语陪练"
        rightAction={
          <button className="w-10 h-10 flex items-center justify-center">
            <i className="ri-notification-line text-xl text-gray-700"></i>
          </button>
        }
      />
      
      <div className="pt-20 pb-24 px-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">你好，Sarah！</h2>
              <p className="text-gray-600 text-sm">今天也要加油练习哦</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#4361EE] to-[#64E9EE] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">S</span>
            </div>
          </div>
        </div>

        <LearningCard 
          studyTime={45}
          streakDays={7}
          aiScore={86}
          progress={68}
        />

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">快捷入口</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className={`bg-gradient-to-br ${action.color} rounded-2xl p-4 text-white relative overflow-hidden group active:scale-95 transition-transform`}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-4 translate-x-4"></div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 flex items-center justify-center mb-3">
                      <i className={`${action.icon} text-2xl`}></i>
                    </div>
                    <h4 className="font-semibold text-base mb-1">{action.title}</h4>
                    <p className="text-white/80 text-sm">{action.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">智能推荐</h3>
            <Link href="/courses" className="text-[#4361EE] text-sm font-medium">
              查看全部
            </Link>
          </div>
          
          <div className="space-y-4">
            {recommendedTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img 
                      src={`https://readdy.ai/api/search-image?query=$%7Btopic.image%7D&width=80&height=80&seq=topic-${index}&orientation=squarish`}
                      alt={topic.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">{topic.title}</h4>
                      {topic.completed && (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">{topic.level}</span>
                      <span>{topic.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">本周成就</h3>
            <div className="text-2xl">🏆</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <i className="ri-fire-fill text-white text-sm"></i>
                </div>
                <div>
                  <div className="font-medium text-gray-900">连续学习达人</div>
                  <div className="text-sm text-gray-600">连续学习7天</div>
                </div>
              </div>
              <div className="text-yellow-600 font-semibold">+50</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="ri-star-fill text-white text-sm"></i>
                </div>
                <div>
                  <div className="font-medium text-gray-900">发音进步奖</div>
                  <div className="text-sm text-gray-600">发音准确度达到90%</div>
                </div>
              </div>
              <div className="text-green-600 font-semibold">+30</div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
      <AIAssistant />
    </div>
  );
}