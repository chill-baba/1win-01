import { useState, useMemo, useEffect } from 'react';
import { CURRENCIES_LIST } from '../data/currencies';
import CurrencyIcon from './CurrencyIcon';

export default function CurrencyPickerModal({ isOpen, onClose, onSelectCurrency }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const filteredCurrencies = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return CURRENCIES_LIST;
    return CURRENCIES_LIST.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      className="picker-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="picker-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="picker-modal-header">
          <h2 className="picker-modal-title">Choose currency</h2>
          <button
            type="button"
            className="picker-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="picker-search-wrapper">
          <svg className="picker-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="picker-search-input"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>

        {/* List */}
        <div className="picker-list-container">
          {filteredCurrencies.map((curr) => (
            <button
              key={curr.code}
              type="button"
              className="currency-picker-item"
              onClick={() => {
                onSelectCurrency(curr);
                onClose();
              }}
            >
              <CurrencyIcon currency={curr} size={36} />
              <div className="currency-picker-info">
                <span className="currency-picker-name">{curr.name}</span>
                <span className="currency-picker-code">{curr.code}</span>
              </div>
            </button>
          ))}
          {filteredCurrencies.length === 0 && (
            <div className="picker-empty-state">No currencies found</div>
          )}
        </div>
      </div>
    </div>
  );
}
