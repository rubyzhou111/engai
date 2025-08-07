'use client';

import { useState } from 'react';
import TopNavigation from '../../components/TopNavigation';
import BottomNavigation from '../../components/BottomNavigation';
import ChatInterface from './ChatInterface';
import ScenarioSelector from './ScenarioSelector';

export default function ChatPage() {
  const [selectedScenario, setSelectedScenario] = useState({
    id: 'coffee-shop',
    title: '咖啡店点单',
    level: '商务中级',
    background: 'Coffee shop interior with soft lighting, blurred background, cozy atmosphere, warm tones, realistic coffee shop environment',
    description: '在咖啡店点单的商务中级场景',
    difficulty: 2,
  });

  const [showScenarioSelector, setShowScenarioSelector] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <TopNavigation 
        title="AI对话练习"
        showBack={true}
        onBack={() => window.history.back()}
        rightAction={
          <button 
            onClick={() => setShowScenarioSelector(true)}
            className="w-10 h-10 flex items-center justify-center"
          >
            <i className="ri-settings-3-line text-xl text-gray-700"></i>
          </button>
        }
      />
      
      <div className="pt-16 pb-20">
        <ChatInterface scenario={selectedScenario} />
      </div>

      <BottomNavigation />
      
      {showScenarioSelector && (
        <ScenarioSelector
          currentScenario={selectedScenario}
          onSelect={(scenario) => {
            setSelectedScenario(scenario);
            setShowScenarioSelector(false);
          }}
          onClose={() => setShowScenarioSelector(false)}
        />
      )}
    </div>
  );
}
