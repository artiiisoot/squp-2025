import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDeviceType } from "@/reducers/deviceSlice";

const useDeviceType = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const setUseDeviceType = () => {
      const ua = navigator.userAgent;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        ua
      );
      const isSmallScreen = window.innerWidth < 1024;

      const type = isMobileUA || isSmallScreen ? "mobile" : "desktop";
      document.body.setAttribute("type", type);

      dispatch(setDeviceType({ deviceType: type }));
    };

    setUseDeviceType();
    window.addEventListener("resize", setUseDeviceType); // 리사이즈 대응

    return () => {
      window.removeEventListener("resize", setUseDeviceType);
    };
  }, []);
  return null;
};

export default useDeviceType;
