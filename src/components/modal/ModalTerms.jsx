import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCloseModal } from "@/reducers/modalSlice";

import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";

const ModalTerms = () => {
  const dispatch = useDispatch();
  const { isShowModal, type } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(setIsCloseModal());
  };

  return (
    <>
      {isShowModal && type === "terms" && (
        <div id="ModalTerms" className="modal">
          <div className="modal-dialog">
            <div className="modal-header">
              <h5>개인정보 수집 및 이용 동의</h5>
              <Icon
                icon="close"
                size="2rem"
                onClick={() => dispatch(setIsCloseModal())}
              />
            </div>
            <div className="modal-body">
              <div className="context">
                <p>[필수] 마케팅을 위한 개인정보 수집 및 이용에 관한 동의</p>
                <ul className="dot-style">
                  <li>
                    <p>
                      개인정보 항목: 성함, 이메일 주소, 휴대폰번호, 회사명 또는
                      학교명, 부서/소속, 직급 등
                    </p>
                  </li>
                  <li>
                    <p>
                      수집·이용 목적: 시큐업 세미나 2025 사전 등록 및 행사 안내,
                      디지털 배지 발급, 추후 관련 정보 제공
                    </p>
                  </li>
                  <li>
                    <p>보유 및 이용 기간: 수집일로부터 1년간 보관 후 파기</p>
                  </li>
                </ul>
                <p>
                  ※ 귀하는 개인정보 수집·이용에 동의하지 않을 권리가 있으며,
                  동의하지 않을 경우 세미나 사전등록 및 디지털 배지 발급이
                  제한될 수 있습니다.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <div className="button-group">
                <Button
                  title={"확인"}
                  btnColor={"secondary"}
                  btnSize={"lg"}
                  onClick={handleClose}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTerms;
