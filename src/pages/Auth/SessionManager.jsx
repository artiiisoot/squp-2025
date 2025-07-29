import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setLogin } from "@/reducers/authSlice";

import { setIsModalAlert, setPopupReset } from "@/reducers/alertSlice";

import ModalAlert from "@/components/modal/ModalAlert";
import Toast from "@/components/common/Toast";

// 세션 유지 시간 (ms)
const SESSION_DURATION = 6000 * 1000;

// ms를 "분 초" 형식의 문자열로 변환
const formatTime = (ms) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes > 0 ? `${minutes}분 ` : ""}${seconds}초`;
};

const SessionManager = () => {
  const dispatch = useDispatch();
  const { token, expiresAt } = useSelector((state) => state.auth);
  const { isShowModal } = useSelector((state) => state.alert);

  const timerRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const [remainingTime, setRemainingTime] = useState(0);

  // 세션 만료 시간 연장 함수
  const extendSession = () => {
    const newExpiresAt = Date.now() + SESSION_DURATION;
    dispatch(
      setLogin({
        token: token,
        expiresIn: SESSION_DURATION / 1000,
      })
    );
    dispatch(setPopupReset()); //
  };

  // 전체 타이머 & 경고 타이머 설정
  const resetTimers = () => {
    if (!expiresAt) return;

    const now = Date.now();
    const timeout = expiresAt - now;

    // 타이머 정리
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);

    // 이미 만료된 경우 로그아웃
    if (timeout <= 0) {
      dispatch(setLogout());
      return;
    }

    // 남은 시간 표시
    setRemainingTime(timeout);

    // 매초 남은 시간 업데이트
    countdownIntervalRef.current = setInterval(() => {
      const timeLeft = expiresAt - Date.now();
      setRemainingTime(timeLeft);

      // 10초 이하가 되면 알림 표시
      if (timeLeft <= 10000 && timeLeft > 0 && !isShowModal) {
        // setShowAlert(true);
        dispatch(
          setIsModalAlert({
            title: "알림",
            context: "세션이 곧 만료됩니다. \n 연장하시겠습니까?",
            btnName: "연장하기",
            isShowModal: true,
            onConfirm: () => extendSession(),
          })
        );
      }

      if (timeLeft <= 0) {
        clearInterval(countdownIntervalRef.current);
        dispatch(setLogout());
      }
    }, 1000);

    // 자동 로그아웃 타이머
    timerRef.current = setTimeout(() => {
      dispatch(setLogout());
      dispatch(setPopupReset());
    }, timeout);
  };

  // expiresAt이 바뀔 때마다 타이머 리셋
  useEffect(() => {
    resetTimers();
  }, [expiresAt]);

  // 컴포넌트 언마운트 시 클린업
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
    };
  }, []);

  return (
    <>
      {/* 남은 시간 표시 */}
      {token && (
        <div id="Toast">
          <div className="toast-group">
            <div className="toast-item warn">
              <p>
                세션이 <b>{formatTime(remainingTime)}</b> 후 만료됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
      <ModalAlert />
    </>
  );
};

export default SessionManager;
