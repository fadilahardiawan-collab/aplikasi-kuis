import React from 'react';
import { ASSETS } from '../data/chaptersData';
import { sound } from '../utils/audio';

interface ProfileScreenProps {
  studentName: string;
  currentXp: number;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  studentName,
  currentXp,
  onLogout,
}) => {
  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-24 gap-4 max-w-[500px] mx-auto select-none">
      {/* Profile Header Card */}
      <div className="relative w-full rounded-2xl bg-[#191f30]/90 backdrop-blur-md p-5 flex flex-col items-center text-center shadow-lg border border-[#2e3447] overflow-hidden mt-3">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#a078ff]/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#00a6e0]/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Avatar with Glowing Cosmic Ring */}
        <div className="relative mb-2.5">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#a078ff] to-[#7bd0ff] shadow-[0_0_24px_rgba(208,188,255,0.4)] flex items-center justify-center">
            <img
              src={ASSETS.avatar}
              alt={studentName}
              className="w-full h-full object-cover rounded-full bg-[#070e1e]"
            />
          </div>
          <button
            onClick={() => {
              sound.playTap();
              alert("Edit Profile modal: Customize your astronaut spacesuit, helmet visor, and callsign!");
            }}
            aria-label="Edit Profile"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#2e3447] text-[#7bd0ff] shadow-md border border-[#33394b] flex items-center justify-center hover:bg-[#33394b] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </button>
        </div>

        {/* Student Details */}
        <h1 className="font-headline font-bold text-[22px] sm:text-[24px] text-[#dce2fa] tracking-tight">
          {studentName}
        </h1>
        <p className="text-[13px] text-[#cbc3d7] mt-0.5">
          @{studentName.toLowerCase().replace(/\s+/g, '')} • SMP Grade 7 Cadet
        </p>

        {/* Explorer Rank Pill */}
        <div className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-1.5 rounded-full bg-[#24293b] text-[#f9bd22] border border-[#33394b] shadow-[0_0_15px_rgba(249,189,34,0.15)]">
          <span className="material-symbols-outlined text-[16px] fill-1">stars</span>
          <span className="text-[12px] font-bold text-[#dce2fa] tracking-wide">
            Level 4 Starlight Explorer ⭐
          </span>
        </div>
      </div>

      {/* Section: Your Progress */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">insights</span>
            <h2 className="font-headline font-bold text-[16px] text-[#dce2fa]">Your Progress</h2>
          </div>
          <span className="text-[11px] font-bold text-[#7bd0ff] bg-[#191f30] px-2.5 py-0.5 rounded-full border border-[#2e3447]">
            Rank #12 SMP 1
          </span>
        </div>

        {/* Featured Progress Banner */}
        <div className="w-full bg-[#191f30] rounded-2xl p-4 border border-[#2e3447] shadow-md flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[13px] font-semibold text-[#cbc3d7] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#d0bcff] text-[17px]">menu_book</span>
              Completed Chapters
            </span>
            <span className="text-[14px] text-[#dce2fa] font-bold">2 / 6 Chapters</span>
          </div>

          <div className="w-full bg-[#2e3447] h-3 rounded-full overflow-hidden p-0.5 mt-1 shadow-inner">
            <div className="bg-gradient-to-r from-[#d0bcff] to-[#7bd0ff] h-full rounded-full w-1/3 transition-all duration-500 shadow-[0_0_10px_rgba(123,208,255,0.4)]"></div>
          </div>

          <div className="flex justify-between text-[#cbc3d7] text-[11px] mt-0.5">
            <span>33% Journey completed</span>
            <span className="text-[#7bd0ff] font-medium">4 Chapters remaining</span>
          </div>
        </div>

        {/* 2x2 Clean Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Total Games */}
          <div className="bg-[#191f30] border border-[#2e3447] rounded-2xl p-3.5 flex flex-col justify-between shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#24293b] flex items-center justify-center text-[#7bd0ff] mb-2 border border-[#33394b]">
              <span className="material-symbols-outlined text-[19px]">sports_esports</span>
            </div>
            <div>
              <span className="text-[11px] text-[#cbc3d7] block">Total Games</span>
              <span className="font-headline font-bold text-[18px] text-[#dce2fa]">12 Games</span>
            </div>
          </div>

          {/* Best Score */}
          <div className="bg-[#191f30] border border-[#2e3447] rounded-2xl p-3.5 flex flex-col justify-between shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#24293b] flex items-center justify-center text-[#f9bd22] mb-2 border border-[#33394b]">
              <span className="material-symbols-outlined text-[19px] fill-1">military_tech</span>
            </div>
            <div>
              <span className="text-[11px] text-[#cbc3d7] block">Best Quiz Score</span>
              <span className="font-headline font-bold text-[18px] text-[#f9bd22]">100%</span>
            </div>
          </div>

          {/* Vocab Progress */}
          <div className="bg-[#191f30] border border-[#2e3447] rounded-2xl p-3.5 flex flex-col justify-between shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#24293b] flex items-center justify-center text-[#d0bcff] mb-2 border border-[#33394b]">
              <span className="material-symbols-outlined text-[19px]">school</span>
            </div>
            <div>
              <span className="text-[11px] text-[#cbc3d7] block">Vocab Progress</span>
              <span className="font-headline font-bold text-[18px] text-[#dce2fa]">
                68% <span className="text-[11px] text-[#cbc3d7] font-normal">Mastered</span>
              </span>
            </div>
          </div>

          {/* Starlight Points */}
          <div className="bg-[#191f30] border border-[#2e3447] rounded-2xl p-3.5 flex flex-col justify-between shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#24293b] flex items-center justify-center text-[#f9bd22] mb-2 border border-[#33394b]">
              <span className="material-symbols-outlined text-[19px] fill-1">bolt</span>
            </div>
            <div>
              <span className="text-[11px] text-[#cbc3d7] block">Starlight Points</span>
              <span className="font-headline font-bold text-[18px] text-[#dce2fa]">
                {currentXp} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Mastery List */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">verified</span>
            <h2 className="font-headline font-bold text-[16px] text-[#dce2fa]">Chapter Mastery</h2>
          </div>
          <span className="text-[11px] text-[#cbc3d7]">Classroom Units</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Chapter 1: Mastered */}
          <div className="w-full bg-[#191f30] rounded-2xl p-3.5 border border-[#2e3447] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00a6e0]/15 text-[#7bd0ff] flex items-center justify-center border border-[#00a6e0]/30 shadow-inner">
                <span className="material-symbols-outlined text-[19px]">rocket_launch</span>
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#dce2fa]">Chapter 1: Solar Explorers</h3>
                <p className="text-[12px] text-[#cbc3d7]">Daily School Objects &amp; Space Gear</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2.5 py-0.5 rounded-full bg-[#24293b] text-[#7bd0ff] text-[11px] font-bold flex items-center gap-1 border border-[#33394b]">
                <span className="material-symbols-outlined text-[13px] fill-1">check_circle</span>
                100%
              </span>
              <span className="text-[10px] text-[#7bd0ff] mt-0.5 font-semibold">Mastered</span>
            </div>
          </div>

          {/* Chapter 2: In Progress */}
          <div className="w-full bg-[#191f30] rounded-2xl p-3.5 border border-[#2e3447] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#a078ff]/15 text-[#d0bcff] flex items-center justify-center border border-[#a078ff]/30 shadow-inner">
                <span className="material-symbols-outlined text-[19px]">travel_explore</span>
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[#dce2fa]">
                  Chapter 2: Orbit &amp; Planetary Life
                </h3>
                <p className="text-[12px] text-[#cbc3d7]">Action Verbs &amp; Directions</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="px-2.5 py-0.5 rounded-full bg-[#24293b] text-[#d0bcff] text-[11px] font-bold flex items-center gap-1 border border-[#33394b]">
                <span className="material-symbols-outlined text-[13px]">sync</span>
                50%
              </span>
              <span className="text-[10px] text-[#cbc3d7] mt-0.5 font-semibold">In Progress</span>
            </div>
          </div>

          {/* Chapter 3: Locked */}
          <div className="w-full bg-[#191f30]/60 rounded-2xl p-3.5 border border-[#2e3447]/60 flex items-center justify-between opacity-60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#24293b] text-[#958ea0] flex items-center justify-center">
                <span className="material-symbols-outlined text-[19px]">lock</span>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-[#dce2fa]">
                  Chapter 3: Deep Cosmos Dialogue
                </h3>
                <p className="text-[12px] text-[#cbc3d7]">Grammar &amp; Simple Past Tense</p>
              </div>
            </div>
            <span className="text-[10px] text-[#cbc3d7] bg-[#24293b] px-2 py-0.5 rounded-full">
              Locked
            </span>
          </div>
        </div>
      </div>

      {/* Logout Action */}
      <div className="pt-2">
        <button
          onClick={() => {
            sound.playTap();
            onLogout();
          }}
          aria-label="Log out of SpaceVocab"
          className="w-full h-13 rounded-full bg-[#93000a]/25 hover:bg-[#93000a]/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[#ffb4ab] text-[14px] font-bold border border-[#ffb4ab]/30 shadow-sm"
        >
          <span className="material-symbols-outlined text-[19px]">logout</span>
          <span>Log Out of Mission</span>
        </button>

        <p className="text-[11px] text-center text-[#958ea0] mt-3">
          SpaceVocab Cadet App v1.4 • Semester 1 SMP
        </p>
      </div>
    </div>
  );
};
