import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ASSETS } from '../data/chaptersData';
import { sound } from '../utils/audio';

interface QuizResultScreenProps {
  score?: number;
  total?: number;
  durationSec?: number;
  onPlayAgain: () => void;
  onBackToChapter: () => void;
  onGoHome: () => void;
}

export const QuizResultScreen: React.FC<QuizResultScreenProps> = ({
  score = 4,
  total = 5,
  durationSec = 105,
  onPlayAgain,
  onBackToChapter,
  onGoHome,
}) => {
  const accuracy = Math.round((score / total) * 100);
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;
  const durationText = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

  useEffect(() => {
    sound.playVictory();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#f9bd22', '#7bd0ff', '#a078ff', '#ffdf9f'],
      });
    } catch {
      // Ignored
    }
  }, []);

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-24 max-w-[500px] mx-auto select-none">
      {/* Celebration Cosmic Visual & Header */}
      <section className="flex flex-col items-center text-center mt-3 mb-4 relative">
        <div className="relative w-44 h-44 flex items-center justify-center mb-2">
          {/* Ambient Glow Behind Character */}
          <div className="absolute inset-0 bg-[#a078ff]/25 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute w-32 h-32 bg-[#00a6e0]/20 rounded-full blur-xl pointer-events-none"></div>

          {/* Mascot Art */}
          <img
            src={ASSETS.celebrationMascot}
            alt="Celebrating Astronaut Mascot"
            className="relative z-10 w-36 h-36 object-contain rounded-full shadow-2xl border-2 border-[#7bd0ff]/40"
          />

          {/* Orbiting Gamified Badges */}
          <div className="absolute top-2 right-2 bg-[#24293b]/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md border border-[#33394b] z-20">
            <span className="material-symbols-outlined text-[15px] text-[#f9bd22] fill-1">hotel_class</span>
            <span className="text-[10px] text-[#ffdf9f] font-bold tracking-wider">CLEAR!</span>
          </div>

          <div className="absolute bottom-2 left-2 bg-[#24293b]/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md border border-[#33394b] z-20">
            <span className="material-symbols-outlined text-[15px] text-[#7bd0ff]">rocket_launch</span>
            <span className="text-[10px] text-[#7bd0ff] font-bold">LVL UP</span>
          </div>
        </div>

        {/* Celebration Typography */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24293b] text-[#f9bd22] text-[11px] font-bold border border-[#33394b] mb-1">
          <span className="material-symbols-outlined text-[14px] fill-1">stars</span>
          <span>MISSION ACCOMPLISHED</span>
        </div>

        <h2 className="font-headline font-bold text-[28px] text-[#dce2fa] tracking-tight mb-0.5">
          Great Job! 🎉
        </h2>
        <p className="text-[14px] text-[#cbc3d7]">
          Chapter 1 Mission Completed!
        </p>
      </section>

      {/* Big Glowing Scorecard */}
      <section className="relative w-full rounded-2xl bg-[#191f30] p-5 mb-4 shadow-xl border border-[#2e3447] overflow-hidden">
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#a078ff]/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#00a6e0]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Accuracy Radial Meter */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-[#2e3447]"
                cx="50"
                cy="50"
                fill="none"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
              ></circle>
              <circle
                className="text-[#7bd0ff]"
                cx="50"
                cy="50"
                fill="none"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * accuracy) / 100}
                strokeLinecap="round"
              ></circle>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="font-headline font-bold text-[24px] text-[#dce2fa] leading-none">
                {accuracy}%
              </span>
              <span className="text-[10px] text-[#cbc3d7] uppercase tracking-wider mt-0.5">
                Accuracy
              </span>
            </div>
          </div>

          {/* Main Score Text */}
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-[16px] text-[#cbc3d7]">Score:</span>
            <span className="font-headline font-bold text-[28px] text-[#d0bcff]">
              {score}
            </span>
            <span className="text-[16px] text-[#cbc3d7]">/ {total}</span>
          </div>

          {/* XP Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24293b] text-[#ffdf9f] border border-[#f9bd22]/40 shadow-inner">
            <span className="material-symbols-outlined text-[17px] text-[#f9bd22] fill-1">star</span>
            <span className="text-[13px] font-bold text-[#ffdf9f]">+120 Cosmic XP Earned 🌟</span>
          </div>
        </div>
      </section>

      {/* Flight Telemetry Breakdown */}
      <section className="w-full mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="font-headline font-bold text-[15px] text-[#dce2fa] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#7bd0ff]">explore</span>
            <span>Flight Telemetry</span>
          </h3>
          <span className="text-[11px] text-[#cbc3d7] uppercase tracking-wider font-semibold">
            SMP CLASS 7
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Correct Answers */}
          <div className="bg-[#151b2c] border border-[#2e3447] rounded-xl p-3 flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-[#191f30] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[17px] text-[#7bd0ff] fill-1">
                check_circle
              </span>
            </div>
            <span className="font-headline font-bold text-[17px] text-[#dce2fa]">{score}</span>
            <span className="text-[11px] text-[#cbc3d7]">Correct</span>
          </div>

          {/* Hints Used */}
          <div className="bg-[#151b2c] border border-[#2e3447] rounded-xl p-3 flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-[#191f30] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[17px] text-[#f9bd22] fill-1">
                lightbulb
              </span>
            </div>
            <span className="font-headline font-bold text-[17px] text-[#dce2fa]">1</span>
            <span className="text-[11px] text-[#cbc3d7]">Hint Used</span>
          </div>

          {/* Time Duration */}
          <div className="bg-[#151b2c] border border-[#2e3447] rounded-xl p-3 flex flex-col items-center text-center">
            <div className="w-7 h-7 rounded-full bg-[#191f30] flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-[17px] text-[#d0bcff] fill-1">
                timer
              </span>
            </div>
            <span className="font-headline font-bold text-[17px] text-[#dce2fa] truncate">
              {durationText}
            </span>
            <span className="text-[11px] text-[#cbc3d7]">Duration</span>
          </div>
        </div>
      </section>

      {/* Graduation Badge Banner */}
      <section className="w-full bg-[#24293b] border border-[#2e3447] rounded-2xl p-3.5 mb-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-[#2e3447] flex-shrink-0 flex items-center justify-center border border-[#33394b]">
          <span className="material-symbols-outlined text-[24px] text-[#f9bd22] fill-1">
            workspace_premium
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-headline font-bold text-[14px] text-[#dce2fa] truncate">
            Galaxy Cadet Badge Unlocked
          </h4>
          <p className="text-[12px] text-[#cbc3d7] truncate">
            Solar System Vocab Master • 9/10 mastered
          </p>
        </div>
        <span className="material-symbols-outlined text-[18px] text-[#cbc3d7] flex-shrink-0">
          chevron_right
        </span>
      </section>

      {/* Action Buttons */}
      <nav aria-label="Post-quiz navigation" className="flex flex-col gap-2.5 w-full mt-auto">
        <button
          onClick={() => {
            sound.playTap();
            sound.vibrate(30);
            onPlayAgain();
          }}
          type="button"
          className="w-full h-13 rounded-full bg-[#24293b] hover:bg-[#2e3447] text-[#7bd0ff] font-bold text-[14px] flex items-center justify-center gap-2 border border-[#33394b] shadow-md active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">replay</span>
          <span>Play Again 🔄</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            onBackToChapter();
          }}
          type="button"
          className="w-full h-13 rounded-full bg-[#191f30] hover:bg-[#24293b] text-[#dce2fa] font-bold text-[14px] flex items-center justify-center gap-2 border border-[#2e3447] shadow-md active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[18px] text-[#d0bcff]">auto_stories</span>
          <span>Back to Chapter 📚</span>
        </button>

        <button
          onClick={() => {
            sound.playTap();
            onGoHome();
          }}
          type="button"
          className="w-full h-13 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-xl shadow-[#a078ff]/20 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[18px] fill-1">home</span>
          <span>Home 🏠</span>
        </button>
      </nav>
    </div>
  );
};
