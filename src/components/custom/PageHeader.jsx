import React from "react";
import { useSelector } from "react-redux";

const PageHeader = ({ title }) => {
  const { isMobile } = useSelector((state) => state.device);

  return (
    <div id={isMobile ? "MobilePageHeader" : "PcPageHeader"}>
      <div className="title">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default PageHeader;
