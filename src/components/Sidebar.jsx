import { useState } from 'react';

export default function Sidebar({
  onLoginClick,
  collapsed,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
  onNavigate,
  onOpenSupport,
  onOpenLanguage,
  currentLang,
}) {
  const [expandedSections, setExpandedSections] = useState({
    casino: false,
    sports: false,
    markets: false,
    betwave: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleItemClick = (action) => {
    if (action) action();
    if (mobileOpen && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`sidebar-backdrop${mobileOpen ? ' active' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}${mobileOpen ? ' sidebar--mobile-open' : ''}`}
        id="sidebar"
      >
        {/* Collapse Button (Desktop Only) */}
        <button
          className="sidebar-collapse-btn"
          id="sidebar-toggle"
          onClick={onToggleCollapse}
          aria-label="Toggle sidebar"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              transform: collapsed ? 'rotate(180deg)' : 'none',
              transition: 'transform 250ms ease',
            }}
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div className="sidebar-scroll-container">
          {/* Login Row */}
          <div
            className="sidebar-login"
            id="sidebar-login"
            onClick={() => handleItemClick(onLoginClick)}
          >
            <div className="sidebar-login-avatar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V21h19.2v-1.8c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <span className="sidebar-login-text">Log in</span>
            <span className="sidebar-login-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </div>

          {/* Promo Banner: Free Money */}
          <div className="sidebar-promo" onClick={() => handleItemClick(() => onNavigate && onNavigate('free-money'))}>
            <div className="sidebar-promo-title">
              Free<br />money
            </div>
            <img
              className="sidebar-promo-image"
              src="/Assites/9e0616c2950dafcae9f2facc72dc37575148df99.png"
              alt="Free money"
              loading="lazy"
            />
          </div>

          {/* 1win Token Row */}
          <div className="sidebar-token" onClick={() => handleItemClick()}>
            <div className="sidebar-token-badge">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="url(#token-gold-grad)" stroke="#ffdf7e" strokeWidth="1.2" />
                <path
                  d="M11 20V12h2.2l1.6 3.8L16.4 12h2.2v8h-1.6v-5.2l-1.5 3.6h-1.4l-1.5-3.6V20H11z"
                  fill="#5d3b00"
                  fontWeight="bold"
                />
                <defs>
                  <linearGradient id="token-gold-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fdd835" />
                    <stop offset="0.5" stopColor="#fbc02d" />
                    <stop offset="1" stopColor="#f57f17" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="sidebar-token-details">
              <div className="sidebar-token-name">
                1win Token <span className="sidebar-token-symbol">(1WIN)</span>
              </div>
              <div className="sidebar-token-price">
                USDT 0.0434917 <span className="sidebar-token-change">-8.01%</span>
              </div>
            </div>
          </div>

          <div className="sidebar-divider"></div>

          {/* Primary Nav */}
          <nav className="sidebar-nav">
            <ul>
              {/* Casino */}
              <li>
                <div
                  className={`sidebar-nav-item${expandedSections.casino ? ' sidebar-nav-item--expanded' : ''}`}
                  onClick={() => {
                    toggleSection('casino');
                    if (onNavigate) onNavigate('casino', 'lobby');
                  }}
                >
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </span>
                  <span>Casino</span>
                  <span className={`sidebar-nav-chevron${expandedSections.casino ? ' rotated' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
                {expandedSections.casino && (
                  <ul className="sidebar-submenu">
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('casino', 'lobby'))}>Slots</li>
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('casino', 'live-casino'))}>Live Casino</li>
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('casino', 'quick-games'))}>Quick Games</li>
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('casino', 'live-casino'))}>Roulette</li>
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('casino', 'live-casino'))}>Blackjack</li>
                  </ul>
                )}
              </li>

              {/* Sports */}
              <li>
                <div
                  className={`sidebar-nav-item${expandedSections.sports ? ' sidebar-nav-item--expanded' : ''}`}
                  onClick={() => {
                    toggleSection('sports');
                    if (onNavigate) onNavigate('sports');
                  }}
                >
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.46.05-.92.13-1.36 2.37.58 4.67-.17 6.32-1.82 1.65-1.65 2.4-3.95 1.82-6.32.44-.08.9-.13 1.36-.13 4.41 0 8 3.59 8 8 0 2.21-.9 4.21-2.35 5.65C17.83 19.38 15.08 20 12 20z" />
                    </svg>
                  </span>
                  <span>Sports</span>
                  <span className={`sidebar-nav-chevron${expandedSections.sports ? ' rotated' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
                {expandedSections.sports && (
                  <ul className="sidebar-submenu">
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('sports'))}>Cricket</li>
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('sports'))}>Football</li>
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('sports'))}>Tennis</li>
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('sports'))}>Basketball</li>
                    <li onClick={() => handleItemClick(() => onNavigate && onNavigate('sports'))}>Esports</li>
                  </ul>
                )}
              </li>

              {/* Markets */}
              <li>
                <div
                  className={`sidebar-nav-item${expandedSections.markets ? ' sidebar-nav-item--expanded' : ''}`}
                  onClick={() => toggleSection('markets')}
                >
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V18h-2v-1.07A4.002 4.002 0 018 13h2a2 2 0 002 2c1.1 0 2-.9 2-2s-.9-2-2-2a4 4 0 01-4-4c0-1.86 1.28-3.41 3-3.86V6h2v1.07A4.002 4.002 0 0116 11h-2a2 2 0 00-2-2c-1.1 0-2 .9-2 2s.9 2 2 2a4 4 0 014 4c0 1.86-1.28 3.41-3 3.93z" />
                    </svg>
                  </span>
                  <span>Markets</span>
                  <span className={`sidebar-nav-chevron${expandedSections.markets ? ' rotated' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
                {expandedSections.markets && (
                  <ul className="sidebar-submenu">
                    <li onClick={() => handleItemClick()}>Crypto</li>
                    <li onClick={() => handleItemClick()}>Forex</li>
                    <li onClick={() => handleItemClick()}>Commodities</li>
                  </ul>
                )}
              </li>

              {/* Betwave */}
              <li>
                <div
                  className={`sidebar-nav-item${expandedSections.betwave ? ' sidebar-nav-item--expanded' : ''}`}
                  onClick={() => toggleSection('betwave')}
                >
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 3h10a4 4 0 014 4c0 1.3-.6 2.4-1.6 3.1 1.5.7 2.6 2.2 2.6 3.9 0 2.8-2.2 5-5 5H5V3zm4 3v4h5.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H9zm0 7v5h6c1.1 0 2-.9 2-2s-.9-2-2-2H9z" />
                    </svg>
                  </span>
                  <span>Betwave</span>
                  <span className={`sidebar-nav-chevron${expandedSections.betwave ? ' rotated' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
                {expandedSections.betwave && (
                  <ul className="sidebar-submenu">
                    <li onClick={() => handleItemClick()}>Live Streams</li>
                    <li onClick={() => handleItemClick()}>Community Bets</li>
                  </ul>
                )}
              </li>

              {/* Bonuses */}
              <li>
                <div className="sidebar-nav-item" onClick={() => handleItemClick(() => onNavigate && onNavigate('free-money'))}>
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1h-2.22l.53-.78C13.56 4.78 14.22 4 15 4zm-6 0c.78 0 1.44.78 1.69 1.22l.53.78H9c-.55 0-1-.45-1-1s.45-1 1-1zm11 15H4V8h5.08L7 10.83 8.62 12 11 8.76V19h2V8.76L15.38 12 17 10.83 14.92 8H20v11z" />
                    </svg>
                  </span>
                  <span>Bonuses</span>
                  <span className="sidebar-nav-badge sidebar-nav-badge--orange">1</span>
                </div>
              </li>

              {/* VIP Loyalty Program */}
              <li>
                <div className="sidebar-nav-item" onClick={() => handleItemClick()}>
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                    </svg>
                  </span>
                  <span>VIP Loyalty Program</span>
                  <span className="sidebar-nav-badge sidebar-nav-badge--orange">New</span>
                </div>
              </li>

              {/* VIP Club */}
              <li>
                <div className="sidebar-nav-item" onClick={() => handleItemClick()}>
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
                    </svg>
                  </span>
                  <span>VIP Club</span>
                </div>
              </li>
            </ul>
          </nav>

          <div className="sidebar-divider"></div>

          {/* Secondary Nav */}
          <nav className="sidebar-secondary-nav">
            <ul>
              {/* Promotions */}
              <li>
                <div className="sidebar-nav-item" onClick={() => handleItemClick()}>
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.4 5.3 5.8.6-4.3 4 1.2 5.7L12 14.8l-5.1 2.8 1.2-5.7-4.3-4 5.8-.6L12 2z" />
                    </svg>
                  </span>
                  <span>Promotions</span>
                </div>
              </li>

              {/* Blog */}
              <li>
                <div className="sidebar-nav-item" onClick={() => handleItemClick()}>
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                    </svg>
                  </span>
                  <span>Blog</span>
                </div>
              </li>

              {/* Forum */}
              <li>
                <div className="sidebar-nav-item" onClick={() => handleItemClick()}>
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </span>
                  <span>Forum</span>
                </div>
              </li>

              {/* Trading */}
              <li>
                <div className="sidebar-nav-item" onClick={() => handleItemClick()}>
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99l1.5 1.5z" />
                    </svg>
                  </span>
                  <span>Trading</span>
                </div>
              </li>

              {/* Poker */}
              <li>
                <div className="sidebar-nav-item" onClick={() => handleItemClick()}>
                  <span className="sidebar-nav-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5 0 1.38-.8 2.57-1.95 3.13L15 15.5h-2.2l-.8-2-1 1.25V18h-2v-3.75l-1-1.25-.8 2H5l1.45-2.87C5.3 12.07 4.5 10.88 4.5 9.5 4.5 7.57 6.07 6 8 6c1.17 0 2.2.58 2.83 1.47C11.46 6.58 12.49 6 13.66 6H12z" />
                    </svg>
                  </span>
                  <span>Poker</span>
                </div>
              </li>
            </ul>
          </nav>

          {/* App Banner (1win for iOS) */}
          <div className="sidebar-app-card" onClick={() => handleItemClick()}>
            <div className="sidebar-app-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.62 1.34-.56.64-1.05 1.71-.92 2.74 1 .08 2-.48 2.61-1.23z" />
              </svg>
            </div>
            <div className="sidebar-app-info">
              <div className="sidebar-app-title">1win for iOS</div>
              <div className="sidebar-app-subtitle">Instant access to the platform with our app</div>
            </div>
            <span className="sidebar-app-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </div>

          {/* Social Icons + Language */}
          <div className="sidebar-social-section">
            <div className="sidebar-social-buttons">
              {/* WhatsApp */}
              <a href="#" className="sidebar-social-btn" aria-label="WhatsApp" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>

              {/* Telegram */}
              <a href="#" className="sidebar-social-btn" aria-label="Telegram" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.65-2.89 7.99-3.45 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" className="sidebar-social-btn" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012 0z" />
                </svg>
              </a>

              {/* More / Dots */}
              <a href="#" className="sidebar-social-btn" aria-label="More" onClick={(e) => e.preventDefault()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </a>
            </div>

            {/* Language Selector */}
            <button
              className="sidebar-language-btn"
              type="button"
              onClick={() => handleItemClick(onOpenLanguage)}
            >
              <img
                src={currentLang?.flag || '/Assites/en-GB.svg'}
                alt={currentLang?.code || 'EN'}
                className="sidebar-lang-flag"
              />
              <span className="sidebar-lang-text">{currentLang?.code || 'EN'}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Support Footer */}
        <div className="sidebar-support-footer" onClick={() => handleItemClick(onOpenSupport)}>
          <div className="sidebar-support-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </div>
          <span className="sidebar-support-title">Support</span>
          <span className="sidebar-support-badge">24/7</span>
        </div>
      </aside>
    </>
  );
}
