import { Input, Select } from "antd";
import React from "react";
const { Option } = Select;
const { Search } = Input;
const selectBefore = (
  <Select defaultValue="Difficulty" className="select-before">
    <Option value="Difficulty">Difficulty</Option>
    <Option value="title">title</Option>
  </Select>
);
function SearchBox() {
  return (
    <Search
      addonBefore={selectBefore}
      placeholder="input search text"
      style={{
        width: "50%",
        marginBottom: "3rem",
      }}
    />
  );
}

export default SearchBox;
