import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";

export const Component = () => {
  const { lang } = useParams();

  useEffect(() => {
    window.location.replace(`/listing/${lang}`);
  }, []);

  return null;
};
