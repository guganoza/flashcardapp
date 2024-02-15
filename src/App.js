import { useState, useEffect, useRef } from "react";
import FlashcardList from "./FlashcardList";
import axios from "axios";
import "./App.css";

function App() {
  const [Flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEL = useRef();
  const amountEL = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      console.log(res.data);
      setCategories(res.data.trivia_categories);
    }, []);
  });
  useEffect(() => {}, []);

  function decodeString(str) {
    const TextArea = document.createElement("textarea");
    TextArea.innerHTML = str;
    return TextArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEL.current.value,
          category: categoryEL.current.value,
        },
      })
      .then((res) => {
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
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEL}>
            {categories.map((categorie) => {
              return (
                <option value={categorie.id} key={categorie.id}>
                  {categorie.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="Number"
            id="amount"
            min={1}
            step={1}
            defaultValue={10}
            ref={amountEL}
          ></input>
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList Flashcards={Flashcards} />
      </div>
    </>
  );
}

export default App;
