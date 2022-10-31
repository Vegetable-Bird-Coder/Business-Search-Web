import React, { useEffect } from "react";
import BookingsTable from "../components/BookingsTable";
import { useSelector } from "react-redux";

const Bookings = () => {
    return (
        <div className="row d-flex justify-content-center mt-3">
            <div className="col-12 col-md-7">
                <BookingsTable />
            </div>
        </div>
    )
}

export default Bookings;