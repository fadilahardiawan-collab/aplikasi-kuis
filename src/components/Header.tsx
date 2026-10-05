import React from 'react';
import { ASSETS } from '../data/chaptersData';

interface HeaderProps {
  title?: string;
  tabTitle?: string;
  onBack?: () => void;
  onProfileClick?: () => void;
  xp?: number;
  showLogo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  tabTitle,
  onBack,
  onProfileClick,
  xp = 120,
  showLogo = true,
}) => {
  // If tabTitle is provided (e.g. HOME, MATERIALS, GAMES, PROFILE), render standard tab header
  if (tabTitle) {
    return (
      <header className="sticky top-0 w-full z-40 pt-safe bg-[#0d1324]/85 backdrop-blur-xl border-b border-[#2e3447]/50 shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {showLogo && (
              <img
                src={ASSETS.logo}
                alt="SpaceVocab App Logo"
                className="h-8 w-8 object-contain rounded-full shadow-sm"
              />
            )}
            <div className="flex flex-col">
              <span className="font-headline font-bold text-[18px] text-[#dce2fa] tracking-tight leading-none">
                SpaceVocab
              </span>
              <span className="font-semibold text-[11px] text-[#7bd0ff] tracking-widest uppercase">
                {tabTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#24293b] px-3 py-1 rounded-full text-[#f9bd22] shadow-[0_0_12px_rgba(249,189,34,0.18)]">
              <span className="material-symbols-outlined text-[16px] fill-1">bolt</span>
              <span className="text-[12px] font-bold text-[#dce2fa]">{xp} XP</span>
            </div>
            <button
              onClick={onProfileClick}
              aria-label="Profile"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2e3447] active:scale-95 transition-all p-0.5"
            >
              <img
                src={ASSETS.avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-[#7bd0ff]/40 shadow-sm"
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Sub-screen header with back arrow
  return (
    <header className="sticky top-0 w-full z-40 pt-safe bg-[#0d1324]/85 backdrop-blur-xl border-b border-[#2e3447]/50 shadow-[0_1px_8px_rgba(0,0,0,0.3)]">
      <div className="h-16 px-3 sm:px-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {onBack && (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#dce2fa] bg-[#191f30] hover:bg-[#24293b] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          )}
          {showLogo && (
            <img
              src={ASSETS.logo}
              alt="SpaceVocab App Logo"
              className="h-7 w-7 object-contain hidden sm:block ml-1"
            />
          )}
        </div>

        <h1 className="font-headline font-semibold text-[17px] sm:text-[18px] text-[#dce2fa] tracking-tight truncate flex-1 text-center px-1">
          {title || 'Quiz Session'}
        </h1>

        <button
          onClick={onProfileClick}
          aria-label="Student Profile"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2e3447] active:scale-95 transition-all"
        >
          <img
            src={ASSETS.avatar}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border border-[#d0bcff]/40 shadow-sm"
          />
        </button>
      </div>
    </header>
  );
};
