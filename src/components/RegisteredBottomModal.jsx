import { useEffect } from 'react';

export default function RegisteredBottomModal({ isOpen, onClose, onLoginClick }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="registered-bottom-overlay is-open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="registered-bottom-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Mobile Drag handle */}
        <div className="registered-bottom-drag-handle" />

        {/* Header with Title and Close Button */}
        <div className="registered-bottom-header">
          <h2 className="registered-bottom-title">You seem to be registered</h2>
          <button
            type="button"
            className="registered-bottom-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Subtitle */}
        <p className="registered-bottom-text">
          Please log in to your account to start playing
        </p>

        {/* Log In Button */}
        <button
          type="button"
          className="btn-registered-login"
          onClick={() => {
            onClose();
            if (onLoginClick) onLoginClick();
          }}
        >
          Log in
        </button>
      </div>
    </div>
  );
}
