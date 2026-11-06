import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// When shown inside the portfolio (?embed=1), hide the page title so the demo fits its frame.
if (new URLSearchParams(window.location.search).has("embed")) document.body.classList.add("embedded");

const root = ReactDOM.createRoot(
   document.getElementById("root"));
root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);

