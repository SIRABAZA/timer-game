import { useState, useRef } from "react";
import ResultModal from "./ResultModal";
// let timer;
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();

  const dialog = useRef();

  const [timerRemaning, setTimerRemaning] = useState(targetTime * 1000);

  const timerIsActive = timerRemaning > 0 && timerRemaning < targetTime * 1000;
  if (timerRemaning <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimerRemaning(targetTime * 1000);
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimerRemaning((prevTimerRemaining) => prevTimerRemaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remaningTime={timerRemaning}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running... " : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
