import React, { useState, useEffect } from "react";

export const Component = () => {
  useEffect(() => {
    window.location.replace(window.location.pathname);
  }, []);

  return null;
};
