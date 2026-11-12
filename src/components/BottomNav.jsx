export default function BottomNav({ activeTab = 'home', onTabChange }) {
  const handleClick = (e, page) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange(page);
    }
  };

  return (
    <nav className="bottom-nav" id="bottom-nav">
      <a
        href="#"
        className={`bottom-nav-item${activeTab === 'menu' ? ' bottom-nav-item--active' : ''}`}
        data-page="menu"
        onClick={(e) => handleClick(e, 'menu')}
      >
        <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
        <span className="bottom-nav-label">Menu</span>
      </a>
      <a
        href="#"
        className={`bottom-nav-item${activeTab === 'home' ? ' bottom-nav-item--active' : ''}`}
        data-page="home"
        onClick={(e) => handleClick(e, 'home')}
      >
        <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        <span className="bottom-nav-label">Home</span>
      </a>
      <a
        href="#"
        className={`bottom-nav-item${activeTab === 'casino' ? ' bottom-nav-item--active' : ''}`}
        data-page="casino"
        onClick={(e) => handleClick(e, 'casino')}
      >
        <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c1.856 0 3.56.634 4.912 1.696l-1.42 2.458A5.965 5.965 0 0 0 12 7c-1.312 0-2.51.422-3.492 1.154L7.088 5.696A7.962 7.962 0 0 1 12 4zm6.304 3.088l-2.458 1.42A5.965 5.965 0 0 1 17 12c0 1.312-.422 2.51-1.154 3.492l2.458 1.42A7.962 7.962 0 0 0 20 12c0-1.856-.634-3.56-1.696-4.912zm-.608 11.216l-2.458-1.42A5.965 5.965 0 0 1 12 17c-1.312 0-2.51-.422-3.492-1.154l-1.42 2.458A7.962 7.962 0 0 0 12 20c1.856 0 3.56-.634 4.912-1.696zM5.696 16.912l2.458-1.42A5.965 5.965 0 0 1 7 12c0-1.312.422-2.51 1.154-3.492L5.696 7.088A7.962 7.962 0 0 0 4 12c0 1.856.634 3.56 1.696 4.912zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
        <span className="bottom-nav-label">Casino</span>
      </a>
      <a
        href="#"
        className={`bottom-nav-item${activeTab === 'free-money' || activeTab === 'free-game' ? ' bottom-nav-item--active' : ''}`}
        data-page="free-money"
        onClick={(e) => handleClick(e, 'free-money')}
      >
        <img className="bottom-nav-icon" src="/Assites/bnev/obngift.png" alt="Free money" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
        <span className="bottom-nav-label">Free money</span>
      </a>
      <a
        href="#"
        className={`bottom-nav-item${activeTab === 'sports' ? ' bottom-nav-item--active' : ''}`}
        data-page="sports"
        onClick={(e) => handleClick(e, 'sports')}
      >
        <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_755_9728)">
            <g clipPath="url(#clip1_755_9728)">
              <path d="M23.3564 6.82072C23.8634 6.34353 12.1722 18.0049 10.681 19.4962C10.6404 19.5367 10.5854 19.5595 10.5281 19.5595C10.4708 19.5595 10.4158 19.5367 10.3753 19.4962C9.53272 18.6462 5.44675 14.5527 4.52964 13.6431C4.48912 13.6025 4.46636 13.5476 4.46636 13.4902C4.46636 13.4329 4.48912 13.3779 4.52964 13.3374L17.2498 0.661941C17.5279 0.393162 17.8995 0.24292 18.2862 0.24292C18.673 0.24292 19.0446 0.393162 19.3226 0.661941L23.3862 4.74045C23.6533 5.02274 23.7996 5.39811 23.794 5.78665C23.7885 6.17519 23.6314 6.54621 23.3564 6.82072Z" fill="currentColor"/>
              <path d="M7.69105 5.3444C7.23837 5.79471 6.62583 6.04749 5.98732 6.04749C5.34881 6.04749 4.73627 5.79471 4.28359 5.3444L4.14192 5.18782C3.7464 4.72683 3.53968 4.13341 3.56318 3.52645C3.58668 2.9195 3.83866 2.34383 4.26863 1.9148C4.69861 1.48576 5.27482 1.23505 5.88183 1.21289C6.48884 1.19072 7.08181 1.39874 7.54193 1.79528C7.5974 1.83874 7.64973 1.88608 7.69851 1.93694C8.14782 2.39061 8.39927 3.0037 8.39787 3.64221C8.39647 4.28072 8.14235 4.89271 7.69105 5.3444Z" fill="currentColor"/>
              <path d="M4.08973 14.4036C4.08973 14.9479 4.08973 16.1484 4.00771 17.6545C4.00633 17.7269 3.98968 17.7982 3.95884 17.8637C3.928 17.9293 3.88368 17.9875 3.82877 18.0348L0.60771 20.7935C0.484701 20.9023 0.385452 21.0352 0.316171 21.184C0.246891 21.3328 0.209071 21.4943 0.205078 21.6585C0.20638 22.0001 0.343136 22.3272 0.585342 22.5681L1.65903 23.6418C1.87929 23.8666 2.17944 23.9952 2.49412 23.9997C2.64859 24.003 2.80195 23.9727 2.94357 23.9109C3.08519 23.8492 3.21168 23.7573 3.31429 23.6418L6.24456 20.3462C6.31582 20.274 6.41167 20.2314 6.51298 20.2269C6.51298 20.2269 8.93623 20.2269 9.8086 20.1747C9.8757 20.1747 9.84588 20.1747 9.84588 20.1747L9.10026 19.4291C9.07626 19.4199 9.04971 19.4199 9.0257 19.4291L6.43096 19.4664C6.27682 19.4674 6.12466 19.5012 5.98456 19.5655C5.84445 19.6297 5.71959 19.723 5.61824 19.8392L2.7178 23.1199C2.6508 23.1883 2.56002 23.2284 2.46429 23.2317C2.41553 23.2314 2.36732 23.2214 2.3225 23.2022C2.27768 23.183 2.23716 23.155 2.20333 23.1199L1.10727 22.0238C1.02185 21.9389 0.973589 21.8236 0.973061 21.7032C0.975159 21.6465 0.988804 21.5908 1.01316 21.5395C1.03752 21.4882 1.07208 21.4424 1.11473 21.4049L4.38798 18.6089C4.51165 18.5072 4.61172 18.3799 4.68124 18.2357C4.75077 18.0915 4.78809 17.9339 4.79061 17.7738C4.79061 16.6181 4.85771 15.783 4.86517 15.2163C4.87316 15.1947 4.87316 15.1709 4.86517 15.1492L4.08973 14.4036Z" fill="currentColor"/>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_755_9728"><rect width="24" height="24" fill="white"/></clipPath>
            <clipPath id="clip1_755_9728"><rect width="24" height="24" fill="white"/></clipPath>
          </defs>
        </svg>
        <span className="bottom-nav-label">Sports</span>
      </a>
    </nav>
  );
}
