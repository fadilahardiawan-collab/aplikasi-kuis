import React from 'react';
import { ASSETS } from '../data/chaptersData';
import { sound } from '../utils/audio';

interface OpeningScreenProps {
  onStartMission: () => void;
  onGoToRegister: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  onStartMission,
  onGoToRegister,
}) => {
  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-between items-center px-5 py-6 overflow-hidden select-none bg-[#0d1324] cosmic-bg">
      {/* Ambient Starlight & Nebula Glows */}
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-[#a078ff]/20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-64 h-64 rounded-full bg-[#00a6e0]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full bg-[#6d3bd7]/25 blur-3xl pointer-events-none"></div>

      {/* Top Badge: Quest Tag */}
      <div className="w-full flex justify-center items-center pt-4 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24293b]/80 backdrop-blur-md shadow-sm border border-[#33394b]/60">
          <span className="material-symbols-outlined text-[#7bd0ff] text-[18px] fill-1">public</span>
          <span className="text-[12px] font-bold text-[#7bd0ff] tracking-wide uppercase">
            SMP English Learning Quest
          </span>
        </div>
      </div>

      {/* Hero Logo & Branding */}
      <div className="w-full flex flex-col items-center justify-center my-auto py-8 z-10 text-center">
        <div className="relative mb-6 group">
          {/* Animated Glow Rings */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#a078ff] via-[#7bd0ff] to-[#d0bcff] opacity-60 blur-xl animate-pulse"></div>

          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#24293b]/90 backdrop-blur-md p-3.5 flex items-center justify-center shadow-2xl border border-[#33394b]">
            <img
              src={ASSETS.logo}
              alt="SpaceVocab App Logo"
              className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
            />

            {/* Orbiting Starlight Particles */}
            <div className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#f9bd22] shadow-lg animate-ping opacity-75"></div>
            <div className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-[#f9bd22] shadow-sm"></div>
            <div className="absolute bottom-3 -left-1 w-2.5 h-2.5 rounded-full bg-[#7bd0ff] shadow-md"></div>
          </div>
        </div>

        <h1 className="font-headline font-bold text-[32px] sm:text-[38px] tracking-tight bg-gradient-to-r from-[#dce2fa] via-[#e9ddff] to-[#7bd0ff] bg-clip-text text-transparent mb-1">
          SpaceVocab
        </h1>
        <p className="text-[16px] text-[#cbc3d7] font-medium max-w-xs">
          Learn English Vocabulary
        </p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#f9bd22] shadow-[0_0_8px_#f9bd22]"></span>
          <span className="text-[12px] text-[#cbc3d7] font-semibold">
            Class 7 - 9 • Galaksi Kata Seru
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3.5 pb-4 z-10">
        <button
          onClick={() => {
            sound.playTap();
            onStartMission();
          }}
          className="w-full h-14 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] hover:opacity-95 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 text-white font-bold text-[16px] shadow-[0_6px_24px_rgba(109,59,215,0.4)]"
          type="button"
        >
          <span>Start Mission</span>
          <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[14px] text-[#cbc3d7]">
          <span>Belum punya akun?</span>
          <button
            onClick={() => {
              sound.playTap();
              onGoToRegister();
            }}
            className="font-bold text-[#7bd0ff] hover:text-[#c4e7ff] transition-colors underline-offset-4 hover:underline"
            type="button"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
