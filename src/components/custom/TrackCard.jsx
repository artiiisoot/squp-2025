import React from "react";

import { formatText, getRequireImage } from "@/utils/utils";

import parse from "html-react-parser";
import LineButton from "@/components/common/LineButton";
import { useSelector } from "react-redux";

const TrackCard = ({ data, trackIdx, onClick }) => {
  const { isMobile } = useSelector((state) => state.device);
  const imageSrc = getRequireImage("tracks", "list", data?.contentImg);

  return (
    <div
      id={isMobile ? "MobileTrackCard" : "PcTrackCard"}
      className="col-4"
      key={trackIdx}
      onClick={() => onClick?.(data.id)}
    >
      <div className="header">
        <div className="track">
          <p>{data?.tab}</p>
        </div>
        <div className="title">
          <p>{data?.trackTitle}</p>
          <span>{data?.progressTime}</span>
        </div>
      </div>
      <div className="body">
        <div className="content-img">
          <img src={imageSrc} alt={data?.contentAlt} />
        </div>
      </div>
      <div className="footer">
        <p>{parse(formatText(data?.trackDesc))}</p>
        <LineButton title={"전체 트랙 보기"} btnColor={"squp"} btnSize={"lg"} />
      </div>
    </div>
  );
};

export default TrackCard;
