import React from "react";
import IcoMoon from "react-icomoon";
import iconSet from "@/assets/fonts/material-icons/selection.json";

const Icon = (props) => {
  return <IcoMoon iconSet={iconSet} {...props} style={{ cursor: "pointer" }} />;
};

export default Icon;
