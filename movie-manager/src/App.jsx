import { useState, useEffect } from "react";
import "./App.css";
import FormField from "./components/FormField";
import Button from "./components/Button";
import ReviewTable from "./components/ReviewTable";

function App() {
  const initialFeedback = { title: "", reviewStars: "0" };
  const [inputData, setInputData] = useState(initialFeedback);
  const [submitted, setSubmitted] = useState([]); // TODO: Link to Model
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);

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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

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
      <label htmlFor="reviewStars">Rating: </label>
      <select
        id="reviewStars"
        name="reviewStars"
        value={inputData.reviewStars}
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
        label={isLoading ? "Thinking..." : "Submit"}
        disabled={isLoading}
        handleClick={handleSubmit}
      />
      <Button 
        label={showTable ? "Hide Reviews" : "Show All Reviews"}
        handleClick={() => setShowTable(!showTable)}
      />
      {showTable && <ReviewTable reviews={submitted} />}
    </>
  );
}

export default App;
