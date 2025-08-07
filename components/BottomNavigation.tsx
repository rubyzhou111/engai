'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();
  
  const navItems = [
    { 
      icon: 'ri-dashboard-line', 
      activeIcon: 'ri-dashboard-fill',
      label: '首页', 
      href: '/' 
    },
    { 
      icon: 'ri-message-line', 
      activeIcon: 'ri-message-fill',
      label: '对话', 
      href: '/chat' 
    },
    { 
      icon: 'ri-mic-line', 
      activeIcon: 'ri-mic-fill',
      label: '发音', 
      href: '/pronunciation' 
    },
    { 
      icon: 'ri-book-line', 
      activeIcon: 'ri-book-fill',
      label: '课程', 
      href: '/courses' 
    },
    { 
      icon: 'ri-user-line', 
      activeIcon: 'ri-user-fill',
      label: '我的', 
      href: '/profile' 
    }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-0 py-2 z-50">
      <div className="grid grid-cols-5 gap-0">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors duration-200 ${
                isActive ? 'text-[#4361EE]' : 'text-gray-500'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-1">
                <i className={`${isActive ? item.activeIcon : item.icon} text-xl`}></i>
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}