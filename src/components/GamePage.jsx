import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import GameMenu from './GameMenu';
import SlidingPuzzle from './SlidingPuzzle';
import DiscolorationGame from './DiscolorationGame';

const GamePage = () => {
  return (
    <div className="game-page">
      <Navbar />
      <div className="game-page-container">
        <Routes>
          <Route index element={<GameMenu />} />
          <Route path="sliding-puzzle" element={<SlidingPuzzle />} />
          <Route path="discoloration" element={<DiscolorationGame />} />
        </Routes>
      </div>
    </div>
  );
};

export default GamePage;