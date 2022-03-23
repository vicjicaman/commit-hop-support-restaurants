import React, { useState } from "react";

import { Component as HomeSection } from "./home";
import { Component as AdminSection } from "./admin";
import { Component as SearchSection } from "./search";
import { Component as ListingSection } from "./listing";

import { Route, Routes, Link } from "react-router-dom";

export const Component = () => {
  return (
    <Routes>
      <Route path={`/`} element={<HomeSection />} />
      <Route path={`/admin/*`} element={<AdminSection />} />
      <Route path={`/search/*`} element={<SearchSection />} />
      <Route path={`/listing/*`} element={<ListingSection />} />
    </Routes>
  );
};
