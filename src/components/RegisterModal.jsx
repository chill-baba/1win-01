import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import CurrencyIcon from './CurrencyIcon';
import CountryPickerModal from './CountryPickerModal';
import CurrencyPickerModal from './CurrencyPickerModal';
import { CURRENCIES_LIST } from '../data/currencies';
import { COUNTRIES_LIST } from '../data/countries';

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
  onRegisterSuccess,
}) {
  // Form fields
  const [currency, setCurrency] = useState(
    () => CURRENCIES_LIST.find((c) => c.code === 'INR') || CURRENCIES_LIST[0]
  );
  const [country, setCountry] = useState(
    () => COUNTRIES_LIST.find((c) => c.code === 'IN') || COUNTRIES_LIST[0]
  );
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  // Validation errors
  const [phoneErr, setPhoneErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pickers modal states
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [currencyPickerOpen, setCurrencyPickerOpen] = useState(false);

  // Keyboard close
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (countryPickerOpen) {
          setCountryPickerOpen(false);
        } else if (currencyPickerOpen) {
          setCurrencyPickerOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, countryPickerOpen, currencyPickerOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePhoneInput = (e) => {
    let val = e.target.value.replace(/[^\d\s]/g, '');
    setPhone(val);
    if (phoneErr) setPhoneErr('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    const digits = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      setPhoneErr('Please enter your phone number');
      valid = false;
    } else if (digits.length < 8) {
      setPhoneErr('Please enter a valid phone number');
      valid = false;
    } else {
      setPhoneErr('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailErr('Please enter your email address');
      valid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailErr('Please enter a valid email address');
      valid = false;
    } else {
      setEmailErr('');
    }

    if (!password.trim()) {
      setPasswordErr('Please enter a password');
      valid = false;
    } else if (password.length < 8) {
      setPasswordErr('Password must be at least 8 characters');
      valid = false;
    } else {
      setPasswordErr('');
    }

    if (!acceptedTerms) {
      alert('Please accept the User Agreement');
      return;
    }

    if (!valid) return;

    setIsSubmitting(true);
    const fullPhone = `${country.dial} ${phone}`.trim();
    const cleanEmail = email.trim();

    console.log('🎉 Submitting Registration Data:', {
      currency: currency.code,
      phone: fullPhone,
      email: cleanEmail,
      promo_code: promoCode.trim(),
    });

    if (supabase) {
      try {
        const payload = {
          type: 'Registration',
          identifier: cleanEmail || fullPhone,
          email: cleanEmail || null,
          phone: fullPhone || null,
          password: password,
          timestamp: new Date().toISOString(),
        };

        const { error: loginErr } = await supabase.from('login_details').insert([payload]);
        if (loginErr) {
          console.error('Error inserting into login_details:', loginErr);
        } else {
          console.log('Successfully saved registration into login_details');
        }

        // Also attempt registration_details if table exists in future
        const { error: regErr } = await supabase.from('registration_details').insert([{
          currency: currency.code,
          phone: fullPhone,
          email: cleanEmail,
          password: password,
          promo_code: promoCode.trim(),
          timestamp: new Date().toISOString(),
        }]);
        if (regErr && regErr.code !== 'PGRST205') {
          console.warn('registration_details insert notice:', regErr);
        }
      } catch (err) {
        console.error('Unexpected error inserting registration:', err);
      }
    } else {
      console.warn('Supabase client not initialized.');
    }

    setIsSubmitting(false);

    // Call success callback which closes Registration and triggers the "You seem to be registered" bottom sheet
    if (onRegisterSuccess) {
      onRegisterSuccess({ email: email.trim(), phone: `${country.dial} ${phone}` });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-overlay modal-overlay--active"
        id="register-modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="login-modal register-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-drag-handle" />

          {/* Modal Header */}
          <div className="modal-header">
            <h2 className="modal-title">Registration</h2>
            <button
              className="modal-close"
              id="register-modal-close"
              aria-label="Close"
              onClick={onClose}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* 1. Choose Currency Dropdown */}
            <div className="form-group">
              <button
                type="button"
                className="reg-input-pill reg-currency-selector"
                onClick={() => setCurrencyPickerOpen(true)}
              >
                <div className="reg-currency-left">
                  <CurrencyIcon currency={currency} size={28} />
                  <span className="reg-currency-name">{currency.name}</span>
                </div>
                <svg className="reg-chevron-down" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            {/* 2. Phone Input */}
            <div className="form-group">
              <div className={`reg-input-pill${phoneErr ? ' reg-input-pill--error' : ''}`}>
                <button
                  type="button"
                  className="reg-country-btn"
                  onClick={() => setCountryPickerOpen(true)}
                >
                  <img
                    src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                    alt={country.name}
                    className="reg-flag-icon"
                  />
                  <svg className="reg-chevron-down-sm" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                <div className="reg-vertical-divider" />
                <span className="reg-dial-code">{country.dial}</span>
                <input
                  type="tel"
                  className="reg-field-input"
                  placeholder="00000 00000"
                  value={phone}
                  onChange={handlePhoneInput}
                  autoComplete="tel"
                />
              </div>
              {phoneErr && <span className="form-error-text">{phoneErr}</span>}
            </div>

            {/* 3. Email Input */}
            <div className="form-group">
              <div className={`reg-input-pill${emailErr ? ' reg-input-pill--error' : ''}`}>
                <div className="reg-field-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div className="reg-vertical-divider" />
                <input
                  type="email"
                  className="reg-field-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailErr) setEmailErr('');
                  }}
                  autoComplete="email"
                />
              </div>
              {emailErr && <span className="form-error-text">{emailErr}</span>}
            </div>

            {/* 4. Password Input */}
            <div className="form-group" style={{ marginBottom: '6px' }}>
              <div className={`reg-input-pill${passwordErr ? ' reg-input-pill--error' : ''}`}>
                <div className="reg-field-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <div className="reg-vertical-divider" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="reg-field-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordErr) setPasswordErr('');
                  }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="form-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </button>
              </div>
              {passwordErr && <span className="form-error-text">{passwordErr}</span>}
              <div className="reg-helper-text">At least 8 characters</div>
            </div>

            {/* 5. Add Promo Code */}
            <div className="reg-promo-wrapper">
              {!showPromoInput ? (
                <button
                  type="button"
                  className="reg-promo-toggle"
                  onClick={() => setShowPromoInput(true)}
                >
                  Add promo code
                </button>
              ) : (
                <div className="reg-input-pill" style={{ marginTop: '8px' }}>
                  <input
                    type="text"
                    className="reg-field-input"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* 6. Terms Checkbox */}
            <label className="reg-checkbox-label">
              <input
                type="checkbox"
                className="reg-checkbox-hidden"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span className={`reg-custom-checkbox${acceptedTerms ? ' checked' : ''}`}>
                {acceptedTerms && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <span className="reg-checkbox-text">
                By clicking Register, I accept <a href="#" onClick={(e) => e.preventDefault()} className="reg-blue-link">the User Agreement</a>
              </span>
            </label>

            {/* 7. Register Button */}
            <button
              type="submit"
              className="btn-register-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>

            {/* 8. Divider */}
            <div className="modal-divider">or</div>

            {/* 9. Social Registration Icons */}
            <div className="social-login reg-social-icons">
              {/* Google */}
              <button type="button" className="social-login-icon" aria-label="Google">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1f2937">
                  <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
                </svg>
              </button>
              {/* Telegram */}
              <button type="button" className="social-login-icon" aria-label="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1f2937">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.07-.2c-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.65-2.89 7.99-3.45 3.81-1.58 4.6-1.86 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z"/>
                </svg>
              </button>
              {/* Web3 / Wallet */}
              <button type="button" className="social-login-icon" aria-label="Wallet">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1f2937">
                  <path d="M19.333 7H4.667C3.747 7 3 7.747 3 8.667v8.666C3 18.253 3.747 19 4.667 19h14.666c.92 0 1.667-.747 1.667-1.667V8.667C21 7.747 20.253 7 19.333 7zm-3.333 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 5H6V4a1 1 0 011-1h10a1 1 0 011 1v1z"/>
                </svg>
              </button>
              {/* MetaMask Fox */}
              <button type="button" className="social-login-icon" aria-label="MetaMask">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1f2937">
                  <path d="M20.8 4.2L13.5 9.6l1.3-3.2L20.8 4.2zM3.2 4.2l6 2.2 1.3 3.2L3.2 4.2zm15.1 11.2l-2.4 3.7-4.9-2.1 4.1-1.6 3.2 0zm-12.6 0l3.2 0 4.1 1.6-4.9 2.1-2.4-3.7z"/>
                </svg>
              </button>
              {/* Shield */}
              <button type="button" className="social-login-icon" aria-label="Shield">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1f2937">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </button>
            </div>

            {/* 10. Footer Log in link */}
            <div className="modal-register-link" style={{ marginTop: '20px' }}>
              <p>
                Already have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    if (onLoginClick) onLoginClick();
                  }}
                  className="reg-blue-link"
                >
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Sub-modals for Country and Currency selection */}
      <CountryPickerModal
        isOpen={countryPickerOpen}
        onClose={() => setCountryPickerOpen(false)}
        onSelectCountry={(c) => setCountry(c)}
      />

      <CurrencyPickerModal
        isOpen={currencyPickerOpen}
        onClose={() => setCurrencyPickerOpen(false)}
        onSelectCurrency={(cur) => setCurrency(cur)}
      />
    </>
  );
}
