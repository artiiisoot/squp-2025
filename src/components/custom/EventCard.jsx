import { getRequireImage } from "@/utils/utils";
import React from "react";

const EventCard = ({ item, idx, onClick }) => {
  const imageSrc = getRequireImage("event", "list", item?.thumbImg);

  return (
    <div id="EventCard" className="col-4" onClick={() => onClick(idx)}>
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
