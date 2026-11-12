import { useState, useEffect, useRef } from 'react';

export default function GameDetailModal({ game, onClose, onLoginClick }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [demoMultiplier, setDemoMultiplier] = useState(1.00);
  const [demoStatus, setDemoStatus] = useState('flying'); // 'flying' | 'crashed' | 'waiting'
  const [demoBet, setDemoBet] = useState(100);
  const [demoBalance, setDemoBalance] = useState(5000);
  const [hasBet, setHasBet] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);

  // Reset demo state whenever game changes
  useEffect(() => {
    setIsPlayingDemo(false);
    setHasBet(false);
    setCashedOut(false);
  }, [game]);

  // Demo game loop simulation for Lucky Jet / crash style games
  useEffect(() => {
    if (!isPlayingDemo) return;

    let intervalId;
    let crashPoint = 1.5 + Math.random() * 4.5; // Random crash between 1.5x and 6.0x
    let currentMult = 1.00;

    setDemoMultiplier(1.00);
    setDemoStatus('flying');
    setCashedOut(false);

    intervalId = setInterval(() => {
      currentMult = parseFloat((currentMult + 0.03 * (1 + currentMult * 0.15)).toFixed(2));
      setDemoMultiplier(currentMult);

      if (currentMult >= crashPoint) {
        setDemoStatus('crashed');
        clearInterval(intervalId);

        // Restart round after 3 seconds
        setTimeout(() => {
          if (!isPlayingDemo) return;
          crashPoint = 1.4 + Math.random() * 5.0;
          currentMult = 1.00;
          setDemoMultiplier(1.00);
          setDemoStatus('flying');
          setHasBet(false);
          setCashedOut(false);
        }, 3000);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [isPlayingDemo, demoStatus === 'waiting']);

  // Handle escape key to close
  useEffect(() => {
    if (!game) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isPlayingDemo) {
          setIsPlayingDemo(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [game, isPlayingDemo, onClose]);

  // Sync fullscreen change from browser
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!game) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2400);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${game.name} - 1win`,
      text: `Play ${game.name} on 1win!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          // continue to fallback
        } else {
          return;
        }
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!');
      } catch {
        showToast('Unable to copy link');
      }
    } else {
      showToast('Sharing not supported');
    }
  };

  const handleFullscreenToggle = () => {
    const next = !isFullscreen;
    setIsFullscreen(next);

    if (next) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const handleDemoLaunch = () => {
    setIsPlayingDemo(true);
  };

  const handleDemoCashout = () => {
    if (!hasBet || cashedOut || demoStatus !== 'flying') return;
    const winAmount = Math.floor(demoBet * demoMultiplier);
    setDemoBalance((b) => b + winAmount);
    setCashedOut(true);
    showToast(`Cashed out at ${demoMultiplier.toFixed(2)}x (+₹${winAmount})!`);
  };

  const handleDemoBet = () => {
    if (demoBalance < demoBet) {
      showToast('Insufficient demo balance!');
      return;
    }
    setDemoBalance((b) => b - demoBet);
    setHasBet(true);
    setCashedOut(false);
  };

  const formatProvider = (provider) => {
    if (!provider || provider.toUpperCase().includes('1WIN')) {
      return '1win Games';
    }
    const p = provider.trim();
    if (p === 'SPRIBE') return 'Spribe';
    if (p === 'EVOLUTION') return 'Evolution';
    if (p === 'PRAGMATIC') return 'Pragmatic Play';
    if (p === 'BELATRA') return 'Belatra';
    if (p === '3 OAKS GAMING' || p === '3 OAKS') return '3 Oaks Gaming';
    if (p === 'PG SOFT') return 'PG Soft';
    if (p === 'BGAMING') return 'BGaming';
    if (p === 'PLAY N GO') return "Play'n GO";
    if (p === 'SMARTSOFT') return 'SmartSoft';
    if (p === 'AVIATRIX') return 'Aviatrix';
    if (p === '100HP') return '100HP Gaming';
    if (p === 'JILI') return 'Jili Games';
    if (p === 'ENDORPHINA') return 'Endorphina';
    if (p === 'AMUSNET') return 'Amusnet';
    return provider;
  };

  return (
    <div className="game-detail-overlay" id="game-detail-modal">
      {/* Subtle grid background with radial neon glow */}
      <div className="game-detail-grid-bg" aria-hidden="true"></div>

      {/* Header bar: Back on left */}
      <div className="game-detail-header">
        <button
          type="button"
          className="game-detail-back-btn"
          onClick={() => {
            if (isPlayingDemo) {
              setIsPlayingDemo(false);
            } else {
              onClose();
            }
          }}
          aria-label="Back"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Back</span>
        </button>

        {isPlayingDemo ? (
          <div className="game-detail-demo-header-actions">
            <button
              type="button"
              className="game-demo-nav-login"
              onClick={onLoginClick}
            >
              Login
            </button>
            <button
              type="button"
              className="game-demo-nav-register"
              onClick={onLoginClick}
            >
              Registration
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="game-detail-share-btn"
            onClick={handleShare}
            aria-label="Share"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
        )}
      </div>

      {/* Interactive Content Area */}
      {isPlayingDemo ? (
        /* Active Demo Game Play View (loads seamlessly as on 1win.am) */
        <div className="game-demo-play-container">
          <div className="game-demo-screen-box">
            {/* Demo Bar */}
            <div className="game-demo-top-strip">
              <span className="game-demo-badge">DEMO MODE</span>
              <span className="game-demo-balance">Balance: ₹{demoBalance.toLocaleString()}</span>
              <button
                type="button"
                className="game-demo-fs-btn"
                onClick={handleFullscreenToggle}
                aria-label="Toggle Fullscreen"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            </div>

            {/* Game Canvas Area */}
            <div className="game-demo-canvas">
              <div className="game-demo-canvas-bg"></div>
              
              {/* Graphic / Animation */}
              <div className="game-demo-center-stage">
                <img
                  className={`game-demo-actor-img ${demoStatus === 'flying' ? 'is-flying' : 'is-crashed'}`}
                  src={game.image}
                  alt={game.name}
                />
                
                <div className={`game-demo-multiplier ${demoStatus === 'crashed' ? 'multiplier-crashed' : ''}`}>
                  {demoStatus === 'crashed' ? (
                    <div className="crashed-banner">
                      <span className="crashed-label">FLEW AWAY!</span>
                      <span className="crashed-num">@{demoMultiplier.toFixed(2)}x</span>
                    </div>
                  ) : (
                    <span>{demoMultiplier.toFixed(2)}x</span>
                  )}
                </div>
              </div>
            </div>

            {/* Betting Controls in Demo */}
            <div className="game-demo-controls">
              <div className="game-demo-bet-input-box">
                <button
                  type="button"
                  className="game-demo-step-btn"
                  onClick={() => setDemoBet(Math.max(50, demoBet - 50))}
                >
                  -
                </button>
                <span className="game-demo-bet-val">₹{demoBet}</span>
                <button
                  type="button"
                  className="game-demo-step-btn"
                  onClick={() => setDemoBet(demoBet + 50)}
                >
                  +
                </button>
              </div>

              {hasBet && !cashedOut && demoStatus === 'flying' ? (
                <button
                  type="button"
                  className="game-demo-cashout-btn"
                  onClick={handleDemoCashout}
                >
                  Cash out ₹{Math.floor(demoBet * demoMultiplier)}
                </button>
              ) : (
                <button
                  type="button"
                  className={`game-demo-bet-btn ${hasBet && cashedOut ? 'btn-cashed' : ''}`}
                  disabled={hasBet && demoStatus === 'flying'}
                  onClick={handleDemoBet}
                >
                  {hasBet && cashedOut ? 'Cashed Out!' : hasBet ? 'Waiting...' : 'Bet (Demo)'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Game Detail / Preview Screen (Exact Match to User Screenshot) */
        <div className="game-detail-body">
          {/* Game Vertical Poster */}
          <div className="game-detail-poster-wrap">
            <img
              className="game-detail-poster-img"
              src={game.image}
              alt={game.name}
            />
          </div>

          {/* Game Name */}
          <h1 className="game-detail-name">{game.name}</h1>

          {/* Provider badge */}
          <div className="game-detail-provider">
            <img
              src="/Assites/e6243bf9-e55d-4481-ac84-96ad7134eb7f.svg"
              alt="1w"
              className="game-detail-provider-logo"
            />
            <span className="game-detail-provider-text">
              {formatProvider(game.provider)}
            </span>
          </div>

          {/* Interactive Mode Card */}
          <div className="game-detail-action-card">
            <div className="game-detail-notice">You can play in demo mode</div>

            <div className="game-detail-card-divider"></div>

            <div className="game-detail-fullscreen-row">
              <span className="game-detail-fullscreen-label">Fullscreen mode</span>
              <button
                type="button"
                role="switch"
                aria-checked={isFullscreen}
                className={`game-detail-switch${isFullscreen ? ' is-active' : ''}`}
                onClick={handleFullscreenToggle}
              >
                <span className="game-detail-switch-knob"></span>
              </button>
            </div>

            <div className="game-detail-buttons-row">
              <button
                type="button"
                className="game-detail-btn-login"
                onClick={onLoginClick}
              >
                Log in
              </button>
              <button
                type="button"
                className="game-detail-btn-demo"
                onClick={onLoginClick}
              >
                Demo mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="game-detail-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
