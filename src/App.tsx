/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { OpeningScreen } from './screens/OpeningScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MaterialsScreen } from './screens/MaterialsScreen';
import { LessonDetailScreen } from './screens/LessonDetailScreen';
import { GamesScreen } from './screens/GamesScreen';
import { ChapterGamesMenuScreen } from './screens/ChapterGamesMenuScreen';
import { CrosswordScreen } from './screens/CrosswordScreen';
import { UnscrambleScreen } from './screens/UnscrambleScreen';
import { QuizScreen } from './screens/QuizScreen';
import { QuizResultScreen } from './screens/QuizResultScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Chapter } from './data/chaptersData';
import { sound } from './utils/audio';

type ScreenId =
  | 'opening'
  | 'login'
  | 'register'
  | 'home'
  | 'materials'
  | 'lesson-detail'
  | 'games'
  | 'chapter-games'
  | 'crossword'
  | 'unscramble'
  | 'quiz'
  | 'quiz-result'
  | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [studentName, setStudentName] = useState('Raditya Pratama');
  const [xp, setXp] = useState(120);

  // Result metrics
  const [lastQuizResult, setLastQuizResult] = useState({
    score: 4,
    total: 5,
    durationSec: 105,
  });

  // Local storage persistence
  useEffect(() => {
    try {
      const savedXp = localStorage.getItem('spacevocab_xp');
      if (savedXp) setXp(parseInt(savedXp, 10));

      const savedName = localStorage.getItem('spacevocab_student_name');
      if (savedName) setStudentName(savedName);
    } catch {
      // Fallback
    }
  }, []);

  const handleUpdateXp = (newXp: number) => {
    setXp(newXp);
    try {
      localStorage.setItem('spacevocab_xp', newXp.toString());
    } catch {
      // Ignored
    }
  };

  const handleLoginSuccess = (name: string) => {
    setStudentName(name);
    try {
      localStorage.setItem('spacevocab_student_name', name);
    } catch {
      // Ignored
    }
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleTabChange = (tab: NavTab) => {
    sound.playTap();
    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  const handleOpenPdf = (_chapter: Chapter) => {
    setCurrentScreen('lesson-detail');
  };

  const handleQuizComplete = (score: number, total: number, durationSec: number) => {
    setLastQuizResult({ score, total, durationSec });
    setCurrentScreen('quiz-result');
  };

  // Determine which header to render
  const renderHeader = () => {
    switch (currentScreen) {
      case 'opening':
      case 'login':
      case 'register':
        return null; // Fullscreen auth flows have their own headers

      case 'home':
        return (
          <Header
            tabTitle="HOME"
            xp={xp}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      case 'materials':
        return (
          <Header
            tabTitle="MATERIALS"
            xp={xp}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      case 'games':
        return (
          <Header
            tabTitle="GAMES"
            xp={xp}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      case 'profile':
        return (
          <Header
            tabTitle="PROFILE"
            xp={xp}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      case 'lesson-detail':
        return (
          <Header
            title="Lesson Detail"
            onBack={() => setCurrentScreen('materials')}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      case 'chapter-games':
        return (
          <Header
            title="Quiz Session"
            onBack={() => setCurrentScreen('games')}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      case 'crossword':
        return (
          <Header
            title="Quiz Session"
            onBack={() => setCurrentScreen('chapter-games')}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      case 'unscramble':
        return (
          <Header
            title="Quiz Session"
            onBack={() => setCurrentScreen('chapter-games')}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      case 'quiz':
        return (
          <Header
            title="Quiz Session"
            onBack={() => setCurrentScreen('chapter-games')}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      case 'quiz-result':
        return (
          <Header
            title="Quiz Session"
            onBack={() => setCurrentScreen('chapter-games')}
            onProfileClick={() => handleTabChange('profile')}
          />
        );

      default:
        return null;
    }
  };

  const isMainTab = ['home', 'materials', 'games', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#070e1e] text-[#dce2fa] flex justify-center relative overflow-x-hidden selection:bg-[#a078ff]/30 selection:text-white">
      {/* Centered Device / App Canvas Container */}
      <div className="w-full max-w-[500px] min-h-screen flex flex-col bg-[#0d1324] cosmic-bg relative shadow-2xl border-x border-[#191f30]">
        {/* Top Header */}
        {renderHeader()}

        {/* Screen Switcher */}
        <main className="flex-1 flex flex-col">
          {currentScreen === 'opening' && (
            <OpeningScreen
              onStartMission={() => setCurrentScreen('login')}
              onGoToRegister={() => setCurrentScreen('register')}
            />
          )}

          {currentScreen === 'login' && (
            <LoginScreen
              onBack={() => setCurrentScreen('opening')}
              onLoginSuccess={handleLoginSuccess}
              onGoToRegister={() => setCurrentScreen('register')}
            />
          )}

          {currentScreen === 'register' && (
            <RegisterScreen
              onBack={() => setCurrentScreen('opening')}
              onRegisterSuccess={handleLoginSuccess}
              onGoToLogin={() => setCurrentScreen('login')}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              studentName={studentName}
              onContinueChapter={() => {
                setActiveTab('materials');
                setCurrentScreen('lesson-detail');
              }}
              onPlayGames={() => {
                setActiveTab('games');
                setCurrentScreen('chapter-games');
              }}
              onViewProgress={() => {
                setActiveTab('profile');
                setCurrentScreen('profile');
              }}
            />
          )}

          {currentScreen === 'materials' && (
            <MaterialsScreen
              onSelectChapter={handleOpenPdf}
              onOpenPdf={handleOpenPdf}
            />
          )}

          {currentScreen === 'lesson-detail' && (
            <LessonDetailScreen
              onBack={() => setCurrentScreen('materials')}
              onGoToGames={() => setCurrentScreen('chapter-games')}
            />
          )}

          {currentScreen === 'games' && (
            <GamesScreen
              onOpenLevel={(level) => {
                setCurrentScreen(level);
              }}
              onOpenChapterGamesMenu={() => setCurrentScreen('chapter-games')}
            />
          )}

          {currentScreen === 'chapter-games' && (
            <ChapterGamesMenuScreen
              onPlayCrossword={() => setCurrentScreen('crossword')}
              onPlayUnscramble={() => setCurrentScreen('unscramble')}
              onPlayQuiz={() => setCurrentScreen('quiz')}
            />
          )}

          {currentScreen === 'crossword' && (
            <CrosswordScreen
              currentXp={xp}
              onUpdateXp={handleUpdateXp}
              onBack={() => setCurrentScreen('chapter-games')}
              onComplete={() => setCurrentScreen('chapter-games')}
            />
          )}

          {currentScreen === 'unscramble' && (
            <UnscrambleScreen
              currentXp={xp}
              onUpdateXp={handleUpdateXp}
              onBack={() => setCurrentScreen('chapter-games')}
              onComplete={() => setCurrentScreen('chapter-games')}
            />
          )}

          {currentScreen === 'quiz' && (
            <QuizScreen
              onBack={() => setCurrentScreen('chapter-games')}
              onQuizComplete={handleQuizComplete}
              onUpdateXp={(delta) => handleUpdateXp(xp + delta)}
            />
          )}

          {currentScreen === 'quiz-result' && (
            <QuizResultScreen
              score={lastQuizResult.score}
              total={lastQuizResult.total}
              durationSec={lastQuizResult.durationSec}
              onPlayAgain={() => setCurrentScreen('quiz')}
              onBackToChapter={() => setCurrentScreen('lesson-detail')}
              onGoHome={() => {
                setActiveTab('home');
                setCurrentScreen('home');
              }}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              studentName={studentName}
              currentXp={xp}
              onLogout={() => {
                setCurrentScreen('opening');
              }}
            />
          )}
        </main>

        {/* Bottom Tab Navigation Bar on Main Tabs */}
        {isMainTab && (
          <BottomNav activeTab={activeTab} onSelectTab={handleTabChange} />
        )}
      </div>
    </div>
  );
}
