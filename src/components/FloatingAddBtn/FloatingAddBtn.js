import { PlusOutlined } from "@ant-design/icons";
import React from "react";

function FloatingAddBtn({ handleClick }) {
  return (
    <div className="floatingBtn">
      <PlusOutlined onClick={handleClick} />
    </div>
  );
}

export default FloatingAddBtn;
