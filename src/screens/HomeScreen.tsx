import React from 'react';
import { ASSETS } from '../data/chaptersData';
import { sound } from '../utils/audio';

interface HomeScreenProps {
  studentName: string;
  onContinueChapter: () => void;
  onPlayGames: () => void;
  onViewProgress: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  studentName,
  onContinueChapter,
  onPlayGames,
  onViewProgress,
}) => {
  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-24 gap-4 max-w-[500px] mx-auto">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between mt-3 bg-[#151b2c]/80 backdrop-blur-md p-4 rounded-2xl border border-[#2e3447]/60 shadow-md">
        <div className="flex flex-col pr-2 min-w-0">
          <span className="font-headline font-bold text-[22px] sm:text-[24px] text-[#dce2fa] tracking-tight">
            Hello, {studentName.split(' ')[0]}! 👋
          </span>
          <span className="text-[14px] text-[#cbc3d7] mt-0.5">
            Ready for today's space mission?
          </span>
        </div>

        <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-[#a078ff]/20 p-1 flex items-center justify-center shadow-[0_0_16px_rgba(208,188,255,0.3)] border border-[#7bd0ff]/40">
          <img
            src={ASSETS.avatar}
            alt="Raditya Astronaut Avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#f9bd22] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[10px] text-[#402d00] font-bold fill-1">star</span>
          </span>
        </div>
      </div>

      {/* Action Cards Stack */}
      <div className="flex flex-col gap-3.5 w-full">
        {/* Card 1: Continue Chapter 1 */}
        <div className="relative overflow-hidden bg-[#191f30]/90 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-[#2e3447] flex flex-col justify-between group hover:border-[#a078ff]/50 transition-all">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#a078ff]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-start justify-between gap-2 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#a078ff]/20 flex items-center justify-center text-[#d0bcff] shadow-[0_0_16px_rgba(208,188,255,0.25)] border border-[#a078ff]/30">
              <span className="material-symbols-outlined text-[26px]">menu_book</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24293b] text-[#d0bcff] text-[12px] font-semibold border border-[#33394b]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d0bcff] animate-pulse"></span>
              Things in the Classroom
            </span>
          </div>

          <div className="my-4 relative z-10">
            <h2 className="font-headline font-bold text-[19px] sm:text-[20px] text-[#dce2fa]">
              Continue Chapter 1
            </h2>
            <p className="text-[13px] text-[#cbc3d7] mt-0.5">
              Continue your learning material
            </p>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onContinueChapter();
            }}
            className="relative z-10 w-full h-12 rounded-full bg-gradient-to-r from-[#6d3bd7] to-[#a078ff] flex items-center justify-center gap-2 text-white font-bold text-[15px] shadow-lg active:scale-[0.98] transition-transform"
            type="button"
          >
            <span>Continue</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Card 2: Continue Game Chapter 1 */}
        <div className="relative overflow-hidden bg-[#191f30]/90 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-[#2e3447] flex flex-col justify-between group hover:border-[#7bd0ff]/50 transition-all">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#00a6e0]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-start justify-between gap-2 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#00a6e0]/20 flex items-center justify-center text-[#7bd0ff] shadow-[0_0_16px_rgba(123,208,255,0.25)] border border-[#00a6e0]/30">
              <span className="material-symbols-outlined text-[26px]">sports_esports</span>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#24293b] text-[#7bd0ff] text-[12px] font-semibold border border-[#33394b]">
              <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
              3 Fun Levels Ready
            </span>
          </div>

          <div className="my-4 relative z-10">
            <h2 className="font-headline font-bold text-[19px] sm:text-[20px] text-[#dce2fa]">
              Continue Game Chapter 1
            </h2>
            <p className="text-[13px] text-[#cbc3d7] mt-0.5">
              Practice your vocabulary
            </p>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onPlayGames();
            }}
            className="relative z-10 w-full h-12 rounded-full bg-gradient-to-r from-[#00a6e0] to-[#7bd0ff] flex items-center justify-center gap-2 text-[#00354a] font-bold text-[15px] shadow-lg active:scale-[0.98] transition-transform"
            type="button"
          >
            <span>Play</span>
            <span className="material-symbols-outlined text-[18px] fill-1">play_arrow</span>
          </button>
        </div>

        {/* Card 3: Your Progress */}
        <div className="relative overflow-hidden bg-[#191f30]/90 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-[#2e3447] flex flex-col justify-between group hover:border-[#f9bd22]/40 transition-all">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#f9bd22]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-start justify-between gap-2 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#b88900]/25 flex items-center justify-center text-[#f9bd22] shadow-[0_0_16px_rgba(249,189,34,0.25)] border border-[#f9bd22]/30">
              <span className="material-symbols-outlined text-[26px]">insights</span>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#24293b] text-[#f9bd22] text-[12px] font-semibold border border-[#33394b]">
              <span className="material-symbols-outlined text-[14px] fill-1">auto_awesome</span>
              1 of 4 Chapters finished
            </span>
          </div>

          <div className="my-4 relative z-10">
            <div className="flex items-center justify-between">
              <h2 className="font-headline font-bold text-[19px] sm:text-[20px] text-[#dce2fa]">
                Your Progress
              </h2>
              <span className="text-[13px] font-bold text-[#f9bd22]">25% Completed</span>
            </div>
            <p className="text-[13px] text-[#cbc3d7] mt-0.5">Chapter Progress</p>

            {/* Glowing Progress bar */}
            <div className="w-full bg-[#2e3447] h-3 rounded-full mt-3 overflow-hidden p-0.5 shadow-inner">
              <div
                className="bg-gradient-to-r from-[#f9bd22] to-[#ffdf9f] h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(249,189,34,0.4)]"
                style={{ width: '25%' }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onViewProgress();
            }}
            className="relative z-10 w-full h-12 rounded-full bg-[#24293b] hover:bg-[#33394b] flex items-center justify-center gap-2 text-[#dce2fa] font-bold text-[15px] shadow-md border border-[#33394b] active:scale-[0.98] transition-all"
            type="button"
          >
            <span>View Progress</span>
            <span className="material-symbols-outlined text-[18px] text-[#f9bd22]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
