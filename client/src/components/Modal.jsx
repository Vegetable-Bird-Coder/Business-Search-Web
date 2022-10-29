import React from "react";

const Modal = () => {
    return (
        <div className="modal fade" id="reserveModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Reservation form</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-3 needs-validation" noValidate>
                            <div className="col-12">
                                <label className="form-label" htmlFor="reserveEmail">Email</label>
                                <input type="email" className="form-control" id="reserveEmail"></input>
                            </div>
                            <div className="col-12">
                                <label className="form-label" htmlFor="reserveDate">Date</label>
                                <input type="date" className="form-control" id="reserveEmail"></input>
                            </div>
                            <div className="col-12">
                                <label className="form-label" htmlFor="reserveDate">Date</label>
                                <div className="row">
                                    <div className="col-6 d-flex">
                                        <select
                                            className="form-select"
                                            id="hour"
                                        >
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                        </select>
                                        &nbsp;:&nbsp;
                                        <select
                                            className="form-select"
                                            id="minute"
                                        >
                                            <option value="10">00</option>
                                            <option value="15">15</option>
                                            <option value="30">30</option>
                                            <option value="45">45</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;