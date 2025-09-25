import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setIsCloseModal } from "@/reducers/modalSlice";

// 컴포넌트
import Button from "@/components/common/Button";

// 오브젝트
import SqupLogoColor from "@/assets/images/squp_logo_color.svg";

const ModalFinishRegist = () => {
  const dispatch = useDispatch();
  const { isShowModal, type } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(setIsCloseModal());
  };
  return (
    <>
      {isShowModal && type === "finish" && (
        <div id="ModalFinishRegist" className="modal">
          <div className="modal-dialog">
            <div className="modal-header">
              <div className="logo">
                <img src={SqupLogoColor} alt="logo" />
              </div>
            </div>
            <div className="modal-body">
              <h5>
                2025 시큐업 & 해커톤 <br />
                사전등록이 마감되었습니다.
              </h5>
              <span className="line" />
              <p>
                사전등록을 진행하시지 못하신 분들께서도 <br /> 컨퍼런스 당일
                행사장내 현장등록이 가능하오니 <br /> 많은 참석 부탁드립니다.
              </p>
              <span className="line" />
              <p>감사합니다.</p>
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

export default ModalFinishRegist;
