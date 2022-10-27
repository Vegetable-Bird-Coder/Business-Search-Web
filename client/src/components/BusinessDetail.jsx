import React from "react";

const BusinessDetail = ({ detailInfo }) => {
    return (
        <div className="row">
            <div className="col-xs-12 col-md-6 d-flex flex-column justify-content-center">
                <div className="text-center">
                    <p className="fs-6">Adress</p>
                    <p></p>
                </div>
                <div className="text-center">
                    <p className="fs-6">Phone</p>
                    <p></p>
                </div>
                <div className="text-center">
                    <p className="fs-6">Status</p>
                    <p></p>
                </div>
            </div>
            <div className="col-xs-12 col-md-6 d-flex flex-column justify-content-center">
                <div className="text-center">
                    <p className="fs-6">Category</p>
                    <p></p>
                </div>
                <div className="text-center">
                    <p className="fs-6">Price range</p>
                    <p></p>
                </div>
                <div className="text-center">
                    <p className="fs-6">Visit yelp for more</p>
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default BusinessDetail;