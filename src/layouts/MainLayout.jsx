import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import HeaderLayout from "@/layouts/HeaderLayout";
import FooterLayout from "@/layouts/FooterLayout";
import ModalAlert from "@/components/modal/ModalAlert";
// import ModalProgramDetail from "@/components/modal/ModalProgramDetail";
// import TopButton from "@/components/common/TopButton";
import { setServerMode } from "@/reducers/deviceSlice";
import useModalObserver from "@/hooks/useModalObserver";

const MainLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname === "/tracks" &&
      !location.search.includes("track=")
    ) {
      navigate("/tracks?track=1", { replace: true });
    }
    if (window.location.origin === "https://www.squp.kr") {
      dispatch(setServerMode("PROD"));
    } else {
      dispatch(setServerMode("DEV"));
    }
    // console.log("window.location", window.location);
  }, [location]);

  useModalObserver();

  return (
    <>
      <HeaderLayout />
      <main>
        <ModalAlert />
        {/* <ModalProgramDetail /> */}

        {/* <TopButton ref={topButton} /> */}
        <Outlet />
      </main>
      <FooterLayout />
    </>
  );
};

export default MainLayout;
