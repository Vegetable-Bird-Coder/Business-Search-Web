import React from "react";
import { useDispatch } from "react-redux";
import { hideBusinessInfo } from "../redux/businessInfo";
import axios from "axios";
import { loadDetailInfo } from "../redux/DetailInfo";


const SearchResult = ({ businessInfo }) => {
    const dispatch = useDispatch();

    if (businessInfo.length === 0) {
        return (
            <div className="text-center bg-white col-4 rounded text-danger fw-bold">No results available</div>
        )
    };

    const handleClick = async (id) => {

        try {
            const res = await axios.get(`http://localhost:8800/api.yelp.com/v3/businesses/${id}`);
            dispatch(loadDetailInfo(res.data))
            dispatch(hideBusinessInfo());

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Business Name</th>
                    <th>Rating</th>
                    <th>Distance (miles)</th>
                </tr>
            </thead>
            <tbody className="result-table-body">
                {businessInfo.map((info, index) => {
                    return (
                        <tr
                            key={info.id}
                            onClick={() => handleClick(info.id)}
                        >
                            <th scope="row">{index + 1}</th>
                            <td><img src={info.image_url} alt={info.name} style={{ width: "100px", height: "100px" }} /></td>
                            <td>{info.name}</td>
                            <td>{info.rating}</td>
                            <td>{(info.distance / 1609.34).toFixed(1)}</td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    )
};

export default SearchResult;