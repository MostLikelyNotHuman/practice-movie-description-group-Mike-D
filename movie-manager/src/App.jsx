import { useState, useEffect } from "react";
import "./App.css";
import FormField from "./components/FormField";
import Button from "./components/Button";
import ReviewTable from "./components/ReviewTable";
// import { GoogleGenAI } from "@google/genai";

function App() {
  const initialFeedback = { title: "", rating: "0" };
  const [inputData, setInputData] = useState(initialFeedback);
  const [submitted, setSubmitted] = useState([]); // TODO: Link to Model

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:8080/reviews");
        const data = await response.json();
        setSubmitted(data);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputData((oldData) => ({ ...oldData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/reviews", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        setInputData(initialFeedback);
        const refreshResponse = await fetch("http://localhost:8080/reviews");
        const updatedData = await refreshResponse.json();
        setSubmitted(updatedData);
      } else {
        console.error("Server responded with an error");
      }
    } catch (error) {
      console.error("Error posting review: ", error);
    }
  };

  // const ai = new GoogleGenAI({});
  // async function writeReview() {
  //   const response = await ai.models.generateContent({
  //     model: "gemini-3-flash-preview",
  //     contents: "Explain how AI works in a few words",
  //   });
  //   console.log(response.text);
  // }

  return (
    <>
      <h1>Movie Reviews</h1>
      <h3>
        Add your movie title, and a rating from 1-5, and let Gemini build a
        description
      </h3>
      <FormField
        id="title"
        value={inputData.title}
        label="Title: "
        required="true"
        handleChange={handleChange}
      />
      <label for="rating">Rating: </label>
      <select
        id="rating"
        name="rating"
        value={inputData.rating}
        onChange={handleChange}
      >
        <option value="0"></option>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
      </select>
      <Button
        id="submit-rating"
        type="submit"
        label="Submit"
        handleClick={handleSubmit}
      />
      {<ReviewTable reviews={submitted} />}
    </>
  );
}

export default App;
