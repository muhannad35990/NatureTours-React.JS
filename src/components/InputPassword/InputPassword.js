import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
function InputPassword({
  name,
  id,
  value,
  handleChange,
  handleBlur,
  placeholder,
}) {
  const [showPass, setshowPass] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        backgroundColor: " rgba($color: #eee, $alpha: 1)",
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
      {!showPass ? (
        <EyeOutlined
          style={{
            position: "absolute",
            right: "1rem",
            fontSize: "2rem",
          }}
          onClick={() => setshowPass(!showPass)}
        />
      ) : (
        <EyeInvisibleOutlined
          style={{
            position: "absolute",
            right: "1rem",
            fontSize: "2rem",
          }}
          onClick={() => setshowPass(!showPass)}
        />
      )}
    </div>
  );
}

export default InputPassword;
