import { useEffect, useRef } from 'react';

/**
 * BannerLandingView component:
 * Displayed when user clicks on a banner (e.g. Hero banner / Promo banner).
 * Features:
 * - 1win Header with 1win logo, back button, Login & Registration actions
 * - Dark background with subtle 1win watermark
 * - Pulsing / shimmering skeleton placeholder elements matching the 1win layout
 * - Automatically triggers the Login modal on top after 3 seconds
 */
export default function BannerLandingView({
  isOpen,
  onClose,
  onLoginClick,
  onRegisterClick,
}) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Scroll window to top when banner landing opens
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Lock body scroll while banner landing screen is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto open login modal after 3 seconds on top of this view
    timerRef.current = setTimeout(() => {
      onLoginClick();
    }, 3000);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen, onLoginClick, onClose]);

  if (!isOpen) return null;

  const handleManualLogin = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onLoginClick();
  };

  const handleManualRegister = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onRegisterClick();
  };

  return (
    <div
      className="banner-landing-view"
      role="dialog"
      aria-modal="true"
      aria-label="1win Banner Landing"
    >
      {/* Top Header */}
      <header className="banner-landing-header">
        <div className="banner-landing-header-left">
          <button
            type="button"
            className="banner-landing-back-btn"
            onClick={onClose}
            aria-label="Back to home"
            title="Back"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <a
            href="#"
            className="header-logo"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <img
              src="/Assites/a Logo-top-bg-removebg-preview.png"
              alt="1win"
              width="80"
              height="32"
            />
          </a>
        </div>

        <div className="header-actions">
          <button
            className="btn-login"
            id="banner-landing-btn-login"
            onClick={handleManualLogin}
          >
            Login
          </button>
          <button
            className="btn-register"
            id="banner-landing-btn-register"
            onClick={handleManualRegister}
          >
            Registration
          </button>
        </div>
      </header>

      {/* Main Skeleton Content Matching the screenshot */}
      <main className="banner-landing-content">
        {/* Subtle Watermark */}
        <div className="banner-landing-watermark-wrap">
          <svg
            className="banner-landing-watermark-svg"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.34265 4.046C5.64295 4.40483 5.99557 4.85527 5.82251 5.92414L5.35172 8.44613L5.43824 10.477C5.45606 11.1997 5.80216 11.5255 6.41293 11.5255H7.94497C8.43105 11.5255 8.62702 11.1539 8.82297 10.6857L9.99107 7.80228L10.1107 10.5559C10.1209 11.1666 10.4313 11.528 10.9912 11.528H12.7371C13.2333 11.528 13.4394 11.2277 13.6582 10.6908L15.8876 5.1683C16.1294 4.59569 15.9895 4.04346 15.3862 4.04346H14.264C13.8467 4.04346 13.5692 4.18597 13.4038 4.58298L11.8998 8.28327L11.7623 4.98252C11.7394 4.28012 11.4035 4.046 11.0141 4.046H9.87655C9.42611 4.046 9.16398 4.22159 9.02401 4.56516L7.51234 8.28581L7.37745 4.90363C7.3571 4.26995 7.14843 4.046 6.63943 4.046H5.6571C5.6385 4.046 5.34265 4.046 5.34265 4.046Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.44285 4.22978C4.88312 4.55043 5.12997 5.02125 4.9951 5.69309L4.12473 10.3477C3.99749 11.1061 3.2671 11.6049 2.50873 11.4624C1.7936 11.325 1.2668 10.6531 1.40932 9.84639L1.90303 7.15133L1.5951 7.2913C1.02504 7.54834 0.353184 7.2913 0.0986943 6.71615C-0.155796 6.14099 0.0986943 5.4666 0.668754 5.20701L2.9668 4.18652C3.50888 3.91421 4.02549 3.94984 4.44285 4.22978Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Skeleton Placeholders */}
        <div className="banner-landing-skel-group">
          {/* Top pill placeholder (~46% width) */}
          <div className="banner-landing-skel-bar banner-landing-skel-pill"></div>

          {/* Long line 1 */}
          <div className="banner-landing-skel-bar banner-landing-skel-line-1"></div>

          {/* Long line 2 */}
          <div className="banner-landing-skel-bar banner-landing-skel-line-2"></div>

          {/* Card / Button Box */}
          <div className="banner-landing-skel-bar banner-landing-skel-card"></div>
        </div>
      </main>
    </div>
  );
}
