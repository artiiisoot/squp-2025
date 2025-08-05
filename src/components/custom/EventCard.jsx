import { getRequireImage } from "@/utils/utils";
import React from "react";
import { useSelector } from "react-redux";

const EventCard = ({ item, idx, onClick }) => {
  const { isMobile } = useSelector((state) => state.device);
  const imageSrc = getRequireImage("event", "list", item?.thumbImg);

  return (
    <div
      id={isMobile ? "MobileEventCard" : "PcEventCard"}
      className="col-4"
      onClick={() => onClick(idx)}
    >
      <div className="event-img">
        <img src={imageSrc} alt={item.title} />
      </div>

      <div className="context">
        <p>{item.subtitle}</p>
        <h5>{item.title}</h5>
      </div>
    </div>
  );
};

export default EventCard;
