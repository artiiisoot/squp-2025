import React from "react";

import Icon from "./Icon";

const Input = ({
  rowLabel,
  colLabel,
  labelRequired,
  borderType = "line",
  name,
  iconName,
  type = "text",
  value,
  onChange,
  onKeyDown,
  placeholder = "",
  required = false,
  disabled = false,
  autoFocus = false,
  className = "",

  onClickIcon,
  timer,
  isExpire,
  errorMsg,
  successMsg,
  infoMsg,
}) => {
  return (
    <div id="Input" className={`${rowLabel && "with-text-lebel"}`}>
      {rowLabel && (
        <div className="row-label">
          <p>{rowLabel}</p>
          {labelRequired && <i className="required">*</i>}
        </div>
      )}

      <div className="input-item">
        {colLabel && (
          <div className="col-label">
            <p>{colLabel}</p>
            {labelRequired && <i className="required">*</i>}
          </div>
        )}

        <div className={`input ${borderType} ${disabled ? "disabled" : ""}`}>
          <input
            id={name}
            name={name}
            autofill={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoFocus={autoFocus}
            onKeyDown={onKeyDown}
          />
          {iconName && (
            <Icon
              icon={iconName}
              size={"1.5rem"}
              style={{ cursor: "pointer" }}
              onClick={onClickIcon}
            />
          )}
          {timer && (
            <span className={`timer ${isExpire ? "expire" : "run"}`}>
              00:00
            </span>
          )}

          <span className={`border ${errorMsg || isExpire ? "error" : ""}`} />
        </div>

        {/* 에러메세지 */}
        {errorMsg && <span className="error-msg">{errorMsg}</span>}
        {/* 성공메세지 */}
        {successMsg && <span className="success-msg">{successMsg}</span>}

        {!errorMsg && infoMsg && (
          <span className="info-msg">
            <Icon
              icon={"info"}
              size={"0.875rem"}
              style={{ cursor: "pointer" }}
            />{" "}
            {infoMsg}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
