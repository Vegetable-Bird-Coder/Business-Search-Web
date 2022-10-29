import express from "express";
import { autocomplete, getDetailInfo, getSearchResult, getReviews } from "../controllers/yelp.js";

const router = express.Router();

router.get("/autocomplete", autocomplete);

router.get("/businesses/search", getSearchResult);

router.get("/businesses/:id", getDetailInfo);

router.get("/businesses/:id/reviews", getReviews);

export default router;