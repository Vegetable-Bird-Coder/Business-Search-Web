import React from "react";
import { useDispatch } from "react-redux";
import { hideBusinessInfo } from "../redux/businessInfo";
import axios from "axios";
import { loadDetailInfo } from "../redux/detailInfo";


const SearchResult = ({ businessInfo }) => {
    const dispatch = useDispatch();

    if (businessInfo.length === 0) {
        return (
            <div className="row d-flex justify-content-center">
                <div className="col-8 col-md-4 text-center bg-white rounded text-danger fw-bold">No results available</div>
            </div>

        )
    };
    const prefix = 'http://localhost:8800';

    const handleClick = async (id) => {

        try {
            const res = await axios.get(`${prefix}/api.yelp.com/v3/businesses/${id}`);
            dispatch(loadDetailInfo(res.data))
            dispatch(hideBusinessInfo());

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="rounded-3 bg-white">
            <table className="table table-striped text-center">
                <thead>
                    <tr>
                        <th className="align-middle">#</th>
                        <th className="align-middle">Image</th>
                        <th className="align-middle">Business Name</th>
                        <th className="align-middle">Rating</th>
                        <th className="align-middle">Distance (miles)</th>
                    </tr>
                </thead>
                <tbody>
                    {businessInfo.map((info, index) => {
                        return (
                            <tr
                                key={info.id}
                                onClick={() => handleClick(info.id)}
                                style={{ cursor: 'pointer' }}
                                className="align-middle"
                            >
                                <th scope="row">{index + 1}</th>
                                <td className="align-middle">{info.image_url ? <img className="business-img" src={info.image_url} alt={info.name} /> : 'N/A'}</td>
                                <td className="align-middle">{info.name}</td>
                                <td className="align-middle">{info.rating}</td>
                                <td className="align-middle">{(info.distance / 1609.34).toFixed(1)}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>

    )
};

export default SearchResult;