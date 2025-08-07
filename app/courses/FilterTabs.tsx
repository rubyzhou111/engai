'use client';

interface FilterTabsProps {
  categories: Array<{ id: string; label: string; count: number }>;
  levels: Array<{ id: string; label: string; color?: string }>;
  activeCategory: string;
  activeLevel: string;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
}

export default function FilterTabs({ 
  categories, 
  levels, 
  activeCategory, 
  activeLevel, 
  onCategoryChange, 
  onLevelChange 
}: FilterTabsProps) {
  return (
    <div className="space-y-4">
      {/* 分类筛选 */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">课程分类</h4>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-[#4361EE] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {category.label}
              {category.id !== 'all' && (
                <span className={`ml-1 text-xs ${
                  activeCategory === category.id ? 'text-white/80' : 'text-gray-400'
                }`}>
                  {category.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 难度筛选 */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">难度等级</h4>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {levels.map(level => (
            <button
              key={level.id}
              onClick={() => onLevelChange(level.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeLevel === level.id
                  ? 'bg-[#4361EE] text-white'
                  : level.color 
                    ? `${level.color} hover:opacity-80`
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}