import React, { useState } from 'react';
import { CHAPTER_1_VOCAB } from '../data/chaptersData';
import { sound, speakWord } from '../utils/audio';

interface LessonDetailScreenProps {
  onBack: () => void;
  onGoToGames?: () => void;
}

export const LessonDetailScreen: React.FC<LessonDetailScreenProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [speakingWordId, setSpeakingWordId] = useState<string | null>(null);

  const handleSpeak = (word: string, id: string) => {
    sound.playTap();
    setSpeakingWordId(id);
    speakWord(word);
    setTimeout(() => {
      setSpeakingWordId(null);
    }, 1200);
  };

  const handleNextPage = () => {
    if (currentPage < 14) {
      sound.playTap();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      sound.playTap();
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col w-full px-3.5 sm:px-6 pb-24 gap-3 max-w-[500px] mx-auto select-none">
      {/* Mission & Document Header Bar */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#24293b] text-[#7bd0ff] border border-[#33394b]">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#7bd0ff] uppercase tracking-wider">
              SMP Grade 7 English
            </span>
            <span className="font-headline font-bold text-[16px] text-[#dce2fa] leading-tight">
              Unit 1: Things in the Classroom
            </span>
          </div>
        </div>

        {/* Quick Orbit Status Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24293b] text-[#cbc3d7] text-[11px] font-semibold border border-[#33394b]">
          <span className="w-2 h-2 rounded-full bg-[#f9bd22] animate-pulse"></span>
          <span>Syncing PDF</span>
        </div>
      </div>

      {/* Document Viewer Container (Tablet HUD Frame) */}
      <div className="relative w-full rounded-2xl bg-[#070e1e] p-2.5 sm:p-3 border border-[#2e3447] shadow-2xl overflow-hidden">
        {/* Reader Glass Toolbar */}
        <div className="flex items-center justify-between px-3 py-1.5 mb-2.5 rounded-xl bg-[#24293b] text-[#cbc3d7] border border-[#33394b]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#7bd0ff]">picture_as_pdf</span>
            <span className="text-[12px] font-medium text-[#dce2fa] truncate max-w-[180px]">
              Kemdikbud_Buku_B_Inggris_VII.pdf
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              aria-label="Zoom in"
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
                isZoomed ? 'bg-[#7bd0ff] text-[#00354a]' : 'bg-[#191f30] text-[#dce2fa] hover:bg-[#2e3447]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isZoomed ? 'zoom_out' : 'zoom_in'}
              </span>
            </button>
            <button
              onClick={() => alert("Digital Textbook full-screen view enabled!")}
              aria-label="Fullscreen view"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[#191f30] hover:bg-[#2e3447] text-[#dce2fa] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">fullscreen</span>
            </button>
          </div>
        </div>

        {/* The Authentic Printable Textbook Page Mockup Canvas */}
        <div
          className={`relative w-full bg-slate-50 text-slate-900 rounded-xl p-3.5 sm:p-4 shadow-md overflow-hidden select-none transition-transform duration-300 ${
            isZoomed ? 'scale-[1.03]' : ''
          }`}
        >
          {/* Authentic Grade 7 Textbook Page Header */}
          <div className="flex items-center justify-between pb-2 mb-3 bg-indigo-900 text-white p-2.5 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-amber-400 text-indigo-950 font-headline text-[15px] flex items-center justify-center font-extrabold shadow-sm">
                {currentPage}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                  Chapter 1 • Section A
                </div>
                <div className="font-headline text-[16px] text-white leading-tight font-bold">
                  Our Class Cosmos
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-800 text-indigo-200">
                English SMP 7
              </span>
            </div>
          </div>

          {/* Dialogue Scenario Strip */}
          <div className="bg-indigo-50/90 rounded-lg p-2.5 mb-3 flex items-start gap-2.5 border border-indigo-100">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center font-bold text-[12px] shadow-sm">
              A
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-indigo-900 font-bold mb-0.5">Observe &amp; Say:</p>
              <p className="text-[12px] text-slate-700 italic leading-snug">
                "Look around our orbit deck! What objects do you see on your study station?"
              </p>
            </div>
          </div>

          {/* 2x3 Vocabulary Illustrated Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {CHAPTER_1_VOCAB.map((item) => {
              const isPlaying = speakingWordId === item.id;
              return (
                <div
                  key={item.id}
                  className="flex flex-col bg-white rounded-lg p-2 shadow-sm border border-slate-200/80 hover:border-indigo-300 transition-colors"
                >
                  <div className="relative w-full h-20 rounded bg-slate-100 overflow-hidden mb-1.5 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.word}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute bottom-1 right-1 bg-slate-900/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      {item.number}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="min-w-0 pr-1">
                      <span className="text-[13px] font-bold text-slate-900 block truncate">
                        {item.word}
                      </span>
                      <span className="block text-[11px] text-slate-500 leading-tight truncate">
                        {item.phonetic}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSpeak(item.word, item.id)}
                      aria-label={`Listen to pronunciation of ${item.word}`}
                      className={`w-7 h-7 flex items-center justify-center rounded-full transition-all shrink-0 ${
                        isPlaying ? 'bg-indigo-600 text-white scale-110' : 'text-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        {isPlaying ? 'volume_up' : 'volume_up'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Authentic Textbook Footer Tag */}
          <div className="flex items-center justify-between pt-1 text-slate-400 text-[10px] border-t border-slate-200">
            <span>Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi</span>
            <span className="font-bold text-slate-600">Page {currentPage}</span>
          </div>
        </div>
      </div>

      {/* Pagination Controller Bar */}
      <div className="mt-1 flex flex-col items-center gap-2.5 w-full">
        <div className="flex items-center justify-between w-full gap-2">
          {/* Previous Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            aria-label="Go to previous page"
            className="flex-1 h-12 rounded-full bg-[#191f30] text-[#cbc3d7] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#24293b] flex items-center justify-center gap-1 text-[14px] font-semibold border border-[#2e3447] active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            <span>Previous</span>
          </button>

          {/* Page Counter Indicator Pill */}
          <div className="px-4 h-12 flex items-center justify-center rounded-full bg-[#191f30] text-[#dce2fa] text-[13px] font-semibold border border-[#2e3447] shadow-inner whitespace-nowrap">
            <span className="text-[#7bd0ff] font-bold mr-1">Page {currentPage}</span>
            <span className="text-[#958ea0]">/ 14</span>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            aria-label="Go to next page"
            className="flex-1 h-12 rounded-full bg-[#d0bcff] text-[#3c0091] hover:bg-[#a078ff] hover:text-white flex items-center justify-center gap-1 text-[14px] font-bold shadow-lg active:scale-95 transition-all"
          >
            <span>Next</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Official Curriculum Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#151b2c] text-[#cbc3d7] text-[11px] border border-[#2e3447]/60">
          <span className="material-symbols-outlined text-[15px] text-[#7bd0ff]">verified</span>
          <span>Digital Textbook PDF Mode • Kemdikbud SMP English</span>
        </div>
      </div>
    </div>
  );
};
