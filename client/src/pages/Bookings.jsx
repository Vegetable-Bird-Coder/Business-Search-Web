import React, { useEffect } from "react";
import BookingsTable from "../components/BookingsTable";
import { useSelector } from "react-redux";

const Bookings = () => {
    return (
        <div className="row d-flex justify-content-center mt-5">
            <div className="col-6 bg-white rounded border border-gray-400 px-0">
                <BookingsTable />
            </div>
        </div>

    )
}

export default Bookings;