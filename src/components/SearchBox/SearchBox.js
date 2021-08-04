import { Input, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTours } from "../../store/actions/TourActions";
const { Option } = Select;
const { Search } = Input;

function SearchBox() {
  const [seletedValue, setseletedValue] = useState("difficulty");
  const dispatch = useDispatch();
  const dofilter = (value) => {
    const filter = `${seletedValue}=${value}`;
    dispatch(getAllTours(filter));
  };
  const handleSelectChange = (val) => {
    setseletedValue(val);
  };
  const selectBefore = (
    <Select defaultValue="difficulty" onChange={handleSelectChange}>
      <Option value="difficulty">difficulty</Option>
      <Option value="name">name</Option>
    </Select>
  );
  return (
    <Search
      addonBefore={selectBefore}
      placeholder="input search text"
      style={{
        width: "50%",
        marginBottom: "3rem",
      }}
      onSearch={dofilter}
    />
  );
}

export default SearchBox;
