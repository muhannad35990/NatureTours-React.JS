import React from "react";
import { Button, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import get from "lodash.get";
import isequal from "lodash.isequal";

// custom hooks поиск (фильтр) по подстроке в столбце таблицы

const getColumnSearchProps = (
  dataIndex,
  searchInput,
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn
) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={(node) => (searchInput = node)}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(
              selectedKeys,
              confirm,
              dataIndex,
              setSearchText,
              setSearchedColumn
            )
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() =>
            handleReset(
              clearFilters,
              setSearchText,
              setSearchText,
              setSearchedColumn
            )
          }
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
  onFilter: (value, record) =>
    get(record, dataIndex)
      ? get(record, dataIndex)
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
      : "",
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.select(), 100);
    }
  },
  render: (text) =>
    isequal(searchedColumn, dataIndex) ? (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ) : (
      text
    ),
});

const handleSearch = (
  selectedKeys,
  confirm,
  dataIndex,
  setSearchText,
  setSearchedColumn
) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters, setSearchText) => {
  clearFilters();
  setSearchText("");
};

export default getColumnSearchProps;
