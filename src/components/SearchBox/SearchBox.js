import {
  DownOutlined,
  DragOutlined,
  LoadingOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Col, Collapse, Divider, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTours,
  getTop5Cheap,
  getTop5Expense,
} from "../../store/actions/TourActions";
import AnimateHeight from "react-animate-height";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { setSpiner } from "../../store/actions/AlertActions";
import MapBox from "../mapBox/MapBox";
const { Option } = Select;
const { Panel } = Collapse;
function SearchBox() {
  const [seletedValue, setseletedValue] = useState("difficulty");
  const [currentLocation, setCurrentLocation] = useState({
    coordinates: [-70.9, 42.35],
  });
  const [expandSearch, setExpandSearch] = useState(false);
  const [checboxes, setChecboxes] = useState({ cheap: false, expense: false });
  const [gratorOrlower, setGratorOrlower] = useState("equal");
  const spinner = useSelector((state) => state.alert.spinner);
  const gutter = [32, 24];

  const tourSearchSchema = Yup.object().shape({
    price: Yup.number("it must be number"),
    searchValue: Yup.string("It must be string"),
    distance: Yup.number("it must be number"),
  });
  const initialTourSearchValues = {
    price: 0,
    searchValue: "",
    distance: 0,
  };
  const dispatch = useDispatch();
  const doSearch = async (values) => {
    console.log(values);
    let filter;
    dispatch(setSpiner(true));

    if (!expandSearch) {
      filter = `${seletedValue}=${values.searchValue}`;
      dispatch(getAllTours(filter));
    } else {
      if (values.price !== 0) {
        if (gratorOrlower === "greater") {
          filter = `price[gt]=${values.price}`;
        } else if (gratorOrlower === "lower") {
          filter = `price[lt]=${values.price}`;
        } else {
          filter = `price=${values.price}`;
        }
      }
      dispatch(getAllTours(filter));
    }
  };
  const handleSelectChange = (val) => {
    setseletedValue(val);
  };
  useEffect(() => {
    if (checboxes.cheap) dispatch(getTop5Cheap());
    else if (checboxes.expense) dispatch(getTop5Expense());
    else dispatch(getAllTours());
  }, [checboxes]);

  return (
    <Formik
      initialValues={initialTourSearchValues}
      validationSchema={tourSearchSchema}
      onSubmit={doSearch}
      key="formik"
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
        } = props;
        return (
          <form onSubmit={handleSubmit} className="search">
            <div className="search__container">
              <Select defaultValue="difficulty" onChange={handleSelectChange}>
                <Option value="difficulty">Difficulty</Option>
                <Option value="name">Name</Option>
              </Select>
              <input
                type="text"
                name="searchValue"
                id="searchValue"
                value={values.searchValue}
                className="search__input"
                placeholder="Search tour"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.searchValue && touched.searchValue && (
                <span className="form__error">{errors.searchValue}</span>
              )}
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
                {spinner ? (
                  <LoadingOutlined className="search__btn__icon" spin />
                ) : (
                  <SearchOutlined className="search__btn__icon" />
                )}
              </button>
            </div>
            <div className="advanced">
              <AnimateHeight
                id="expand-search"
                duration={500}
                height={expandSearch ? "auto" : 0}
                className="advanced__content"
              >
                <Collapse>
                  <Panel header="Price section search" key={0}>
                    <div className="priceSection">
                      <Divider className="divider--white">Price</Divider>
                      <div className="priceSection__checkboxes">
                        <Checkbox
                          checked={checboxes.cheap}
                          onChange={(e) => {
                            setChecboxes({
                              ...checboxes,
                              cheap: e.target.checked,
                              expense: false,
                            });
                          }}
                        >
                          Top 5 cheap
                        </Checkbox>
                        <Checkbox
                          checked={checboxes.expense}
                          onChange={(e) => {
                            setChecboxes({
                              ...checboxes,
                              expense: e.target.checked,
                              cheap: false,
                            });
                          }}
                        >
                          Top 5 Expense
                        </Checkbox>
                      </div>

                      <div className="greaterLower">
                        <Select
                          value={gratorOrlower}
                          defaultValue="greater"
                          onChange={(val) => setGratorOrlower(val)}
                        >
                          <Option value="equal">Equal</Option>
                          <Option value="greater">Greater then</Option>
                          <Option value="lower">lower than</Option>
                        </Select>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          placeholder="price"
                          value={values.price}
                          onChange={handleChange}
                          className="form__input"
                          style={{
                            marginLeft: "1rem",
                            backgroundColor: "#fff",
                            color: "#000",
                          }}
                        />
                      </div>
                    </div>
                  </Panel>
                  <Panel header="Location section search" key={1}>
                    <Divider>Within distance from position</Divider>
                    <Row gutter={gutter}>
                      <Col span={12}>
                        <div className="form__group">
                          <input
                            type="text"
                            name="lng"
                            id="lng"
                            placeholder="lng"
                            value={currentLocation.coordinates[0]}
                            className="form__input"
                          />
                          <label htmlFor="lng" className="form__label">
                            lng
                          </label>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="form__group">
                          <input
                            type="text"
                            name="lat"
                            id="lat"
                            placeholder="lat"
                            value={currentLocation.coordinates[1]}
                            className="form__input"
                          />
                          <label htmlFor="lat" className="form__label">
                            lat
                          </label>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="form__group">
                          <input
                            type="text"
                            name="distance"
                            id="distance"
                            placeholder="Distance"
                            value={values.distance}
                            className="form__input"
                            onChange={handleChange}
                          />
                          <label htmlFor="distance" className="form__label">
                            Distance
                          </label>
                        </div>
                      </Col>
                      <Col span={12}>
                        <label htmlFor="Unit" className="form__label">
                          Unit
                        </label>
                        <Select
                          name="Unit"
                          id="Unit"
                          defaultValue="km"
                          onChange={handleSelectChange}
                          style={{ width: "100%" }}
                        >
                          <Option value="km">KM</Option>
                          <Option value="mi">Mile</Option>
                        </Select>
                      </Col>
                      <Col span={24}>
                        <div className="search_map">
                          <MapBox
                            key="startMap11111"
                            isRightClickEnabled={true}
                            locations={currentLocation}
                            popLocation={null}
                            menu={2}
                            setFieldValue={setCurrentLocation}
                            isState={true}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </AnimateHeight>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default SearchBox;
