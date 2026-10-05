import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface CrosswordScreenProps {
  currentXp: number;
  onUpdateXp: (newXp: number) => void;
  onBack: () => void;
  onComplete: () => void;
}

export const CrosswordScreen: React.FC<CrosswordScreenProps> = ({
  currentXp,
  onUpdateXp,
  onBack: _onBack,
  onComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'across' | 'down'>('all');
  const [timerSeconds, setTimerSeconds] = useState(260); // 04:20
  const [isSolved, setIsSolved] = useState(false);
  const [discoveredCount, setDiscoveredCount] = useState(3);

  // Form values state for editable cells
  const [cellValues, setCellValues] = useState<{ [key: string]: string }>({
    'pencil-n': '',
    'pencil-i': '',
    'book-o1': '',
    'book-o2': '',
    'teacher-a': '',
    'teacher-c': '',
    'teacher-e2': '',
    'chair-a': '',
    'chair-i': '',
    'chair-r': '',
    'eraser-r1': '',
    'eraser-a': '',
    'eraser-a2': '',
    'eraser-s': '',
    'eraser-e': '',
  });

  // Solutions map
  const solutions: { [key: string]: string } = {
    'pencil-n': 'N',
    'pencil-i': 'I',
    'book-o1': 'O',
    'book-o2': 'O',
    'teacher-a': 'A',
    'teacher-c': 'C',
    'teacher-e2': 'E',
    'chair-a': 'A',
    'chair-i': 'I',
    'chair-r': 'R',
    'eraser-r1': 'R',
    'eraser-a': 'A',
    'eraser-a2': 'A',
    'eraser-s': 'S',
    'eraser-e': 'E',
  };

  // Timer tick
  useEffect(() => {
    if (timerSeconds <= 0 || isSolved) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds, isSolved]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCellChange = (key: string, val: string) => {
    const letter = val.slice(-1).toUpperCase();
    setCellValues((prev) => ({ ...prev, [key]: letter }));
    sound.playTap();
  };

  const handleHint = () => {
    if (currentXp < 5) return;
    sound.playHint();
    onUpdateXp(currentXp - 5);

    // Find first unsolved cell
    for (const [k, v] of Object.entries(solutions)) {
      if (cellValues[k] !== v) {
        setCellValues((prev) => ({ ...prev, [k]: v }));
        break;
      }
    }
  };

  const handleCheckAnswer = () => {
    sound.playTap();
    // Check correctness
    let correct = true;
    for (const [k, v] of Object.entries(solutions)) {
      if (cellValues[k]?.toUpperCase() !== v) {
        correct = false;
        break;
      }
    }

    if (correct) {
      setIsSolved(true);
      setDiscoveredCount(5);
      sound.playVictory();
      onUpdateXp(currentXp + 50);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#a078ff', '#7bd0ff', '#f9bd22'],
        });
      } catch {
        // Confetti fallback
      }
    } else {
      sound.vibrate(40);
      alert('Cosmic Static! Some coordinates are still unsettled. Try using Hint or double check spelling!');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-24 gap-4 max-w-[500px] mx-auto select-none">
      {/* Top HUD Card */}
      <div className="flex items-center justify-between bg-[#191f30]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#2e3447] shadow-md mt-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#00a6e0]/15 text-[#7bd0ff] border border-[#00a6e0]/30">
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#cbc3d7] uppercase tracking-wider">
              Mission 01
            </span>
            <span className="font-headline font-bold text-[14px] text-[#dce2fa]">
              Classroom Nebula
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#24293b] px-2.5 py-1 rounded-full text-[#f9bd22] border border-[#33394b]">
            <span className="material-symbols-outlined text-[15px] fill-1">stars</span>
            <span className="text-[12px] font-bold text-[#f9bd22]">{currentXp} XP</span>
          </div>
          <div className="flex items-center gap-1 bg-[#24293b] px-2 py-1 rounded-full text-[#7bd0ff] border border-[#33394b]">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span className="text-[12px] font-mono">{formatTimer(timerSeconds)}</span>
          </div>
        </div>
      </div>

      {/* 7x8 Crossword Board Box */}
      <div className="relative w-full rounded-2xl bg-[#070e1e]/95 p-3 sm:p-4 flex flex-col items-center shadow-xl border border-[#2e3447] overflow-hidden">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#a078ff]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#00a6e0]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="w-full flex items-center justify-between pb-2 px-1">
          <span className="text-[11px] font-bold text-[#7bd0ff] flex items-center gap-1 uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">grid_4x4</span>
            7 × 8 Crossword Grid
          </span>
          <span className="text-[11px] font-bold text-[#f9bd22] bg-[#24293b] px-2.5 py-0.5 rounded-full border border-[#33394b]">
            {discoveredCount} / 5 Discovered
          </span>
        </div>

        {/* 8 columns x 7 rows grid */}
        <div className="grid grid-cols-8 gap-1.5 w-full max-w-[340px] aspect-[8/7] select-none py-1.5">
          {/* ROW 0 */}
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          {/* (0,3) #1 Down start: TEACHER -> 'T' */}
          <div className="relative w-full aspect-square bg-[#24293b] border border-[#7bd0ff]/40 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(123,208,255,0.25)]">
            <span className="absolute top-0.5 left-1 text-[9px] text-[#7bd0ff] font-bold">1</span>
            <span className="font-headline font-bold text-[17px] text-[#7bd0ff]">T</span>
          </div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>

          {/* ROW 1 */}
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          {/* (1,2) #2 Across start: PENCIL -> 'P' */}
          <div className="relative w-full aspect-square bg-[#24293b] border border-[#a078ff]/40 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(160,120,255,0.25)]">
            <span className="absolute top-0.5 left-1 text-[9px] text-[#7bd0ff] font-bold">2</span>
            <span className="font-headline font-bold text-[17px] text-[#d0bcff]">P</span>
          </div>
          {/* (1,3) Intersection TEACHER [E] & PENCIL [E] */}
          <div className="relative w-full aspect-square bg-[#a078ff]/25 border border-[#a078ff] rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(208,188,255,0.35)]">
            <span className="font-headline font-bold text-[17px] text-[#d0bcff]">E</span>
          </div>
          {/* (1,4) PENCIL [N] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['pencil-n']}
              onChange={(e) => handleCellChange('pencil-n', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          {/* (1,5) #4 Down start: BOOK [B] / PENCIL [C] */}
          <div className="relative w-full aspect-square bg-[#24293b] border border-[#7bd0ff]/40 rounded-lg flex items-center justify-center shadow-sm">
            <span className="absolute top-0.5 left-1 text-[9px] text-[#7bd0ff] font-bold">4</span>
            <span className="font-headline font-bold text-[17px] text-[#dce2fa]">C</span>
          </div>
          {/* (1,6) PENCIL [I] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['pencil-i']}
              onChange={(e) => handleCellChange('pencil-i', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          {/* (1,7) PENCIL [L] */}
          <div className="relative w-full aspect-square bg-[#24293b] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <span className="font-headline font-bold text-[17px] text-[#cbc3d7]">L</span>
          </div>

          {/* ROW 2 */}
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          {/* (2,3) TEACHER [A] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['teacher-a']}
              onChange={(e) => handleCellChange('teacher-a', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          <div className="w-full aspect-square"></div>
          {/* (2,5) BOOK [O] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['book-o1']}
              onChange={(e) => handleCellChange('book-o1', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>

          {/* ROW 3 */}
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          {/* (3,3) TEACHER [C] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['teacher-c']}
              onChange={(e) => handleCellChange('teacher-c', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          <div className="w-full aspect-square"></div>
          {/* (3,5) BOOK [O] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['book-o2']}
              onChange={(e) => handleCellChange('book-o2', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>

          {/* ROW 4 */}
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          {/* (4,2) #3 Across start: CHAIR [C] */}
          <div className="relative w-full aspect-square bg-[#24293b] border border-[#f9bd22]/40 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(249,189,34,0.2)]">
            <span className="absolute top-0.5 left-1 text-[9px] text-[#7bd0ff] font-bold">3</span>
            <span className="font-headline font-bold text-[17px] text-[#f9bd22]">C</span>
          </div>
          {/* (4,3) Intersection TEACHER [H] & CHAIR [H] */}
          <div className="relative w-full aspect-square bg-[#a078ff]/25 border border-[#a078ff] rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(208,188,255,0.35)]">
            <span className="font-headline font-bold text-[17px] text-[#d0bcff]">H</span>
          </div>
          {/* (4,4) CHAIR [A] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['chair-a']}
              onChange={(e) => handleCellChange('chair-a', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          {/* (4,5) BOOK [K] / CHAIR [I] */}
          <div className="relative w-full aspect-square bg-[#a078ff]/20 border border-[#a078ff]/50 rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['chair-i']}
              onChange={(e) => handleCellChange('chair-i', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          {/* (4,6) CHAIR [R] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['chair-r']}
              onChange={(e) => handleCellChange('chair-r', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          <div className="w-full aspect-square"></div>

          {/* ROW 5 */}
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          {/* (5,3) TEACHER [E] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['teacher-e2']}
              onChange={(e) => handleCellChange('teacher-e2', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>
          <div className="w-full aspect-square"></div>

          {/* ROW 6 */}
          {/* (6,0) #5 start: ERASER [E] */}
          <div className="relative w-full aspect-square bg-[#24293b] border border-[#f9bd22]/40 rounded-lg flex items-center justify-center shadow-sm">
            <span className="absolute top-0.5 left-1 text-[9px] text-[#7bd0ff] font-bold">5</span>
            <span className="font-headline font-bold text-[17px] text-[#f9bd22]">E</span>
          </div>
          {/* (6,1) ERASER [R] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['eraser-r1']}
              onChange={(e) => handleCellChange('eraser-r1', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          {/* (6,2) ERASER [A] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['eraser-a']}
              onChange={(e) => handleCellChange('eraser-a', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          {/* (6,3) TEACHER [R] */}
          <div className="relative w-full aspect-square bg-[#a078ff]/25 border border-[#a078ff] rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(208,188,255,0.35)]">
            <span className="absolute top-0.5 left-1 text-[9px] text-[#d0bcff] font-bold">1</span>
            <span className="font-headline font-bold text-[17px] text-[#d0bcff]">R</span>
          </div>
          {/* (6,4) ERASER [A] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['eraser-a2']}
              onChange={(e) => handleCellChange('eraser-a2', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          {/* (6,5) ERASER [S] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['eraser-s']}
              onChange={(e) => handleCellChange('eraser-s', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          {/* (6,6) ERASER [E] */}
          <div className="relative w-full aspect-square bg-[#191f30] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <input
              type="text"
              maxLength={1}
              value={cellValues['eraser-e']}
              onChange={(e) => handleCellChange('eraser-e', e.target.value)}
              placeholder="•"
              className="w-full h-full text-center bg-transparent font-headline font-bold text-[16px] text-[#dce2fa] uppercase focus:bg-[#24293b] focus:text-[#7bd0ff] focus:outline-none rounded-lg"
            />
          </div>
          {/* (6,7) ERASER [R] */}
          <div className="relative w-full aspect-square bg-[#24293b] border border-[#2e3447] rounded-lg flex items-center justify-center">
            <span className="font-headline font-bold text-[17px] text-[#cbc3d7]">R</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 text-[12px] text-[#cbc3d7]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#a078ff]"></span>
            Intersecting Stars
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#24293b]"></span>
            Active Cosmic Cells
          </span>
        </div>
      </div>

      {/* Clues Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">explore</span>
            <h2 className="font-headline font-bold text-[16px] text-[#dce2fa]">5 Cosmic Clues</h2>
          </div>
          <span className="text-[11px] font-bold text-[#7bd0ff] bg-[#24293b] px-2.5 py-0.5 rounded-full border border-[#33394b]">
            Standard Level
          </span>
        </div>

        {/* Segmented Control */}
        <div className="flex rounded-full bg-[#191f30] p-1 border border-[#2e3447]">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 rounded-full text-center text-[12px] font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-[#a078ff] text-white shadow-sm'
                : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            All Clues (5)
          </button>
          <button
            onClick={() => setActiveTab('across')}
            className={`flex-1 py-1.5 rounded-full text-center text-[12px] font-bold transition-all ${
              activeTab === 'across'
                ? 'bg-[#a078ff] text-white shadow-sm'
                : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            Across (3)
          </button>
          <button
            onClick={() => setActiveTab('down')}
            className={`flex-1 py-1.5 rounded-full text-center text-[12px] font-bold transition-all ${
              activeTab === 'down'
                ? 'bg-[#a078ff] text-white shadow-sm'
                : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            Down (2)
          </button>
        </div>

        {/* Clues Cards List */}
        <div className="flex flex-col gap-2">
          {/* Clue 2: Across */}
          {(activeTab === 'all' || activeTab === 'across') && (
            <div className="p-3 rounded-xl bg-[#151b2c] border border-[#2e3447] flex items-start gap-3 shadow-sm">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#00a6e0]/15 text-[#7bd0ff] flex items-center justify-center font-bold text-[12px] border border-[#00a6e0]/30">
                2
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-wider">
                    Across • 6 Letters
                  </span>
                  <span className="text-[11px] font-semibold text-[#f9bd22]">Hint: P _ N C I L</span>
                </div>
                <p className="text-[13px] text-[#dce2fa] mt-0.5">
                  Something students use for writing or sketching.
                </p>
              </div>
            </div>
          )}

          {/* Clue 3: Across */}
          {(activeTab === 'all' || activeTab === 'across') && (
            <div className="p-3 rounded-xl bg-[#151b2c] border border-[#2e3447] flex items-start gap-3 shadow-sm">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#00a6e0]/15 text-[#7bd0ff] flex items-center justify-center font-bold text-[12px] border border-[#00a6e0]/30">
                3
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-wider">
                    Across • 5 Letters
                  </span>
                  <span className="text-[11px] font-semibold text-[#f9bd22]">Hint: C H _ _ R</span>
                </div>
                <p className="text-[13px] text-[#dce2fa] mt-0.5">
                  A piece of furniture to sit comfortably on in class.
                </p>
              </div>
            </div>
          )}

          {/* Clue 5: Across */}
          {(activeTab === 'all' || activeTab === 'across') && (
            <div className="p-3 rounded-xl bg-[#151b2c] border border-[#2e3447] flex items-start gap-3 shadow-sm">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#00a6e0]/15 text-[#7bd0ff] flex items-center justify-center font-bold text-[12px] border border-[#00a6e0]/30">
                5
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-wider">
                    Across • 6 Letters
                  </span>
                  <span className="text-[11px] font-semibold text-[#f9bd22]">Hint: E _ A S E R</span>
                </div>
                <p className="text-[13px] text-[#dce2fa] mt-0.5">
                  Used by learners to remove pencil mistakes cleanly.
                </p>
              </div>
            </div>
          )}

          {/* Clue 1: Down */}
          {(activeTab === 'all' || activeTab === 'down') && (
            <div className="p-3 rounded-xl bg-[#151b2c] border border-[#2e3447] flex items-start gap-3 shadow-sm">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#a078ff]/20 text-[#d0bcff] flex items-center justify-center font-bold text-[12px] border border-[#a078ff]/30">
                1
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#d0bcff] uppercase tracking-wider">
                    Down • 7 Letters
                  </span>
                  <span className="text-[11px] font-semibold text-[#f9bd22]">Hint: T _ _ _ H E R</span>
                </div>
                <p className="text-[13px] text-[#dce2fa] mt-0.5">
                  A guiding star who teaches students in the classroom.
                </p>
              </div>
            </div>
          )}

          {/* Clue 4: Down */}
          {(activeTab === 'all' || activeTab === 'down') && (
            <div className="p-3 rounded-xl bg-[#151b2c] border border-[#2e3447] flex items-start gap-3 shadow-sm">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#a078ff]/20 text-[#d0bcff] flex items-center justify-center font-bold text-[12px] border border-[#a078ff]/30">
                4
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#d0bcff] uppercase tracking-wider">
                    Down • 4 Letters
                  </span>
                  <span className="text-[11px] font-semibold text-[#f9bd22]">Hint: B _ _ K</span>
                </div>
                <p className="text-[13px] text-[#dce2fa] mt-0.5">
                  Pages bound together to read stories or take notes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Feedback Banner */}
      {isSolved && (
        <div className="p-4 rounded-2xl bg-[#24293b] border border-[#00a6e0]/50 flex items-center gap-3 animate-in zoom-in-95 duration-300">
          <div className="w-10 h-10 rounded-full bg-[#00a6e0] flex items-center justify-center text-[#00354a] shrink-0">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-bold text-[16px] text-[#7bd0ff]">
              Constellation Aligned!
            </span>
            <span className="text-[12px] text-[#cbc3d7]">
              All 5 classroom words solved correctly. +50 XP Awarded!
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 pt-1">
        <button
          onClick={handleHint}
          disabled={currentXp < 5 || isSolved}
          className="h-14 px-4 rounded-full bg-[#24293b] hover:bg-[#33394b] disabled:opacity-50 text-[#f9bd22] flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md flex-shrink-0 border border-[#33394b]"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px] fill-1">lightbulb</span>
          <span className="text-[13px] font-bold">Hint (-5 XP)</span>
        </button>

        {isSolved ? (
          <button
            onClick={() => {
              sound.playTap();
              onComplete();
            }}
            className="flex-1 h-14 rounded-full bg-gradient-to-r from-[#00a6e0] to-[#7bd0ff] text-[#00354a] font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
            type="button"
          >
            <span>Proceed to Next Mission</span>
            <span className="material-symbols-outlined text-[20px]">stars</span>
          </button>
        ) : (
          <button
            onClick={handleCheckAnswer}
            className="flex-1 h-14 rounded-full bg-gradient-to-r from-[#a078ff] to-[#6d3bd7] text-white font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
            type="button"
          >
            <span>Check Answer</span>
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
          </button>
        )}
      </div>
    </div>
  );
};
