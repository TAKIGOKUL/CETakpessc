import React from 'react';
import { Link } from 'react-router-dom';

const GameMenu = () => {
  return (
    <div className="game-menu-container">
      <div className="game-menu-header">
        <h1 className="game-menu-title">🎮 Game Center 🎮</h1>
        <p className="game-menu-subtitle">Choose your favorite puzzle game and test your skills!</p>
      </div>

      <div className="game-selection">
        <div className="game-card">
          <div className="game-card-icon">🧩</div>
          <h3 className="game-card-title">Sliding Puzzle</h3>
          <p className="game-card-description">
            Classic 3x3 sliding puzzle. Arrange numbered tiles from 1-8 in order!
          </p>
          <div className="game-card-features">
            <span className="feature-tag">3x3 Grid</span>
            <span className="feature-tag">Numbered Tiles</span>
            <span className="feature-tag">Classic Puzzle</span>
          </div>
          <Link to="sliding-puzzle" className="game-card-button">
            <span>🚀 Play Now</span>
          </Link>
        </div>

        <div className="game-card">
          <div className="game-card-icon">🎨</div>
          <h3 className="game-card-title">Discoloration Puzzle</h3>
          <p className="game-card-description">
            Binary color puzzle. Make all cells light green by toggling between 2 colors!
          </p>
          <div className="game-card-features">
            <span className="feature-tag">3x3 Grid</span>
            <span className="feature-tag">2 Colors</span>
            <span className="feature-tag">Binary Toggle</span>
          </div>
          <Link to="discoloration" className="game-card-button">
            <span>🚀 Play Now</span>
          </Link>
        </div>
      </div>

      <div className="game-menu-actions">
        <Link to="/" className="game-back-button">
          <span>← Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default GameMenu;
