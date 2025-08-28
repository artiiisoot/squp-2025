import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { handleESC } from "@/utils/utils";
import useOutsideClick from "@/utils/useOutsideClick";

const Dropdown = ({
  rowLabel,
  colLabel,
  labelRequired,
  selectedType,
  getCurrentText,
  getCurrentValue,
  showPosition,
  options,
  initValue,
  onChange,
  readonly,

  errorMsg,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState({
    text: "",
    value: 0,
  });
  const [activeType, setActiveType] = useState("bg-gray");
  const [listType, setListType] = useState("");
  const dropdownRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(false);

  const toggleOptionList = () => {
    if (readonly) {
      return;
    } else {
      setIsActive(!isActive);
    }
  };

  const closeOptionList = () => {
    setIsActive(false);
  };

  const clickItem = (item) => {
    const returnValue = options.find((option) => {
      return option == item;
    });
    onChange(returnValue);
    setSelectedItem(true);
    setIsActive(false);
  };

  useEffect(() => {
    const found = options?.find((item) => item.value === getCurrentValue);
    setSelectedIndex(found || { text: "", value: 0 });
  }, [getCurrentValue, options]);

  useEffect(() => {
    const escHandler = handleESC(closeOptionList);
    window.addEventListener("keydown", escHandler);
    return () => {
      window.removeEventListener("keydown", escHandler);
    };
  }, []);

  // 외부 클릭 이벤트
  useOutsideClick(dropdownRef, () => {
    if (isActive) setIsActive(false);
  });

  return (
    <div id="Dropdown" ref={dropdownRef}>
      {rowLabel && (
        <div className="row-label">
          <p>{rowLabel}</p>
          {labelRequired && <i className="required">*</i>}
        </div>
      )}
      <div className="dropdown-wrapper">
        {colLabel && (
          <div className="col-label">
            <p>{colLabel}</p>
            {labelRequired && <i className="required">*</i>}
          </div>
        )}

        <div
          className={`dropdown-selected ${selectedType} ${
            isActive && "active"
          }`}
          onClick={() => toggleOptionList()}
        >
          <p className={selectedItem ? "" : "placehold"}>{getCurrentText}</p>
          <Icon icon="chevron_down" size="1.5rem" />
          <span className="border" />
        </div>

        {isActive && (
          <div
            className={`dropdown-list ${showPosition} ${
              colLabel ? "padding-top" : ""
            }`}
          >
            <ul className={listType}>
              {options.map((item, idx) => (
                <li
                  className={`${activeType} ${
                    selectedIndex.value == item.value ? "active" : ""
                  }`}
                  onClick={() => clickItem(item)}
                  key={item.value}
                >
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 에러메세지 */}
        {errorMsg && <span className="error-msg">{errorMsg}</span>}
      </div>
    </div>
  );
};

export default Dropdown;
