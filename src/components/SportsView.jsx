import React, { useState } from 'react';

export default function SportsView() {
  const [activeTab, setActiveTab] = useState('top');
  const [betSlipCount, setBetSlipCount] = useState(0);

  // Quick circular sports items from screenshot
  const quickCategories = [
    { id: 'top-bets', label: 'TOP Bets', sub: 'Featured' },
    { id: 'crypto-live', label: 'Crypto Live', sub: 'BTC' },
    { id: 'nz-vs-ind', label: 'NZ vs IND', sub: 'Cricket' },
    { id: 'aus-vs-eng', label: 'AUS vs ENG', sub: 'Cricket' },
    { id: 'wbbl', label: "Women's Big Bash", sub: 'WBBL' },
    { id: 'ab', label: 'Ab...', sub: 'Sports' },
  ];

  return (
    <div className="sports-page-container" id="sports-view">
      {/* Top Filter Category Pills */}
      <div className="sports-pills-row-wrap">
        <div className="sports-pills-scroll">
          <button
            type="button"
            className={`sports-pill-btn${activeTab === 'top' ? ' active' : ''}`}
            onClick={() => setActiveTab('top')}
          >
            <span className="sports-skel sports-skel-line" style={{ width: 30, height: 11 }}></span>
          </button>

          <button
            type="button"
            className={`sports-pill-btn${activeTab === 'live' ? ' active' : ''}`}
            onClick={() => setActiveTab('live')}
          >
            <span className="sports-skel sports-skel-line" style={{ width: 28, height: 11 }}></span>
          </button>

          <button
            type="button"
            className={`sports-pill-btn${activeTab === 'upcoming' ? ' active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            <span className="sports-skel sports-skel-line" style={{ width: 62, height: 11 }}></span>
          </button>

          <button
            type="button"
            className={`sports-pill-btn sports-pill-badge-wrap${activeTab === 'top-bets' ? ' active' : ''}`}
            onClick={() => setActiveTab('top-bets')}
          >
            <span className="sports-new-badge">NEW</span>
            <span className="sports-skel sports-skel-line" style={{ width: 58, height: 11 }}></span>
          </button>

          <button
            type="button"
            className={`sports-pill-btn${activeTab === 'esports' ? ' active' : ''}`}
            onClick={() => setActiveTab('esports')}
          >
            <span className="sports-skel sports-skel-line" style={{ width: 48, height: 11 }}></span>
          </button>
        </div>

        {/* Search button on far right */}
        <button type="button" className="sports-search-btn" aria-label="Search Sports">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Circular Quick Category / Story Avatars */}
      <div className="sports-circle-carousel">
        {quickCategories.map((cat) => (
          <div key={cat.id} className="sports-circle-item">
            <div className="sports-circle-ring">
              <div className="sports-circle-avatar sports-skel"></div>
            </div>
            <div className="sports-circle-label sports-skel sports-skel-line"></div>
          </div>
        ))}
      </div>

      {/* SECTION 1: Top Live */}
      <section className="sports-section">
        <div className="sports-section-header">
          <div className="sports-section-title-wrap">
            <span className="sports-live-indicator" aria-hidden="true">
              <span className="sports-live-dot"></span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
                <path d="M7.76 7.76a6 6 0 0 0 0 8.48" />
                <circle cx="12" cy="12" r="2" fill="#ff2d55" />
                <path d="M16.24 7.76a6 6 0 0 1 0 8.48" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </span>
            <div className="sports-skel sports-skel-line" style={{ width: 85, height: 16 }}></div>
          </div>
          <button type="button" className="sports-view-all-btn">
            View all
          </button>
        </div>

        {/* Live Match Cards Carousel */}
        <div className="sports-cards-carousel">
          {/* Card 1: Pakistan vs Sri Lanka Test Match */}
          <div className="sports-match-card">
            {/* Header info */}
            <div className="sports-card-top-row">
              <div className="sports-card-match-meta">
                <div className="sports-mini-icons">
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                </div>
                <div className="sports-card-titles">
                  <div className="sports-skel sports-skel-line" style={{ width: 165, height: 11, marginBottom: 4 }}></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 50, height: 9 }}></div>
                </div>
              </div>
              <div className="sports-status-pill sports-status-pill--live">
                <span className="sports-status-dot"></span>
                <div className="sports-skel sports-skel-line" style={{ width: 38, height: 10 }}></div>
              </div>
            </div>

            {/* Team Rows */}
            <div className="sports-teams-block">
              {/* Team 1: Pakistan */}
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 75, height: 13 }}></div>
                  <div className="sports-skel sports-skel-circle" style={{ width: 13, height: 13, marginLeft: 2 }}></div>
                </div>
                <div className="sports-team-scores">
                  <div className="sports-skel sports-skel-line sports-score-sub" style={{ width: 42, height: 11 }}></div>
                  <div className="sports-skel sports-skel-line sports-score-sub" style={{ width: 62, height: 11 }}></div>
                  <div className="sports-skel sports-skel-line sports-score-main" style={{ width: 30, height: 13 }}></div>
                </div>
              </div>

              {/* Team 2: Sri Lanka */}
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 80, height: 13 }}></div>
                </div>
                <div className="sports-team-scores">
                  <div className="sports-skel sports-skel-line sports-score-sub" style={{ width: 48, height: 11 }}></div>
                  <div className="sports-skel sports-skel-line sports-score-sub" style={{ width: 26, height: 11 }}></div>
                  <div className="sports-skel sports-skel-line sports-score-main" style={{ width: 30, height: 13 }}></div>
                </div>
              </div>
            </div>

            {/* Odds / Winner Section */}
            <div className="sports-odds-section">
              <div className="sports-odds-label-row">
                <div className="sports-skel sports-skel-line" style={{ width: 44, height: 10 }}></div>
              </div>
              <div className="sports-odds-buttons-row">
                <div className="sports-odd-box">
                  <span className="sports-odd-num">1</span>
                  <div className="sports-skel sports-skel-line" style={{ width: 32, height: 12 }}></div>
                </div>
                <div className="sports-odd-box">
                  <span className="sports-odd-num">2</span>
                  <div className="sports-skel sports-skel-line" style={{ width: 32, height: 12 }}></div>
                </div>
                <div className="sports-odd-more-box">
                  <div className="sports-skel sports-skel-line" style={{ width: 22, height: 12 }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Zimbabwe vs Ireland */}
          <div className="sports-match-card sports-match-card--peek">
            <div className="sports-card-top-row">
              <div className="sports-card-match-meta">
                <div className="sports-mini-icons">
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                </div>
                <div className="sports-card-titles">
                  <div className="sports-skel sports-skel-line" style={{ width: 120, height: 11, marginBottom: 4 }}></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 40, height: 9 }}></div>
                </div>
              </div>
              <div className="sports-status-pill sports-status-pill--live">
                <span className="sports-status-dot"></span>
                <div className="sports-skel sports-skel-line" style={{ width: 50, height: 10 }}></div>
              </div>
            </div>

            <div className="sports-teams-block">
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 68, height: 13 }}></div>
                </div>
                <div className="sports-team-scores">
                  <div className="sports-skel sports-skel-line sports-score-main" style={{ width: 30, height: 13 }}></div>
                </div>
              </div>
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 58, height: 13 }}></div>
                </div>
                <div className="sports-team-scores">
                  <div className="sports-skel sports-skel-line sports-score-main" style={{ width: 30, height: 13 }}></div>
                </div>
              </div>
            </div>

            <div className="sports-odds-section">
              <div className="sports-odds-label-row">
                <div className="sports-skel sports-skel-line" style={{ width: 44, height: 10 }}></div>
              </div>
              <div className="sports-odds-buttons-row">
                <div className="sports-odd-box">
                  <span className="sports-odd-num">1</span>
                  <div className="sports-skel sports-skel-line" style={{ width: 30, height: 12 }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Top Upcoming */}
      <section className="sports-section">
        <div className="sports-section-header">
          <div className="sports-section-title-wrap">
            <span className="sports-calendar-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <circle cx="8" cy="15" r="1.2" fill="#22c55e" />
                <circle cx="12" cy="15" r="1.2" fill="#22c55e" />
                <circle cx="16" cy="15" r="1.2" fill="#22c55e" />
              </svg>
            </span>
            <div className="sports-skel sports-skel-line" style={{ width: 110, height: 16 }}></div>
          </div>
          <button type="button" className="sports-all-arrow-btn">
            <div className="sports-skel sports-skel-line" style={{ width: 28, height: 12 }}></div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Upcoming Match Cards Carousel */}
        <div className="sports-cards-carousel">
          {/* Card 1: New Zealand vs India */}
          <div className="sports-match-card">
            <div className="sports-card-top-row">
              <div className="sports-card-match-meta">
                <div className="sports-mini-icons">
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                </div>
                <div className="sports-card-titles">
                  <div className="sports-skel sports-skel-line" style={{ width: 175, height: 11, marginBottom: 4 }}></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 45, height: 9 }}></div>
                </div>
              </div>
            </div>

            {/* Time Badge with TV icon */}
            <div className="sports-time-pill-row">
              <div className="sports-time-pill">
                <div className="sports-skel sports-skel-line" style={{ width: 92, height: 10 }}></div>
                <span className="sports-tv-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M17 2l-5 5-5-5" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Teams */}
            <div className="sports-teams-block sports-teams-block--upcoming">
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 92, height: 13 }}></div>
                </div>
              </div>
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 55, height: 13 }}></div>
                </div>
              </div>
            </div>

            {/* All selections button */}
            <div className="sports-all-selections-bar">
              <div className="sports-skel sports-skel-line" style={{ width: 85, height: 11 }}></div>
              <div className="sports-skel sports-skel-line" style={{ width: 26, height: 11 }}></div>
            </div>
          </div>

          {/* Card 2: Australia vs England */}
          <div className="sports-match-card sports-match-card--peek">
            <div className="sports-card-top-row">
              <div className="sports-card-match-meta">
                <div className="sports-mini-icons">
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                </div>
                <div className="sports-card-titles">
                  <div className="sports-skel sports-skel-line" style={{ width: 120, height: 11, marginBottom: 4 }}></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 40, height: 9 }}></div>
                </div>
              </div>
            </div>

            <div className="sports-time-pill-row">
              <div className="sports-time-pill">
                <div className="sports-skel sports-skel-line" style={{ width: 70, height: 10 }}></div>
              </div>
            </div>

            <div className="sports-teams-block sports-teams-block--upcoming">
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 70, height: 13 }}></div>
                </div>
              </div>
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 65, height: 13 }}></div>
                </div>
              </div>
            </div>

            <div className="sports-odds-section">
              <div className="sports-odds-label-row">
                <div className="sports-skel sports-skel-line" style={{ width: 44, height: 10 }}></div>
              </div>
              <div className="sports-odds-buttons-row">
                <div className="sports-odd-box">
                  <span className="sports-odd-num">1</span>
                  <div className="sports-skel sports-skel-line" style={{ width: 30, height: 12 }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Top Esports */}
      <section className="sports-section">
        <div className="sports-section-header">
          <div className="sports-section-title-wrap">
            <span className="sports-bonus-badge-sticker">
              <span className="sports-bonus-badge-text">SPORT BONUS</span>
            </span>
            <div className="sports-skel sports-skel-line" style={{ width: 100, height: 16 }}></div>
          </div>
          <button type="button" className="sports-all-arrow-btn">
            <div className="sports-skel sports-skel-line" style={{ width: 28, height: 12 }}></div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Esports Cards Carousel */}
        <div className="sports-cards-carousel">
          <div className="sports-match-card">
            <div className="sports-card-top-row">
              <div className="sports-card-match-meta">
                <div className="sports-mini-icons">
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                  <span className="sports-skel sports-skel-circle" style={{ width: 14, height: 14 }}></span>
                </div>
                <div className="sports-card-titles">
                  <div className="sports-skel sports-skel-line" style={{ width: 140, height: 11, marginBottom: 4 }}></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 60, height: 9 }}></div>
                </div>
              </div>
              <div className="sports-status-pill sports-status-pill--live">
                <span className="sports-status-dot"></span>
                <div className="sports-skel sports-skel-line" style={{ width: 34, height: 10 }}></div>
              </div>
            </div>

            <div className="sports-teams-block">
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 85, height: 13 }}></div>
                </div>
                <div className="sports-team-scores">
                  <div className="sports-skel sports-skel-line sports-score-main" style={{ width: 24, height: 13 }}></div>
                </div>
              </div>
              <div className="sports-team-row">
                <div className="sports-team-left">
                  <div className="sports-skel sports-skel-circle sports-team-flag"></div>
                  <div className="sports-skel sports-skel-line" style={{ width: 95, height: 13 }}></div>
                </div>
                <div className="sports-team-scores">
                  <div className="sports-skel sports-skel-line sports-score-main" style={{ width: 24, height: 13 }}></div>
                </div>
              </div>
            </div>

            <div className="sports-odds-section">
              <div className="sports-odds-label-row">
                <div className="sports-skel sports-skel-line" style={{ width: 44, height: 10 }}></div>
              </div>
              <div className="sports-odds-buttons-row">
                <div className="sports-odd-box">
                  <span className="sports-odd-num">1</span>
                  <div className="sports-skel sports-skel-line" style={{ width: 32, height: 12 }}></div>
                </div>
                <div className="sports-odd-box">
                  <span className="sports-odd-num">2</span>
                  <div className="sports-skel sports-skel-line" style={{ width: 32, height: 12 }}></div>
                </div>
                <div className="sports-odd-more-box">
                  <div className="sports-skel sports-skel-line" style={{ width: 22, height: 12 }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bet Slip Button at Bottom Center */}
      <div className="sports-floating-betslip-wrap">
        <button
          type="button"
          className="sports-floating-betslip-btn"
          aria-label="Open Bet Slip"
          onClick={() => setBetSlipCount((c) => c + 1)}
        >
          <span className="sports-betslip-ticket-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
              <line x1="12" y1="9" x2="12" y2="15" strokeDasharray="2 2" />
            </svg>
          </span>
          <span className="sports-betslip-count">{betSlipCount}</span>
          <span className="sports-betslip-chevron">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
