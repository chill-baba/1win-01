import { useState, useEffect, useRef } from 'react';
import './FreeMoneyView.css';

// SVG Icons
const LuckyDriveSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 12" width="76" height="10" fill="currentColor">
    <path fill="#fff" stroke="#fff" strokeWidth=".276" d="M3.5 1.325v-.16H1v9.644h6.253V8.556H3.5zm7.51.001.001-.16H8.41v.158a399 399 0 0 0 0 5.51c.006 1.33.355 2.378 1.065 3.093.71.716 1.755 1.073 3.1 1.073s2.392-.357 3.101-1.073c.71-.715 1.06-1.763 1.066-3.093.012-2.468.012-2.914 0-5.51l-.001-.159H14.14v.161l.008 1.343c.009 1.514.013 2.194-.007 4.163-.007.661-.177 1.113-.444 1.4-.265.284-.646.426-1.121.426-.476 0-.857-.142-1.122-.427-.267-.286-.437-.738-.444-1.4-.02-1.968-.016-2.648-.007-4.162zm16.144 1.935.128-.094-.093-.13C26.376 1.92 25.138 1 22.939 1c-1.565 0-2.832.529-3.707 1.422s-1.347 2.136-1.347 3.546.469 2.663 1.342 3.565 2.14 1.442 3.712 1.442c1.14 0 2.03-.25 2.73-.656.699-.406 1.198-.96 1.565-1.558l.074-.121-.112-.088-1.572-1.234-.133-.104-.096.138c-.28.403-.607.711-1.004.92-.396.209-.871.322-1.452.322-.675 0-1.282-.226-1.72-.66-.438-.433-.72-1.086-.72-1.966s.282-1.53.72-1.959c.437-.43 1.045-.654 1.72-.654 1.116 0 1.89.497 2.303 1.1l.093.137.132-.097zm1.378-2.096h-.16v9.644h2.348V1.165h-2.188Zm2.414 4.527-.055.085.054.086 3.069 4.872.047.074h2.844l-.163-.248-3.15-4.783 2.895-4.364.165-.249h-2.845l-.047.075zm6.553-4.527h-.258l.116.232 3.026 6.034v3.378h2.475V7.431l3.026-6.034.116-.232h-2.58l-.043.094-1.406 3.102-.001.002-.303.65-.267-.645-.002-.005-.003-.005-1.534-3.104-.044-.089H37.5Z" />
    <path fill="#fff" fillRule="evenodd" d="M97.25 1H79.647L76 11h17.71l.906-2.561H82.02l.474-1.189h12.543l.89-2.515H83.394l.45-1.19h12.506z" clipRule="evenodd" />
    <path fill="#fff" stroke="#fff" strokeWidth=".279" d="M54.94 8.66h-.001a49 49 0 0 1-1.296.012V3.29c.466 0 .849.002 1.335.013.625.013 1.184.23 1.587.649.401.417.662 1.05.662 1.925 0 .825-.126 1.51-.465 1.99-.331.47-.888.774-1.822.793ZM51 10.812v.162l.16.003c1.335.027 2.567.027 3.914.013 1.891-.027 3.113-.611 3.856-1.56.737-.941.978-2.21.978-3.555 0-1.437-.434-2.65-1.265-3.508-.83-.859-2.04-1.345-3.556-1.358-1.27-.013-2.476-.013-3.927.013l-.16.003v9.787Zm12.706.178V3.21c.423 0 .96.002 1.347.014h.002c.776.012 1.302.565 1.302 1.085 0 .335-.115.618-.309.82s-.477.332-.828.344c-.41.013-.705.013-1.18 0l-.298-.008.153.259 3.068 5.187.048.08h2.842l-.168-.257L67.36 7.17c1.01-.36 1.705-1.443 1.705-2.86 0-1.857-1.708-3.272-3.863-3.3-1.27-.012-2.54-.012-3.797 0l-.161.003v9.979h2.462ZM71.29 1.01h-.163v9.981h2.526V1.01h-2.363Zm3.989 0h-.227l.073.218 3.21 9.65.038.113h3.055l.038-.112 3.21-9.65.073-.22h-2.729l-.035.118-1.89 6.307-.002.003v.003l-.192.745-.193-.745v-.003l-.001-.003-1.89-6.307-.036-.117H75.28Z" />
  </svg>
);

const PRIZES = [
  { name: '$50 1win Voucher', icon: '🎟️', desc: 'Bonus funds to play and wager across all games!' },
  { name: '$100 Cash Prize', icon: '💵', desc: 'Direct cash credited to your real wallet balance!' },
  { name: '$20 1win Voucher', icon: '🎁', desc: 'Complimentary voucher for casino & live tables.' },
  { name: '0.005 BTC Crypto', icon: '🪙', desc: 'Instant crypto bonus sent to your account.' },
  { name: '$10 1win Voucher', icon: '🎫', desc: 'Daily sports and casino booster voucher.' },
  { name: '$250 Cash Prize', icon: '💰', desc: 'Top tier cash prize ready for withdrawal!' },
  { name: '50 Free Spins', icon: '🎰', desc: '50 free spins in top slot games with high RTP.' },
  { name: '5,000 1win Tokens', icon: '💎', desc: 'Claim exclusive 1win Tokens for your balance.' }
];

export default function FreeMoneyView({
  onLoginClick,
  onRegisterClick,
  onNavigate,
}) {
  const [activeChip, setActiveChip] = useState('fortuneWheel');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [prizeModalOpen, setPrizeModalOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  // Live countdown timer state (3 days, 1 hour, 26 mins, 27 secs)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 1,
    minutes: 26,
    seconds: 27,
  });

  // Cashback countdown timer state (6 days, 14 hours)
  const [cashbackTime, setCashbackTime] = useState({
    days: 6,
    hours: 14,
    minutes: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChipClick = (id) => {
    setActiveChip(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSpinClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Pick random prize index 0-7
    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[prizeIndex];

    // Calculate rotation: 5 full turns (1800 deg) + offset
    const segmentDegree = 360 / PRIZES.length;
    // Align segment to the right-hand pointer (0 deg is 3 o'clock)
    const targetAngle = 1800 + (360 - (prizeIndex * segmentDegree)) + (Math.random() * 10 - 5);
    const newRotation = wheelRotation + targetAngle;

    setWheelRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      setPrizeModalOpen(true);
    }, 4000);
  };

  return (
    <div className="freemoney-container">
      {/* Title */}
      <div className="freemoney-header">
        <h1 className="freemoney-title">Free money</h1>
      </div>

      {/* Sticky Chip Navigation Bar */}
      <div className="freemoney-chips-wrapper">
        <div className="freemoney-chips-scroll">
          <button
            className={`freemoney-chip ${activeChip === 'fortuneWheel' ? 'active' : ''}`}
            onClick={() => handleChipClick('fortuneWheel')}
          >
            <span>1win Wheel</span>
          </button>
          <button
            className={`freemoney-chip ${activeChip === 'luckyDrive' ? 'active' : ''}`}
            onClick={() => handleChipClick('luckyDrive')}
          >
            <LuckyDriveSvg />
          </button>
          <button
            className={`freemoney-chip ${activeChip === 'clicker' ? 'active' : ''}`}
            onClick={() => handleChipClick('clicker')}
          >
            <span>1win Token</span>
          </button>
          <button
            className={`freemoney-chip ${activeChip === 'loyaltyCashback' ? 'active' : ''}`}
            onClick={() => handleChipClick('loyaltyCashback')}
          >
            <span>Cashback</span>
          </button>
          <button
            className={`freemoney-chip ${activeChip === 'voucher' ? 'active' : ''}`}
            onClick={() => handleChipClick('voucher')}
          >
            <span>Vouchers</span>
          </button>
        </div>
      </div>

      {/* Main Blocks Stream */}
      <div className="freemoney-blocks-list">
        {/* CARD 1: 1win Wheel */}
        <div className="fm-wheel-card" id="fortuneWheel">
          {/* Info Button */}
          <button
            className="fm-wheel-info-btn"
            onClick={() => setRulesModalOpen(true)}
            aria-label="Wheel Rules"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.453-11.548a.64.64 0 1 1-.906.905.64.64 0 0 1 .906-.905m.187 6.643a.64.64 0 1 1-1.28 0V7.421a.64.64 0 0 1 1.28 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Header */}
          <div className="fm-wheel-header">
            <div className="fm-wheel-logo-box">
              <span className="fm-wheel-1win-text">1win</span>
              <span className="fm-wheel-badge-text">WHEEL</span>
            </div>
            <p className="fm-wheel-subtitle">Grab awesome bonuses every day</p>
          </div>

          {/* Wheel Graphic & Stage */}
          <div className="fm-wheel-stage">
            <div className="fm-wheel-rays" />

            {/* Rotator Disc */}
            <div className="fm-wheel-disc-wrap">
              <img
                src="/freemoney/wheel_disk.png"
                alt="1win Wheel"
                className="fm-wheel-img"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
                }}
              />
            </div>

            {/* Static Pointer Needle */}
            <img
              src="/freemoney/wheel_pointer.png"
              alt="Pointer"
              className="fm-wheel-pointer-img"
            />
          </div>

          {/* Action Spin Button */}
          <button
            className="fm-spin-btn"
            disabled={isSpinning}
            onClick={handleSpinClick}
          >
            {isSpinning ? 'Spinning...' : 'Spin'}
          </button>
        </div>

        {/* CARD 2: Lucky Drive Next Promo Banner */}
        <div className="fm-lucky-next-card" id="luckyDrive">
          <img
            src="/freemoney/lucky_drive_timer_bg.webp"
            alt="Promotion Background"
            className="fm-lucky-next-bg-img"
          />
          <img
            src="/freemoney/lucky_drive_timer_title.webp"
            alt="New Promotion Starts Soon"
            className="fm-lucky-next-car-title-img"
          />

          <div className="fm-lucky-next-timer-row">
            <span>Remaining:</span>
            <span className="fm-timer-badge">{timeLeft.days}</span>
            <span className="fm-timer-colon">:</span>
            <span className="fm-timer-badge">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="fm-timer-colon">:</span>
            <span className="fm-timer-badge">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="fm-timer-colon">:</span>
            <span className="fm-timer-badge">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>

        {/* CARD 3: Lucky Drive Lamborghini Monthly Draw */}
        <div className="fm-lucky-main-card">
          <div className="fm-lucky-live-badge">
            <span className="fm-live-dot" />
            <span className="fm-live-text">Car draw every month</span>
          </div>

          <div className="fm-lucky-title-sub">Supercar giveaway</div>
          <h2 className="fm-lucky-title-main">We are giving away Lamborghini</h2>

          <div className="fm-lucky-cars-img-wrap">
            <img
              src="/freemoney/lucky_drive_cars.webp"
              alt="Lamborghini and luxury cars"
              className="fm-lucky-cars-img"
            />
          </div>

          <div className="fm-lucky-tickets-row">
            <div className="fm-tickets-label">
              <span>Your Tickets:</span>
              <span style={{ color: '#ffffff' }}>0 / 32 collected</span>
            </div>
            <div className="fm-tickets-scroll">
              {Array.from({ length: 32 }, (_, i) => i + 1).map((tNum) => (
                <div key={tNum} className={`fm-ticket-item ${tNum === 1 ? 'active' : ''}`}>
                  {tNum === 1 && <div className="fm-ticket-badge-today" />}
                  {tNum}
                </div>
              ))}
            </div>
          </div>

          <div className="fm-lucky-actions">
            <button className="fm-btn-participate" onClick={onLoginClick}>
              Participate
            </button>
            <button className="fm-btn-winners" onClick={onLoginClick}>
              All winners
            </button>
          </div>
        </div>

        {/* CARD 4: 1win Token Clicker */}
        <div className="fm-card-banner fm-card-token" id="clicker">
          <div className="fm-card-content">
            <h3 className="fm-card-title">1win Token</h3>
            <p className="fm-card-desc">Earn tokens before they get listed on the exchange!</p>
            <button className="fm-card-btn" onClick={onLoginClick}>
              Open Clicker
            </button>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/fg-mobile-rebrand-v2.png" alt="1win Token Clicker" />
          </div>
        </div>

        {/* CARD 5: Email Verification */}
        <div className="fm-card-banner fm-card-email">
          <div className="fm-card-content">
            <h3 className="fm-card-title">100 Points bonus for verifying your email</h3>
            <button className="fm-card-btn" onClick={onLoginClick}>
              Verify
            </button>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/foreground_email_mobile.png" alt="Email Verification" />
          </div>
        </div>

        {/* CARD 6: Phone Verification */}
        <div className="fm-card-banner fm-card-phone">
          <div className="fm-card-content">
            <h3 className="fm-card-title">100 Points bonus for verifying your phone number</h3>
            <button className="fm-card-btn" onClick={onLoginClick}>
              Verify
            </button>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/foreground_phone_mobile.png" alt="Phone Verification" />
          </div>
        </div>

        {/* CARD 7: Sports Betting Points */}
        <div className="fm-card-banner fm-card-sports">
          <div className="fm-card-content">
            <h3 className="fm-card-title">1win Points for sports betting</h3>
            <p className="fm-card-desc">Collect points and exchange them for real money!</p>
            <button className="fm-card-btn" onClick={() => onNavigate && onNavigate('sports')}>
              Place a bet
            </button>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/ball-mobile-v2.png" alt="Sports Betting Points" />
          </div>
        </div>

        {/* CARD 8: App Install PWA */}
        <div className="fm-card-banner fm-card-pwa">
          <div className="fm-card-content">
            <h3 className="fm-card-title">200 Points bonus for installing the app</h3>
            <button className="fm-card-btn" onClick={onLoginClick}>
              Install
            </button>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/mobile-usd.png" alt="Install App Bonus" />
          </div>
        </div>

        {/* CARD 9: Push Notifications */}
        <div className="fm-card-banner fm-card-push">
          <div className="fm-card-content">
            <h3 className="fm-card-title">Get 100 Points for enabling push notifications</h3>
            <button className="fm-card-btn" onClick={onLoginClick}>
              Enable
            </button>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/fg-bw-mobile.png" alt="Push Notifications Bonus" />
          </div>
        </div>

        {/* CARD 10: Loyalty Card */}
        <div className="fm-card-banner fm-card-loyalty">
          <div className="fm-card-content">
            <h3 className="fm-card-title">Install a loyalty card and receive 100 Points</h3>
            <button className="fm-card-btn" onClick={onLoginClick}>
              Install card
            </button>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/bg-mobile.png" alt="Loyalty Card" />
          </div>
        </div>

        {/* CARD 11: Weekly Cashback */}
        <div className="fm-card-banner fm-card-cashback" id="loyaltyCashback">
          <div className="fm-card-content">
            <h3 className="fm-card-title">Weekly casino cashback</h3>
            <p className="fm-card-desc">Up to 30% refund of your lost funds every week</p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button className="fm-card-btn" onClick={() => onNavigate && onNavigate('casino')}>
                Details
              </button>
              <span style={{ fontSize: '12px', color: '#9ea6b3' }}>
                Next: {cashbackTime.days}d {cashbackTime.hours}h
              </span>
            </div>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/loyalty-cashback-foreground-mobile.png" alt="Casino Cashback" />
          </div>
        </div>

        {/* CARD 12: Vouchers & Social Media */}
        <div className="fm-card-banner fm-card-vouchers" id="voucher">
          <div className="fm-card-content" style={{ maxWidth: '62%' }}>
            <h3 className="fm-card-title">1win social media</h3>
            <p className="fm-card-desc">Vouchers, promo codes, exclusive bonuses and tournaments</p>
            <div className="fm-socials-row">
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="fm-social-btn">
                Telegram
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="fm-social-btn">
                Instagram
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="fm-social-btn">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/fg-mobile-rebrand.png" alt="Vouchers on Social Media" />
          </div>
        </div>

        {/* CARD 13: Founder's Blog */}
        <div className="fm-card-banner fm-card-blog">
          <div className="fm-card-content" style={{ maxWidth: '65%' }}>
            <h3 className="fm-card-title">1win Founder’s Blog</h3>
            <p className="fm-card-desc">Insider news, big updates, and giveaway announcements</p>
            <div className="fm-socials-row">
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="fm-social-btn">
                Telegram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="fm-social-btn">
                X (Twitter)
              </a>
            </div>
          </div>
          <div className="fm-card-artwork">
            <img src="/freemoney/mobile-fg-1win.png" alt="Founder's Blog" />
          </div>
        </div>
      </div>

      {/* Prize Won Congratulations Modal */}
      {prizeModalOpen && wonPrize && (
        <div className="fm-modal-overlay" onClick={() => setPrizeModalOpen(false)}>
          <div className="fm-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="fm-modal-close" onClick={() => setPrizeModalOpen(false)}>
              ✕
            </button>
            <div className="fm-modal-prize-icon">{wonPrize.icon}</div>
            <h3 className="fm-modal-title">Congratulations!</h3>
            <div className="fm-modal-prize-name">{wonPrize.name}</div>
            <p className="fm-modal-desc">{wonPrize.desc}</p>
            <button
              className="fm-modal-btn-claim"
              onClick={() => {
                setPrizeModalOpen(false);
                onLoginClick();
              }}
            >
              Claim Bonus
            </button>
          </div>
        </div>
      )}

      {/* 1win Wheel Rules Modal */}
      {rulesModalOpen && (
        <div className="fm-modal-overlay" onClick={() => setRulesModalOpen(false)}>
          <div className="fm-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="fm-modal-close" onClick={() => setRulesModalOpen(false)}>
              ✕
            </button>
            <div style={{ fontSize: '42px', marginBottom: '8px' }}>🎡</div>
            <h3 className="fm-modal-title">1win Wheel Rules</h3>
            <p className="fm-modal-desc" style={{ textAlign: 'left', fontSize: '13px', lineHeight: '1.5' }}>
              • Every registered player gets 1 free spin every 24 hours.<br />
              • Prizes include Vouchers, Cash rewards, Bitcoin crypto, and Free Spins.<br />
              • Won vouchers and bonuses are automatically credited to your bonus balance.<br />
              • Valid across all games, live tables and sports events.
            </p>
            <button
              className="fm-modal-btn-claim"
              onClick={() => {
                setRulesModalOpen(false);
                onRegisterClick();
              }}
            >
              Register & Spin Free
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
