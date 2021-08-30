import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTours } from "../../store/actions/TourActions";
const { Option } = Select;
const { Search } = Input;

function SearchBox() {
  const [seletedValue, setseletedValue] = useState("difficulty");
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const dofilter = (e) => {
    e.preventDefault();
    console.log(searchValue, seletedValue);
    const filter = `${seletedValue}=${searchValue}`;
    dispatch(getAllTours(filter));
  };
  const handleSelectChange = (val) => {
    setseletedValue(val);
  };

  return (
    <form onSubmit={dofilter} className="search">
      <div className="search__container">
        <Select defaultValue="difficulty" onChange={handleSelectChange}>
          <Option value="difficulty">Difficulty</Option>
          <Option value="name">Name</Option>
        </Select>
        <input
          type="text"
          className="search__input"
          placeholder="Search tour"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className="search__btn">
          <SearchOutlined className="search__btn__icon" />
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
