import { useState } from 'react';

export default function Footer({ onOpenSupport, onOpenLanguage, currentLang }) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2400);
  };

  const handleCopy = (text, label) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    showToast(`Copied ${label || text} to clipboard!`);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeLang = currentLang || {
    code: 'EN',
    name: 'English (World)',
    subname: 'English (International)',
    flag: '/Assites/en-001.svg',
  };

  return (
    <footer className="footer-v2" id="footer">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="footer-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          {toastMessage}
        </div>
      )}

      {/* Top Header */}
      <div className="footer-v2-top">
        <div className="footer-v2-logo">
          <img
            src="/Assites/a Logo-top-bg-removebg-preview.png"
            alt="1win"
            width="100"
            height="32"
          />
        </div>
        <div className="footer-v2-top-divider" />
        <div className="footer-v2-actions">
          <button
            className="footer-v2-lang-btn"
            onClick={() => onOpenLanguage && onOpenLanguage()}
            aria-label="Change language"
          >
            <img
              src={activeLang.flag}
              alt={activeLang.code}
              className="footer-v2-lang-flag"
            />
            <span>{activeLang.code}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
          <button
            className="footer-v2-scroll-btn"
            onClick={handleScrollTop}
            aria-label="Scroll to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
              <line x1="5" y1="5" x2="19" y2="5"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Information Accordion */}
      <div className={`footer-v2-accordion ${infoOpen ? 'open' : ''}`}>
        <button
          className="footer-v2-accordion-header"
          onClick={() => setInfoOpen(!infoOpen)}
          aria-expanded={infoOpen}
        >
          <span>Information</span>
          <svg className="footer-v2-chevron" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        <div className="footer-v2-accordion-body">
          <div className="footer-v2-accordion-links">
            <a href="#">Rules</a>
            <a href="#">Promotions</a>
            <a href="https://1w-aff.run" target="_blank" rel="noopener noreferrer">Partner program</a>
            <a href="#">User Agreement</a>
            <a href="#">Responsible Gaming</a>
          </div>
        </div>
      </div>

      {/* Categories Accordion */}
      <div className={`footer-v2-accordion ${catOpen ? 'open' : ''}`}>
        <button
          className="footer-v2-accordion-header"
          onClick={() => setCatOpen(!catOpen)}
          aria-expanded={catOpen}
        >
          <span>Categories</span>
          <svg className="footer-v2-chevron" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        <div className="footer-v2-accordion-body">
          <div className="footer-v2-accordion-links">
            <a href="#">Live</a>
            <a href="#">Upcoming</a>
            <a href="#">Live Casino</a>
            <a href="#">Esports</a>
            <a href="#">Bonuses</a>
            <a href="#">Poker</a>
            <a href="#">Casino</a>
            <a href="#">Forum</a>
          </div>
        </div>
      </div>

      {/* 1win for iOS Card */}
      <div className="footer-v2-card footer-v2-app-card" onClick={() => setAppModalOpen(true)}>
        <div className="footer-v2-card-text">
          <div className="footer-v2-card-title">
            <span>1win for iOS</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
          <div className="footer-v2-card-sub">
            200 Points for installing the app
          </div>
        </div>
        <div className="footer-v2-ios-badge">
          <img
            src="/Assites/footer/down.png"
            alt="1win"
            className="footer-v2-badge-img"
            width="48"
            height="48"
          />
        </div>
      </div>

      {/* Support 24/7 Card */}
      <div className="footer-v2-card footer-v2-support-card" onClick={() => onOpenSupport && onOpenSupport()}>
        <div className="footer-v2-card-text">
          <div className="footer-v2-card-title">
            <span>Support</span>
            <span className="footer-v2-support-pill">24/7</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
          <div className="footer-v2-card-sub">
            Contact us if you still have questions
          </div>
        </div>
        <div className="footer-v2-chat-badge">
          <img
            src="/Assites/footer/support.png"
            alt="Support"
            className="footer-v2-badge-img"
            width="48"
            height="48"
          />
        </div>
      </div>

      {/* Partner Program & Commercial Offers Combined Card */}
      <div className="footer-v2-combined-card">
        {/* Partner program */}
        <a
          href="https://1w-aff.run"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-v2-combined-row"
        >
          <div className="footer-v2-combined-info">
            <span className="footer-v2-combined-label">Partner program</span>
            <span className="footer-v2-combined-val">1w-aff.run</span>
          </div>
          <div className="footer-v2-combined-action">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </div>
        </a>

        {/* Commercial offers */}
        <div
          className="footer-v2-combined-row"
          onClick={() => handleCopy('business@1win.social', 'commercial email')}
        >
          <div className="footer-v2-combined-info">
            <span className="footer-v2-combined-label">Commercial offers</span>
            <span className="footer-v2-combined-val">business@1win.social</span>
          </div>
          <div className="footer-v2-combined-action" title="Copy to clipboard">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Social Media Row (8 buttons pointing towards user links) */}
      <div className="footer-v2-socials">
        {/* WhatsApp */}
        <a
          href="https://www.whatsapp.com/channel/0029VaFXHRLElagxvCc7a62E"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-v2-social-btn"
          aria-label="WhatsApp"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 2C6.516 2 2.031 6.484 2.031 12c0 1.954.562 3.774 1.531 5.313L2 22l4.828-1.531A9.94 9.94 0 0 0 12.031 22c5.516 0 10-4.484 10-10s-4.484-10-10-10zm0 18.281c-1.64 0-3.172-.453-4.484-1.25l-.328-.188-3.328 1.047 1.078-3.234-.203-.344a8.17 8.17 0 0 1-1.25-4.312c0-4.563 3.719-8.281 8.281-8.281 4.563 0 8.281 3.719 8.281 8.281 0 4.563-3.719 8.281-8.281 8.281zm4.531-6.172c-.25-.125-1.469-.719-1.703-.813-.234-.094-.406-.14-.578.125-.172.25-.656.813-.813.984-.14.156-.297.188-.547.063-.25-.125-1.047-.391-2-1.234-.734-.656-1.234-1.469-1.375-1.719-.14-.25-.016-.375.109-.5.109-.109.25-.281.375-.422.125-.14.172-.25.25-.406.078-.172.047-.313-.016-.438-.063-.125-.563-1.344-.766-1.844-.203-.484-.406-.422-.563-.438-.14-.016-.313-.016-.484-.016-.172 0-.438.063-.672.313-.234.25-.891.875-.891 2.125s.906 2.453 1.031 2.625c.125.172 1.781 2.719 4.313 3.813.609.266 1.078.422 1.453.547.609.188 1.156.156 1.594.094.484-.078 1.469-.609 1.672-1.188.203-.594.203-1.094.141-1.188-.063-.109-.234-.172-.484-.297z"/>
          </svg>
        </a>

        {/* Telegram */}
        <a
          href="https://telegram.me/+BgzKOeC7qiI1YWMy"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-v2-social-btn"
          aria-label="Telegram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.07-.2c-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.65-2.89 7.99-3.45 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/1win"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-v2-social-btn"
          aria-label="Instagram"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/1winglobal/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-v2-social-btn"
          aria-label="Facebook"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>

        {/* X */}
        <a
          href="https://x.com/1win"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-v2-social-btn"
          aria-label="X"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        {/* Pinterest */}
        <a
          href="https://ru.pinterest.com/1win/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-v2-social-btn"
          aria-label="Pinterest"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
          </svg>
        </a>

        {/* Threads */}
        <a
          href="https://www.threads.com/@1win"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-v2-social-btn"
          aria-label="Threads"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.186 24C5.46 24 0 18.54 0 11.814 0 5.088 5.46-.372 12.186-.372c6.654 0 12.024 5.37 12.024 12.024 0 .42-.03.834-.09 1.242h-3.876c.048-.402.072-.816.072-1.242 0-4.524-3.66-8.196-8.13-8.196-4.506 0-8.238 3.732-8.238 8.238 0 4.47 3.666 8.166 8.136 8.166 2.772 0 5.16-1.392 6.54-3.522l3.078 2.388C17.778 21.93 15.15 24 12.186 24zm4.188-11.856c-.078-2.67-1.74-4.32-4.188-4.32-2.58 0-4.47 1.968-4.47 4.656 0 2.712 1.95 4.656 4.554 4.656 1.542 0 2.868-.696 3.618-1.896l-2.472-1.71c-.342.54-.786.81-1.266.81-.888 0-1.572-.714-1.632-1.782h5.856c0-.138.006-.276.006-.414zm-5.808-.66c.108-.948.726-1.548 1.62-1.548.882 0 1.488.6 1.578 1.548h-3.198z"/>
          </svg>
        </a>

        {/* Discord */}
        <a
          href="https://discord.com/invite/r3YaZTwUub"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-v2-social-btn"
          aria-label="Discord"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        </a>
      </div>

      {/* Copyright row */}
      <div className="footer-v2-copyright">
        <span>© 2026 1win.</span>
        <span className="footer-v2-age-badge">18+</span>
      </div>

      {/* 1WIN FOR IOS MODAL */}
      {appModalOpen && (
        <div className="footer-modal-overlay" onClick={() => setAppModalOpen(false)}>
          <div className="footer-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal-header">
              <h3>1win for iOS</h3>
              <button
                className="footer-modal-close-btn"
                onClick={() => setAppModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="footer-app-modal-body">
              <div className="footer-app-modal-banner">
                <div className="footer-v2-ios-badge" style={{ width: '56px', height: '56px' }}>
                  <span className="footer-v2-badge-logo" style={{ fontSize: '18px' }}>1win</span>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#111' }}>
                    Install 1win App
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#007aff', fontWeight: 600 }}>
                    🎁 Get +200 Points Bonus
                  </p>
                </div>
              </div>

              <div className="footer-app-steps">
                <div className="footer-app-step">
                  <div className="footer-app-step-num">1</div>
                  <div className="footer-app-step-text">
                    Open Safari and tap the <strong>Share</strong> button at the bottom of the screen.
                  </div>
                </div>
                <div className="footer-app-step">
                  <div className="footer-app-step-num">2</div>
                  <div className="footer-app-step-text">
                    Scroll down and tap <strong>Add to Home Screen</strong>.
                  </div>
                </div>
                <div className="footer-app-step">
                  <div className="footer-app-step-num">3</div>
                  <div className="footer-app-step-text">
                    Tap <strong>Add</strong> in the top-right corner to launch with full VIP access!
                  </div>
                </div>
              </div>

              <button
                className="footer-modal-blue-btn"
                onClick={() => {
                  setAppModalOpen(false);
                  showToast('Instructions opened. Add to Home Screen to claim 200 points!');
                }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
