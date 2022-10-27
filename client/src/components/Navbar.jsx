import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
    const [border, setBorder] = useState(true);
    const path = useLocation().pathname;

    useEffect(() => {
        if (path === "/search")
            setBorder(true);
        else if (path === "/bookings")
            setBorder(false);
    }, [path])

    return (
        <nav className="navbar navbar-light bg-transparent">
            <div className="container-fluid d-flex justify-content-end">
                <Link to="/search" style={{ textDecoration: "none" }}>
                    <button className={`btn bg-transparent text-dark ${border && "btn-outline-dark "}`}>Search</button>
                </Link>
                <Link to="/bookings" style={{ textDecoration: "none" }}>
                    <button className={`btn bg-transparent text-dark ${!border && "btn-outline-dark"}`}> My Bookings</button>
                </Link>
            </div>
        </nav >
    )
};

export default Navbar;