import React, { useState } from "react";


export function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    if (replace === true) {
      history.pop();
      setMode(history.slice(-1));
    }
    setMode(newMode);
    history.push(newMode);
  }

  function back (prevMode) {
    history.pop()
    setMode (history.slice(-1).toString())
  }

  return { mode, transition, back };
}

