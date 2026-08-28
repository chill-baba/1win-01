import { useState, useEffect, useRef } from 'react';

export default function HeroCarousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);

  const goTo = (index) => {
    let i = index;
    if (i < 0) i = slides.length - 1;
    if (i >= slides.length) i = 0;
    setCurrent(i);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [slides.length]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    stopAutoPlay();
  };

  const handleTouchEnd = (e) => {
    const end = e.changedTouches[0].screenX;
    if (touchStartX.current - end > 50) goTo(current + 1);
    if (end - touchStartX.current > 50) goTo(current - 1);
    startAutoPlay();
  };

  return (
    <section className="hero-section" id="hero-section">
      <div className="carousel" id="carousel">
        <div
          className="carousel-track"
          id="carousel-track"
          ref={trackRef}
          style={{ transform: `translateX(-${current * 100}%)` }}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide) => (
            <a
              key={slide.id}
              href="#"
              className="carousel-slide"
              style={slide.bgGradient ? { background: slide.bgGradient } : {}}
            >
              {slide.bgImage && (
                <img
                  className="carousel-slide-bg"
                  src={slide.bgImage}
                  alt={slide.title || 'Banner'}
                  loading="lazy"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
              {(slide.title || slide.subtitle || slide.ctaText) && (
                <div className="carousel-slide-content">
                  {slide.title && <h2 className="carousel-slide-title">{slide.title}</h2>}
                  {slide.subtitle && <p className="carousel-slide-subtitle">{slide.subtitle}</p>}
                  {slide.ctaText && <button className="carousel-slide-cta">{slide.ctaText}</button>}
                </div>
              )}
            </a>
          ))}
        </div>

        <button
          className="carousel-nav carousel-nav--prev"
          id="carousel-prev"
          aria-label="Previous slide"
          onClick={() => { goTo(current - 1); startAutoPlay(); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button
          className="carousel-nav carousel-nav--next"
          id="carousel-next"
          aria-label="Next slide"
          onClick={() => { goTo(current + 1); startAutoPlay(); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>

        <div className="carousel-dots" id="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === current ? ' carousel-dot--active' : ''}`}
              data-index={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => { goTo(i); startAutoPlay(); }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
