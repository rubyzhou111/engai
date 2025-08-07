'use client';

interface Course {
  id: number;
  title: string;
  category: string;
  level: number;
  duration: string;
  completionRate: number;
  isCompleted: boolean;
  thumbnail: string;
  description: string;
  tags: string[];
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const getLevelConfig = (level: number) => {
    const configs = {
      1: { label: 'L1', color: 'bg-green-100 text-green-600', bgColor: 'bg-green-500' },
      2: { label: 'L2', color: 'bg-blue-100 text-blue-600', bgColor: 'bg-blue-500' },
      3: { label: 'L3', color: 'bg-yellow-100 text-yellow-600', bgColor: 'bg-yellow-500' },
      4: { label: 'L4', color: 'bg-orange-100 text-orange-600', bgColor: 'bg-orange-500' },
      5: { label: 'L5', color: 'bg-red-100 text-red-600', bgColor: 'bg-red-500' }
    };
    return configs[level as keyof typeof configs] || configs[1];
  };

  const levelConfig = getLevelConfig(course.level);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex">
        {/* 课程缩略图 */}
        <div className="w-28 h-28 relative">
          <img 
            src={`https://readdy.ai/api/search-image?query=$%7Bcourse.thumbnail%7D&width=120&height=120&seq=course-${course.id}&orientation=squarish`}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          {course.isCompleted && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-white text-sm"></i>
            </div>
          )}
          <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${levelConfig.color}`}>
            {levelConfig.label}
          </div>
        </div>

        {/* 课程信息 */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight pr-2">
              {course.title}
            </h3>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 flex-shrink-0">
              <i className="ri-more-line text-gray-400"></i>
            </button>
          </div>

          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <i className="ri-time-line mr-1"></i>
                {course.duration}
              </span>
              {course.completionRate > 0 && (
                <span className="flex items-center">
                  <i className="ri-bar-chart-line mr-1"></i>
                  {course.completionRate}%
                </span>
              )}
            </div>
          </div>

          {/* 进度条 */}
          {course.completionRate > 0 && (
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${levelConfig.bgColor} transition-all duration-300`}
                  style={{ width: `${course.completionRate}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* 标签 */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1 overflow-hidden">
              {course.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs flex-shrink-0"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <button className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              course.isCompleted 
                ? 'bg-gray-100 text-gray-600'
                : course.completionRate > 0
                  ? 'bg-[#4361EE] text-white hover:bg-[#3651DD] active:scale-95'
                  : 'bg-[#4361EE] text-white hover:bg-[#3651DD] active:scale-95'
            }`}>
              {course.isCompleted ? '已完成' : course.completionRate > 0 ? '继续学习' : '开始学习'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}