export default function MobileHeader({ onLoginClick, onRegisterClick }) {
  return (
    <header className="mobile-header" id="mobile-header">
      <a href="#" className="header-logo">
        <img src="/Assites/a Logo-top-bg-removebg-preview.png" alt="1win" width="80" height="32" />
      </a>
      <div className="header-actions">
        <button className="btn-login" id="btn-login" onClick={onLoginClick}>Login</button>
        <button className="btn-register" id="btn-register" onClick={onRegisterClick}>Registration</button>
      </div>
    </header>
  );
}
