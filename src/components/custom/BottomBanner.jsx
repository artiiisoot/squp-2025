import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEndPosition } from "@/reducers/refSlice";

// 컴포넌트
import Icon from "../common/Icon";

function BottomBanner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMobile } = useSelector((state) => state.device);
  const endRef = useRef(null);
  const { endPosition } = useSelector((state) => state.ref);

  const handleGoToReservation = () => {
    navigate("/reservation");
  };

  // endRef 설정
  useEffect(() => {
    const updateStart = async () => {
      if (endRef.current) {
        const offsetTop = await Promise.resolve(endRef.current.offsetTop);
        dispatch(setEndPosition(offsetTop));
      }
    };
    // 1. 렌더링 후 바로
    updateStart();
    // 2. resize될 때도 업데이트
    window.addEventListener("resize", updateStart);
    return () => {
      window.removeEventListener("resize", updateStart);
    };
  }, []);

  useEffect(() => {
    console.log("endPosition", endPosition);
  });

  useEffect(() => {
    const handleImagesLoaded = () => {
      if (endRef.current) {
        dispatch(setEndPosition(endRef.current.offsetTop));
      }
    };

    // 이미지 로딩 확인
    const images = document.querySelectorAll(
      "#BottomBanner img, #Partners img"
    );

    let loadedCount = 0;

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === images.length) {
            handleImagesLoaded();
          }
        });
      }
    });

    console.log("loadedCount", loadedCount);
    console.log("images", images);

    // 모든 이미지가 이미 로딩된 경우
    if (loadedCount === images.length) {
      handleImagesLoaded();
    }

    window.addEventListener("resize", handleImagesLoaded);
    return () => {
      window.removeEventListener("resize", handleImagesLoaded);
    };
  }, []);

  return (
    <div id="BottomBanner" ref={endRef} onClick={handleGoToReservation}>
      <div className="page-container">
        <div className="content">
          {isMobile ? (
            <h5>지금 바로 사전등록하기</h5>
          ) : (
            <h3>지금 바로 사전등록하기</h3>
          )}
          <Icon icon="arrow_right" size={isMobile ? "2rem" : "3.5rem"} />
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
