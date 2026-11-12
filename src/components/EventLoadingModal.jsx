import { useEffect } from 'react';

export default function EventLoadingModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`event-loading-overlay${isOpen ? ' is-open' : ''}`}
      id="event-loading-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Event Details Loading"
    >
      <div className="event-loading-sheet">
        {/* Top Dark Section */}
        <div className="event-loading-dark-panel">
          {/* Top Actions: Duplicate/Tabs and Close */}
          <div className="event-loading-actions">
            <button
              type="button"
              className="event-loading-action-btn"
              onClick={handleCopy}
              aria-label="Duplicate or Copy"
              title="Copy"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
            <button
              type="button"
              className="event-loading-action-btn"
              onClick={onClose}
              aria-label="Close"
              title="Close"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Centered Dark Skeleton Content */}
          <div className="event-loading-dark-center">
            {/* Top pill placeholder */}
            <div className="event-skel-el event-skel-dark-pill event-skel-shimmer-dark"></div>

            {/* 4 Centered Text Line Placeholders */}
            <div className="event-skel-lines-dark">
              <div className="event-skel-el event-skel-line-d1 event-skel-shimmer-dark"></div>
              <div className="event-skel-el event-skel-line-d2 event-skel-shimmer-dark"></div>
              <div className="event-skel-el event-skel-line-d3 event-skel-shimmer-dark"></div>
              <div className="event-skel-el event-skel-line-d4 event-skel-shimmer-dark"></div>
            </div>

            {/* Action button placeholder */}
            <div className="event-skel-el event-skel-dark-btn event-skel-shimmer-dark"></div>
          </div>
        </div>

        {/* Bottom White Section */}
        <div className="event-loading-white-panel">
          {/* Header pill skeleton */}
          <div className="event-skel-el event-skel-light-header event-skel-shimmer-light"></div>

          {/* Big placeholder rectangle (stream / match arena) */}
          <div className="event-skel-el event-skel-light-box event-skel-shimmer-light"></div>

          {/* Tag pill skeleton */}
          <div className="event-skel-el event-skel-light-tag event-skel-shimmer-light"></div>

          {/* Subtitle skeleton */}
          <div className="event-skel-el event-skel-light-subtitle event-skel-shimmer-light"></div>

          {/* Several text lines */}
          <div className="event-skel-lines-light">
            <div className="event-skel-el event-skel-line-l1 event-skel-shimmer-light"></div>
            <div className="event-skel-el event-skel-line-l2 event-skel-shimmer-light"></div>
            <div className="event-skel-el event-skel-line-l3 event-skel-shimmer-light"></div>
            <div className="event-skel-el event-skel-line-l4 event-skel-shimmer-light"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
