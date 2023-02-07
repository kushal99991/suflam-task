import "./table.css";
import React from "react";
import { useEffect, useState } from "react";
import { Table, Input, Button, Modal, Row, Col, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Sidebar from "component/Sidebar";
import CustomTable from "component/table/Table";
import CommonLayout from "component/CommonLayout";
import { USER_COLUMNS } from "utils/column";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, postUserData } from "redux/users/actionCreator";
import { resetPass } from "redux/authentication/actionCreator";
import { Validator } from "utils/validations";
import {
  FIELD_REQUIRED_ALL,
  FIELD_REQUIRED_ALL_CORRECT,
} from "utils/constants";

const { Search } = Input;

const UserTable = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const [searchedPromo, setSearchedPromo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenReset, setModalOpenReset] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [emailReset, setEmailReset] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState(false);
  const [errorReset, setErrorReset] = useState(false);
  const [userError, setUserError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCall = async () => {
      setLoadingState(true);
      const res = await dispatch(getUserData());
      if (res) {
        setLoadingState(false);
      }
    };
    getCall();
  }, [dispatch]);

  // const rowData = JSON.parse(localStorage.getItem("user") || "[]");
  const rowData = [];
  // console.log(first, last, email, password);

  const handleFirst = (e) => {
    e.preventDefault();
    setFirst(e.target.value);
  };

  const handleLast = (e) => {
    e.preventDefault();
    setLast(e.target.value);
  };

  const handleEmail = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setEmail(value);
    setUserError(Validator.validate("email", value, null, null, true));
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setPasswordReset(e.target.value);
  };

  const handleSubmit = async (e) => {
    // console.log("submit your data");
    const payload = {
      email: email,
      password: password,
      firstName: first,
      lastName: last,
    };

    if (
      email !== "" &&
      password !== "" &&
      first !== "" &&
      last !== "" &&
      userError === ""
    ) {
      setLoading(true);
      const resp = await dispatch(postUserData(payload));
      setError("");
      if (!resp.error) {
        setLoading(false);
        // setLoading(false);
        handleCancel();
        const getCall = async () => {
          setLoadingState(true);
          const res = await dispatch(getUserData());
          if (res) {
            setLoadingState(false);
          }
        };
        getCall();
      } else {
        const getCall = async () => {
          setLoadingState(true);
          setLoading(false);
          const res = await dispatch(getUserData());
          if (res) {
            setLoadingState(false);
          }
        };
        getCall();
        // setLoading(false);
      }
    } else {
      if (userError) {
        setError(FIELD_REQUIRED_ALL_CORRECT);
      } else {
        setError(FIELD_REQUIRED_ALL);
      }
    }
  };

  const handleSubmitReset = async (e) => {
    console.log("submit your data", emailReset, passwordReset);

    const payload = {
      email: emailReset,
      password: passwordReset,
    };
    e.preventDefault();
    const resp = await dispatch(resetPass(payload));
    if (!resp.error) {
      const getCall = async () => {
        setLoadingState(true);
        const res = await dispatch(getUserData());
        if (res) {
          setLoadingState(false);
        }
      };
      getCall();
      // setLoading(false);
      handleCancelReset();
    } else {
      const getCall = async () => {
        setLoadingState(true);
        const res = await dispatch(getUserData());
        if (res) {
          setLoadingState(false);
        }
      };
      getCall();
      // setLoading(false);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setEmail("");
    setFirst("");
    setLast("");
    setPassword("");
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  const handleCancelReset = () => {
    setModalOpenReset(false);
    setEmailReset("");
    setPasswordReset("");
    setEmail("");
    setFirst("");
    setLast("");
    setPassword("");
  };

  const handleModalReset = () => {
    setModalOpenReset(true);
  };

  const openPromo = (record, name) => {
    if (name === "view") {
    }

    if (name === "edit") {
      setModalOpenReset(true);
      setEmailReset(record.email);
      console.log(record.email);
    }
  };

  const setupRows = (user) => {
    return (
      user?.length &&
      user?.map((o) => {
        return {
          email: o.email,
          fullName: o.firstName + " " + o.lastName,
          _id: o._id,
          usertype: "paid",
        };
      })
    );
  };

  const onSearch = async (value) => {
    setSearchedPromo(
      setupRows(user)?.length &&
        setupRows(user)?.filter((item) =>
          item.fullName
            .toLowerCase()
            .trim()
            .includes(value?.toLowerCase().trim())
        )
    );
  };

  const children = (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "10px", marginTop: "-13px" }}>
        <span className="error-label">{error}</span>
      </div>
      <Input
        type="text"
        size="large"
        placeholder="First name"
        // value={user}
        onChange={handleFirst}
      />
      <br />
      <br />
      <Input
        type="text"
        size="large"
        placeholder="Last name"
        // value={user}
        onChange={handleLast}
      />
      <br />
      <br />
      <Input
        type="email"
        size="large"
        placeholder="Email"
        // value={user}
        onChange={handleEmail}
      />
      <span className="error-label">{userError}</span>
      <br />
      <br />
      <Input
        type="password"
        size="large"
        placeholder="Enter Password"
        // value={user}
        onChange={handlePassword}
      />
      <br />
      <br />
      <Button type={"primary"} onClick={handleSubmit} block disabled={loading}>
        {loading ? `Loading...` : "Create"}
      </Button>
    </form>
  );

  const resetChild = (
    <form onSubmit={handleSubmitReset}>
      <Input
        type="password"
        size="large"
        placeholder="Enter Reset Password"
        // value={user}
        onChange={handlePasswordReset}
      />
      <br />
      <br />
      <Button
        type={"primary"}
        onClick={handleSubmitReset}
        disabled={true}
        block
      >
        Reset
      </Button>
    </form>
  );

  return (
    <Sidebar className="no-content-mr" breadCrumbText="User Table">
      {loadingState ? (
        <div className="errorTipDiv">
          <Spin size="middle" tip="Loading..." />
        </div>
      ) : (
        <div>
          <Row gutter={20}>
            <Col xxl={12} lg={12} md={24} xs={24}>
              {/* <div className="body-right"> */}
              <div className="search-center">
                <Search
                  placeholder="Search By Name"
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
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="content-create"
                  onClick={handleModal}
                >
                  Create User
                </Button>
              </div>
            </Col>
          </Row>
          {/* </div> */}
          {/* <div className="left-content">
         
        </div> */}
          <br />
          <br />
          <Modal
            visible={modalOpen}
            onCancel={handleCancel}
            footer={null}
            title={"Create User"}
            destroyOnClose
          >
            {children}
          </Modal>
          <Modal
            visible={modalOpenReset}
            onCancel={handleCancelReset}
            footer={null}
            title={"Reset User Password"}
            destroyOnClose
          >
            {resetChild}
          </Modal>
          <div>
            <div style={{ marginBottom: "20px" }}>
              <CustomTable
                columns={USER_COLUMNS}
                rows={searchedPromo ? searchedPromo : setupRows(user)}
                rowKey="_id"
                // isViewable={true}
                isEditable={true}
                onView={(record) => openPromo(record, "view")}
                onEdit={(record) => openPromo(record, "edit")}
              />
            </div>
          </div>
        </div>
      )}
      <div />
    </Sidebar>
  );
};

export default UserTable;
