import React from "react";
import { useSelector } from "react-redux";

const SectionTitle = ({ title, context }) => {
  const { isMobile } = useSelector((state) => state.device);
  return (
    <div id="SectionTitle">
      <div className="page-container">
        {isMobile ? <h4>{title}</h4> : <h4>{title}</h4>}
        {context && <p>{context}</p>}
      </div>
    </div>
  );
};

export default SectionTitle;
