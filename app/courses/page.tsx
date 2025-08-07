'use client';

import { useState } from 'react';
import TopNavigation from '../../components/TopNavigation';
import BottomNavigation from '../../components/BottomNavigation';
import CourseCard from './CourseCard';
import FilterTabs from './FilterTabs';

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');

  const categories = [
    { id: 'all', label: '全部', count: 48 },
    { id: 'business', label: '商务', count: 12 },
    { id: 'travel', label: '旅行', count: 15 },
    { id: 'exam', label: '考试', count: 8 },
    { id: 'daily', label: '日常', count: 13 }
  ];

  const levels = [
    { id: 'all', label: '全部难度' },
    { id: '1', label: 'L1 入门', color: 'bg-green-100 text-green-600' },
    { id: '2', label: 'L2 初级', color: 'bg-blue-100 text-blue-600' },
    { id: '3', label: 'L3 中级', color: 'bg-yellow-100 text-yellow-600' },
    { id: '4', label: 'L4 中高级', color: 'bg-orange-100 text-orange-600' },
    { id: '5', label: 'L5 高级', color: 'bg-red-100 text-red-600' }
  ];

  const courses = [
    {
      id: 1,
      title: '咖啡店点单对话',
      category: 'daily',
      level: 1,
      duration: '10分钟',
      completionRate: 85,
      isCompleted: true,
      thumbnail: 'Coffee shop scene with customer ordering at counter, realistic barista interaction, warm lighting, cozy atmosphere, professional service setting',
      description: '学习在咖啡店点餐的基本对话，掌握礼貌用语和常用表达',
      tags: ['日常对话', '服务场景', '礼貌用语']
    },
    {
      id: 2,
      title: '商务会议沟通',
      category: 'business',
      level: 3,
      duration: '25分钟',
      completionRate: 0,
      isCompleted: false,
      thumbnail: 'Business meeting room with professionals discussing, modern corporate environment, conference table, professional atmosphere',
      description: '提升商务会议中的英语沟通能力，学习专业词汇和表达方式',
      tags: ['商务英语', '会议沟通', '职场技能']
    },
    {
      id: 3,
      title: '机场出行指南',
      category: 'travel',
      level: 2,
      duration: '18分钟',
      completionRate: 65,
      isCompleted: false,
      thumbnail: 'Airport terminal with travelers checking in, modern aviation environment, departure gates, travel atmosphere',
      description: '掌握机场、海关等场景的英语对话，让出行更顺畅',
      tags: ['旅游英语', '交通出行', '海关对话']
    },
    {
      id: 4,
      title: '雅思口语Part1',
      category: 'exam',
      level: 4,
      duration: '30分钟',
      completionRate: 45,
      isCompleted: false,
      thumbnail: 'IELTS exam preparation scene with student studying, academic environment, test materials, focused learning atmosphere',
      description: '雅思口语考试第一部分训练，个人信息和日常话题',
      tags: ['雅思考试', '口语训练', '考试技巧']
    },
    {
      id: 5,
      title: '酒店前台对话',
      category: 'travel',
      level: 2,
      duration: '15分钟',
      completionRate: 100,
      isCompleted: true,
      thumbnail: 'Elegant hotel lobby with reception desk, luxury interior, professional hospitality service, welcoming atmosphere',
      description: '学习酒店入住、退房等场景的英语表达',
      tags: ['住宿服务', '旅游英语', '服务对话']
    },
    {
      id: 6,
      title: '求职面试技巧',
      category: 'business',
      level: 4,
      duration: '35分钟',
      completionRate: 20,
      isCompleted: false,
      thumbnail: 'Professional job interview setting with interviewer and candidate, corporate office environment, formal business atmosphere',
      description: '提升英语面试表现，掌握求职相关词汇和回答技巧',
      tags: ['求职面试', '职场英语', '沟通技巧']
    }
  ];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = activeCategory === 'all' || course.category === activeCategory;
    const levelMatch = activeLevel === 'all' || course.level.toString() === activeLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation 
        title="情境课程库"
        showBack={true}
        onBack={() => window.history.back()}
        rightAction={
          <button className="w-10 h-10 flex items-center justify-center">
            <i className="ri-search-line text-xl text-gray-700"></i>
          </button>
        }
      />
      
      <div className="pt-20 pb-24">
        {/* 学习统计 */}
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-r from-[#4361EE] to-[#64E9EE] rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">学习进度</h3>
                <p className="text-white/80 text-sm">继续保持学习节奏</p>
              </div>
              <div className="text-3xl">📚</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-white/80 text-sm">已完成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-white/80 text-sm">进行中</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">28</div>
                <div className="text-white/80 text-sm">待开始</div>
              </div>
            </div>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="px-4 mb-6">
          <FilterTabs
            categories={categories}
            levels={levels}
            activeCategory={activeCategory}
            activeLevel={activeLevel}
            onCategoryChange={setActiveCategory}
            onLevelChange={setActiveLevel}
          />
        </div>

        {/* 课程列表 */}
        <div className="px-4 space-y-4">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* 空状态 */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-search-line text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无匹配课程</h3>
            <p className="text-gray-500 text-sm">试试调整筛选条件</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}