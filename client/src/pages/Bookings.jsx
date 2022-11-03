import React, { useEffect } from "react";
import BookingsTable from "../components/BookingsTable";
import { useDispatch } from "react-redux";
import { unloadBusinessInfo } from "../redux/businessInfo";
import { unloadDetailInfo } from "../redux/detailInfo";

const Bookings = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(unloadBusinessInfo());
        dispatch(unloadDetailInfo());
    })

    return (
        <div className="row d-flex justify-content-center mt-3">
            <div className="col-12 col-md-7">
                <BookingsTable />
            </div>
        </div>
    )
}

export default Bookings;