import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Icon from "./Icon";
import { removeToast } from "@/reducers/toastSlice";

const Toast = () => {
  const toastList = useSelector((state) => state.toast.list)
  const dispatch = useDispatch()

  useEffect(() => {
    const timers = toastList.map(toast =>
      setTimeout(() => {
        dispatch(removeToast(toast.id))
      }, 3000)
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [toastList])

  return (
    <>
      {toastList.map(({ id, content, type }) => (
        <div id="Toast">
          <div className="toast-group">
            <div key={id} className={`toast-item ${type}`}>
              {type === 'warn' && <Icon icon="danger" size={'1.5rem'} />}
              <p>{content}</p>
              <Icon
                icon="close"
                size="1.5rem"
                onClick={() => dispatch(removeToast(id))}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Toast