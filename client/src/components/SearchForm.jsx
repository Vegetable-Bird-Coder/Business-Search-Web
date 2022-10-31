import React, { useState, useEffect } from "react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux";
import { loadBusinessInfo, unloadBusinessInfo } from "../redux/businessInfo";
import { unloadDetailInfo } from "../redux/detailInfo";

const SearchForm = () => {
    const [formContent, setFormContent] = useState({
        term: "",
        radius: "",
        category: "all",
        location: "",
        autoLoc: false,
        latitude: "",
        longitude: ""
    });

    const [autoContent, setAutoContent] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAutoComplete = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api.yelp.com/v3/autocomplete?text=${formContent.term}`);
                setAutoContent(res.data.autocomplete);
            } catch (err) {
                console.log(err);
            }
        }

        formContent.term && fetchAutoComplete();

        if (!formContent.term) {
            setAutoContent([]);
        }
    }, [formContent.term]);

    const handleAutocomplete = (event, value, reason) => {
        setFormContent({ ...formContent, term: value });
    }

    const handleAutoLoc = async () => {
        try {
            if (formContent.latitude === "") {
                const url = `https://ipinfo.io/json?token=${process.env.REACT_APP_IPINFO_TOKEN}`;
                const res = await axios.get(url);
                const autoLoc = res.data.loc.split(",");
                setFormContent({ ...formContent, location: "", autoLoc: !formContent.autoLoc, latitude: autoLoc[0], longitude: autoLoc[1] });
            } else {
                setFormContent({ ...formContent, location: "", autoLoc: !formContent.autoLoc });
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const term = `term=${formContent.term}`;
        const categories = `&&categories=${formContent.category}`;
        const radius = `&&radius=${formContent.radius === "" ? "10" : formContent.radius}`;
        const location = `${formContent.location !== "" ? "&&location=" + formContent.location : ""}`;
        const latitude = `${formContent.latitude !== "" ? "&&latitude=" + formContent.latitude : ""}`;
        const longitude = `${formContent.longitude !== "" ? "&&longitude=" + formContent.longitude : ""}`;
        const url = "http://localhost:8800/api.yelp.com/v3/businesses/search?" + term + categories + radius + location + latitude + longitude;
        try {
            const res = await axios.get(url);
            dispatch(loadBusinessInfo(res.data.businesses));
        } catch (err) {
            console.log(err);
        }
    }

    const handleReset = () => {
        setFormContent({
            term: "",
            radius: "",
            category: "all",
            location: "",
            autoLoc: false,
            latitude: "",
            longitude: ""
        });
        dispatch(unloadBusinessInfo());
        dispatch(unloadDetailInfo());
    }

    return (
        <div className="bg-white p-5 rounded-3 border border-gray-400">
            <div className="text-center">
                <h3>Business search</h3>
            </div>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label className="form-label" htmlFor="keyword">Keyword <span className="required-asterisk text-danger">*</span></label>
                    <Autocomplete
                        id="keyword"
                        freeSolo
                        value={formContent.term}
                        options={autoContent}
                        renderInput={(params) => <TextField {...params} required />}
                        onInputChange={handleAutocomplete}
                        size="small"
                        required
                        disableClearable
                    />

                </div>

                <div className="col-md-6">
                    <label className="form-label" htmlFor="distance">Distance</label>
                    <input
                        className="form-control"
                        placeholder="10"
                        type="text"
                        id="distance"
                        value={formContent.radius}
                        onChange={e => setFormContent({ ...formContent, radius: e.target.value })}
                    />
                </div>

                <div className="col-md-6" htmlFor="category">
                    <label className="form-label">Category <span className="required-asterisk text-danger">*</span></label>
                    <select
                        className="form-select"
                        id="category"
                        value={formContent.category}
                        onChange={e => setFormContent({ ...formContent, category: e.target.value })}
                    >
                        <option value="all">Default</option>
                        <option value="arts">Art & Entertainment</option>
                        <option value="health">Health & Medical</option>
                        <option value="hoteltravel">Hotels & Travel</option>
                        <option value="food">Food</option>
                        <option value="professional">Professional Services</option>
                    </select>
                </div>

                <div className="col-12">
                    <label className="form-label" htmlFor="location">Location <span className="required-asterisk text-danger">*</span></label>
                    <input
                        className="form-control"
                        disabled={formContent.autoLoc}
                        type="text"
                        id="location"
                        value={formContent.location}
                        onChange={e => setFormContent({ ...formContent, location: e.target.value })}
                        required
                    />
                </div>

                <div className="col-12">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="autoLoc"
                        onChange={handleAutoLoc}
                        value={formContent.autoLoc}
                    />
                    <label className="form-check-label" htmlFor="autoLoc">
                        &nbsp; Auto-detect my location
                    </label>
                </div>

                <div className="col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-danger" style={{ marginRight: "20px" }}>Submit</button>
                    <button type="reset" className="btn btn-primary" onClick={handleReset}>Clear</button>
                </div>
            </form>
        </div>

    )
};

export default SearchForm;