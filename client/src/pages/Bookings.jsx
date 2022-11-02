import React from "react";
import BookingsTable from "../components/BookingsTable";

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