import { useState, useEffect } from 'react';

export default function SupportModal({ isOpen, onClose }) {
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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

  return (
    <>
      <div
        className={`support-modal-overlay${isOpen ? ' is-open' : ''}`}
        id="support-modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        role="dialog"
        aria-modal="true"
        aria-label="24/7 Support"
      >
        <div className="support-modal-sheet" onClick={(e) => e.stopPropagation()}>
          {/* Top handle bar for bottom sheet feel */}
          <div className="support-modal-drag-handle" />

          {/* Header */}
          <div className="support-modal-header">
            <h3>24/7 support</h3>
            <button
              type="button"
              className="support-modal-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="support-modal-body">
            <div className="support-modal-grid">
              {/* Online chat card */}
              <div
                className="support-modal-tile"
                onClick={() => showToast('Connecting to online support chat...')}
                role="button"
                tabIndex={0}
              >
                <div className="support-modal-tile-top">
                  <span className="support-modal-tile-label">Online chat</span>
                  <div className="support-modal-blue-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="support-modal-tile-main">Response within 2 min.</div>
              </div>

              {/* Telegram card */}
              <a
                href="https://t.me/FAQ_1win_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="support-modal-tile"
              >
                <div className="support-modal-tile-top">
                  <span className="support-modal-tile-label">Telegram</span>
                  <div className="support-modal-blue-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.07-.2c-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.65-2.89 7.99-3.45 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" />
                    </svg>
                  </div>
                </div>
                <div className="support-modal-tile-main">@FAQ_1win_bot</div>
              </a>
            </div>

            {/* Technical support card */}
            <div
              className="support-modal-tile support-modal-tile-wide"
              onClick={() => handleCopy('support@1win.social', 'support email')}
              role="button"
              tabIndex={0}
            >
              <div className="support-modal-tile-top">
                <span className="support-modal-tile-label">Technical support</span>
                <div className="support-modal-copy-btn">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </div>
              </div>
              <div className="support-modal-tile-main">support@1win.social</div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              className="support-modal-blue-btn"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="footer-toast" style={{ zIndex: 100002 }}>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
