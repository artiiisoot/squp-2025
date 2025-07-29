import React from "react";

import Icon from "./Icon";

const TopButton = ({ ref }) => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div id="TopButton" ref={ref} onClick={handleScrollTop}>
      <Icon icon="chevron_up" size="1.5rem" />
    </div>
  );
};

export default TopButton;
