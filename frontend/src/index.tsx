import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "leaflet/dist/leaflet.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Component as ListingSection } from "./sections/listing";

const SCOPE = process.env.REACT_APP_SCOPE;

const client = new ApolloClient({
  uri: `https://${SCOPE}-api.ua-wck.com/backend/graphql`,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path={"/"} element={<Navigate to="/en" replace />}></Route>
          <Route path={"/:lang/*"} element={<App />}></Route>
          <Route path={"/listing/:lang/*"} element={<ListingSection />}></Route>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
