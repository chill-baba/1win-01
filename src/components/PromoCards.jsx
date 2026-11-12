export default function PromoCards({ onBannerClick }) {
  return (
    <section className="promo-section">
      <div className="promo-grid">
        <div
          className="promo-card promo-card--free-money"
          onClick={() => onBannerClick && onBannerClick({ type: 'free-money', title: 'Free Money' })}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <div className="promo-card-content">
            <h3 className="promo-card-title">Free<br />money</h3>
            <p className="promo-card-subtitle">Giving away Ferrari<br />&amp; other prizes</p>
          </div>
          <img className="promo-card-image" src="/Assites/Scard/car.webp" alt="Free money promotion" loading="lazy" />
        </div>
        <div
          className="promo-card promo-card--bonuses"
          onClick={() => onBannerClick && onBannerClick({ type: 'bonuses', title: 'Bonuses' })}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
        >
          <div className="promo-card-content">
            <h3 className="promo-card-title">Bonuses</h3>
          </div>
          <img className="promo-card-image" src="/Assites/Scard/giftcar.png" alt="Bonuses" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
