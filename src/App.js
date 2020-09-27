import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./FlashcardList";
import "./App.css";
import axios from "axios";
function App() {
  const [flashcard, setFlashcard] = useState(SMAPLE_FLASHCARDS);
  const [category, setCategory] = useState([]);
  const categoryEl = useRef();
  const amountRef = useRef();
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((response) => {
      setCategory(response.data.trivia_categories);
    });
  }, []);
  useEffect(() => {}, []);

  const decodeString = (string) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = string;
    return textArea.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountRef.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((response) => {
        setFlashcard(
          response.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((option) =>
                decodeString(option)
              ),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5), // means 50% of the tiem we will get negitive number and 50% of the time we will get positve number
            };
          })
        );
      });
  };
  return (
    <div className="ui container">
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlform="category">Category</label>
          <select id="category" ref={categoryEl}>
            {category.map((cat) => {
              return (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlform="amount"> Number of Questions </label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountRef}
          />
        </div>

        <div className="form-group">
          <button className="ui primary button">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcard={flashcard} />{" "}
      </div>
    </div>
  );
}

const SMAPLE_FLASHCARDS = [
  {
    id: 1,
    question: "what is 2 + 2",
    answer: "4",
    options: ["2", "3", "5", "4"],
  },
  {
    id: 2,
    question: "Question 2",
    answer: "Answer",
    options: ["Answer", "Answer1", "Answer2", "Answer3"],
  },
  {
    id: 3,
    question: "what is 2 + 2",
    answer: "4",
    options: ["2", "3", "5", "4"],
  },
];

export default App;
