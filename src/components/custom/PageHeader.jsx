import React from "react";

const PageHeader = ({ title }) => {
  return (
    <div id="PageHeader">
      <div className="title">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default PageHeader;
