import React from "react";

export const required = val => {
  if (val) return undefined;

  return "The field is required";
};
