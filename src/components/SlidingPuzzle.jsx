import React, { useState, useEffect, useCallback } from 'react';

const SlidingPuzzle = () => {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Initialize the puzzle with numbers 1-8 and one empty space
  const initializePuzzle = useCallback(() => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, null];
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setMoves(0);
    setGameWon(false);
    setTimeElapsed(0);
    setGameStarted(true);
  }, []);

  // Check if the puzzle is solved
  const checkWin = useCallback((currentTiles) => {
    const winCondition = [1, 2, 3, 4, 5, 6, 7, 8, null];
    return JSON.stringify(currentTiles) === JSON.stringify(winCondition);
  }, []);

  // Handle tile click
  const handleTileClick = useCallback((index) => {
    if (gameWon || !gameStarted) return;

    const newTiles = [...tiles];
    const emptyIndex = newTiles.indexOf(null);
    
    // Check if the clicked tile is adjacent to the empty space
    const isAdjacent = (
      (index === emptyIndex - 1 && index % 3 !== 2) || // Left
      (index === emptyIndex + 1 && index % 3 !== 0) || // Right
      (index === emptyIndex - 3) || // Up
      (index === emptyIndex + 3)    // Down
    );

    if (isAdjacent) {
      // Swap the tile with the empty space
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(prev => prev + 1);

      // Check if the puzzle is solved
      if (checkWin(newTiles)) {
        setGameWon(true);
      }
    }
  }, [tiles, gameWon, gameStarted, checkWin]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    } else if (gameWon) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="sliding-puzzle-container">
      <div className="puzzle-header">
        <h2 className="puzzle-title">🎯 Sliding Puzzle Challenge</h2>
        <p className="puzzle-description">Arrange the numbered tiles from 1 to 8 in order!</p>
      </div>

      <div className="puzzle-stats">
        <div className="stat-item">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{formatTime(timeElapsed)}</span>
        </div>
      </div>

      <div className="puzzle-board">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`puzzle-tile ${tile === null ? 'empty' : ''} ${gameWon ? 'won' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>

      <div className="puzzle-controls">
        {!gameStarted ? (
          <button className="puzzle-start-btn" onClick={initializePuzzle}>
            🚀 Start Puzzle
          </button>
        ) : (
          <button className="puzzle-reset-btn" onClick={initializePuzzle}>
            🔄 New Game
          </button>
        )}
      </div>

      {gameWon && (
        <div className="puzzle-win-message">
          <div className="win-content">
            <h3>🎉 Congratulations! 🎉</h3>
            <p>You solved the puzzle in {moves} moves and {formatTime(timeElapsed)}!</p>
            <div className="win-stats">
              <div className="win-stat">
                <span className="win-stat-label">Moves:</span>
                <span className="win-stat-value">{moves}</span>
              </div>
              <div className="win-stat">
                <span className="win-stat-label">Time:</span>
                <span className="win-stat-value">{formatTime(timeElapsed)}</span>
              </div>
            </div>
            <button className="puzzle-play-again-btn" onClick={initializePuzzle}>
              🎮 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlidingPuzzle;
