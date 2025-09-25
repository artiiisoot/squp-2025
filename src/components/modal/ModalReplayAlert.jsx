import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setIsCloseModal } from "@/reducers/modalSlice";

// 컴포넌트
import Button from "@/components/common/Button";

// 오브젝트
import SqupLogoColor from "@/assets/images/squp_logo_color.svg";
import IconSmile from "@/assets/images/common/icon_smile.png";

const ModalReplayAlert = () => {
  const dispatch = useDispatch();
  const { isShowModal, type, title } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(setIsCloseModal());
  };
  return (
    <>
      {isShowModal && type === "replay" && (
        <div id="ModalReplayAlert" className="modal">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="logo">
                <img src={SqupLogoColor} alt="logo" />
              </div>
            </div>
            <div className="modal-body">
              <h5>{title}</h5>
              <span className="line" />
              <div className="text-group">
                <p>조금만 기다려주세요</p>
                <p>
                  현장의 생생한 순간을 만나보실 수 있어요.{" "}
                  <div className="icon-img">
                    <img src={IconSmile} alt="icon_smile" />
                  </div>
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <Button
                title={"확인"}
                btnColor={"squp"}
                btnSize={"lg"}
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalReplayAlert;
