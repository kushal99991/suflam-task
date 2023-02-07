import "../usertables/table.css";
import React from "react";
import { useEffect, useState } from "react";
import { Select, Input, Button, Modal, Row, Col, Spin, Form } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Sidebar from "component/Sidebar";
import CustomTable from "component/table/Table";
import { SEASON_COLUMNS } from "utils/column";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductData,
} from "redux/seasons/users/actionCreator";

const { Search } = Input;

const Seasons = () => {
  const dispatch = useDispatch();

  const { season } = useSelector((state) => state.season);
  console.log(season);

  // const [searchedPromo, setSearchedPromo] = useState(null); 
  const [searchVal, setSearchVal] = useState("");
  const [filter, setFilter] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const initial = { status: "", season_name: "" };

  // console.log(form);

  useEffect(() => {
    const getCall = async () => {
      setLoadingState(true);
      const res = await dispatch(getProductData(searchVal, filter));
      if (res) {
        setLoadingState(false);
      }
    };
    getCall();
  }, [dispatch, searchVal, filter]);

  const seasonChange = async (e) => {
    // setFilter(e);
    console.log("e=", e)
    setFilter(e);   
  };


  const setupRows = (season) => {
    return (
      season?.length &&
      season?.map((o) => {
        return {
          price: o.price,
          seasonName: o.name,
          quantity: o.availablequantity,
          _id: o._id,
          category: o.category.name,
          sale: o.sellcounter
        };
      })
    );
  };

  const onSearch = async (value) => {
    setSearchVal(value);
    // setSearchedPromo(
    //   setupRows(season)?.length &&
    //     setupRows(season)?.filter((item) =>
    //       item.seasonName
    //         ?.toLowerCase()
    //         .trim()
    //         .includes(value?.toLowerCase().trim())
    //     )
    // );
  };

  return (
    <Sidebar className="no-content-mr" breadCrumbText="Products">


      <div>
        <Row gutter={20}>
          <Col xxl={12} lg={12} md={24} xs={24}>
            {/* <div className="body-right"> */}
            <div className="search-center">
              <Search
                placeholder="Search By Product"
                enterButton
                allowClear
                // style={{ width: "60%" }}
                onSearch={onSearch}
                className="userBtn"
              />
            </div>
          </Col>
          <Col xxl={12} lg={12} md={24} xs={24}>
            <div className="btn-center">
              <Select
                defaultValue={"Sort"}
                onChange={seasonChange}
                style={{ width: "135px", padding: "5px" }}
              >
                <Select.Option value="price%20DESC">
                  {"Price high to low"}
                </Select.Option>
                <Select.Option value="price%20ASC">
                  {"Price low to high"}
                </Select.Option>
                <Select.Option value="sellcounter%20DESC">
                  {"Best Selling"}
                </Select.Option>
                <Select.Option value={""}>{"none"}</Select.Option>
              </Select>
            </div>
          </Col>
        </Row>
        {/* </div> */}
        {/* <div className="left-content">
         
        </div> */}
        <br />
        <br />

        {loadingState ? (
          <div className="errorTipDiv" style={{ padding: "150px", marginLeft: "500px" }}>
            <Spin size="middle" tip="Loading..." />
          </div>
        ) :
          (<div>
            <div style={{ marginBottom: "20px" }}>
              <CustomTable
                columns={SEASON_COLUMNS}
                rows={setupRows(season)}
                rowKey="_id"
              // isViewable={true}

              />
            </div>
          </div>)}
      </div>

      <div />
    </Sidebar>
  );
};

export default Seasons;
