export default function PromoCards() {
  return (
    <section className="promo-section">
      <div className="promo-grid">
        <div className="promo-card promo-card--free-money">
          <div className="promo-card-content">
            <h3 className="promo-card-title">Free<br />money</h3>
            <p className="promo-card-subtitle">Giving away Ferrari<br />&amp; other prizes</p>
          </div>
          <img className="promo-card-image" src="/Assites/Scard/car.webp" alt="Free money promotion" loading="lazy" />
        </div>
        <div className="promo-card promo-card--bonuses">
          <div className="promo-card-content">
            <h3 className="promo-card-title">Bonuses</h3>
          </div>
          <img className="promo-card-image" src="/Assites/Scard/giftcar.png" alt="Bonuses" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
