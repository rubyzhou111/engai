'use client';

interface TopNavigationProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export default function TopNavigation({ 
  title = '', 
  showBack = false, 
  onBack,
  rightAction 
}: TopNavigationProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBack && (
            <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center mr-2 -ml-2"
            >
              <i className="ri-arrow-left-line text-xl text-gray-700"></i>
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        {rightAction && (
          <div className="flex items-center">
            {rightAction}
          </div>
        )}
      </div>
    </div>
  );
}