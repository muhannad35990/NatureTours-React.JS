import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
function InputPassword({
  name,
  id,
  value,
  handleChange,
  handleBlur,
  placeholder,
  label,
}) {
  const [showPass, setshowPass] = useState(false);
  return (
    <div
      style={{
        backgroundColor: " rgba($color: #eee, $alpha: 1)",
        position: "relative",
      }}
    >
      <div
        className="form__group"
        style={{
          justifyContent: "center",
        }}
      >
        <input
          type={showPass ? "string" : "password"}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form__input"
        />
        <label htmlFor="password" className="form__label">
          {label}
        </label>
      </div>

      {!showPass ? (
        <EyeOutlined
          style={{
            position: "absolute",
            right: "1.5rem",
            top: "55%",
            fontSize: "2rem",
          }}
          onClick={() => setshowPass(!showPass)}
        />
      ) : (
        <EyeInvisibleOutlined
          style={{
            position: "absolute",
            right: "1.5rem",
            top: "55%",
            fontSize: "2rem",
          }}
          onClick={() => setshowPass(!showPass)}
        />
      )}
    </div>
  );
}

export default InputPassword;
