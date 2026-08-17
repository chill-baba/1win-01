export default function EventsSection({ events }) {
  const scrollRef = (dir) => {
    const container = document.getElementById('events-scroll');
    if (container) container.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <section className="events-section" id="events-section">
      <div className="section-header">
        <div className="section-header-left">
          <svg className="section-header-icon" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#8e8e93' }}>
            <path fill="currentColor" d="M7.188 20.943a5.3 5.3 0 0 1-.267-1.676c0-2.267 1.378-4.106 3.08-4.106 1.7 0 3.079 1.839 3.079 4.106 0 .603-.098 1.175-.273 1.69a8.32 8.32 0 0 0 5.451-7.378 9.17 9.17 0 0 0-3.328-6.934c-.084-.067-.206.016-.177.12 1.025 3.743-.537 6.577-1.667 6.051-.625-.29-.541-1.22-.541-1.22a15.4 15.4 0 0 0-.416-6.005 7.96 7.96 0 0 0-2.26-3.411A5.8 5.8 0 0 0 8.238.986c-.2-.099-.425.061-.43.285A6.03 6.03 0 0 1 6.581 4.76Q5.9 5.808 5.07 6.742l-.008.01c-1.483 1.676-3.32 3.754-3.32 6.813a8.32 8.32 0 0 0 5.446 7.378" />
          </svg>
          <h2 className="section-header-title">TOP Events</h2>
        </div>
        <div className="section-header-right">
          <button className="btn-all">All <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
          <div className="scroll-arrows">
            <button className="scroll-arrow" onClick={() => scrollRef('left')} aria-label="Scroll left"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
            <button className="scroll-arrow" onClick={() => scrollRef('right')} aria-label="Scroll right"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
          </div>
        </div>
      </div>
      <div className="events-scroll" id="events-scroll">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-card-header">
              <span className="event-card-league-icon">{event.leagueIcon}</span>
              <div>
                <div className="event-card-league">{event.league}</div>
                <div className="event-card-sport">{event.sport}</div>
              </div>
            </div>
            <div className="event-card-status">
              {event.isLive && <span className="event-card-live-dot"></span>}
              {event.status}
            </div>
            <div className="event-card-teams">
              <div className="event-card-team">
                <span className="event-card-team-name">{event.homeTeam}</span>
                <span className="event-card-team-score">{event.homeScore !== null ? event.homeScore : '-'}</span>
              </div>
              <div className="event-card-team">
                <span className="event-card-team-name">{event.awayTeam}</span>
                <span className="event-card-team-score">{event.awayScore !== null ? event.awayScore : '-'}</span>
              </div>
            </div>
            <div className="event-card-market">{event.market}</div>
            <div className="event-card-odds">
              {event.odds.map((odd, i) => (
                <div className="event-card-odd" key={i}>
                  <span className="event-card-odd-label">{odd.label}</span>
                  <span className="event-card-odd-value">{odd.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
