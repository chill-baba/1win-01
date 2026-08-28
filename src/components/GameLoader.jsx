import { useState, useEffect, useRef } from 'react';

export default function GameLoader({ game, onClose }) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!game) return;
    // Fade in is handled by CSS .active class
    const totalDuration = 300000; // 5 min
    const tick = 250;
    let elapsed = 0;

    intervalRef.current = setInterval(() => {
      elapsed += tick;
      const p = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(p);
      if (p >= 100) clearInterval(intervalRef.current);
    }, tick);

    return () => clearInterval(intervalRef.current);
  }, [game]);

  const handleClose = () => {
    clearInterval(intervalRef.current);
    onClose();
  };

  if (!game) return null;

  return (
    <div className={`game-loader-overlay${game ? ' active' : ''}`} style={{ pointerEvents: game ? 'auto' : 'none', opacity: game ? 1 : 0 }}>
      <button className="game-loader-close" aria-label="Close Loader" onClick={handleClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <img className="game-loader-logo" src="/Assites/a Logo-top-bg-removebg-preview.png" alt="1win" />
      <div className="game-loader-circle-container">
        <div className="game-loader-circle">
          <img className="game-loader-circle-img" src={game.image} alt={game.name} />
        </div>
      </div>
      <div className="game-loader-progress-container">
        <div className="game-loader-bar-bg">
          <div className="game-loader-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="game-loader-percentage">{Math.floor(progress)}%</div>
      </div>
    </div>
  );
}
