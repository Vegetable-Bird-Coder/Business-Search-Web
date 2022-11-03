import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { addReserve } from "../redux/reserveInfo";
import { closeModal } from "../redux/modal";
import { useEffect } from "react";

const Modal = ({ businessName, businessId }) => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const { num } = useSelector(state => state.reserveInfo);
    const dispatch = useDispatch();
    const [showSelectHourImg, setShowSelectHourImg] = useState(false);
    const [showSelectMinuteImg, setShowSelectMinuteImg] = useState(false);

    const today = new Date();
    const minTime = `${today.getFullYear()}-${today.getMonth() + 1 > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}-${today.getDate() > 9 ? today.getDate() : '0' + today.getDate()}`;

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            const reservation = {
                index: num + 1,
                id: businessId,
                name: businessName,
                date: date,
                time: hour + ":" + minute,
                email: email
            };
            alert("Reservation created!");
            dispatch(addReserve(reservation));
            dispatch(closeModal());
        }

        setValidated(true);
    };

    useEffect(() => {
        if (validated && hour === "") {
            setShowSelectHourImg(true);
        }

        if (hour !== "")
            setShowSelectHourImg(false)
    }, [validated, hour])

    useEffect(() => {
        if (validated && minute === "") {
            setShowSelectMinuteImg(true);
        }

        if (minute !== "")
            setShowSelectMinuteImg(false)
    }, [validated, minute])

    return (
        <aside className="modal-container">
            <div className="modal fade show" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reservation form</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(closeModal())}></button>
                        </div>

                        <div className="modal-body">
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" required onChange={e => setEmail(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">
                                            {email === "" ? "Email is required" : "Email must be a valid email address"}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="date">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            required
                                            onChange={e => setDate(e.target.value)}
                                            min={minTime}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Date is required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Label>Time</Form.Label>
                                    <Form.Group as={Col} xs="9" controlId="time">

                                        <div className="d-flex align-items-center">
                                            <Form.Select
                                                style={{
                                                    backgroundImage: `${showSelectHourImg ? 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e")' : 'none'}`,
                                                    backgroundSize: `${showSelectHourImg ? 'calc(.75em + .375rem) calc(.75em + .375rem)' : "0px 0px"}`,
                                                }}
                                                required
                                                onChange={e => setHour(e.target.value)}>
                                                <option hidden style={{ diplay: 'none' }}></option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                            </Form.Select>
                                            &nbsp;:&nbsp;
                                            <Form.Select
                                                style={{
                                                    backgroundImage: `${showSelectMinuteImg ? 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 12 12%27 width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27 cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e")' : 'none'}`,
                                                    backgroundSize: `${showSelectMinuteImg ? 'calc(.75em + .375rem) calc(.75em + .375rem)' : "0px 0px"}`
                                                }}
                                                required
                                                onChange={e => setMinute(e.target.value)}>
                                                <option hidden></option>
                                                <option value="00">00</option>
                                                <option value="15">15</option>
                                                <option value="30">30</option>
                                                <option value="45">45</option>
                                            </Form.Select>
                                            &nbsp;<i className="bi bi-clock"></i>
                                        </div>

                                    </Form.Group>
                                </Row>
                                <Row className="text-center">
                                    <Col>
                                        <Button className="btn btn-danger" type="submit">Submit</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" onClick={() => dispatch(closeModal())}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </aside >
    )
}

export default Modal;