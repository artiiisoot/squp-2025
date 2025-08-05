import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setIsCloseModal } from "@/reducers/modalSlice";

import { getRequireImage } from "@/utils/utils";

// 컴포넌트
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";

const ModalExhibitionDetail = ({ item }) => {
  const { isMobile } = useSelector((state) => state.device);
  const dispatch = useDispatch();
  const { isShowModal, type } = useSelector((state) => state.modal);

  const imageSrc = getRequireImage("exhibition", "detail", item?.detailImg);

  const handleClose = () => {
    dispatch(setIsCloseModal());
  };

  return (
    <>
      {isShowModal && type === "exhibition" && (
        <div
          id="ModalExhibitionDetail"
          className={isMobile ? "bottom-sheet" : "modal"}
        >
          <div className="modal-dialog">
            <div className="modal-img">
              <img src={imageSrc} alt={item?.title} />
            </div>
            <div className="modal-body">
              <div className="title">
                <p>
                  <b>{item.subtitle}</b>
                </p>
                <h5>{item.title}</h5>
              </div>

              <div className={`content ${item.grid}`}>
                {item.list.map((list, listIdx) => (
                  <div
                    className={`list-group${
                      item.grid === "grid" ? " col-6" : ""
                    }`}
                    key={list.id}
                  >
                    <div className="list-title">{list.number}</div>

                    {list.booth?.map((item, itemIdx) => (
                      <ul className="dot-style" key={`${list.id}_${itemIdx}`}>
                        {item.brand && <h6>{item.brand}</h6>}

                        <li>
                          <p>{item.context}</p>
                        </li>

                        {item.link && (
                          <Link
                            to={item.link}
                            target="_blank"
                            className="link-page"
                          >
                            <p>홈페이지 바로가기</p>
                            <Icon
                              icon="chevron_right"
                              size={isMobile ? "1rem" : "1.25rem"}
                            />
                          </Link>
                        )}
                      </ul>
                    ))}
                  </div>
                ))}
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

export default ModalExhibitionDetail;
