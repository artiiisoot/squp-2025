import React from "react";
import { useSelector } from "react-redux";

import { formatText } from "@/utils/utils";

const PageTitle = ({ title, context }) => {
  const { isMobile } = useSelector((state) => state.device);
  return (
    <div id="PageTitle">
      {isMobile ? (
        <h5 dangerouslySetInnerHTML={{ __html: formatText(title) }} />
      ) : (
        <h4 dangerouslySetInnerHTML={{ __html: formatText(title) }} />
      )}
      {context && (
        <p dangerouslySetInnerHTML={{ __html: formatText(context) }} />
      )}
    </div>
  );
};

export default PageTitle;
