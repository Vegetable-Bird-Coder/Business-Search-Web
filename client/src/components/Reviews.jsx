import React, { useState, useEffect } from "react";
import axios from "axios";

const Reviews = ({ id }) => {
    const [reviews, setReviews] = useState([]);
    const prefix = 'http://localhost:8800';

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const url = `${prefix}/api.yelp.com/v3/businesses/${id}/reviews`;
                const res = await axios.get(url);
                setReviews(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchReviews();
    }, [id])

    return (
        <table className="table table-striped mb-0">
            <tbody className="result-table-body">
                {reviews.map(review => {
                    return (
                        <tr key={review.id}>
                            <td>
                                <div>
                                    <p className="fw-bold mb-0">{review.user.name}</p>
                                    <p>Rating: {review.rating}/5</p>
                                    <p>{review.text}</p>
                                    <p>{review.time_created.split(" ")[0]}</p>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Reviews;