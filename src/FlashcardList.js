import React from "react";
import Flashcard from "./Flashcard";
import "./App.css";

function FlashcardList({ Flashcards }) {
  return (
    <div className="card-grid">
      {Flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
}

export default FlashcardList;
