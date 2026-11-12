import { useState, useEffect } from 'react';
import APP_DATA from './data/appData';

import LoadingSkeleton from './components/LoadingSkeleton';
import MobileHeader from './components/MobileHeader';
import DesktopTopNav from './components/DesktopTopNav';
import Sidebar from './components/Sidebar';
import HeroCarousel from './components/HeroCarousel';
import PromoCards from './components/PromoCards';
import EventsSection from './components/EventsSection';
import GamesSection from './components/GamesSection';
import CasinoView from './components/CasinoView';
import FreeMoneyView from './components/FreeMoneyView';
import SportsView from './components/SportsView';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import RegisteredBottomModal from './components/RegisteredBottomModal';
import GameDetailModal from './components/GameDetailModal';
import EventLoadingModal from './components/EventLoadingModal';
import SupportModal from './components/SupportModal';
import LanguageModal from './components/LanguageModal';

// Section icons
const OneWinIcon = (
  <img src="/Assites/e6243bf9-e55d-4481-ac84-96ad7134eb7f.svg" alt="1win" className="section-header-icon" style={{ height: '24px', width: 'auto' }} />
);
const AllGamesIcon = (
  <span className="section-header-icon">
    <img src="/Assites/icons inside game/all-games.svg" alt="All games" style={{ height: '24px', width: 'auto' }} />
  </span>
);
const LiveCasinoIcon = (
  <span className="section-header-icon">
    <img src="/Assites/icons inside game/LiveCas.svg" alt="Live Casino" style={{ height: '24px', width: 'auto' }} />
  </span>
);
const PopularIcon = (
  <span className="section-header-icon">
    <img src="/Assites/icons inside game/popular.svg" alt="Popular" style={{ height: '24px', width: 'auto' }} />
  </span>
);

export default function App() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registeredBottomOpen, setRegisteredBottomOpen] = useState(false);
  const [prefillIdentifier, setPrefillIdentifier] = useState('');

  const [eventLoadingOpen, setEventLoadingOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState({
    code: 'EN',
    name: 'English (World)',
    subname: 'English (International)',
    flag: '/Assites/en-001.svg',
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) return tabParam;
    }
    return 'home';
  });
  const [casinoSubTab, setCasinoSubTab] = useState('lobby'); // 'lobby' | 'live-casino' | 'quick-games'
  const [activeGame, setActiveGame] = useState(null); // { id, name, image, provider }

  const openLoginModal = (identifier = '') => {
    if (identifier) setPrefillIdentifier(identifier);
    setRegisterModalOpen(false);
    setRegisteredBottomOpen(false);
    setLoginModalOpen(true);
  };
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => {
    setLoginModalOpen(false);
    setRegisteredBottomOpen(false);
    setRegisterModalOpen(true);
  };
  const closeRegisterModal = () => setRegisterModalOpen(false);

  const handleRegisterSuccess = (details) => {
    setRegisterModalOpen(false);
    if (details?.email || details?.phone) {
      setPrefillIdentifier(details.email || details.phone);
    }
    setRegisteredBottomOpen(true);
  };

  const closeRegisteredBottom = () => setRegisteredBottomOpen(false);

  const openSupportModal = () => setSupportModalOpen(true);
  const closeSupportModal = () => setSupportModalOpen(false);

  const openLangModal = () => setLangModalOpen(true);
  const closeLangModal = () => setLangModalOpen(false);

  const handleTabChange = (page, subPage) => {
    if (page === 'menu') {
      setMobileMenuOpen((prev) => !prev);
      return;
    }
    setMobileMenuOpen(false);
    setActiveNavTab(page);
    if (subPage) {
      setCasinoSubTab(subPage);
    }
    if (activeGame) {
      handleGameDetailClose();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!activeGame) {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen, activeGame]);

  const handleGameClick = (gameOrName, image) => {
    if (typeof gameOrName === 'object' && gameOrName !== null) {
      setActiveGame(gameOrName);
    } else {
      setActiveGame({ name: gameOrName, image, provider: '1WIN GAMES' });
    }
    document.body.style.overflow = 'hidden';
  };

  const handleGameDetailClose = () => {
    setActiveGame(null);
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
    }
  };

  return (
    <div className="app-container">
      {/* Initial App Loading Skeleton Screen */}
      <LoadingSkeleton minDuration={1000} />

      {/* Headers */}
      <MobileHeader
        onLoginClick={() => openLoginModal()}
        onRegisterClick={openRegisterModal}
        onLogoClick={() => handleTabChange('home')}
      />
      <DesktopTopNav
        activeTab={activeNavTab}
        onTabChange={(tabId) => handleTabChange(tabId)}
        onLoginClick={() => openLoginModal()}
        onRegisterClick={openRegisterModal}
      />

      {/* Sidebar */}
      <Sidebar
        onLoginClick={() => {
          setMobileMenuOpen(false);
          openLoginModal();
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onNavigate={(tabId, subTabId) => handleTabChange(tabId, subTabId)}
        onOpenSupport={openSupportModal}
        onOpenLanguage={openLangModal}
        currentLang={currentLang}
      />

      {/* Main Content */}
      <main className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`} id="main-content">
        <div className={`content-area${activeNavTab === 'sports' ? ' content-area--sports' : ''}`}>
          {/* Top spacing for fixed header */}
          <div style={{ height: '64px' }}></div>

          {activeNavTab === 'casino' ? (
            <CasinoView
              subTab={casinoSubTab}
              onSubTabChange={(st) => setCasinoSubTab(st)}
              onGameClick={handleGameClick}
            />
          ) : activeNavTab === 'free-money' ? (
            <FreeMoneyView
              onLoginClick={() => openLoginModal()}
              onRegisterClick={openRegisterModal}
              onNavigate={handleTabChange}
            />
          ) : activeNavTab === 'sports' ? (
            <SportsView />
          ) : (
            <>
              {/* Hero + Promo */}
              <div className="hero-promo-layout">
                <HeroCarousel slides={APP_DATA.heroSlides} />
                <PromoCards />
              </div>

              {/* Events */}
              <EventsSection
                events={APP_DATA.events}
                onEventClick={() => setEventLoadingOpen(true)}
              />

              {/* 1win Games */}
              <GamesSection
                id="games-1win"
                title="1win games"
                icon={OneWinIcon}
                games={APP_DATA.games1win}
                onGameClick={handleGameClick}
              />

              {/* All Games */}
              <GamesSection
                id="games-all"
                title="All games"
                icon={AllGamesIcon}
                games={APP_DATA.gamesAll}
                onGameClick={handleGameClick}
              />

              {/* Live Casino */}
              <GamesSection
                id="games-live-casino"
                title="Live casino"
                icon={LiveCasinoIcon}
                games={APP_DATA.gamesLiveCasino}
                onGameClick={handleGameClick}
              />

              {/* Popular */}
              <GamesSection
                id="games-popular"
                title="Popular"
                icon={PopularIcon}
                games={APP_DATA.gamesPopular}
                onGameClick={handleGameClick}
              />
            </>
          )}
        </div>

        {/* Footer */}
        {activeNavTab !== 'sports' && (
          <Footer
            onOpenSupport={openSupportModal}
            onOpenLanguage={openLangModal}
            currentLang={currentLang}
          />
        )}
      </main>

      {/* Bottom Navigation (mobile) */}
      <BottomNav
        activeTab={mobileMenuOpen ? 'menu' : activeGame ? 'casino' : activeNavTab}
        onTabChange={handleTabChange}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={closeLoginModal}
        onRegisterClick={openRegisterModal}
        initialIdentifier={prefillIdentifier}
      />

      {/* Registration Modal */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={closeRegisterModal}
        onLoginClick={() => openLoginModal()}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Registered Bottom Sheet Modal ("You seem to be registered") */}
      <RegisteredBottomModal
        isOpen={registeredBottomOpen}
        onClose={closeRegisteredBottom}
        onLoginClick={() => openLoginModal(prefillIdentifier)}
      />

      {/* Game Detail View */}
      <GameDetailModal
        game={activeGame}
        onClose={handleGameDetailClose}
        onLoginClick={() => openLoginModal()}
      />

      {/* Event Loading Modal */}
      <EventLoadingModal
        isOpen={eventLoadingOpen}
        onClose={() => setEventLoadingOpen(false)}
      />

      {/* 24/7 Support Bottom Sheet Modal */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={closeSupportModal}
      />

      {/* Language Bottom Sheet Modal */}
      <LanguageModal
        isOpen={langModalOpen}
        onClose={closeLangModal}
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
      />
    </div>
  );
}
