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
            <div className="bg-white rounded border border-gray-400 table-responsive">
                <table className="table text-center mb-0 table-hover" style={{ maxWidth: 'none' }}>
                    <thead>
                        <tr>
                            <th className="align-middle">#</th>
                            <th className="align-middle">Business Name</th>
                            <th className="align-middle">Date</th>
                            <th className="align-middle">Time</th>
                            <th className="align-middle">E-mail</th>
                            <th className="align-middle"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserveInfo.map((reserve, index) => {
                            return (
                                <tr
                                    key={reserve.id}
                                >
                                    <th className="align-middle" scope="row">{index + 1}</th>
                                    <td className="align-middle">{reserve.name}</td>
                                    <td className="align-middle">{reserve.date}</td>
                                    <td className="align-middle">{reserve.time}</td>
                                    <td className="align-middle">{reserve.email}</td>
                                    <td className="align-middle"><i className="bi bi-trash" onClick={() => handleCancel(reserve.id)}></i></td>
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