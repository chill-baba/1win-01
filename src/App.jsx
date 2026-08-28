import { useState } from 'react';
import APP_DATA from './data/appData';

import MobileHeader from './components/MobileHeader';
import DesktopTopNav from './components/DesktopTopNav';
import Sidebar from './components/Sidebar';
import HeroCarousel from './components/HeroCarousel';
import PromoCards from './components/PromoCards';
import EventsSection from './components/EventsSection';
import GamesSection from './components/GamesSection';
import TournamentsSection from './components/TournamentsSection';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import LoginModal from './components/LoginModal';
import GameLoader from './components/GameLoader';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeGame, setActiveGame] = useState(null); // { name, image }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleGameClick = (name, image) => {
    setActiveGame({ name, image });
    document.body.style.overflow = 'hidden';
  };

  const handleGameLoaderClose = () => {
    setActiveGame(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="app-container">
      {/* Headers */}
      <MobileHeader onLoginClick={openModal} onRegisterClick={openModal} />
      <DesktopTopNav onLoginClick={openModal} onRegisterClick={openModal} />

      {/* Sidebar */}
      <Sidebar
        onLoginClick={openModal}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <main className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`} id="main-content">
        <div className="content-area">
          {/* Top spacing for fixed header */}
          <div style={{ height: '64px' }}></div>

          {/* Hero + Promo */}
          <div className="hero-promo-layout">
            <HeroCarousel slides={APP_DATA.heroSlides} />
            <PromoCards />
          </div>

          {/* Events */}
          <EventsSection events={APP_DATA.events} />

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

          {/* Tournaments */}
          <TournamentsSection tournaments={APP_DATA.tournaments} />
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Bottom Navigation (mobile) */}
      <BottomNav />

      {/* Login Modal */}
      <LoginModal isOpen={modalOpen} onClose={closeModal} />

      {/* Game Loader */}
      <GameLoader game={activeGame} onClose={handleGameLoaderClose} />
    </div>
  );
}
