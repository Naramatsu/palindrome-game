import React, { useState } from 'react';
import Timer from './components/Timer';
import Game from './components/Game';
import './App.style.scss';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [historyScore, setHistoryScore] = useState([]);
  const [palindromes, setPalindromes] = useState([]);
  const [textBox, setTtxtBox] = useState('');
  const [msgAlert, setMsgAlert] = useState({
    visible: false,
    msg: '',
  });

  const endGame = () => {
    setHistoryScore([...historyScore, score]);
    setIsPlaying(false);
    setTtxtBox('');
    setPalindromes([]);
    setScore(0);
  };

  const highScore = () => {
    if (historyScore.length) return Math.max(...historyScore);
  };

  const validate = () => {
    const temp = textBox.split('').reverse().join('');
    if (temp.trim() === '') {
      setMsgAlert({
        visible: false,
        msg: '',
      });
      return;
    }
    if (!palindromes.includes(textBox)) {
      if (textBox === temp) {
        if (textBox.includes(' ')) {
          setScore(score + 2);
        } else {
          setScore(score + 1);
        }
        setPalindromes([...palindromes, textBox]);
        setTtxtBox('');
        setMsgAlert({
          visible: false,
          msg: '',
        });
      } else {
        setMsgAlert({
          visible: true,
          msg: 'This is not a palindrome, Please try again...!',
        });
      }
    } else {
      setMsgAlert({
        visible: true,
        msg: 'This palindrome is already commited',
      });
    }
  };

  return (
    <main className="main-container">
      <h1>Palindrome's Game</h1>
      <section className="section-top">
        <section className="section-history">
          <h3 className="title">High Score</h3>
          <p>{highScore()}</p>
        </section>
        {isPlaying ? (
          <Timer isPlaying={isPlaying} endGame={endGame} />
        ) : (
          <section className="btn-timer">
            <button onClick={() => setIsPlaying(true)}>Start</button>
          </section>
        )}
        <section className="section-history">
          <h3 className="title">History Score</h3>
          {historyScore.reverse().map((score, index) => (
            <p key={index}>{score}</p>
          ))}
        </section>
      </section>
      <section style={{ textAlign: 'center' }}>
        {historyScore.length && !isPlaying ? <h3>GAME OVER!</h3> : ''}
      </section>
      {isPlaying && (
        <Game
          textBox={textBox}
          setTtxtBox={setTtxtBox}
          palindromes={palindromes}
          score={score}
          validate={validate}
          msgAlert={msgAlert}
        />
      )}
    </main>
  );
}
