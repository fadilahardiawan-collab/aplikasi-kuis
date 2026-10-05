import React from 'react';
import { ASSETS } from '../data/chaptersData';
import { sound } from '../utils/audio';

interface ChapterGamesMenuScreenProps {
  onPlayCrossword: () => void;
  onPlayUnscramble: () => void;
  onPlayQuiz: () => void;
}

export const ChapterGamesMenuScreen: React.FC<ChapterGamesMenuScreenProps> = ({
  onPlayCrossword,
  onPlayUnscramble,
  onPlayQuiz,
}) => {
  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-24 gap-4 max-w-[500px] mx-auto select-none">
      {/* Mission Banner & Overview Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#24293b] via-[#191f30] to-[#151b2c] p-5 shadow-xl border border-[#2e3447] mt-3">
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#a078ff]/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full bg-[#00a6e0]/20 blur-xl pointer-events-none"></div>

        <div className="relative flex flex-col gap-2 z-10">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2e3447]/80 text-[#7bd0ff] text-[11px] font-bold border border-[#7bd0ff]/30 shadow-sm">
              <span className="material-symbols-outlined text-[14px] fill-1">rocket_launch</span>
              <span>MISSION SECTOR 1</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2e3447]/60 text-[#f9bd22] text-[11px] font-bold border border-[#f9bd22]/30">
              <span className="material-symbols-outlined text-[14px] fill-1">stars</span>
              <span>15 Starlight XP</span>
            </div>
          </div>

          <div className="mt-1">
            <h2 className="font-headline font-bold text-[22px] sm:text-[24px] text-[#dce2fa] tracking-tight">
              Chapter 1 Games
            </h2>
            <p className="text-[13px] text-[#cbc3d7]">
              Things in the Classroom • 3 Levels
            </p>
          </div>

          {/* Orbital Progress Track */}
          <div className="mt-3 pt-2 flex items-center justify-between gap-3 border-t border-[#2e3447]/50">
            <div className="flex items-center gap-2 flex-1">
              <div className="h-2.5 flex-1 rounded-full bg-[#2e3447] overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-gradient-to-r from-[#7bd0ff] to-[#d0bcff] w-1/3 shadow-[0_0_8px_rgba(123,208,255,0.6)]"></div>
              </div>
              <span className="text-[11px] font-bold text-[#7bd0ff]">1/3 Cleared</span>
            </div>
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-[#7bd0ff] text-[#00354a] flex items-center justify-center text-[11px] font-bold shadow">
                1
              </div>
              <div className="w-6 h-6 rounded-full bg-[#33394b] text-[#cbc3d7] flex items-center justify-center text-[11px] font-bold">
                2
              </div>
              <div className="w-6 h-6 rounded-full bg-[#33394b] text-[#cbc3d7] flex items-center justify-center text-[11px] font-bold">
                3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Stack */}
      <div className="flex flex-col gap-3.5 w-full">
        {/* LEVEL 1 CARD: Crossword / TTS */}
        <div className="group relative rounded-2xl bg-[#24293b]/90 backdrop-blur-md p-4 sm:p-5 shadow-lg border border-[#2e3447] hover:border-[#7bd0ff]/50 flex flex-col gap-3 transition-all duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#00a6e0]/15 flex items-center justify-center text-[#7bd0ff] shadow-inner border border-[#00a6e0]/30 shrink-0">
                <span className="material-symbols-outlined text-[28px]">grid_view</span>
              </div>
              <div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00a6e0]/20 text-[#c4e7ff] text-[10px] font-bold mb-0.5">
                  <span className="material-symbols-outlined text-[12px] fill-1">check_circle</span>
                  <span>LEVEL 1</span>
                </div>
                <h3 className="font-headline font-bold text-[17px] text-[#dce2fa]">
                  Crossword / TTS
                </h3>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#191f30] text-[#f9bd22] text-[11px] font-bold flex items-center gap-1 border border-[#2e3447]">
              <span className="material-symbols-outlined text-[13px] fill-1">star</span>
              +50 XP
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-[13px] text-[#cbc3d7]">
              Solve interconnected vocabulary puzzle
            </p>
            <div className="flex items-center gap-2 text-[#958ea0] text-[12px]">
              <span className="material-symbols-outlined text-[16px] text-[#7bd0ff]">extension</span>
              <span>5 Questions • Intersecting Grid</span>
            </div>
          </div>

          {/* Illustrated Preview Snippet */}
          <div className="relative h-20 w-full rounded-xl overflow-hidden bg-[#070e1e] flex items-center justify-between px-3 border border-[#2e3447]/60">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <img
                src={ASSETS.crosswordPreview}
                alt="Crossword preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5 items-end text-right">
              <span className="text-[11px] text-[#7bd0ff] tracking-wider uppercase font-bold">
                Classroom Gear
              </span>
              <span className="text-[12px] text-[#cbc3d7]">
                Desk • Eraser • Ruler
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onPlayCrossword();
            }}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#7bd0ff] to-[#00a6e0] text-[#00354a] font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,166,224,0.35)] active:scale-[0.98] transition-transform"
          >
            <span>Play Crossword 🧩</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* LEVEL 2 CARD: Unscramble Words */}
        <div className="group relative rounded-2xl bg-[#24293b]/90 backdrop-blur-md p-4 sm:p-5 shadow-lg border border-[#2e3447] hover:border-[#a078ff]/50 flex flex-col gap-3 transition-all duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#a078ff]/15 flex items-center justify-center text-[#d0bcff] shadow-inner border border-[#a078ff]/30 shrink-0">
                <span className="material-symbols-outlined text-[28px]">sort_by_alpha</span>
              </div>
              <div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#a078ff]/25 text-[#d0bcff] text-[10px] font-bold mb-0.5">
                  <span className="material-symbols-outlined text-[12px]">explore</span>
                  <span>LEVEL 2</span>
                </div>
                <h3 className="font-headline font-bold text-[17px] text-[#dce2fa]">
                  Unscramble Words
                </h3>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#191f30] text-[#f9bd22] text-[11px] font-bold flex items-center gap-1 border border-[#2e3447]">
              <span className="material-symbols-outlined text-[13px] fill-1">star</span>
              +60 XP
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-[13px] text-[#cbc3d7]">
              Rearrange jumbled letters into words
            </p>
            <div className="flex items-center gap-2 text-[#958ea0] text-[12px]">
              <span className="material-symbols-outlined text-[16px] text-[#d0bcff]">touch_app</span>
              <span>5 Questions • Letter tiles</span>
            </div>
          </div>

          {/* Illustrated Preview Snippet */}
          <div className="relative h-20 w-full rounded-xl overflow-hidden bg-[#070e1e] flex items-center justify-between px-3 border border-[#2e3447]/60">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <img
                src={ASSETS.unscramblePreview}
                alt="Unscramble preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-8 h-8 rounded-lg bg-[#2e3447] flex items-center justify-center font-bold text-[15px] text-[#d0bcff] shadow">
                P
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#2e3447] flex items-center justify-center font-bold text-[15px] text-[#7bd0ff] shadow">
                E
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#2e3447] flex items-center justify-center font-bold text-[15px] text-[#d0bcff] shadow">
                N
              </span>
              <span className="material-symbols-outlined text-[#958ea0] text-[18px]">cached</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onPlayUnscramble();
            }}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(109,59,215,0.35)] active:scale-[0.98] transition-transform"
          >
            <span>Play Unscramble 🔤</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* LEVEL 3 CARD: Vocabulary Quiz */}
        <div className="group relative rounded-2xl bg-[#24293b]/90 backdrop-blur-md p-4 sm:p-5 shadow-lg border border-[#2e3447] hover:border-[#f9bd22]/50 flex flex-col gap-3 transition-all duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#b88900]/20 flex items-center justify-center text-[#f9bd22] shadow-inner border border-[#f9bd22]/30 shrink-0">
                <span className="material-symbols-outlined text-[28px]">quiz</span>
              </div>
              <div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#b88900]/25 text-[#ffdf9f] text-[10px] font-bold mb-0.5">
                  <span className="material-symbols-outlined text-[12px]">lock_open</span>
                  <span>LEVEL 3</span>
                </div>
                <h3 className="font-headline font-bold text-[17px] text-[#dce2fa]">
                  Vocabulary Quiz
                </h3>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#191f30] text-[#f9bd22] text-[11px] font-bold flex items-center gap-1 border border-[#2e3447]">
              <span className="material-symbols-outlined text-[13px] fill-1">star</span>
              +100 XP
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-[13px] text-[#cbc3d7]">
              Multiple-choice vocabulary challenge
            </p>
            <div className="flex items-center gap-2 text-[#958ea0] text-[12px]">
              <span className="material-symbols-outlined text-[16px] text-[#f9bd22]">fact_check</span>
              <span>5 Questions • 4 Options</span>
            </div>
          </div>

          {/* Illustrated Preview Snippet */}
          <div className="relative h-20 w-full rounded-xl overflow-hidden bg-[#070e1e] flex items-center justify-between px-3 border border-[#2e3447]/60">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
              <img
                src={ASSETS.quizPreview}
                alt="Quiz preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0.5 items-end text-right">
              <span className="text-[11px] text-[#f9bd22] tracking-wider uppercase font-bold">
                Mastery Challenge
              </span>
              <span className="text-[12px] text-[#cbc3d7]">Quick Speed Bonus</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              onPlayQuiz();
            }}
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#b88900] to-[#f9bd22] text-[#402d00] font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(249,189,34,0.35)] active:scale-[0.98] transition-transform"
          >
            <span>Start Quiz 📝</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Cosmic Tip Footer */}
      <div className="rounded-2xl bg-[#151b2c] p-4 flex items-center gap-3 text-[#cbc3d7] border border-[#2e3447]/60">
        <div className="w-9 h-9 rounded-full bg-[#24293b] flex items-center justify-center shrink-0 text-[#7bd0ff] border border-[#33394b]">
          <span className="material-symbols-outlined text-[20px]">lightbulb</span>
        </div>
        <p className="text-[12px]">
          <strong className="text-[#dce2fa] font-bold">Astronaut Tip:</strong> Complete all 3
          levels to unlock the Chapter 1 Cosmic Mastery Badge!
        </p>
      </div>
    </div>
  );
};
