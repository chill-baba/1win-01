export default function GamesSection({ id, title, icon, games, onGameClick }) {
  const scrollId = `${id}-scroll`;

  const handleScroll = (dir) => {
    const container = document.getElementById(scrollId);
    if (container) container.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <section className="games-section" id={id}>
      <div className="section-header">
        <div className="section-header-left">
          {icon}
          <h2 className="section-header-title">{title}</h2>
        </div>
        <div className="section-header-right">
          <button className="btn-all">All games <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
          <div className="scroll-arrows">
            <button className="scroll-arrow" onClick={() => handleScroll('left')} aria-label="Scroll left"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg></button>
            <button className="scroll-arrow" onClick={() => handleScroll('right')} aria-label="Scroll right"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></button>
          </div>
        </div>
      </div>
      <div className="games-scroll" id={scrollId}>
        {games.map((game) => (
          <div
            className="game-card"
            key={game.id}
            data-id={game.id}
            data-name={game.name}
            data-image={game.image}
            onClick={() => onGameClick(game.name, game.image)}
          >
            <img className="game-card-image" src={game.image} alt={game.name} loading="lazy" width="132" height="177" />
            <div className="game-card-overlay"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
