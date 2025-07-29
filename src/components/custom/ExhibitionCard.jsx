import React from "react";
import { getRequireImage } from "@/utils/utils";

const ExhibitionCard = ({ item, idx, onClick }) => {
  const imageSrc = getRequireImage("exhibition", "list", item.thumbImg);
  return (
    <div id="ExhibitionCard" className="col-4" onClick={() => onClick(idx)}>
      <div className="exhibition-label">{item.title}</div>
      <div className="exhibition-img">
        <img src={imageSrc} alt="" />
      </div>
    </div>
  );
};

export default ExhibitionCard;
