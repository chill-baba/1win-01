import { useState, useEffect } from 'react';

function pad(n) {
  return n.toString().padStart(2, '0');
}

function useCountdown(endTime) {
  const [time, setTime] = useState({ d: '00', h: '00', m: '00', s: '00' });

  useEffect(() => {
    const update = () => {
      let diff = endTime - Date.now();
      if (diff < 0) diff = 0;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  return time;
}

function TournamentCard({ tournament }) {
  const time = useCountdown(tournament.endTime);

  return (
    <div className="tournament-card" data-end-time={tournament.endTime}>
      <img className="tournament-card-image" src={tournament.image} alt={tournament.title} loading="lazy" />
      <span className="tournament-card-badge">{tournament.status}</span>
      <div className="tournament-card-content">
        <div className="tournament-card-title">{tournament.title}</div>
        <div className="tournament-card-prize">{tournament.prize}</div>
        <div className="tournament-card-footer">
          <div className="tournament-card-timer-section">
            <span className="tournament-card-timer-label">Time remaining</span>
            <div className="tournament-card-timer-display">
              <span className="tournament-card-timer-unit">{time.d}</span>
              <span className="tournament-card-timer-separator">:</span>
              <span className="tournament-card-timer-unit">{time.h}</span>
              <span className="tournament-card-timer-separator">:</span>
              <span className="tournament-card-timer-unit">{time.m}</span>
              <span className="tournament-card-timer-separator">:</span>
              <span className="tournament-card-timer-unit">{time.s}</span>
            </div>
          </div>
          <button className="tournament-card-details-btn">Details</button>
        </div>
      </div>
    </div>
  );
}

export default function TournamentsSection({ tournaments }) {
  const handleScroll = (dir) => {
    const container = document.getElementById('tournaments-scroll');
    if (container) container.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <section className="tournaments-section" id="tournaments-section">
      <div className="section-header">
        <div className="section-header-left">
          <span className="section-header-icon">🏆</span>
          <h2 className="section-header-title">Tournaments</h2>
        </div>
        <div className="section-header-right">
          <button className="btn-all">All <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
          <div className="scroll-arrows">
            <button className="scroll-arrow" onClick={() => handleScroll('left')} aria-label="Scroll left"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
            <button className="scroll-arrow" onClick={() => handleScroll('right')} aria-label="Scroll right"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
          </div>
        </div>
      </div>
      <div className="tournaments-scroll" id="tournaments-scroll">
        {tournaments.map((t) => (
          <TournamentCard key={t.id} tournament={t} />
        ))}
      </div>
    </section>
  );
}
