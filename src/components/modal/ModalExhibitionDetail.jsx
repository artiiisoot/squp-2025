import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsCloseModal } from "@/reducers/modalSlice";
import { getRequireImage } from "@/utils/utils";

import Icon from "@/components/common/Icon";

const ModalExhibitionDetail = ({ item }) => {
  const dispatch = useDispatch();
  const { isShowModal, type } = useSelector((state) => state.modal);

  const imageSrc = getRequireImage("exhibition", "detail", item?.detailImg);

  return (
    <>
      {isShowModal && type === "exhibition" && (
        <div id="ModalExhibitionDetail" className="modal">
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
              <img src={imageSrc} alt={item?.title} />
            </div>
            <div className="modal-body">
              <div className="title">
                <p>
                  <b>{item.subtitle}</b>
                </p>
                <h5>{item.title}</h5>
              </div>

              <div className={`wrapper ${item.grid}`}>
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
                            <Icon icon="chevron_right" size="1.25rem" />
                          </Link>
                        )}
                      </ul>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalExhibitionDetail;
