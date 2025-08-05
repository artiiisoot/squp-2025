import React from "react";
import { useSelector } from "react-redux";

import { formatText } from "@/utils/utils";
import parse from "html-react-parser";

const PageTitle = ({ title, context }) => {
  const { isMobile } = useSelector((state) => state.device);
  return (
    <div id={isMobile ? "MobilePageTitle" : "PcPageTitle"}>
      <p className="title">{parse(formatText(title))}</p>
      {context && <p className="context">{parse(formatText(context))}</p>}
    </div>
  );
};

export default PageTitle;
