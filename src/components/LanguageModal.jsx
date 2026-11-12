import { useEffect } from 'react';
import { LANGUAGES_LIST } from '../data/languages';

export default function LanguageModal({ isOpen, onClose, currentLang, onSelectLang }) {
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

  return (
    <div
      className={`lang-bottom-modal-overlay${isOpen ? ' is-open' : ''}`}
      id="language-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Language selection"
    >
      <div className="lang-bottom-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Top drag handle */}
        <div className="lang-bottom-modal-drag-handle" />

        {/* Header */}
        <div className="lang-bottom-modal-header">
          <h3>Languages</h3>
          <button
            type="button"
            className="lang-bottom-modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Language List */}
        <div className="lang-bottom-modal-list">
          {LANGUAGES_LIST.map((section, idx) => (
            <div key={idx} className="lang-bottom-modal-section">
              <div className="lang-bottom-modal-section-title">{section.group}</div>
              {section.items.map((item) => {
                const isSelected = currentLang?.code === item.code;
                return (
                  <div
                    key={item.code}
                    className={`lang-bottom-modal-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onSelectLang(item);
                      onClose();
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="lang-bottom-modal-item-left">
                      <img src={item.flag} alt={item.name} className="lang-bottom-modal-flag" />
                      <div className="lang-bottom-modal-info">
                        <span className="lang-bottom-modal-title">{item.name}</span>
                        <span className="lang-bottom-modal-sub">{item.subname}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="lang-bottom-modal-check">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
