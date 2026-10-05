import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, ASSETS } from '../data/chaptersData';
import { sound, speakWord } from '../utils/audio';

interface QuizScreenProps {
  onBack: () => void;
  onQuizComplete: (score: number, total: number, timeSpentSec: number) => void;
  onUpdateXp: (xpDelta: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  onBack,
  onQuizComplete,
  onUpdateXp,
}) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(25);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);

  const currentQ = QUIZ_QUESTIONS[questionIdx];
  const selectedKey = selectedAnswers[currentQ.id];

  // Timer countdown
  useEffect(() => {
    setTimeLeft(25);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
      setTotalElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [questionIdx]);

  const handleSelectOption = (key: string) => {
    sound.playTap();
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
    if (key === currentQ.correctKey) {
      sound.playCorrect();
    }
  };

  const handleNext = () => {
    sound.playTap();
    if (questionIdx < QUIZ_QUESTIONS.length - 1) {
      setQuestionIdx((prev) => prev + 1);
    } else {
      // Calculate score
      let score = 0;
      QUIZ_QUESTIONS.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctKey) {
          score += 1;
        }
      });
      onUpdateXp(120);
      onQuizComplete(score, QUIZ_QUESTIONS.length, totalElapsedTime || 105);
    }
  };

  const handlePrev = () => {
    if (questionIdx > 0) {
      sound.playTap();
      setQuestionIdx((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-24 gap-3.5 max-w-[500px] mx-auto select-none">
      {/* Progress Header & Mission HUD */}
      <div className="flex flex-col gap-1.5 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#7bd0ff] animate-pulse"></span>
            <span className="text-[12px] font-bold text-[#7bd0ff] tracking-wider uppercase">
              {currentQ.mission}
            </span>
          </div>
          <span className="text-[12px] font-semibold text-[#cbc3d7]">
            Question {questionIdx + 1} of {QUIZ_QUESTIONS.length}
          </span>
        </div>

        {/* Segmented Cosmic Progress Bar */}
        <div className="grid grid-cols-5 gap-1.5 w-full pt-1">
          {QUIZ_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i <= questionIdx
                  ? 'bg-gradient-to-r from-[#d0bcff] to-[#7bd0ff] shadow-[0_0_10px_rgba(208,188,255,0.7)]'
                  : 'bg-[#24293b]'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Cosmic Mission Timer & Rewards Pill */}
      <div className="flex items-center justify-between py-0.5">
        <div className="flex items-center gap-1.5 bg-[#24293b]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#33394b] shadow-sm">
          <span className="material-symbols-outlined text-[17px] text-[#7bd0ff] fill-1">timer</span>
          <span className="text-[12px] text-[#dce2fa] font-mono tracking-tight font-bold">
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#b88900]/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#f9bd22]/30 shadow-[0_0_12px_rgba(249,189,34,0.2)]">
          <span className="material-symbols-outlined text-[17px] text-[#f9bd22] fill-1">stars</span>
          <span className="text-[12px] text-[#ffdf9f] font-bold tracking-tight">+10 Star XP</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="relative bg-[#191f30]/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#2e3447] overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#a078ff]/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-[#00a6e0]/15 rounded-full blur-xl pointer-events-none"></div>

        {/* Category & Direction Badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2e3447]/90 text-[#7bd0ff] text-[11px] font-bold border border-[#7bd0ff]/30">
            <span className="material-symbols-outlined text-[14px]">school</span>
            {currentQ.category}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#24293b] text-[#cbc3d7] text-[11px] font-medium border border-[#33394b]">
            <span className="material-symbols-outlined text-[14px] text-[#d0bcff]">translate</span>
            {currentQ.direction}
          </span>
        </div>

        {/* Question Subject */}
        <div className="relative z-10 pt-1">
          <p className="font-headline font-bold text-[19px] sm:text-[21px] text-[#dce2fa] tracking-tight leading-snug">
            {currentQ.questionText}{' '}
            <span className="text-[#7bd0ff] inline-block underline decoration-[#7bd0ff]/40 underline-offset-4">
              {currentQ.highlightWord}
            </span>
            ?
          </p>
          <p className="text-[12px] text-[#cbc3d7] mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#d0bcff]">tips_and_updates</span>
            Select the correct stellar coordinate match.
          </p>
        </div>

        {/* Companion Vocab Illustration Snippet */}
        <div className="relative z-10 mt-3.5 h-22 rounded-xl overflow-hidden bg-[#070e1e] border border-[#2e3447] flex items-center justify-between px-3.5">
          <img
            src={ASSETS.hologramBook}
            alt="Vocabulary Target"
            className="w-14 h-14 object-contain rounded-lg shadow-sm"
          />
          <div className="flex-1 pl-3 pr-2 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-[10px] uppercase tracking-wider text-[#d0bcff] font-bold">
                {currentQ.vocabTarget}
              </span>
              <span className="material-symbols-outlined text-[#d0bcff] text-[12px]">auto_awesome</span>
            </div>
            <p className="text-[12px] text-[#dce2fa] truncate">{currentQ.vocabSub}</p>
          </div>
          <button
            onClick={() => {
              sound.playTap();
              speakWord(
                currentQ.options.find((o) => o.key === currentQ.correctKey)?.label || 'Book'
              );
            }}
            aria-label="Play native pronunciation"
            className="w-9 h-9 rounded-full bg-[#24293b] hover:bg-[#2e3447] flex items-center justify-center text-[#7bd0ff] transition-all active:scale-95 shrink-0 border border-[#33394b]"
          >
            <span className="material-symbols-outlined text-[18px]">volume_up</span>
          </button>
        </div>
      </div>

      {/* 4-Choice Option Grid */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt) => {
          const isSelected = selectedKey === opt.key;
          const isCorrect = isSelected && opt.key === currentQ.correctKey;

          return (
            <div
              key={opt.key}
              onClick={() => handleSelectOption(opt.key)}
              className={`relative flex items-center justify-between w-full p-3.5 rounded-2xl cursor-pointer transition-all active:scale-[0.99] select-none border ${
                isSelected
                  ? 'bg-[#24293b] border-[#7bd0ff] shadow-[0_0_20px_rgba(123,208,255,0.25)]'
                  : 'bg-[#151b2c] hover:bg-[#191f30] border-[#2e3447]'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-headline font-bold text-[14px] transition-colors ${
                    isSelected
                      ? 'bg-[#a078ff] text-white shadow-[0_0_8px_rgba(160,120,255,0.8)]'
                      : 'bg-[#24293b] text-[#cbc3d7]'
                  }`}
                >
                  {opt.key}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[15px] font-bold text-[#dce2fa] truncate">
                    {opt.label}
                  </span>
                  {isSelected && opt.phonetic && (
                    <span className="text-[11px] text-[#7bd0ff] font-medium">
                      {opt.phonetic}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? isCorrect
                      ? 'bg-[#7bd0ff] text-[#00354a] shadow-[0_0_10px_rgba(123,208,255,0.8)]'
                      : 'bg-[#a078ff] text-white'
                    : 'bg-[#24293b] border border-[#33394b]'
                }`}
              >
                {isSelected && (
                  <span className="material-symbols-outlined text-[17px] font-bold">check</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mascot Astro-Cadet Kibo Hint Card */}
      <div className="flex items-center gap-3 bg-[#151b2c]/90 border border-[#2e3447] rounded-xl p-3 shadow-sm">
        <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden bg-[#a078ff]/20 flex items-center justify-center border border-[#7bd0ff]/40 shadow-inner">
          <img
            src={ASSETS.cadetKibo}
            alt="Astro-Cadet Kibo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-[#d0bcff] font-bold uppercase tracking-wider">
            Astro-Cadet Kibo
          </p>
          <p className="text-[12px] text-[#cbc3d7] truncate">
            "{currentQ.explanation}"
          </p>
        </div>
        <span className="material-symbols-outlined text-[#f9bd22] text-[18px] animate-bounce fill-1">
          electric_bolt
        </span>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="pt-1 flex items-center gap-2.5 w-full">
        <button
          onClick={handlePrev}
          className="h-14 px-5 rounded-full bg-[#24293b] text-[#dce2fa] hover:bg-[#2e3447] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm text-[14px] font-bold border border-[#33394b] shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          className="flex-1 h-14 rounded-full bg-gradient-to-r from-[#a078ff] via-[#6d3bd7] to-[#a078ff] text-white hover:opacity-95 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_0_rgba(160,120,255,0.45)] text-[15px] font-bold tracking-wide"
        >
          <span>{questionIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
