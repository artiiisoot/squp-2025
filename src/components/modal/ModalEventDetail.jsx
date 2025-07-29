import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCloseModal } from "@/reducers/modalSlice";
import { getRequireImage } from "@/utils/utils";

import parse from "html-react-parser";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";

const ModalEventDetail = ({ item }) => {
  const dispatch = useDispatch();
  const { isShowModal, type } = useSelector((state) => state.modal);

  const imageSrc = getRequireImage("event", "detail", item?.detailImg);
  const handleClose = () => {
    dispatch(setIsCloseModal());
  };
  const formatText = (text) => {
    return text
      .split("\n")
      .map((text) => `${text.trim()} <br />`)
      .join("");
  };
  return (
    <>
      {isShowModal && type === "event" && (
        <div id="ModalEventDetail" className="modal">
          <div className="modal-dialog">
            <div className="modal-header">
              <h5>{item.title}</h5>
              <Icon
                icon="close"
                size="2rem"
                onClick={() => dispatch(setIsCloseModal())}
              />
            </div>
            <div className="modal-img">
              <img src={imageSrc} alt={item.title} />
            </div>
            <div className="modal-body">
              <div className="title">
                <p>
                  <b>{item.subtitle}</b>
                </p>
                <h5>{item.title}</h5>
              </div>
              <div className="content">
                <ul className="num-style">
                  <p>{item.how.name}</p>
                  {item.how.context.map((how, howIdx) => (
                    <li key={howIdx}>
                      <p>{parse(formatText(how))}</p>
                    </li>
                  ))}
                </ul>

                <ul className="dot-style">
                  <p>{item.target.name}</p>
                  {item.target.context.map((target, targetIdx) => (
                    <li key={targetIdx}>
                      <p>{target}</p>
                    </li>
                  ))}
                </ul>

                <ul className="dot-style">
                  <p>{item.prize.name}</p>
                  {item.prize.context.map((prize, prizeIdx) => (
                    <li key={prizeIdx}>
                      <p>{prize}</p>
                    </li>
                  ))}
                </ul>
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

export default ModalEventDetail;
