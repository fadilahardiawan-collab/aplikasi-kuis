import React from 'react';

export type NavTab = 'home' | 'materials' | 'games' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: 'home' },
    { id: 'materials' as NavTab, label: 'Materials', icon: 'menu_book' },
    { id: 'games' as NavTab, label: 'Games', icon: 'sports_esports' },
    { id: 'profile' as NavTab, label: 'Profile', icon: 'person' },
  ];

  return (
    <nav
      aria-label="SpaceVocab Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#070e1e]/90 backdrop-blur-xl border-t border-[#2e3447]/60 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-[500px] mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] transition-all duration-200 group active:scale-95 ${
                isActive
                  ? 'text-[#d0bcff] scale-105 font-semibold'
                  : 'text-[#cbc3d7]/70 hover:text-[#dce2fa]'
              }`}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[24px] transition-transform duration-200 ${
                    isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(208,188,255,0.6)]' : 'group-hover:scale-105'
                  }`}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#d0bcff] rounded-full shadow-[0_0_6px_#d0bcff]"></span>
                )}
              </div>
              <span className={`text-[11px] mt-1 tracking-wide ${isActive ? 'text-[#d0bcff] font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
