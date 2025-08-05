import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCloseModal } from "@/reducers/modalSlice";

// 컴포넌트
import Button from "@/components/common/Button";

const ModalReseveListDetail = ({ selectItem }) => {
  const { isMobile } = useSelector((state) => state.device);
  const { isShowModal, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsCloseModal());
  };

  return (
    <>
      {isMobile && isShowModal && type === "reservation" && (
        <div id="ModalResevationDetail" className="bottom-sheet">
          <div className="modal-dialog">
            <div className="modal-body">
              {/* <div id="Table" className="row-type">
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
              </div> */}
              <ul className="list-group">
                <li>
                  <p>이름</p>
                  <p>{selectItem?.name}</p>
                </li>
                <li>
                  <p>휴대폰번호</p>
                  <p>{selectItem?.phone}</p>
                </li>
                <li>
                  <p>이메일</p>
                  <p>{selectItem?.email}</p>
                </li>
                <li>
                  <p>회사명</p>
                  <p>{selectItem?.company}</p>
                </li>
                <li>
                  <p>부서명</p>
                  <p>{selectItem?.department}</p>
                </li>
                <li>
                  <p>직급/직책</p>
                  <p>{selectItem?.position}</p>
                </li>
                <li>
                  <p>트랙</p>
                  <p>{selectItem?.fav_content}</p>
                </li>
                <li>
                  <p>등록일자</p>
                  <p>{selectItem?.wdate}</p>
                </li>
              </ul>
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

export default ModalReseveListDetail;
