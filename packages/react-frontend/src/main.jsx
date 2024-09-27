import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp.jsx";
import "./main.css";

// create the container
const container = document.getElementById("root");

// create a root
const root = ReactDOMClient.createRoot(container)

// initial render: render an element to the root
root.render(<MyApp />);