import express from "express";
import yelpRouter from "./routes/yelp.js";

const app = express();

app.use(express.json());

app.use("/api.yelp.com/v3", yelpRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

app.listen(8800, () => {
    console.log("Listening on 8800");
})