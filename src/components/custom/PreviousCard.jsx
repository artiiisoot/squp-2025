import React from "react";
import { useSelector } from "react-redux";

import { getRequireImage } from "@/utils/utils";

const PreviousCard = ({ item, idx, onClick }) => {
  const { isMobile } = useSelector((state) => state.device);
  const imageSrc = getRequireImage("previous", "list", item?.thumbImg);

  return (
    <div
      id={isMobile ? "MobilePreviousCard" : "PcPreviousCard"}
      className={isMobile ? "" : "col-6"}
      onClick={() => onClick(item.years)}
    >
      <div className="previous-img">
        <img src={imageSrc} alt={item.title} />
      </div>
      <div className="context">
        <b>
          <p>{item.title}</p>
        </b>
        <h5>{item.desc}</h5>
      </div>
    </div>
  );
};

export default PreviousCard;
