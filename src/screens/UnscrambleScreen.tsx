import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { UNSCRAMBLE_WORDS } from '../data/chaptersData';
import { sound } from '../utils/audio';

interface UnscrambleScreenProps {
  currentXp: number;
  onUpdateXp: (newXp: number) => void;
  onBack: () => void;
  onComplete: () => void;
}

interface LetterTile {
  id: string;
  letter: string;
  used: boolean;
}

export const UnscrambleScreen: React.FC<UnscrambleScreenProps> = ({
  currentXp,
  onUpdateXp,
  onBack: _onBack,
  onComplete,
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentWordData = UNSCRAMBLE_WORDS[questionIndex];
  const targetWord = currentWordData.word;

  // Initialize scrambled tiles
  const [tiles, setTiles] = useState<LetterTile[]>(() => {
    return targetWord
      .split('')
      .map((ch, idx) => ({ id: `tile-${idx}`, letter: ch, used: false }))
      .sort(() => Math.random() - 0.5);
  });

  const [placedSlots, setPlacedSlots] = useState<{ id: string; letter: string }[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // When questionIndex changes, reset state
  const loadQuestion = (index: number) => {
    const wordData = UNSCRAMBLE_WORDS[index];
    const newTiles = wordData.word
      .split('')
      .map((ch, idx) => ({ id: `tile-${idx}-${Date.now()}`, letter: ch, used: false }))
      .sort(() => Math.random() - 0.5);
    setTiles(newTiles);
    setPlacedSlots([]);
    setFeedback(null);
  };

  const handleTileClick = (tile: LetterTile) => {
    if (tile.used || placedSlots.length >= targetWord.length) return;
    sound.playTap();

    setPlacedSlots((prev) => [...prev, { id: tile.id, letter: tile.letter }]);
    setTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, used: true } : t))
    );
  };

  const handleSlotClick = (index: number) => {
    const item = placedSlots[index];
    if (!item) return;
    sound.playTap();

    setPlacedSlots((prev) => prev.filter((_, i) => i !== index));
    setTiles((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, used: false } : t))
    );
  };

  const handleClear = () => {
    sound.playTap();
    setPlacedSlots([]);
    setTiles((prev) => prev.map((t) => ({ ...t, used: false })));
    setFeedback(null);
  };

  const handleShuffle = () => {
    sound.playTap();
    setTiles((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleCheck = () => {
    sound.playTap();
    const currentWord = placedSlots.map((s) => s.letter).join('');
    if (currentWord.length < targetWord.length) {
      setFeedback({
        type: 'info',
        message: `Keep going! Complete all ${targetWord.length} slots first.`,
      });
      return;
    }

    if (currentWord === targetWord) {
      sound.playCorrect();
      onUpdateXp(currentXp + 50);
      setFeedback({
        type: 'success',
        message: `Stellar Work! "${targetWord}" is correct (+50 XP)`,
      });
      try {
        confetti({
          particleCount: 60,
          spread: 55,
          origin: { y: 0.7 },
          colors: ['#7bd0ff', '#a078ff', '#f9bd22'],
        });
      } catch {
        // Fallback
      }
    } else {
      sound.vibrate(40);
      setFeedback({
        type: 'error',
        message: 'Cosmic Static! Not quite right, try shuffling.',
      });
    }
  };

  const handleNext = () => {
    sound.playTap();
    if (questionIndex < UNSCRAMBLE_WORDS.length - 1) {
      const nextIdx = questionIndex + 1;
      setQuestionIndex(nextIdx);
      loadQuestion(nextIdx);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-24 gap-3.5 max-w-[500px] mx-auto select-none">
      {/* Top Header Progress */}
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-[#191f30] px-3 py-1.5 rounded-full border border-[#2e3447]">
            <span className="material-symbols-outlined text-[#f9bd22] text-[18px] fill-1">stars</span>
            <span className="text-[12px] font-bold text-[#f9bd22]">Mission 02</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#cbc3d7] text-[12px] font-semibold">
            <span className="material-symbols-outlined text-[16px] text-[#7bd0ff]">orbit</span>
            <span>Question {questionIndex + 1} of {UNSCRAMBLE_WORDS.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#191f30] rounded-full h-2.5 overflow-hidden p-0.5 border border-[#2e3447]">
          <div
            className="h-full bg-gradient-to-r from-[#00a6e0] via-[#a078ff] to-[#d0bcff] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(208,188,255,0.5)]"
            style={{ width: `${((questionIndex + 1) / UNSCRAMBLE_WORDS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Clue Prompt Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#24293b] p-4 shadow-lg border border-[#2e3447]">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#a078ff]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#2e3447] flex items-center justify-center text-[#7bd0ff] shrink-0 border border-[#33394b] shadow-inner">
            <span className="material-symbols-outlined text-[22px]">school</span>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-wider">
              {currentWordData.category}
            </span>
            <p className="font-headline font-bold text-[16px] text-[#dce2fa] leading-snug">
              Arrange the letters into the correct English classroom word
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 bg-[#070e1e]/70 backdrop-blur-md rounded-xl p-2.5 border border-[#2e3447]/60">
          <span className="material-symbols-outlined text-[#f9bd22] text-[18px] shrink-0 fill-1">
            lightbulb
          </span>
          <p className="text-[12px] text-[#cbc3d7] italic truncate">
            "{currentWordData.hint}"
          </p>
        </div>
      </div>

      {/* Target Decryption Slot */}
      <div className="rounded-2xl bg-[#191f30] p-4 flex flex-col items-center gap-3.5 shadow-md border border-[#2e3447]">
        <div className="w-full flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#cbc3d7] uppercase tracking-wider">
            Target Decryption Slot
          </span>
          <span className="text-[12px] text-[#7bd0ff] font-bold">
            {placedSlots.length} / {targetWord.length} Letters
          </span>
        </div>

        {/* Slot Boxes */}
        <div className="w-full flex justify-center items-center gap-1.5 sm:gap-2 min-h-[58px] py-1 px-1 overflow-x-auto">
          {Array.from({ length: targetWord.length }).map((_, idx) => {
            const placed = placedSlots[idx];
            return (
              <div
                key={idx}
                onClick={() => handleSlotClick(idx)}
                className={`w-10 h-12 sm:w-11 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer border ${
                  placed
                    ? 'bg-[#24293b] border-[#a078ff] shadow-inner scale-100'
                    : 'bg-[#070e1e] border-[#2e3447]/70'
                }`}
              >
                <span className="font-headline font-bold text-[18px] sm:text-[20px] text-[#d0bcff]">
                  {placed ? placed.letter : ''}
                </span>
              </div>
            );
          })}
        </div>

        {/* Shuffle and Clear */}
        <div className="flex items-center gap-2.5 w-full pt-1">
          <button
            onClick={handleShuffle}
            className="flex-1 h-10 rounded-full bg-[#24293b] hover:bg-[#33394b] active:scale-95 text-[#dce2fa] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all border border-[#33394b]"
          >
            <span className="material-symbols-outlined text-[17px] text-[#f9bd22]">shuffle</span>
            <span>Shuffle</span>
          </button>
          <button
            onClick={handleClear}
            className="flex-1 h-10 rounded-full bg-[#24293b] hover:bg-[#33394b] active:scale-95 text-[#cbc3d7] hover:text-[#dce2fa] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all border border-[#33394b]"
          >
            <span className="material-symbols-outlined text-[17px]">backspace</span>
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Scrambled Cosmic Crystals (Tile Bank) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-[#958ea0] uppercase tracking-wider">
            Scrambled Cosmic Crystals
          </span>
          <span className="text-[11px] text-[#958ea0]">Tap to deposit</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#151b2c] border border-[#2e3447] min-h-[92px]">
          {tiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => handleTileClick(tile)}
              disabled={tile.used}
              className={`w-11 h-12 sm:w-12 sm:h-14 rounded-xl flex items-center justify-center font-headline font-bold text-[18px] sm:text-[20px] transition-all transform shadow-md ${
                tile.used
                  ? 'opacity-20 pointer-events-none scale-90 bg-[#24293b] text-[#958ea0]'
                  : 'bg-[#24293b] text-[#d0bcff] hover:bg-[#d0bcff] hover:text-[#3c0091] active:scale-90 border border-[#33394b]'
              }`}
            >
              {tile.letter}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3 rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold border transition-all animate-in zoom-in-95 ${
            feedback.type === 'success'
              ? 'bg-[#00a6e0]/20 text-[#7bd0ff] border-[#00a6e0]/40'
              : feedback.type === 'error'
              ? 'bg-[#93000a]/20 text-[#ffb4ab] border-[#ffb4ab]/40'
              : 'bg-[#24293b] text-[#cbc3d7] border-[#33394b]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {feedback.type === 'success' ? 'task_alt' : feedback.type === 'error' ? 'error' : 'help'}
          </span>
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 mt-auto pt-1">
        <button
          onClick={handleCheck}
          className="w-full h-13 rounded-full bg-[#24293b] hover:bg-[#33394b] text-[#7bd0ff] active:scale-[0.98] font-bold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all border border-[#33394b]"
        >
          <span className="material-symbols-outlined text-[20px]">verified</span>
          <span>Check Answer</span>
        </button>

        <button
          onClick={handleNext}
          className="w-full h-13 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white hover:opacity-95 active:scale-[0.98] font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(160,120,255,0.35)] transition-all"
        >
          <span>{questionIndex < UNSCRAMBLE_WORDS.length - 1 ? 'Next Question' : 'Finish Mission'}</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
