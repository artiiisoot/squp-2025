import React from "react";

import Icon from "../common/Icon";

const ModalReseveListDetail = ({ isModalOpen, setIsModalOpen, selectItem }) => {
  const close = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div id="ModalReseveListDetail" className="modal">
      <div className="modal-dialog">
        <div className="modal-header">
          <Icon icon="close" size="2rem" onClick={close} />
        </div>
        <div className="modal-body">
          <div id="Table" className="row-type">
            <div className="tr">
              <div className="td name">
                <p>{selectItem?.name}</p>
              </div>
            </div>
            <div className="tr">
              <div className="th">휴대폰번호</div>
              <div className="td">
                <p>{selectItem?.phone}</p>
              </div>
            </div>
            <div className="tr">
              <div className="th">이메일</div>
              <div className="td">
                <p>{selectItem?.email}</p>
              </div>
            </div>
            <div className="tr">
              <div className="th">회사명</div>
              <div className="td">
                <p>{selectItem?.company}</p>
              </div>
            </div>
            <div className="tr">
              <div className="th">부서명</div>
              <div className="td">
                <p>{selectItem?.department}</p>
              </div>
            </div>
            <div className="tr">
              <div className="th">직급/직책</div>
              <div className="td">
                <p>{selectItem?.position}</p>
              </div>
            </div>
            <div className="tr">
              <div className="th">예약일</div>
              <div className="td">
                <p>{selectItem?.wdate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReseveListDetail;
