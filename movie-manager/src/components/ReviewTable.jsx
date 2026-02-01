const ReviewTable = ({reviews}) => {

    return <table>
        <caption>Your Reviews</caption>
        <thead>
            <tr>
                <th>Title</th>
                <th>Rating</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {reviews.map((movie, index) => (
                <tr key={movie.id || index}>
                    <td>{movie.title}</td>
                    <td>{movie.reviewStars}</td>
                    <td>{movie.description}</td>
                </tr>
            ))}
        </tbody>
    </table>
}

export default ReviewTable