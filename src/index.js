import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { AuthProvider } from "./provider/AuthProvider";
import { store } from "./store/store";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "react-datepicker/dist/react-datepicker.css";

import "./assets/css/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
