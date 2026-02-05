import { useState } from "react";
import Button from "./Button"

const ReviewTable = ({reviews, isLoading, handleSubmit, handleChange}) => {

    const [ reviewFilter, setReviewFilter ] = useState(0);

    const filterTable = () => {
        if (!reviewFilter) {
            return (
                reviews.map((movie, index) => (
                    <tr key={movie.id || index}>
                    <td>{movie.title}</td>
                    <td>{movie.reviewStars}</td>
                    <td>{movie.description}</td>
                </tr>
            )
        ))} else if (reviewFilter === "0") {
            return (
                reviews.map((movie, index)=> (
                    <tr key={movie.id || index}>
                    <td>{movie.title}</td>
                    <td>{movie.reviewStars}</td>
                    <td>{movie.description}</td>
                </tr>
            )))
        } else {
            return (
                reviews.filter(b => b.reviewStars == reviewFilter).map((movie, index) => (
                    <tr key={movie.id || index}>
                    <td>{movie.title}</td>
                    <td>{movie.reviewStars}</td>
                    <td>{movie.description}</td>
                </tr>
            )))
        }
    }




    return <>
        <caption>Your Reviews</caption>
        <label htmlFor="reviewFilter">Load Reviews by Rating: </label>
        <select
            id="reviewFilter"
            name="reviewFilter"
            value={reviewFilter}
            // todo: update to run filter method instead of adding input data
            onChange={(e) => {
                setReviewFilter(e.target.value);
            }}
        >
            <option value="0"></option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        {/* <Button
            id="submit-filter"
            type="submit"
            label={isLoading ? "Loading..." : "Load"}
            disabled={isLoading}
            handleClick={handleSubmit}
        /> */}
        <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Rating</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {/* {reviews.map((movie, index) => (
                <tr key={movie.id || index}>
                    <td>{movie.title}</td>
                    <td>{movie.reviewStars}</td>
                    <td>{movie.description}</td>
                </tr>
            ))} */}
            {filterTable()}
        </tbody>
    </table>
    </>
}

export default ReviewTable