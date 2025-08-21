import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useGtmPageView = () => {
  const location = useLocation();
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname + location.search,
    });
  }, [location]);
};

export default useGtmPageView;
