import React from 'react';
import './Game.style.scss';

const Game = ({
  textBox,
  setTtxtBox,
  palindromes,
  score,
  validate,
  msgAlert,
}) => {
  const formColor = msgAlert.visible ? 'error' : '';
  return (
    <section className="section-game">
      <section className="actual-score">
        <h3>Actual Score</h3>
        <p>{score}</p>
      </section>
      <section className="section-form">
        <p className="label">Palindromes</p>
        <section className="form">
          <input
            aria-label="palindrome-input"
            className={formColor}
            type="text"
            value={textBox}
            placeholder="Type here palindromes"
            onChange={(e) => setTtxtBox(e.target.value)}
          />
          <button onClick={validate}>Validate</button>
        </section>
        {msgAlert.visible && <p className="label msg">{msgAlert.msg}</p>}
        <section className="palindromes-table">
          <h3>Palindromes List</h3>
          {palindromes.map((palindrome, index) => (
            <p key={index}>{palindrome}</p>
          ))}
        </section>
      </section>
    </section>
  );
};

export default Game;
