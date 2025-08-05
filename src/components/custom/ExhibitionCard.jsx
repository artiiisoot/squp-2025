import React from "react";
import { useSelector } from "react-redux";
import { getRequireImage } from "@/utils/utils";

const ExhibitionCard = ({ item, idx, onClick }) => {
  const { isMobile } = useSelector((state) => state.device);
  const imageSrc = getRequireImage("exhibition", "list", item.thumbImg);

  return (
    <div
      id={isMobile ? "MobileExhibitionCard" : "PcExhibitionCard"}
      className="col-4"
      onClick={() => onClick(idx)}
    >
      <div className="exhibition-label">{item.title}</div>
      <div className="exhibition-img">
        <img src={imageSrc} alt="" />
      </div>
    </div>
  );
};

export default ExhibitionCard;
