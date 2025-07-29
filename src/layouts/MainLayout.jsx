import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setEndPosition } from "@/reducers/refSlice";

import Header from "@/components/custom/Header";
import ModalAlert from "@/components/modal/ModalAlert";
import ModalProgramDetail from "@/components/modal/ModalProgramDetail";
import Footer from "@/components/custom/Footer";
import TopButton from "@/components/common/TopButton";
import ReserveButton from "@/components/custom/ReserveButton";
import Icon from "@/components/common/Icon";
import { setServerMode } from "@/reducers/deviceSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { startPosition, endPosition } = useSelector((state) => state.ref);
  const location = useLocation();
  const navigate = useNavigate();
  const topButton = useRef(null);
  const reserveButton = useRef(null);
  const endRef = useRef(null);

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
    console.log("window.location", window.location);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // endRef 위치가 바뀌었는지 확인하고 최신 값으로 Redux에 저장
      if (endRef.current) {
        const top = endRef.current.offsetTop;
        dispatch(setEndPosition(top));
      }

      // 유효한 시작/끝 위치가 없으면 동작 중단
      if (startPosition <= 0 || endPosition <= 0) return;

      const endTriggerY = endPosition - windowHeight;

      // 사전등록 버튼 표시 여부
      const isInReserveRange =
        scrollY > startPosition - 100 && scrollY <= endTriggerY;
      reserveButton.current?.classList.toggle("show", isInReserveRange);

      // Top 버튼 고정 상태 관리
      if (scrollY > 0 && scrollY < endTriggerY) {
        topButton.current.classList.add("sticky");
        topButton.current.classList.remove("fixed");
      } else if (scrollY >= endTriggerY) {
        topButton.current.classList.add("fixed");
      } else {
        topButton.current?.classList.remove("sticky", "fixed");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <Header />
      <main>
        <ModalAlert />
        <ModalProgramDetail />
        <Outlet />

        <TopButton ref={topButton} />
        <ReserveButton ref={reserveButton} />
      </main>
      <Footer ref={endRef} />
    </>
  );
};

export default MainLayout;
