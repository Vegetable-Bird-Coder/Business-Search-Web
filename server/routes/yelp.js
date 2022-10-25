import express from "express";
import { autocomplete, getDetailInfo, getSearchResult } from "../controllers/yelp.js";

const router = express.Router();

router.get("/autocomplete", autocomplete);

router.get("/businesses/search", getSearchResult);

router.get("/businesses/:id", getDetailInfo);

export default router;