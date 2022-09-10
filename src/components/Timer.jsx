import React, { useState, useEffect } from 'react';
import './Timer.style.scss';

export default function Timer({ isPlaying, endGame }) {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    if (timer < 0) {
      endGame(false);
      setTimer(30);
    }
  }, [isPlaying, timer, endGame]);

  return (
    <section className="timer-container">
      <div className="timer">
        <h3>{timer}</h3>
      </div>
    </section>
  );
}
