import { useState, useEffect } from 'react';

/**
 * LoadingSkeleton component matching the 1win app initial splash/loading skeleton screen:
 * - Header skeleton: 1win brand logo on left, capsule pill skeleton, search/button pill, menu/profile icon
 * - Centered 1win logo watermark with subtle glowing pulse animation
 * - Release / version hash at the bottom center
 * - Bottom navigation skeleton bar with 5 circular icon placeholders
 * - Shimmer sweep / pulse effect across all placeholder elements
 */
export default function LoadingSkeleton({ onFinished, minDuration = 1200 }) {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Keep skeleton visible for at least minDuration to give smooth initial load experience
    const timer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        setRemoved(true);
        if (onFinished) onFinished();
      }, 450); // match fade transition
      return () => clearTimeout(removeTimer);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onFinished]);

  if (removed) return null;

  return (
    <div
      className={`app-loading-skeleton${fading ? ' fade-out' : ''}`}
      aria-label="Loading"
      role="status"
    >
      {/* Top Header Skeleton */}
      <header className="skeleton-header">
        <div className="skeleton-header-left">
          <img
            src="/Assites/a Logo-top-bg-removebg-preview.png"
            alt="1win"
            className="skeleton-logo-img"
          />
        </div>

        <div className="skeleton-header-right">
          {/* Top pill (stacked oval / capsule) */}
          <div className="skeleton-capsule-group">
            <div className="skeleton-box skeleton-pill-small"></div>
            <div className="skeleton-box skeleton-pill-bar"></div>
          </div>
          {/* Main button skeleton */}
          <div className="skeleton-box skeleton-btn-main"></div>
          {/* Square/icon button skeleton */}
          <div className="skeleton-box skeleton-btn-square"></div>
        </div>
      </header>

      {/* Main Center Area with glowing / pulsing 1win logo */}
      <main className="skeleton-center">
        <div className="skeleton-watermark-wrap">
          <img
            src="/Assites/a Logo-top-bg-removebg-preview.png"
            alt="1win Loading"
            className="skeleton-watermark-img"
          />
        </div>
      </main>

      {/* Bottom Footer Area */}
      <footer className="skeleton-footer">
        {/* Release hash / version text */}
        <div className="skeleton-hash" translate="no">
          d65ec7216d3f395c8104f3c055ac8e42
        </div>

        {/* 5-item Bottom Navigation Skeleton */}
        <nav className="skeleton-bottom-nav">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div key={idx} className="skeleton-nav-item">
              <div className="skeleton-nav-icon">
                {/* User/avatar circle with base arc */}
                <span className="skeleton-avatar-head"></span>
                <span className="skeleton-avatar-body"></span>
              </div>
            </div>
          ))}
        </nav>
      </footer>
    </div>
  );
}
