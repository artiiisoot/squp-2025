import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setIsCloseModal } from "@/reducers/modalSlice";

// 컴포넌트
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isShowModal, type } = useSelector((state) => state.modal);

  const menus = [
    {
      name: "Tracks",
      path: "/tracks",
    },
    {
      name: "Event",
      path: "/event",
    },
    {
      name: "Previous",
      path: "/previous",
    },
  ];

  const handleMoveToPage = (pathname) => {
    navigate(pathname);
    dispatch(setIsCloseModal());
  };

  const handleMoveToReservation = () => {
    navigate("/reservation");
    dispatch(setIsCloseModal());
  };

  return (
    <>
      {isShowModal && type === "sidebar" && (
        <div id="Sidebar" className="modal">
          <div className="modal-dialog">
            <div className="header">
              <Icon
                icon="close"
                size="2rem"
                onClick={() => {
                  dispatch(setIsCloseModal());
                }}
              />
            </div>
            <div className="body">
              <ul>
                {menus.map((menu, idx) => (
                  <li key={idx} onClick={() => handleMoveToPage(menu.path)}>
                    {menu.name}
                  </li>
                ))}
              </ul>
              <Button
                title={"사전등록"}
                btnColor={"squp-reverse"}
                btnSize={"lg"}
                iconName="arrow_right"
                iconSize="1.75rem"
                iconPosition="right"
                onClick={handleMoveToReservation}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
