import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadReserve } from "../redux/reserveInfo";
import Modal from "./Modal";

const BusinessDetail = ({ detailInfo }) => {
    const { loaded, reserveInfo } = useSelector(state => state.reserveInfo);
    const [reserved, setReserved] = useState(false);

    const dispath = useDispatch();

    useEffect(() => {
        if (loaded) {
            localStorage.setItem('reserveInfo', JSON.stringify(reserveInfo));
        } else {
            if (localStorage.getItem('reserveInfo') !== 'undefined') {
                dispath(loadReserve(JSON.parse(localStorage.getItem('reserveInfo'))));
            } else {
                dispath(loadReserve([]));
                localStorage.setItem('reserveInfo', JSON.stringify(reserveInfo));
            }
        }

        if (reserveInfo.length > 0 && reserveInfo.filter(reserve => reserve.id === detailInfo.id)) {
            setReserved(true);
        } else {
            setReserved(false);
        }
    }, [reserveInfo]);

    return (
        <div className="row">
            <div className="col-xs-12 col-md-6 d-flex flex-column align-items-center text-center">
                <div>
                    <p className="fs-5 fw-bold">Adress</p>
                    <p>{detailInfo.location.display_address.join(",")}</p>
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
                    <button className="btn btn-primary mb-3">Cancel Reservation</button> :
                    <button className="btn btn-danger mb-3" data-bs-toggle="modal" data-bs-target="#reserveModal">Reserve Now</button>}
                <Modal />
                <p>Share on: </p>
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