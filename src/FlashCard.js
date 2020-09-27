import React, { useState, useEffect, useRef } from "react";

export default function FlashCard({ card }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const frontEl = useRef();
  const backEl = useRef();

  const setMaxHieght = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backtHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backtHeight, 100));
  };
  useEffect(setMaxHieght, [card.question, card.answer, card.options]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHieght);
    return () => {
      window.removeEventListener("resize", setMaxHieght);
    };
  }, []);
  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
      style={{ height: height }}
    >
      <div className="front" ref={frontEl}>
        {card.question}
        <div className="flashcard-optoins">
          {card.options.map((option) => {
            return (
              <div className="flashcard-option" key={option}>
                {option}{" "}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {card.answer}
      </div>
    </div>
  );
}
