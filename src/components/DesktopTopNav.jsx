import { useState } from 'react';

const tabs = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
  },
  {
    id: 'casino',
    label: 'Casino',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
  },
  {
    id: 'free-money',
    label: 'Free money',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
      </svg>
    ),
  },
  {
    id: 'sports',
    label: 'Sports',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.18 12.96C3.06 12.65 3 12.33 3 12c0-4.97 4.03-9 9-9 4.97 0 9 4.03 9 9 0 .33-.06.65-.18.96l-1.62-1.62c.5-1.18.8-2.47.8-3.84 0-2.61-1.67-4.94-4-5.79V4c0 .83-.67 1.5-1.5 1.5S13.5 4.83 13.5 4V3.06c-.49-.04-.99-.06-1.5-.06s-1.01.02-1.5.06V4c0 .83-.67 1.5-1.5 1.5S7.5 4.83 7.5 4V3.21c-2.33.85-4 3.18-4 5.79 0 1.37.3 2.66.8 3.84L3.18 12.96z"/>
      </svg>
    ),
  },
];

export default function DesktopTopNav({ onLoginClick, onRegisterClick }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="desktop-topnav" id="desktop-topnav">
      <a href="#" className="topnav-logo">
        <img src="/Assites/full-v2.png" alt="1win" width="120" height="36" />
      </a>
      <div className="topnav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`topnav-tab${activeTab === tab.id ? ' topnav-tab--active' : ''}`}
            data-page={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="topnav-actions">
        <button className="btn-login" id="btn-login-desktop" onClick={onLoginClick}>Login</button>
        <button className="btn-register" id="btn-register-desktop" onClick={onRegisterClick}>Registration</button>
      </div>
    </nav>
  );
}
