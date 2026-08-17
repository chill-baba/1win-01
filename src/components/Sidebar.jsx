export default function Sidebar({ onLoginClick, collapsed, onToggleCollapse }) {
  return (
    <aside className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`} id="sidebar">
      {/* Login Row */}
      <div className="sidebar-login" id="sidebar-login" onClick={onLoginClick}>
        <div className="sidebar-login-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#999">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span className="sidebar-login-text">Log in</span>
        <span className="sidebar-login-arrow">›</span>
      </div>

      {/* Promo Banner */}
      <div className="sidebar-promo">
        <span className="sidebar-promo-title">Free<br />money</span>
        <img className="sidebar-promo-image" src="/Assites/9e0616c2950dafcae9f2facc72dc37575148df99.png" alt="Free money" loading="lazy" />
      </div>

      {/* Collapse Button */}
      <button className="sidebar-collapse-btn" id="sidebar-toggle" onClick={onToggleCollapse} aria-label="Toggle sidebar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
          style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 250ms ease' }}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      {/* Primary Nav */}
      <nav className="sidebar-nav">
        <ul>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span>Casino</span>
            <span className="sidebar-nav-chevron">›</span>
          </li>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 12.96c.63 1.41 1.64 2.58 2.88 3.39l1.64-1.64C6.67 14.17 5.97 13.15 5.55 12H3.18zM12 2C6.48 2 2 6.48 2 12c0 .33.06.65.18.96l1.64-1.64C4.28 8.1 7.81 5.5 12 5.5S19.72 8.1 20.18 11.32l1.64 1.64c.12-.31.18-.63.18-.96 0-5.52-4.48-10-10-10z"/></svg>
            <span>Sports</span>
            <span className="sidebar-nav-chevron">›</span>
          </li>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
            <span>Markets</span>
          </li>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
            <span>Betwave</span>
            <span className="sidebar-nav-chevron">›</span>
          </li>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"/></svg>
            <span>Bonuses</span>
            <span className="sidebar-nav-badge">1</span>
          </li>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
            <span>VIP Club</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar-divider"></div>

      {/* Secondary Nav */}
      <nav className="sidebar-secondary-nav">
        <ul>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <span>Promotions</span>
          </li>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
            <span>Tournaments</span>
            <span className="sidebar-nav-badge">10</span>
          </li>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
            <span>Blog</span>
          </li>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span>Forum</span>
          </li>
          <li className="sidebar-nav-item">
            <svg className="sidebar-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
            <span>Trading</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar-divider"></div>

      {/* App Banner */}
      <div className="sidebar-app-banner">
        <div className="sidebar-app-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#999"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
        </div>
        <div>
          <div style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>1win for macOS</div>
          <div style={{ color: '#999', fontSize: '11px' }}>Instant access to the platform with our app</div>
        </div>
        <span className="sidebar-login-arrow">›</span>
      </div>

      {/* Social Icons */}
      <div className="sidebar-social">
        <a href="#" className="sidebar-social-icon" aria-label="WhatsApp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
        </a>
        <a href="#" className="sidebar-social-icon" aria-label="Telegram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.65-2.89 7.99-3.45 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/></svg>
        </a>
        <a href="#" className="sidebar-social-icon" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z"/></svg>
        </a>
        <a href="#" className="sidebar-social-icon" aria-label="More">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </a>
      </div>

      <div className="sidebar-divider"></div>

      {/* Language */}
      <div className="sidebar-lang">
        <button className="footer-lang">
          <img src="/Assites/en-GB.svg" alt="EN" className="footer-lang-flag" width="20" height="14" />
          EN
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
        </button>
      </div>

      {/* Support */}
      <div className="sidebar-support">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        <span>Support</span>
        <span className="sidebar-support-badge">24/7</span>
      </div>
    </aside>
  );
}
