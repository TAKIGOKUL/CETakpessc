import React, { useState, useEffect, useCallback } from 'react';

const DiscolorationGame = () => {
  const [grid, setGrid] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [level, setLevel] = useState(1);
  const [gridSize, setGridSize] = useState(3);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [levelStats, setLevelStats] = useState([]);

  // Initialize the grid with random colors (only 2 shades)
  const initializeGame = useCallback(() => {
    const colors = ['#4ade80', '#16a34a']; // Light green and dark green
    const newGrid = [];
    const totalCells = gridSize * gridSize;
    
    for (let i = 0; i < totalCells; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newGrid.push(randomColor);
    }
    
    setGrid(newGrid);
    setMoves(0);
    setGameWon(false);
    setTimeElapsed(0);
    setGameStarted(true);
    setShowLevelComplete(false);
  }, [gridSize]);

  // Start new game (reset to level 1)
  const startNewGame = useCallback(() => {
    setLevel(1);
    setGridSize(3);
    setMoves(0);
    setGameWon(false);
    setTimeElapsed(0);
    setGameStarted(true);
    setShowLevelComplete(false);
    setLevelStats([]);
    
    const colors = ['#4ade80', '#16a34a'];
    const newGrid = [];
    for (let i = 0; i < 9; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newGrid.push(randomColor);
    }
    setGrid(newGrid);
  }, []);

  // Check if the game is won (all cells are light green)
  const checkWin = useCallback((currentGrid) => {
    return currentGrid.every(color => color === '#4ade80');
  }, []);

  // Check if level is complete (8 out of 9 cells are same color in 3x3)
  const checkLevelComplete = useCallback((currentGrid) => {
    if (gridSize !== 3) return false;
    
    const lightGreenCount = currentGrid.filter(color => color === '#4ade80').length;
    const darkGreenCount = currentGrid.filter(color => color === '#16a34a').length;
    
    // Level complete if 8 cells are the same color
    return lightGreenCount === 8 || darkGreenCount === 8;
  }, [gridSize]);

  // Progress to next level (4x4)
  const progressToNextLevel = useCallback(() => {
    // Save current level stats
    const currentLevelStats = {
      level: level,
      gridSize: gridSize,
      moves: moves,
      time: timeElapsed
    };
    setLevelStats(prev => [...prev, currentLevelStats]);
    
    setLevel(2);
    setGridSize(4);
    setMoves(0);
    setTimeElapsed(0); // Reset timer for new level
    setShowLevelComplete(false);
    
    const colors = ['#4ade80', '#16a34a'];
    const newGrid = [];
    for (let i = 0; i < 16; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newGrid.push(randomColor);
    }
    setGrid(newGrid);
  }, [level, gridSize, moves, timeElapsed]);

  // Toggle color function (between 2 colors)
  const toggleColor = useCallback((currentColor) => {
    return currentColor === '#4ade80' ? '#16a34a' : '#4ade80';
  }, []);

  // Handle cell click - toggles the clicked cell and its neighbors
  const handleCellClick = useCallback((index) => {
    if (gameWon || !gameStarted || showLevelComplete) return;

    const newGrid = [...grid];
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    
    // Toggle the clicked cell
    newGrid[index] = toggleColor(newGrid[index]);
    
    // Toggle adjacent cells (up, down, left, right)
    const adjacentCells = [];
    
    // Top neighbor
    if (row > 0) {
      adjacentCells.push(index - gridSize);
    }
    
    // Bottom neighbor
    if (row < gridSize - 1) {
      adjacentCells.push(index + gridSize);
    }
    
    // Left neighbor
    if (col > 0) {
      adjacentCells.push(index - 1);
    }
    
    // Right neighbor
    if (col < gridSize - 1) {
      adjacentCells.push(index + 1);
    }
    
    // Toggle all adjacent cells
    adjacentCells.forEach(cellIndex => {
      newGrid[cellIndex] = toggleColor(newGrid[cellIndex]);
    });

    setGrid(newGrid);
    setMoves(prev => prev + 1);

    // Check if level is completed (8 out of 9 cells same color in 3x3)
    if (checkLevelComplete(newGrid)) {
      // Save level stats before showing completion
      const currentLevelStats = {
        level: level,
        gridSize: gridSize,
        moves: moves + 1, // Include the current move
        time: timeElapsed
      };
      setLevelStats(prev => [...prev, currentLevelStats]);
      setShowLevelComplete(true);
    }
    // Check if the game is won (all cells light green)
    else if (checkWin(newGrid)) {
      setGameWon(true);
    }
  }, [grid, gameWon, gameStarted, showLevelComplete, checkWin, checkLevelComplete, toggleColor, gridSize]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (gameStarted && !gameWon && !showLevelComplete) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    } else if (gameWon || showLevelComplete) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon, showLevelComplete]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="discoloration-game-container">
      <div className="game-header">
        <h2 className="game-title">🎨 Discoloration Puzzle</h2>
        <p className="game-description">Make all cells light green! Click a cell to toggle between light and dark green.</p>
        <div className="level-info">
          <span className="level-badge">Level {level} - {gridSize}x{gridSize}</span>
        </div>
      </div>

      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{formatTime(timeElapsed)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Level:</span>
          <span className="stat-value">{level}/2</span>
        </div>
      </div>

      <div className="target-pattern">
        <h3>Target: All Green</h3>
        <div className="target-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {Array.from({ length: gridSize * gridSize }, (_, index) => (
            <div
              key={index}
              className="target-cell"
              style={{ backgroundColor: '#4ade80' }}
            />
          ))}
        </div>
      </div>

      <div className="game-grid discoloration-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {grid.map((color, index) => (
          <div
            key={index}
            className={`game-cell ${gameWon ? 'won' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>

      <div className="game-controls">
        {!gameStarted ? (
          <button className="game-start-btn" onClick={startNewGame}>
            🚀 Start Game
          </button>
        ) : (
          <button className="game-reset-btn" onClick={startNewGame}>
            🔄 New Game
          </button>
        )}
      </div>

      {showLevelComplete && (
        <div className="game-win-message">
          <div className="win-content">
            <h3>🎉 Level {level} Complete! 🎉</h3>
            <p>Great job! You got 8 cells the same color in the {gridSize}x{gridSize} puzzle!</p>
            <div className="win-stats">
              <div className="win-stat">
                <span className="win-stat-label">Moves Used:</span>
                <span className="win-stat-value">{moves}</span>
              </div>
              <div className="win-stat">
                <span className="win-stat-label">Time Taken:</span>
                <span className="win-stat-value">{formatTime(timeElapsed)}</span>
              </div>
            </div>
            <button className="game-play-again-btn" onClick={progressToNextLevel}>
              🚀 Next Level (4x4)
            </button>
          </div>
        </div>
      )}

      {gameWon && (
        <div className="game-win-message">
          <div className="win-content">
            <h3>🎉 Game Complete! 🎉</h3>
            <p>You completed both levels! Here are your stats:</p>
            
            <div className="level-stats-summary">
              {levelStats.map((stat, index) => (
                <div key={index} className="level-stat-item">
                  <h4>Level {stat.level} ({stat.gridSize}x{stat.gridSize})</h4>
                  <div className="level-stat-details">
                    <span>Moves: {stat.moves}</span>
                    <span>Time: {formatTime(stat.time)}</span>
                  </div>
                </div>
              ))}
              <div className="level-stat-item">
                <h4>Level 2 (4x4) - Final</h4>
                <div className="level-stat-details">
                  <span>Moves: {moves}</span>
                  <span>Time: {formatTime(timeElapsed)}</span>
                </div>
              </div>
            </div>
            
            <div className="win-stats">
              <div className="win-stat">
                <span className="win-stat-label">Total Moves:</span>
                <span className="win-stat-value">{levelStats.reduce((sum, stat) => sum + stat.moves, 0) + moves}</span>
              </div>
              <div className="win-stat">
                <span className="win-stat-label">Total Time:</span>
                <span className="win-stat-value">{formatTime(levelStats.reduce((sum, stat) => sum + stat.time, 0) + timeElapsed)}</span>
              </div>
            </div>
            <button className="game-play-again-btn" onClick={startNewGame}>
              🎮 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscolorationGame;
