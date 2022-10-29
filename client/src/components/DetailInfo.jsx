import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "react-bootstrap-icons";
import BusinessDetail from "./BusinessDetail";
import MapLocation from "./MapLocation";
import Reviews from "./Reviews";
import { unloadDetailInfo, switchType } from "../redux/detailInfo";
import { showBusinessInfo } from "../redux/businessInfo";
import { LoadScript } from "@react-google-maps/api";

const DetailInfo = ({ detailInfo }) => {
    const { type } = useSelector(state => state.detailInfo);
    const dispatch = useDispatch();

    const handleBack = () => {
        dispatch(unloadDetailInfo());
        dispatch(showBusinessInfo());
    }

    const handleDetailClick = () => {
        dispatch(switchType("Business details"));
    }

    const handleLocationClick = () => {
        dispatch(switchType("Map locations"));
    }

    const handleReviewsClick = () => {
        dispatch(switchType("Reviews"));
    }

    return (
        <div className="container-fluid border border-dark">
            <ArrowLeft onClick={handleBack} /><br />
            <div className="d-flex flex-column justify-content-center ">
                <h3 className="text-center">{detailInfo.name}</h3>
                <nav className="navbar navbar-light bg-warning">
                    <div className="container-fluid d-flex justify-content-center">
                        <button className="btn bg-transparent text-dark" onClick={handleDetailClick}>Business details</button>
                        <button className="btn bg-transparent text-dark" onClick={handleLocationClick}>Map location</button>
                        <button className="btn bg-transparent text-dark" onClick={handleReviewsClick}>Reviews</button>
                    </div>
                </nav >
                <div className="my-3">
                    {type === "Business details" ? <BusinessDetail detailInfo={detailInfo} /> :
                        (type === "Map locations" ? (<MapLocation detailInfo={detailInfo} />) : <Reviews id={detailInfo.id} />)}
                </div>

            </div>
        </div>
    )
};

export default DetailInfo;