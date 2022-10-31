import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadReserve, removeReserve } from "../redux/reserveInfo";
import { openModal } from "../redux/modal";
import Modal from "./Modal";

const BusinessDetail = ({ detailInfo }) => {
    const { loaded, reserveInfo } = useSelector(state => state.reserveInfo);
    const [reserved, setReserved] = useState(false);
    const { showModal } = useSelector(state => state.modalInfo);


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

        if (reserveInfo.length > 0 && reserveInfo.filter(reserve => reserve.id === detailInfo.id).length > 0) {
            setReserved(true);
        } else {
            setReserved(false);
        }
    }, [reserveInfo]);

    const handleCancel = () => {
        dispatch(removeReserve(detailInfo.id));
    }

    return (
        <div className="row">
            <div className="col-xs-12 col-md-6 d-flex flex-column align-items-center text-center mb-3">
                <div>
                    <p className="fs-5 fw-bold">Adress</p>
                    <p>{detailInfo.location.display_address.join(", ")}</p>
                </div>
                <div>
                    <p className="fs-5 fw-bold">Phone</p>
                    <p>{detailInfo.display_phone}</p>
                </div>
                <div>
                    <p className="fs-5 fw-bold">Status</p>
                    <p className={detailInfo.is_closed ? "text-danger" : "text-success"}>{detailInfo.is_closed ? "Closed" : "Open Now"}</p>
                </div>
            </div>

            <div className="col-xs-12 col-md-6 d-flex flex-column text-center">
                <div>
                    <p className="fs-5 fw-bold">Category</p>
                    <p>{detailInfo.categories.map(category => category.title).join(" | ")}</p>
                </div>
                <div>
                    <p className="fs-5 fw-bold">Price range</p>
                    <p>{detailInfo.price}</p>
                </div>
                <div>
                    <p className="fs-5 fw-bold">Visit yelp for more</p>
                    <a href={detailInfo.url}>Business link</a>
                </div>
            </div>

            <div className="col-12 d-flex flex-column align-items-center">
                {reserved ?
                    <button className="btn btn-primary mb-3" onClick={handleCancel}>Cancel Reservation</button> :
                    <button className="btn btn-danger mb-3" onClick={() => dispatch(openModal())}>Reserve Now</button>}
                {showModal && <Modal businessName={detailInfo.name} businessId={detailInfo.id} />}
                <p>Share on: <a href={`https://twitter.com/intent/tweet?url=${detailInfo.url}`} target="_blank"><i className="bi bi-twitter"></i></a>&nbsp;
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${detailInfo.url}`} target="_blank"><i className="bi bi-facebook"></i></a></p>
            </div>

            <div className="col-12">
                <div id="carouselControls" className="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="false">
                    <div className="carousel-inner">
                        {detailInfo.photos.map((photo, index) => {
                            return (
                                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index} data-bs-interval="100000">
                                    <img src={photo} className="d-block img-fluid mx-auto" style={{ width: "350px", height: "350px" }} alt="..." />
                                </div>
                            )
                        })}
                    </div>
                    <button className="carousel-control-prev mr-3" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next ml-3" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BusinessDetail;