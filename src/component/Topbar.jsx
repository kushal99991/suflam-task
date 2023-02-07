import React from "react";
import { Breadcrumb, Popover, Layout } from "antd";
import {
  BellOutlined,
  DownOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const { Header } = Layout;

const Topbar = () => {
  return (
    <Header className="site-layout-background header-p">
      <div className="page-header"></div>
    </Header>
  );
};

export default Topbar;
