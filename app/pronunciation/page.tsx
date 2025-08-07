'use client';

import { useState } from 'react';
import TopNavigation from '../../components/TopNavigation';
import BottomNavigation from '../../components/BottomNavigation';
import PronunciationAnalysis from './PronunciationAnalysis';
import RecordingInterface from './RecordingInterface';

export default function PronunciationPage() {
  const [hasRecording, setHasRecording] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleRecordingComplete = (data: any) => {
    setAnalysisData(data);
    setHasRecording(true);
  };

  const handleNewRecording = () => {
    setHasRecording(false);
    setAnalysisData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation 
        title="发音诊所"
        showBack={true}
        onBack={() => window.history.back()}
        rightAction={
          hasRecording ? (
            <button 
              onClick={handleNewRecording}
              className="text-[#4361EE] text-sm font-medium"
            >
              重新录制
            </button>
          ) : null
        }
      />
      
      <div className="pt-20 pb-24">
        {!hasRecording ? (
          <RecordingInterface onRecordingComplete={handleRecordingComplete} />
        ) : (
          <PronunciationAnalysis data={analysisData} />
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}