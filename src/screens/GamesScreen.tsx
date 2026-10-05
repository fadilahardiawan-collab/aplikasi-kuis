import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface GamesScreenProps {
  onOpenLevel: (level: 'crossword' | 'unscramble' | 'quiz') => void;
  onOpenChapterGamesMenu: () => void;
}

export const GamesScreen: React.FC<GamesScreenProps> = ({
  onOpenLevel,
  onOpenChapterGamesMenu,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const handleLaunchLevel = (level: 'crossword' | 'unscramble' | 'quiz', name: string) => {
    sound.playTap();
    setIsModalOpen(false);
    showToast(`Launching ${name} 🚀`);
    setTimeout(() => {
      onOpenLevel(level);
    }, 400);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-24 gap-4 max-w-[500px] mx-auto select-none">
      {/* Screen Header Narrative */}
      <section className="flex flex-col gap-1 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#7bd0ff] uppercase tracking-widest font-bold">
              Arcade Sector
            </p>
            <h1 className="font-headline font-bold text-[22px] sm:text-[24px] text-[#dce2fa]">
              Vocabulary Games
            </h1>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24293b] text-[#f9bd22] border border-[#33394b] shadow-[0_0_15px_rgba(249,189,34,0.18)]">
            <span className="material-symbols-outlined text-[16px] fill-1">stars</span>
            <span className="text-[12px] font-bold text-[#dce2fa]">3/18 Cleared</span>
          </div>
        </div>
        <p className="text-[13px] text-[#cbc3d7]">
          Choose a chapter to initiate space missions and level quizzes.
        </p>
      </section>

      {/* Quick Mission Streak Banner */}
      <section className="w-full rounded-2xl bg-gradient-to-r from-[#24293b] via-[#191f30] to-[#151b2c] p-4 flex items-center justify-between shadow-lg border border-[#2e3447] relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#a078ff]/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-full bg-[#a078ff]/20 flex items-center justify-center text-[#d0bcff] shadow-[0_0_16px_rgba(208,188,255,0.3)] border border-[#a078ff]/30">
            <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#f9bd22] font-bold tracking-wider uppercase">
              Galaxy Sprint
            </span>
            <span className="font-headline font-bold text-[16px] text-[#dce2fa]">
              Daily Challenge Active
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end relative z-10">
          <span className="text-[13px] text-[#7bd0ff] font-bold">+50 XP</span>
          <span className="text-[11px] text-[#cbc3d7]">2x Bonus</span>
        </div>
      </section>

      {/* Chapter Card 1: Active Chapter with Levels */}
      <div className="flex flex-col w-full rounded-2xl bg-[#24293b] p-4 shadow-[0_0_24px_rgba(160,120,255,0.22)] border border-[#a078ff]/50 relative overflow-hidden transition-all duration-200">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#a078ff]/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#a078ff]/25 text-[#d0bcff] text-[11px] font-bold border border-[#a078ff]/30">
              Chapter 1
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7bd0ff]/15 text-[#7bd0ff] text-[11px] font-bold border border-[#7bd0ff]/30">
              <span className="material-symbols-outlined text-[13px]">sports_esports</span>
              3 Levels Available 🎮
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#191f30] flex items-center justify-center text-[#f9bd22] border border-[#2e3447]">
            <span className="material-symbols-outlined text-[18px] fill-1">token</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 mb-3 relative z-10">
          <div className="w-14 h-14 rounded-xl bg-[#2e3447] flex items-center justify-center text-[#d0bcff] shadow-inner border border-[#33394b] shrink-0">
            <span className="material-symbols-outlined text-[30px]">school</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="font-headline font-bold text-[17px] text-[#dce2fa] truncate">
              Things in the Classroom
            </h2>
            <p className="text-[12px] text-[#cbc3d7]">
              Stationery, desk items, whiteboards &amp; tools
            </p>
          </div>
        </div>

        {/* Levels Preview Badges */}
        <div className="grid grid-cols-3 gap-2 mb-3.5 relative z-10">
          <button
            onClick={() => handleLaunchLevel('crossword', 'Level 1: Crossword')}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[#191f30] hover:bg-[#2e3447] text-[#dce2fa] border border-[#2e3447] transition-colors"
          >
            <span className="material-symbols-outlined text-[#7bd0ff] text-[16px]">grid_4x4</span>
            <span className="text-[11px] font-semibold truncate">Crossword</span>
          </button>
          <button
            onClick={() => handleLaunchLevel('unscramble', 'Level 2: Unscramble')}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[#191f30] hover:bg-[#2e3447] text-[#dce2fa] border border-[#2e3447] transition-colors"
          >
            <span className="material-symbols-outlined text-[#f9bd22] text-[16px]">shuffle</span>
            <span className="text-[11px] font-semibold truncate">Unscramble</span>
          </button>
          <button
            onClick={() => handleLaunchLevel('quiz', 'Level 3: Quiz')}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-[#191f30] hover:bg-[#2e3447] text-[#dce2fa] border border-[#2e3447] transition-colors"
          >
            <span className="material-symbols-outlined text-[#d0bcff] text-[16px]">quiz</span>
            <span className="text-[11px] font-semibold truncate">Quiz</span>
          </button>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            setIsModalOpen(true);
          }}
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#a078ff] via-[#6d3bd7] to-[#d0bcff] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(109,59,215,0.35)] active:translate-y-0.5 transition-all"
        >
          <span>Select Chapter 🚀</span>
          <span className="material-symbols-outlined text-[18px]">sports_esports</span>
        </button>
      </div>

      {/* Chapter Card 2: Family & Friends */}
      <div className="flex flex-col w-full rounded-2xl bg-[#191f30] p-4 border border-[#2e3447] shadow-sm">
        <div className="flex items-start justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#24293b] text-[#cbc3d7] text-[11px] font-bold">
              Chapter 2
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#24293b] text-[#7bd0ff] text-[11px] font-bold">
              3 Levels Ready
            </span>
          </div>
          <span className="material-symbols-outlined text-[#958ea0]/50 text-[18px]">lock_open</span>
        </div>

        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-13 h-13 rounded-xl bg-[#24293b] flex items-center justify-center text-[#7bd0ff] shrink-0 border border-[#33394b]">
            <span className="material-symbols-outlined text-[28px]">diversity_3</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="font-headline font-bold text-[16px] text-[#dce2fa] truncate">
              Family &amp; Friends
            </h2>
            <p className="text-[12px] text-[#cbc3d7]">
              Kinship terms, descriptions &amp; personalities
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            onOpenChapterGamesMenu();
          }}
          className="w-full h-11 rounded-full bg-[#24293b] hover:bg-[#2e3447] text-[#dce2fa] font-bold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-colors border border-[#33394b]"
        >
          <span>Select Chapter 🚀</span>
          <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">sports_esports</span>
        </button>
      </div>

      {/* Chapter Card 3: Daily Activities */}
      <div className="flex flex-col w-full rounded-2xl bg-[#191f30] p-4 border border-[#2e3447] shadow-sm">
        <div className="flex items-start justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#24293b] text-[#cbc3d7] text-[11px] font-bold">
              Chapter 3
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#24293b] text-[#7bd0ff] text-[11px] font-bold">
              3 Levels Ready
            </span>
          </div>
          <span className="material-symbols-outlined text-[#958ea0]/50 text-[18px]">lock_open</span>
        </div>

        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-13 h-13 rounded-xl bg-[#24293b] flex items-center justify-center text-[#f9bd22] shrink-0 border border-[#33394b]">
            <span className="material-symbols-outlined text-[28px]">routine</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="font-headline font-bold text-[16px] text-[#dce2fa] truncate">
              Daily Activities
            </h2>
            <p className="text-[12px] text-[#cbc3d7]">
              Verbs, morning routines, study &amp; chores
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            showToast('Loading Chapter 3 Arcade modules...');
          }}
          className="w-full h-11 rounded-full bg-[#24293b] hover:bg-[#2e3447] text-[#dce2fa] font-bold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-colors border border-[#33394b]"
        >
          <span>Select Chapter 🚀</span>
          <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">sports_esports</span>
        </button>
      </div>

      {/* Chapter Card 4: Animals & Nature */}
      <div className="flex flex-col w-full rounded-2xl bg-[#191f30] p-4 border border-[#2e3447] shadow-sm">
        <div className="flex items-start justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#24293b] text-[#cbc3d7] text-[11px] font-bold">
              Chapter 4
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#24293b] text-[#7bd0ff] text-[11px] font-bold">
              3 Levels Ready
            </span>
          </div>
          <span className="material-symbols-outlined text-[#958ea0]/50 text-[18px]">lock_open</span>
        </div>

        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-13 h-13 rounded-xl bg-[#24293b] flex items-center justify-center text-[#d0bcff] shrink-0 border border-[#33394b]">
            <span className="material-symbols-outlined text-[28px]">pets</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="font-headline font-bold text-[16px] text-[#dce2fa] truncate">
              Animals &amp; Nature
            </h2>
            <p className="text-[12px] text-[#cbc3d7]">
              Wildlife habitats, weather terms &amp; biodiversity
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            showToast('Loading Chapter 4 Arcade modules...');
          }}
          className="w-full h-11 rounded-full bg-[#24293b] hover:bg-[#2e3447] text-[#dce2fa] font-bold text-[14px] flex items-center justify-center gap-2 active:scale-95 transition-colors border border-[#33394b]"
        >
          <span>Select Chapter 🚀</span>
          <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">sports_esports</span>
        </button>
      </div>

      {/* Chapter 1 Levels Bottom Sheet Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-[#070e1e]/80 backdrop-blur-md flex flex-col justify-end p-4 pb-safe animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] mx-auto bg-[#24293b] rounded-3xl p-5 flex flex-col gap-3.5 border border-[#33394b] shadow-2xl animate-in slide-in-from-bottom duration-300"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#a078ff]/20 text-[#d0bcff] flex items-center justify-center border border-[#a078ff]/30 shadow-sm">
                  <span className="material-symbols-outlined text-[24px]">school</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#d0bcff] uppercase tracking-widest font-bold block">
                    Chapter 1 Missions
                  </span>
                  <h2 className="font-headline font-bold text-[17px] text-[#dce2fa]">
                    Things in the Classroom
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#191f30] flex items-center justify-center text-[#cbc3d7] hover:text-white"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-[13px] text-[#cbc3d7]">
              Select an interstellar arcade mode to begin vocabulary training:
            </p>

            {/* Level 1: Crossword */}
            <div
              onClick={() => handleLaunchLevel('crossword', 'Level 1: Classroom Crossword')}
              className="w-full rounded-2xl bg-[#191f30] hover:bg-[#2e3447] p-3.5 flex items-center justify-between border border-[#2e3447] shadow-sm active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00a6e0]/15 text-[#7bd0ff] flex items-center justify-center border border-[#00a6e0]/30">
                  <span className="material-symbols-outlined text-[20px]">grid_4x4</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#dce2fa]">Level 1 • Crossword</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#b88900]/25 text-[#f9bd22] border border-[#f9bd22]/30">
                      ★ 3/3
                    </span>
                  </div>
                  <span className="text-[12px] text-[#cbc3d7]">
                    Decode horizontal &amp; vertical clues
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#7bd0ff] text-[22px]">play_circle</span>
            </div>

            {/* Level 2: Unscramble */}
            <div
              onClick={() => handleLaunchLevel('unscramble', 'Level 2: Word Unscramble')}
              className="w-full rounded-2xl bg-[#191f30] hover:bg-[#2e3447] p-3.5 flex items-center justify-between border border-[#2e3447] shadow-sm active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f9bd22]/15 text-[#f9bd22] flex items-center justify-center border border-[#f9bd22]/30">
                  <span className="material-symbols-outlined text-[20px]">shuffle</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#dce2fa]">Level 2 • Unscramble</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#a078ff]/25 text-[#d0bcff] border border-[#a078ff]/30">
                      Ready
                    </span>
                  </div>
                  <span className="text-[12px] text-[#cbc3d7]">
                    Reassemble fractured letter asteroids
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#f9bd22] text-[22px]">play_circle</span>
            </div>

            {/* Level 3: Quiz */}
            <div
              onClick={() => handleLaunchLevel('quiz', 'Level 3: Master Quiz')}
              className="w-full rounded-2xl bg-[#191f30] hover:bg-[#2e3447] p-3.5 flex items-center justify-between border border-[#2e3447] shadow-sm active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#a078ff]/15 text-[#d0bcff] flex items-center justify-center border border-[#a078ff]/30">
                  <span className="material-symbols-outlined text-[20px]">quiz</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#dce2fa]">Level 3 • Quiz</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#2e3447] text-[#cbc3d7]">
                      Speedrun
                    </span>
                  </div>
                  <span className="text-[12px] text-[#cbc3d7]">Rapid fire multiple choice trials</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#d0bcff] text-[22px]">play_circle</span>
            </div>

            {/* Dismiss Sheet */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full h-11 rounded-full bg-[#191f30] hover:bg-[#2e3447] text-[#dce2fa] text-[13px] font-semibold border border-[#33394b] mt-1"
            >
              Close Missions
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#24293b] text-[#dce2fa] border border-[#7bd0ff]/40 shadow-[0_0_20px_rgba(56,189,248,0.3)] flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
          <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">rocket</span>
          <span className="text-[13px] font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
