import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupReset } from "@/reducers/alertSlice";

import { formatText } from "@/utils/utils";
import parse from "html-react-parser";

import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";

const ModalAlert = () => {
  const dispatch = useDispatch();
  const { title, context, btnName, isShowModal, onConfirm } = useSelector(
    (state) => state.alert
  );

  const close = () => {
    dispatch(setPopupReset());
  };

  return (
    <>
      {isShowModal && (
        <div id="ModalAlert" className="modal">
          <div className="modal-dialog">
            <div className="modal-header">
              <h6>{title}</h6>
              <Icon icon="close" size="2rem" onClick={close} />
            </div>
            <div className="modal-body">
              <p>{parse(formatText(context))}</p>
            </div>
            <div className="modal-footer">
              <Button
                title={btnName}
                btnSize={"lg"}
                btnColor={"primary"}
                onClick={onConfirm}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAlert;
