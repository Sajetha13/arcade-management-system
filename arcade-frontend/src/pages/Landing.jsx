import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* 1. THE CABINET SECTION */}
      <div className="arcade-cabinet">
        <div className="marquee">
          <h1>ARCADE<br/>MANAGEMENT</h1>
        </div>

        <div className="screen">
          <p style={{ color: '#00ffff', marginBottom: '30px' }}>SYSTEM READY...</p>

          <button className="btn-insert-coin" onClick={() => navigate('/login')}>
            INSERT COIN
          </button>

          <button className="btn-join" onClick={() => navigate('/register')}>
            JOIN THE ARCADE
          </button>
        </div>
      </div>

      {/* 2. THE ABOUT SECTION (Visible on scroll) */}
      <div className="about-section">
        <h2>What is this?</h2>
        <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
          Welcome to the digital control tower. This platform allows arcade owners
          to monitor live machines, track high scores, and manage technicians
          all from one retro-styled terminal.
        </p>
        <p style={{ marginTop: '20px', color: '#ffff00' }}>
          SCROLL DOWN TO REVEAL FOOTER
        </p>
      </div>

      {/* 3. THE FOOTER */}
      <footer className="footer">
        © 2026 Arcade Management System | Built for Retro Gamers
      </footer>
    </div>
  );
}

export default Landing;