import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "react-bootstrap-icons";
import BusinessDetail from "./BusinessDetail";
import MapLocation from "./MapLocation";
import Reviews from "./Reviews";
import { unloadDetailInfo, switchType } from "../redux/detailInfo";
import { showBusinessInfo } from "../redux/businessInfo";
import { Tabs, Tab } from '@mui/material';
import { useState } from "react";

const DetailInfo = ({ detailInfo }) => {
    const { type } = useSelector(state => state.detailInfo);
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const handleBack = () => {
        dispatch(unloadDetailInfo());
        dispatch(showBusinessInfo());
    }

    const handleTabsClick = (e, newValue) => {
        if (newValue === 0)
            dispatch(switchType("Business details"));
        else if (newValue === 1)
            dispatch(switchType("Map locations"));
        else if (newValue === 2)
            dispatch(switchType("Reviews"));

        setValue(newValue);
    }

    return (
        <div className="container-fluid rounded-3 bg-white px-0">

            <div className="ms-2 mt-2">
                <ArrowLeft onClick={handleBack} />
            </div>

            <div className="d-flex flex-column justify-content-center ">
                <h3 className="text-center">{detailInfo.name}</h3>

                <div className="d-flex justify-content-center bg-warning">
                    <Tabs
                        value={value}
                        onChange={handleTabsClick}
                        variant="scrollable"
                        scrollButtons
                        textColor="inherit"
                        indicatorColor="secondary"
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="Business details" />
                        <Tab label="Map location" />
                        <Tab label="Reviews" />
                    </Tabs>
                </div>

                <div className="my-3">
                    {type === "Business details" ? <BusinessDetail detailInfo={detailInfo} /> :
                        (type === "Map locations" ? (<MapLocation detailInfo={detailInfo} />) : <Reviews id={detailInfo.id} />)}
                </div>

            </div>
        </div>
    )
};

export default DetailInfo;