import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Route, Routes, Link } from "react-router-dom";

import { Component as HomeSection } from "./home";
import { Component as ViewSection } from "./view";
import { Component as EditSection } from "./edit";

export const Component = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeSection />} />
      <Route path="/view/:id" element={<ViewSection />} />
      <Route path="/edit/:id" element={<EditSection />} />
    </Routes>
  );
};
