import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCloseModal } from "@/reducers/modalSlice";

import Icon from "@/components/common/Icon";

const ModalProgramDetail = () => {
  const dispatch = useDispatch();
  const { isShowModal, type } = useSelector((state) => state.modal);

  const close = () => {
    dispatch(setIsCloseModal());
  };
  return (
    <>
      {isShowModal && type === "program" && (
        <div id="ModalProgramDetail" className="modal">
          <div className="modal-dialog">
            <div className="modal-gnb">
              <Icon icon="close" size="2rem" onClick={close} />
            </div>
            <div className="modal-header">
              <h5>Sessions Detail Title</h5>
            </div>
            <div className="modal-body">
              <div className="bg-img"></div>
            </div>
            <div className="modal-footer">
              <div className="thumb-img"></div>
              <div className="context-group">
                <h6>Name</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Vitae semper id lacus
                  velit accumsan platea. Morbi quis mauris felis mollis. Non
                  lacus et lacus et massa eget urna. Nunc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProgramDetail;
