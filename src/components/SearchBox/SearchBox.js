import { DownOutlined, SearchOutlined, UpOutlined } from "@ant-design/icons";
import { Divider, Input, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTours, getTop5Cheap } from "../../store/actions/TourActions";
import AnimateHeight from "react-animate-height";
import Checkbox from "antd/lib/checkbox/Checkbox";

const { Option } = Select;
const { Search } = Input;

function SearchBox() {
  const [seletedValue, setseletedValue] = useState("difficulty");
  const [searchValue, setSearchValue] = useState("");
  const [expandSearch, setExpandSearch] = useState(false);
  const dispatch = useDispatch();
  const dofilter = (e) => {
    e.preventDefault();

    const filter = `${seletedValue}=${searchValue}`;
    dispatch(getAllTours(filter));
  };
  const handleSelectChange = (val) => {
    setseletedValue(val);
  };
  const handleTop5Chaep = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) dispatch(getTop5Cheap());
    else dispatch(getAllTours());
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
        <div className="search__expandbtn">
          {expandSearch ? (
            <UpOutlined
              className="search__expandbtn__icon"
              onClick={() => setExpandSearch(!expandSearch)}
            />
          ) : (
            <DownOutlined
              className="search__expandbtn__icon"
              onClick={() => setExpandSearch(!expandSearch)}
            />
          )}
        </div>

        <button type="submit" className="search__btn">
          <SearchOutlined className="search__btn__icon" />
        </button>
      </div>
      <div className="advanced">
        <AnimateHeight
          id="expand-search"
          duration={500}
          height={expandSearch ? "50rem" : "0"}
          className="advanced__content"
        >
          <div style={{ padding: "2rem 0" }}>
            <Divider>Price</Divider>
            <Checkbox onChange={handleTop5Chaep}>Top 5 cheap</Checkbox>
          </div>
        </AnimateHeight>
      </div>
    </form>
  );
}

export default SearchBox;
