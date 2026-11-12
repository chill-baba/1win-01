export default function CurrencyIcon({ currency, size = 36 }) {
  if (!currency) return null;

  const s = size;
  const radius = s / 2;

  switch (currency.code) {
    case '1WIN':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#c6924b" />
          <circle cx="18" cy="18" r="16.5" stroke="#dfb679" strokeWidth="1" />
          <text x="18" y="23" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">
            1w
          </text>
        </svg>
      );

    case 'BCH':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#0ac18e" />
          <g transform="translate(18, 18) rotate(-18) translate(-18, -18)">
            <text x="18" y="24" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" fontFamily="sans-serif">
              ₿
            </text>
          </g>
        </svg>
      );

    case 'BNB':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#f3ba2f" />
          <path
            d="M18 10l2.6 2.6-6.2 6.2 3.6 3.6 2.6-2.6 2.6 2.6-5.2 5.2-6.2-6.2 6.2-6.2 2.6 2.6-2.6 2.6z"
            fill="#ffffff"
            style={{ display: 'none' }}
          />
          <g fill="#ffffff">
            <path d="M18 11.5l3.2 3.2-1.5 1.5-1.7-1.7-1.7 1.7-1.5-1.5z"/>
            <path d="M12.5 17l1.5-1.5 1.7 1.7-1.7 1.7z"/>
            <path d="M23.5 17l-1.5-1.5-1.7 1.7 1.7 1.7z"/>
            <path d="M18 22.5l-1.7-1.7 1.7-1.7 1.7 1.7z"/>
            <path d="M18 15.2l2.3 2.3-2.3 2.3-2.3-2.3z"/>
          </g>
        </svg>
      );

    case 'BTC':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#f7931a" />
          <text x="18" y="24" textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800" fontFamily="sans-serif">
            ₿
          </text>
        </svg>
      );

    case 'DASH':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#008de4" />
          <path d="M11 14h8c2.8 0 5 1.8 5 4s-2.2 4-5 4h-8l1.8-8z" fill="#ffffff" />
          <path d="M14 17h5c1 0 1.8.4 1.8 1s-.8 1-1.8 1h-5l.5-2z" fill="#008de4" />
        </svg>
      );

    case 'DOGE':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#c2a633" />
          <text x="18" y="24" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" fontFamily="sans-serif">
            Ð
          </text>
        </svg>
      );

    case 'ETC':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#121815" />
          <path d="M18 8l5 8.5-5 3-5-3 5-8.5z" fill="#10b981" />
          <path d="M18 20.5l5-3-5 7.5-5-7.5 5 3z" fill="#059669" />
          <path d="M18 8v11.5l5-3L18 8z" fill="#34d399" />
          <path d="M18 20.5v4.5l5-7.5-5 3z" fill="#10b981" />
        </svg>
      );

    case 'ETH':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#627eea" />
          <path d="M18 8l5 8.5-5 3-5-3 5-8.5z" fill="#ffffff" fillOpacity="0.8" />
          <path d="M18 20.5l5-3-5 7.5-5-7.5 5 3z" fill="#ffffff" fillOpacity="0.8" />
          <path d="M18 8v11.5l5-3L18 8z" fill="#ffffff" />
          <path d="M18 20.5v4.5l5-7.5-5 3z" fill="#ffffff" />
        </svg>
      );

    case 'HYPE':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#082324" />
          <circle cx="14" cy="18" r="4" fill="#00d6aa" />
          <circle cx="22" cy="18" r="4" fill="#00d6aa" />
          <circle cx="18" cy="18" r="3" fill="#082324" />
        </svg>
      );

    case 'LINK':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#ffffff" />
          <path
            d="M18 10l6.5 3.8v7.4L18 25l-6.5-3.8v-7.4L18 10z"
            stroke="#375bd2"
            strokeWidth="3.2"
            fill="none"
          />
        </svg>
      );

    case 'LTC':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#b8bcbe" />
          <text x="18" y="24" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="800" fontFamily="sans-serif">
            Ł
          </text>
        </svg>
      );

    case 'NEAR':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#00ec97" />
          <path
            d="M13 23V13l8.5 10H23V13"
            stroke="#000000"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'PEPE':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#3d8b37" />
          <ellipse cx="18" cy="19" rx="10" ry="7.5" fill="#4fa743" />
          <circle cx="14" cy="14" r="3" fill="#ffffff" />
          <circle cx="14" cy="14" r="1.5" fill="#000000" />
          <circle cx="22" cy="14" r="3" fill="#ffffff" />
          <circle cx="22" cy="14" r="1.5" fill="#000000" />
          <path d="M12 21c2 2.5 8 2.5 10 0" stroke="#b91c1c" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'INR':
      return (
        <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#00a34c" />
          <text x="18" y="24" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="700" fontFamily="sans-serif">
            ₹
          </text>
        </svg>
      );

    default:
      return (
        <div
          style={{
            width: `${s}px`,
            height: `${s}px`,
            borderRadius: '50%',
            backgroundColor: currency.badgeBg || '#10b981',
            color: currency.textColor || '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: s > 30 ? '16px' : '13px',
            fontWeight: '700',
            flexShrink: 0,
          }}
        >
          {currency.symbol || currency.code?.slice(0, 3)}
        </div>
      );
  }
}
