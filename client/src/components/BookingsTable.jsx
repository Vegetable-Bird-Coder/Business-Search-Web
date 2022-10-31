import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadReserve, removeReserve } from "../redux/reserveInfo";

const BookingsTable = () => {
    const { num, reserveInfo, loaded } = useSelector(state => state.reserveInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loaded) {
            localStorage.setItem('reserveInfo', JSON.stringify(reserveInfo));
        } else {
            if (localStorage.getItem('reserveInfo') !== 'undefined' && localStorage.getItem('reserveInfo') !== null) {
                dispatch(loadReserve(JSON.parse(localStorage.getItem('reserveInfo'))));
            } else {
                dispatch(loadReserve([]));
                localStorage.setItem('reserveInfo', JSON.stringify(reserveInfo));
            }
        }
    }, [reserveInfo])

    if (num === 0) {
        return (
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-10 col-md-6 text-center bg-white rounded border border-gray-400 text-danger fw-bold">No reservations to show</div>
            </div>

        )
    };

    const handleCancel = (id) => {
        alert("Reservation cancelled!");
        dispatch(removeReserve(id));
    }

    return (
        <div className="text-center">
            <h3 className="mb-4">List of your reservations</h3>
            <div className="bg-white rounded border border-gray-400 table-responsive-md">
                <table className="table text-center mb-0 table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Business Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>E-mail</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserveInfo.map((reserve, index) => {
                            return (
                                <tr
                                    key={reserve.id}
                                >
                                    <th scope="row">{index + 1}</th>
                                    <td>{reserve.name}</td>
                                    <td>{reserve.date}</td>
                                    <td>{reserve.time}</td>
                                    <td>{reserve.email}</td>
                                    <td><i className="bi bi-trash" onClick={() => handleCancel(reserve.id)}></i></td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        </div>


    )
};

export default BookingsTable;