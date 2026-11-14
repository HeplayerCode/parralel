import React, { useState } from 'react';
import { ExamResult } from './types';
import { useRouter } from './utils/router';
import { isAccessUnlocked, revokeAccess } from './utils/auth';
import { getStorageItem, getDesignMode, setDesignMode, DesignMode } from './utils/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FooterMobbin } from './components/FooterMobbin';
import { HomeView } from './components/HomeView';
import { HomeViewModern } from './components/HomeViewModern';
import { TheoryView } from './components/TheoryView';
import { PracticeView } from './components/PracticeView';
import { ExamView } from './components/ExamView';
import { ResultsView } from './components/ResultsView';
import { CertificateView } from './components/CertificateView';
import { AccessModal } from './components/AccessModal';
import { GetAccessModal } from './components/GetAccessModal';
import { SpottySticker } from './components/SpottySticker';

export const App: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const [unlocked, setUnlocked] = useState<boolean>(() => isAccessUnlocked());
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isGetAccessOpen, setIsGetAccessOpen] = useState(false);
  const [designMode, setDesignModeState] = useState<DesignMode>(() => getDesignMode());

  const handleToggleDesignMode = (mode: DesignMode) => {
    setDesignMode(mode);
    setDesignModeState(mode);
  };

  const [examResult, setExamResult] = useState<ExamResult | null>(() => {
    return getStorageItem<ExamResult | null>('parallel_last_exam_result', null);
  });

  const handleLoginSuccess = () => {
    setUnlocked(true);
  };

  const handleRevoke = () => {
    revokeAccess();
    setUnlocked(false);
  };

  const handleExamComplete = (result: ExamResult) => {
    setExamResult(result);
  };

  const handleRetakeExam = () => {
    navigate('exam');
  };

  // Route guarding for exam if not unlocked
  const renderCurrentView = () => {
    if (currentRoute === 'exam' && !unlocked) {
      return (
        <div style={{ maxWidth: '640px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              padding: '48px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <SpottySticker type="restricted" size={100} />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-text)',
              }}
            >
              Доступ к экзамену ограничен
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5, fontSize: '1rem' }}>
              Для сдачи контрольного экзамена и оформления именного сертификата требуется ввести
              код доступа, выданный преподавателем.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--color-text)',
                  color: '#FFFFFF',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                }}
                onClick={() => setIsLoginOpen(true)}
              >
                Ввести код доступа
              </button>
              <button
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                }}
                onClick={() => setIsGetAccessOpen(true)}
              >
                Получить код доступа
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentRoute) {
      case 'theory':
        return <TheoryView onNavigate={navigate} />;
      case 'practice':
        return <PracticeView onNavigate={navigate} />;
      case 'exam':
        return <ExamView onNavigate={navigate} onExamComplete={handleExamComplete} />;
      case 'results':
        return (
          <ResultsView
            result={examResult}
            onNavigate={navigate}
            onRetakeExam={handleRetakeExam}
          />
        );
      case 'certificate':
        return <CertificateView result={examResult} onNavigate={navigate} />;
      case 'home':
      default:
        return designMode === 'modern' ? (
          <HomeViewModern
            onNavigate={navigate}
            onOpenGetAccess={() => setIsGetAccessOpen(true)}
          />
        ) : (
          <HomeView
            onNavigate={navigate}
            onOpenGetAccess={() => setIsGetAccessOpen(true)}
          />
        );
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>

      <Header
        currentRoute={currentRoute}
        onNavigate={navigate}
        isUnlocked={unlocked}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenGetAccess={() => setIsGetAccessOpen(true)}
        onRevokeAccess={handleRevoke}
        designMode={designMode}
        onToggleDesignMode={() =>
          handleToggleDesignMode(designMode === 'modern' ? 'classic' : 'modern')
        }
      />

      <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
        {renderCurrentView()}
      </main>

      {designMode === 'modern' ? (
        <FooterMobbin
          onNavigate={navigate}
          onSwitchToClassic={() => handleToggleDesignMode('classic')}
        />
      ) : (
        <Footer
          onNavigate={navigate}
          onSwitchToModern={() => handleToggleDesignMode('modern')}
        />
      )}

      {/* Access Modals */}
      <AccessModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        onRequestAccess={() => setIsGetAccessOpen(true)}
      />

      <GetAccessModal
        isOpen={isGetAccessOpen}
        onClose={() => setIsGetAccessOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    </>
  );
};
