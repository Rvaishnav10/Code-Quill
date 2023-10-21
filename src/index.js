import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom"
import { Provider } from "react-redux";
import Store from "./context/store";



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={Store}>
    <Router>
    <App />
    </Router>
    </Provider>
  </StrictMode>
);
