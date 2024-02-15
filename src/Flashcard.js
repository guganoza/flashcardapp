import React, { useState, useEffect, useRef } from "react";
import "./App.css";
function Flashcard({ flashcard }) {
  const [flip, setflip] = useState(false);
  const [height, setHeight] = useState("initial");
  const frontEL = useRef();
  const backEL = useRef();

  function setMaxHeight() {
    const frontHeight = frontEL.current.getBoundingClientRect().height;
    const backHeight = backEL.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [
    flashcard.question,
    flashcard.answer,
    flashcard.options,
  ]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, [height]);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setflip(!flip)}
    >
      <div className="front" ref={frontEL}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option) => {
            return (
              <div className="flashcard-option" key={option}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backEL}>
        {flashcard.answer}
      </div>
    </div>
  );
}

export default Flashcard;
