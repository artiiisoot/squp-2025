import React from "react";

import { formatText } from "@/utils/utils";

import LineButton from "@/components/common/LineButton";
const TrackCard = ({ data: track, trackIdx, onClick }) => {
  const requireImage = require(`@/assets/images/home/track/${track.contentImg}`);

  return (
    <div
      id="TrackCard"
      className="col-4"
      key={trackIdx}
      onClick={() => onClick?.(track.id)}
    >
      <div className="header">
        <div className="track">
          <p>{track.tab}</p>
        </div>
        <div className="title">
          <p>{track.trackTitle}</p>
          <span>{track.progressTime}</span>
        </div>
      </div>
      <div className="body">
        <div className="content-img">
          <img src={requireImage} alt={track.contentAlt} />
        </div>
      </div>
      <div className="footer">
        <p dangerouslySetInnerHTML={{ __html: formatText(track.trackDesc) }} />
        <LineButton title={"전체 트랙 보기"} btnColor={"squp"} btnSize={"lg"} />
      </div>
    </div>
  );
};

export default TrackCard;
