import { useState } from 'react';

export default function Footer() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/Assites/a Logo-top-bg-removebg-preview.png" alt="1win" width="120" height="36" />
        </div>
        <div className="footer-actions">
          <button className="footer-lang" id="footer-lang">
            <img src="/Assites/en-GB.svg" alt="EN" className="footer-lang-flag" width="20" height="14" />
            EN
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
          </button>
          <button className="footer-scroll-top" id="footer-scroll-top" onClick={handleScrollTop} aria-label="Scroll to top">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
          </button>
        </div>
      </div>

      {/* Information Accordion */}
      <div className={`footer-accordion${infoOpen ? ' footer-accordion--open' : ''}`} id="footer-info-accordion">
        <button className="footer-accordion-trigger" aria-expanded={infoOpen} onClick={() => setInfoOpen(!infoOpen)}>
          Information
          <svg className="footer-accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
        </button>
        <div className="footer-accordion-content">
          <a href="#">Rules</a>
          <a href="#">Promotions</a>
          <a href="#">Partner program</a>
        </div>
      </div>

      {/* Categories Accordion */}
      <div className={`footer-accordion${catOpen ? ' footer-accordion--open' : ''}`} id="footer-categories-accordion">
        <button className="footer-accordion-trigger" aria-expanded={catOpen} onClick={() => setCatOpen(!catOpen)}>
          Categories
          <svg className="footer-accordion-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
        </button>
        <div className="footer-accordion-content">
          <a href="#">Live</a>
          <a href="#">Upcoming</a>
          <a href="#">Live Casino</a>
          <a href="#">Esports</a>
          <a href="#">Bonuses</a>
          <a href="#">Tournaments</a>
          <a href="#">Poker</a>
          <a href="#">Casino</a>
          <a href="#">Forum</a>
        </div>
      </div>

      {/* App Install Banner */}
      <div className="footer-app-banner">
        <div className="footer-app-banner-content">
          <h3 className="footer-app-banner-title">1win for iOS</h3>
          <p className="footer-app-banner-subtitle"><span>200 Points</span> for installing the app</p>
          <button className="footer-app-install-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83z"/><path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Install
          </button>
        </div>
        <img className="footer-app-image" src="" alt="1win app" loading="lazy" />
      </div>

      {/* Support Section */}
      <div className="footer-support">
        <div className="footer-support-content">
          <h3 className="footer-support-title">
            Support
            <span className="footer-support-badge">24/7</span>
          </h3>
          <p className="footer-support-text">Contact us if you still have questions</p>
          <button className="footer-support-btn">Contact support</button>
        </div>
        <img className="footer-support-image" src="/Assites/footer/bottomgirl.png" alt="Support agent" loading="lazy" />
      </div>

      {/* Contact Cards */}
      <div className="footer-contact">
        <div className="footer-contact-card">
          <span className="footer-contact-label">Commercial offers</span><br />
          <span className="footer-contact-value">business@1win.social</span>
        </div>
        <div className="footer-contact-card">
          <span className="footer-contact-label">Partner program</span><br />
          <span className="footer-contact-value">partners@1w.run</span>
        </div>
      </div>

      {/* Social Icons */}
      <div className="footer-social">
        <a href="#" className="footer-social-icon" aria-label="WhatsApp"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg></a>
        <a href="#" className="footer-social-icon" aria-label="Telegram"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.07-.2c-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.65-2.89 7.99-3.45 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/></svg></a>
        <a href="#" className="footer-social-icon" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10A5 5 0 0112 7m0 2a3 3 0 100 6 3 3 0 000-6z"/></svg></a>
        <a href="#" className="footer-social-icon" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg></a>
        <a href="#" className="footer-social-icon" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        <a href="#" className="footer-social-icon" aria-label="Discord"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg></a>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <span>© 2026 1win.</span>
        <span className="footer-age-badge">18+</span>
      </div>
    </footer>
  );
}
