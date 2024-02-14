import { useState, useEffect } from "react";
import FlashcardList from "./FlashcardList";
import axios from "axios";
import "./App.css"; // Make sure to import your CSS file

function App() {
  const [Flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
      console.log(res.data);
    });
  }, []);

  function decodeString(str) {
    const TextArea = document.createElement("textarea");
    TextArea.innerHTML = str;
    return TextArea.value;
  }
  return (
    <div className="container">
      <FlashcardList Flashcards={Flashcards} />
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "2+2?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },

  {
    id: 2,
    question: "3+2?",
    answer: "5",
    options: ["gugaa", "3", "4", "5"],
  },
  {
    id: 3,
    question: "2+2?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
];

export default App;
