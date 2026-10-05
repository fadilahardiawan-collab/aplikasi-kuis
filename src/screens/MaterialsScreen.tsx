import React from 'react';
import { CHAPTERS, Chapter } from '../data/chaptersData';
import { sound } from '../utils/audio';

interface MaterialsScreenProps {
  onSelectChapter: (chapter: Chapter) => void;
  onOpenPdf: (chapter: Chapter) => void;
}

export const MaterialsScreen: React.FC<MaterialsScreenProps> = ({
  onSelectChapter,
  onOpenPdf,
}) => {
  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-24 gap-4 max-w-[500px] mx-auto">
      {/* Interactive Starlight Banner / Intro Card */}
      <div className="relative w-full rounded-2xl p-5 bg-[#191f30] border border-[#2e3447] overflow-hidden shadow-xl mt-3">
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#a078ff]/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full bg-[#00a6e0]/10 blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[#7bd0ff]">
              <span className="material-symbols-outlined text-[18px]">auto_stories</span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#7bd0ff]">
                Module 01: Foundations
              </span>
            </div>
            <h1 className="font-headline font-bold text-[22px] sm:text-[24px] text-[#dce2fa]">
              Learning Materials
            </h1>
            <p className="text-[13px] text-[#cbc3d7]">
              Choose a chapter to initiate your cosmic vocabulary log.
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-[#24293b] text-[#f9bd22] border border-[#33394b] shadow-inner shrink-0">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
        </div>

        {/* Micro Orbit Progress Line */}
        <div className="mt-4 pt-2 flex items-center justify-between gap-2 border-t border-[#2e3447]/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f9bd22] shadow-[0_0_8px_rgba(249,189,34,0.6)]"></span>
            <span className="text-[12px] text-[#dce2fa] font-medium">6 Core Sectors Available</span>
          </div>
          <span className="text-[12px] text-[#7bd0ff] font-bold">1 / 6 Completed</span>
        </div>

        <div className="w-full bg-[#2e3447] h-2 rounded-full mt-2 overflow-hidden">
          <div className="bg-gradient-to-r from-[#d0bcff] to-[#7bd0ff] h-full rounded-full w-1/6 transition-all duration-500 shadow-[0_0_10px_rgba(123,208,255,0.4)]"></div>
        </div>
      </div>

      {/* Chapters Vertical Stack */}
      <div className="flex flex-col w-full gap-3">
        {CHAPTERS.map((ch) => {
          const isChapter1 = ch.id === 1;

          if (isChapter1) {
            return (
              <div
                key={ch.id}
                onClick={() => {
                  sound.playTap();
                  onOpenPdf(ch);
                }}
                className="group relative flex flex-col p-4 rounded-2xl bg-[#24293b] hover:bg-[#2e3447] border border-[#a078ff]/40 hover:border-[#a078ff] transition-all duration-200 active:scale-[0.99] shadow-lg cursor-pointer overflow-hidden"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#2e3447] flex items-center justify-center text-[#d0bcff] group-hover:text-[#7bd0ff] group-hover:scale-105 transition-all shadow-inner border border-[#33394b] shrink-0">
                      <span className="material-symbols-outlined text-[26px]">menu_book</span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] text-[#7bd0ff] uppercase tracking-wider font-bold">
                          Chapter 1
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#00a6e0]/20 text-[#7bd0ff] text-[11px] font-bold flex items-center gap-1 border border-[#00a6e0]/30">
                          <span className="material-symbols-outlined text-[13px]">picture_as_pdf</span>
                          Open PDF 📖
                        </span>
                      </div>
                      <h2 className="font-headline font-bold text-[16px] text-[#dce2fa] truncate group-hover:text-[#d0bcff] transition-colors mt-0.5">
                        {ch.title}
                      </h2>
                      <p className="text-[12px] text-[#cbc3d7] line-clamp-1">
                        {ch.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center shrink-0 pl-1">
                    <div className="h-9 px-3.5 rounded-full bg-[#d0bcff] flex items-center gap-1 text-[#3c0091] text-[13px] font-bold group-hover:bg-[#a078ff] group-hover:text-white transition-colors shadow-md">
                      <span>Read</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={ch.id}
              onClick={() => {
                sound.playTap();
                onSelectChapter(ch);
              }}
              className="group relative flex flex-col p-4 rounded-2xl bg-[#191f30] hover:bg-[#24293b] border border-[#2e3447] transition-all duration-200 active:scale-[0.99] shadow-sm cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-[#24293b] flex items-center justify-center text-[#7bd0ff] group-hover:scale-105 transition-all shadow-inner border border-[#33394b] shrink-0">
                    <span className="material-symbols-outlined text-[26px]">{ch.icon}</span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#cbc3d7] uppercase tracking-wider font-bold">
                        Chapter {ch.id}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#2e3447] text-[#958ea0] text-[11px] font-medium">
                        Standard
                      </span>
                    </div>
                    <h2 className="font-headline font-bold text-[16px] text-[#dce2fa] truncate mt-0.5">
                      {ch.title}
                    </h2>
                    <p className="text-[12px] text-[#cbc3d7] line-clamp-1">
                      {ch.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center shrink-0 pl-1">
                  <button
                    aria-label={`Explore Chapter ${ch.id}`}
                    className="w-9 h-9 rounded-full bg-[#2e3447] flex items-center justify-center text-[#dce2fa] group-hover:text-[#d0bcff] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Study Tip Micro-Card */}
      <div className="w-full p-4 rounded-2xl bg-[#151b2c] border border-[#2e3447]/60 flex items-start gap-3 shadow-inner">
        <div className="w-8 h-8 rounded-full bg-[#f9bd22]/15 text-[#f9bd22] flex items-center justify-center shrink-0 mt-0.5 border border-[#f9bd22]/30">
          <span className="material-symbols-outlined text-[18px]">tips_and_updates</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-[#f9bd22] font-bold tracking-wider uppercase">
            ASTRONAUT STUDY TIP
          </span>
          <p className="text-[12px] text-[#cbc3d7]">
            Review each PDF before taking the sector speed-quiz to unlock bonus Star XP.
          </p>
        </div>
      </div>
    </div>
  );
};
