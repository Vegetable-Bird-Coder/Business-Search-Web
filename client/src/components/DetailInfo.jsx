import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "react-bootstrap-icons";
import BusinessDetail from "./BusinessDetail";
import MapLocation from "./MapLocation";
import Reviews from "./Reviews";
import { unloadDetailInfo } from "../redux/DetailInfo";
import { showBusinessInfo } from "../redux/businessInfo";

const DetailInfo = ({ detailInfo }) => {
    const { type } = useSelector(state => state.detailInfo);
    const dispatch = useDispatch();

    const handleBack = () => {
        dispatch(unloadDetailInfo());
        dispatch(showBusinessInfo());
    }

    return (
        <div className="container-fluid border border-dark">
            <ArrowLeft onClick={handleBack} /><br />
            <div className="d-flex flex-column justify-content-center ">
                <h3 className="text-center">{detailInfo.name}</h3>
                <nav className="navbar navbar-light bg-warning">
                    <div className="container-fluid d-flex justify-content-center">
                        <button className="btn bg-transparent text-dark">Business details</button>
                        <button className="btn bg-transparent text-dark">Map location</button>
                        <button className="btn bg-transparent text-dark">Reviews</button>
                    </div>
                </nav >
                {type === "Business details" ? <BusinessDetail detailInfo={detailInfo} /> : (
                    type === "Map locations" ? <MapLocation /> : <Reviews />
                )}
            </div>
        </div>
    )
};

export default DetailInfo;