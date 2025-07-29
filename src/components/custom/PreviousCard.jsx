import React from "react";
import { getRequireImage } from "@/utils/utils";

const PreviousCard = ({ item, idx, onClick }) => {
  const imageSrc = getRequireImage("previous", "list", item?.thumbImg);

  return (
    <div
      id="PreviousCard"
      className="col-6"
      onClick={() => onClick(item.years)}
    >
      <div className="previous-img">
        <img src={imageSrc} alt={item.title} />
      </div>
      <div className="context">
        <b>
          <p>{item.desc}</p>
        </b>
        <h5>{item.title}</h5>
      </div>
    </div>
  );
};

export default PreviousCard;
