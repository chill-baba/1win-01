import { useState, useRef, useEffect } from 'react';
import { CASINO_SUB_TABS, CASINO_DATA } from '../data/casinoData';

// Icons
const OneWinLogoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.34 4.05c.3.36.65.81.48 1.88l-.47 2.52.09 2.03c.02.72.36 1.05.97 1.05h1.53c.49 0 .69-.37.88-.84l1.17-2.88.12 2.75c.01.61.32.97.88.97h1.75c.5 0 .7-.3.92-.84l2.23-5.52c.24-.57.1-1.13-.5-1.13h-1.12c-.42 0-.7.14-.86.54l-1.5 3.7-.14-3.3c-.02-.7-.36-.94-.75-.94H9.88c-.45 0-.71.18-.85.52L7.51 8.33 7.38 4.95c-.02-.63-.23-.86-.74-.86h-.98c-.02 0-.32 0-.32 0z" fill="#ffffff" />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.44 4.23c.44.32.69.79.55 1.46l-.87 4.66c-.13.75-.86 1.25-1.61 1.11-.72-.14-1.24-.81-1.1-1.62l.49-2.7-.3.14c-.58.26-1.25 0-1.5-.57-.26-.58 0-1.25.57-1.51l2.3-1.02c.54-.27 1.06-.24 1.47.05z" fill="#ffffff" />
  </svg>
);

const SpadeIcon = () => (
  <img
    src="/Assites/icons inside game/LiveCas.svg"
    alt="Spade"
    style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)' }}
  />
);

const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5s4 3.5 4 8.5c0 2.5-1 4.5-2 5.5l1.5 4-3.5-2-3.5 2 1.5-4c-1-1-2-3-2-5.5 0-5 4-8.5 4-8.5zm0 6a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

const CardDeckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
  </svg>
);

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6 }}>
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const LiveOneWinIcon = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontWeight: 800, fontSize: '11px', letterSpacing: '-0.5px' }}>
    <OneWinLogoIcon />
    <span style={{ color: '#007aff', fontSize: '9px', fontWeight: 900, background: 'rgba(0,122,255,0.15)', padding: '1px 3px', borderRadius: '3px' }}>LIVE</span>
  </span>
);

export default function CasinoView({
  subTab = 'lobby',
  onSubTabChange,
  onGameClick,
}) {
  const currentTab = subTab || 'lobby';
  const tabData = CASINO_DATA[currentTab] || CASINO_DATA.lobby;

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const touchStartX = useRef(0);

  // Auto slide banners
  useEffect(() => {
    setCurrentBannerIndex(0);
    if (!tabData.banners || tabData.banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % tabData.banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [currentTab, tabData.banners]);

  // Reset category on subTab change
  useEffect(() => {
    setActiveCategory('all');
    setSearchQuery('');
  }, [currentTab]);

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      const el = document.querySelector('.casino-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const el = document.getElementById(`casino-section-${catId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleArrowScroll = (sectionId, direction) => {
    const el = document.getElementById(`casino-scroll-${sectionId}`);
    if (!el) return;
    const scrollAmount = 280;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const renderCategoryIcon = (iconType) => {
    switch (iconType) {
      case 'lobby':
        return <CardDeckIcon />;
      case '1w':
        return <OneWinLogoIcon />;
      case 'spade':
        return <SpadeIcon />;
      case 'rocket':
        return <RocketIcon />;
      case 'star':
        return <StarIcon />;
      case '1w-live':
        return <LiveOneWinIcon />;
      default:
        return null;
    }
  };

  const renderSectionHeaderIcon = (iconType) => {
    switch (iconType) {
      case '1w':
        return <OneWinLogoIcon />;
      case 'spade':
        return <SpadeIcon />;
      case 'rocket':
        return <RocketIcon />;
      case '1w-live':
        return <LiveOneWinIcon />;
      default:
        return null;
    }
  };

  // Filter games based on search query and category
  const filteredSections = tabData.sections
    .map((section) => {
      // If a specific category is selected (not 'all'), check if section matches
      if (activeCategory !== 'all' && section.id !== activeCategory) {
        return null;
      }

      let games = section.games;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        games = games.filter(
          (g) =>
            g.name.toLowerCase().includes(query) ||
            g.provider.toLowerCase().includes(query)
        );
      }
      return { ...section, games };
    })
    .filter((sec) => sec !== null && sec.games.length > 0);

  return (
    <div className="casino-container">
      {/* 1. Top Sub-Navigation Pill Bar */}
      <div className="casino-subnav-bar">
        <div className="casino-subnav-pills">
          {CASINO_SUB_TABS.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`casino-subnav-pill ${isActive ? 'active' : ''}`}
                onClick={() => onSubTabChange && onSubTabChange(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Banner Section */}
      <div className="casino-banner-wrapper">
        <div
          className="casino-banner-card"
          onTouchStart={(e) => {
            touchStartX.current = e.changedTouches[0].screenX;
          }}
          onTouchEnd={(e) => {
            const endX = e.changedTouches[0].screenX;
            if (touchStartX.current - endX > 40) {
              // swipe left -> next
              setCurrentBannerIndex((prev) => (prev + 1) % tabData.banners.length);
            } else if (endX - touchStartX.current > 40) {
              // swipe right -> prev
              setCurrentBannerIndex((prev) => (prev - 1 + tabData.banners.length) % tabData.banners.length);
            }
          }}
        >
          {tabData.banners && tabData.banners.length > 0 && (
            <>
              <div
                className="casino-banner-slider"
                style={{
                  transform: `translateX(-${currentBannerIndex * 100}%)`,
                  transition: 'transform 0.35s ease-in-out',
                }}
              >
                {tabData.banners.map((banner) => (
                  <div key={banner.id} className="casino-banner-slide">
                    <img
                      src={banner.image}
                      alt={banner.title || 'Casino Banner'}
                      className="casino-banner-img"
                    />
                  </div>
                ))}
              </div>

              {/* Dots Pagination */}
              {tabData.banners.length > 1 && (
                <div className="casino-banner-dots">
                  {tabData.banners.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      className={`casino-banner-dot ${dotIdx === currentBannerIndex ? 'active' : ''}`}
                      onClick={() => setCurrentBannerIndex(dotIdx)}
                      aria-label={`Slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 3. Search Bar & Filter Button */}
      <div className="casino-search-row">
        <div className="casino-search-input-box">
          <SearchIcon />
          <input
            type="text"
            className="casino-search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="casino-search-clear"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>
        <button
          className="casino-grid-btn"
          aria-label="Filter"
          onClick={() => setActiveCategory('all')}
        >
          <GridIcon />
        </button>
      </div>

      {/* 4. Category Filter Chips (Horizontal Scroll) */}
      <div className="casino-categories-scroll">
        {tabData.categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              className={`casino-category-chip ${isSelected ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {renderCategoryIcon(cat.iconType)}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 5. Game Sections */}
      <div className="casino-sections-list">
        {filteredSections.length === 0 ? (
          <div className="casino-empty-results">
            <p>No games found for "{searchQuery}"</p>
          </div>
        ) : (
          filteredSections.map((section) => (
            <div key={section.id} className="casino-section-block" id={`casino-section-${section.id}`}>
              {/* Section Header */}
              <div className="casino-section-header">
                <div
                  className="casino-section-header-left"
                  onClick={() => setActiveCategory(section.id)}
                  role="button"
                  tabIndex={0}
                >
                  {renderSectionHeaderIcon(section.iconType)}
                  <h2 className="casino-section-title">{section.title}</h2>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="casino-section-chevron"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>

                <div className="casino-section-arrows">
                  <button
                    className="casino-arrow-btn"
                    onClick={() => handleArrowScroll(section.id, 'left')}
                    aria-label="Scroll left"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                  </button>
                  <button
                    className="casino-arrow-btn"
                    onClick={() => handleArrowScroll(section.id, 'right')}
                    aria-label="Scroll right"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Games Scroll Container */}
              <div
                className="casino-games-scroll"
                id={`casino-scroll-${section.id}`}
              >
                {section.games.map((game) => (
                  <div
                    key={game.id}
                    className="casino-game-card-wrapper"
                    onClick={() => onGameClick && onGameClick(game)}
                  >
                    <div className="casino-game-card">
                      {/* Flag Tag (e.g. UK, India) */}
                      {game.flag && (
                        <div className="casino-card-flag-badge">
                          <img
                            src={game.flag}
                            alt="flag"
                            className="casino-card-flag-img"
                          />
                        </div>
                      )}

                      {/* Top Provider / 1WIN GAMES Badge */}
                      {game.badge && (
                        <div
                          className="casino-card-badge"
                          style={
                            game.badgeBg
                              ? { backgroundColor: game.badgeBg }
                              : undefined
                          }
                        >
                          {game.badge}
                        </div>
                      )}

                      {/* Cover Image */}
                      <img
                        src={game.image}
                        alt={game.name}
                        loading="lazy"
                        className="casino-game-card-img"
                      />

                      {/* Subtle hover overlay */}
                      <div className="casino-game-card-overlay">
                        <span className="casino-play-icon">▶</span>
                      </div>
                    </div>

                    {/* Playing Count Info */}
                    {game.playing && (
                      <div className="casino-game-info">
                        <span className="casino-game-dot"></span>
                        <span className="casino-game-playing">
                          {game.playing} playing
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
