import React from "react";
import FlashCard from "./FlashCard";
export default function FlashcardList({ flashcard }) {
  console.log(flashcard);
  return (
    <div className="card-grid">
      {flashcard.map((card) => {
        return <FlashCard card={card} key={card.id} />;
      })}
    </div>
  );
}
