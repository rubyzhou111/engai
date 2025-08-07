'use client';

interface Scenario {
  id: string;
  title: string;
  level: string;
  background: string;
  description: string;
  difficulty: number;
}

interface ScenarioSelectorProps {
  currentScenario: Scenario;
  onSelect: (scenario: Scenario) => void;
  onClose: () => void;
}

export default function ScenarioSelector({ currentScenario, onSelect, onClose }: ScenarioSelectorProps) {
  const scenarios: Scenario[] = [
    {
      id: 'coffee-shop',
      title: '咖啡店点单',
      level: '商务初级',
      description: '练习日常点餐对话，学习礼貌用语',
      difficulty: 1,
      background: 'Coffee shop interior with barista and customer interaction, cozy atmosphere, warm lighting, realistic coffee shop setting'
    },
    {
      id: 'business-meeting',
      title: '商务会议',
      level: '商务中级', 
      description: '商务场景对话，提升职场沟通能力',
      difficulty: 3,
      background: 'Modern business meeting room with professionals discussing, corporate environment, professional lighting'
    },
    {
      id: 'airport-travel',
      title: '机场出行',
      level: '旅游中级',
      description: '机场、海关等旅行场景对话练习',
      difficulty: 2,
      background: 'Airport terminal with travelers and staff, modern aviation environment, bright lighting, travel atmosphere'
    },
    {
      id: 'hotel-checkin',
      title: '酒店入住',
      level: '旅游初级',
      description: '酒店前台对话，学习住宿相关表达',
      difficulty: 1,
      background: 'Elegant hotel lobby with reception desk, luxury interior, professional hospitality setting'
    },
    {
      id: 'job-interview',
      title: '求职面试',
      level: '商务高级',
      description: '面试场景模拟，提升求职英语水平',
      difficulty: 4,
      background: 'Professional interview room setting, formal business environment, corporate atmosphere'
    },
    {
      id: 'shopping-mall',
      title: '购物中心',
      level: '生活初级',
      description: '购物场景对话，学习消费相关词汇',
      difficulty: 1,
      background: 'Modern shopping mall interior with stores and customers, retail environment, bright commercial lighting'
    }
  ];

  const getDifficultyColor = (level: number) => {
    switch(level) {
      case 1: return 'bg-green-100 text-green-600';
      case 2: return 'bg-yellow-100 text-yellow-600';
      case 3: return 'bg-orange-100 text-orange-600';
      case 4: return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getDifficultyStars = (level: number) => {
    return '★'.repeat(level) + '☆'.repeat(5 - level);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
      <div className="w-full bg-white rounded-t-3xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">选择对话场景</h3>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <i className="ri-close-line text-xl text-gray-500"></i>
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="p-4 space-y-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => onSelect(scenario)}
                className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                  currentScenario.id === scenario.id 
                    ? 'border-[#4361EE] bg-blue-50' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img 
                      src={`https://readdy.ai/api/search-image?query=$%7Bscenario.background%7D&width=80&height=80&seq=scenario-${scenario.id}&orientation=squarish`}
                      alt={scenario.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{scenario.title}</h4>
                      {currentScenario.id === scenario.id && (
                        <div className="w-6 h-6 bg-[#4361EE] rounded-full flex items-center justify-center">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                        {scenario.level}
                      </span>
                      <span className="text-yellow-500 text-sm">
                        {getDifficultyStars(scenario.difficulty)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600">{scenario.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}