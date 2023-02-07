import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";

const CommonLayout = (props) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout style={{ flexDirection: "col", overflowX: "auto" }}>
        {props.children}
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
