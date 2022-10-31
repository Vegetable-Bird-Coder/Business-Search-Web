import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LoadScript } from "@react-google-maps/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAP_TOKEN}>
                <App />
            </LoadScript>

        </Provider>
    </React.StrictMode>
);