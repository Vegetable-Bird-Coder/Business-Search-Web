import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getGeocoding(location) {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location.split(/, | |,/).join("+")}&key=${process.env.GEOCODING_TOKEN}`;
        const response = await axios.get(url);
        const data = response.data.results[0].geometry.location;
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const getSearchResult = async (req, res, next) => {
    try {
        const radius = Math.round(req.query.radius * 1609.34);
        let url = `https://api.yelp.com/v3/businesses/search?term=${req.query.term}&categories=${req.query.categories}&radius=${radius}`;
        if (!req.query.location) {
            url += `&latitude=${req.query.latitude}&longitude=${req.query.longitude}`;
        } else {
            const geocoding = await getGeocoding(req.query.location);
            url += `&latitude=${geocoding.lat}&longitude=${geocoding.lng}`;
        }
        const response = await axios.get(url, { headers: { "Authorization": `Bearer ${process.env.YELP_TOKEN}` } });
        const data = response.data;
        data.businesses = data.businesses.slice(10);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

export const getDetailInfo = async (req, res, next) => {
    try {
        const url = `https://api.yelp.com/v3/businesses/${req.params.id}`;
        const response = await axios.get(url, { headers: { "Authorization": `Bearer ${process.env.YELP_TOKEN}` } });
        const data = response.data;
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

export const autocomplete = async (req, res, next) => {
    try {
        const url = `https://api.yelp.com/v3${req.url}`;
        const response = await axios.get(url, { headers: { "Authorization": `Bearer ${process.env.YELP_TOKEN}` } });
        const data = response.data;
        const result = { autocomplete: [] };
        data.categories.forEach(category => {
            result.autocomplete.push(category.title);
        });
        data.terms.forEach(term => {
            result.autocomplete.push(term.text);
        });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}
