import "./topbar.css";
import Logo from "images/Logo1.png";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  TableOutlined,
  ArrowLeftOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Popover, Avatar, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import session from "utils/session";

const { Header, Sider, Content } = Layout;

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  

  return (
    <Layout className="lay-hi">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
         
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item icon={<TableOutlined />}>
            <Link to={"/products"}>Products</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            // display: "flex",
          }}
        >
          <Row gutter={20}>
            <Col xxl={12} lg={12} md={12} xs={12}>
              <div style={{ float: "left" }}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </div>
            </Col>
           

            <Col xxl={24} lg={24} md={24} xs={24}>
              <div className="components-heading">
                {
                  <span className="page-text">
                    <Link to={""} className="backBtnStyle">
                      <ArrowLeftOutlined className="arrowBtnStyle" />
                    </Link>
                  </span>
                }
                <span className="page-text">{props.breadCrumbText}</span>
              </div>
            </Col>
          </Row>
        </Header>

        <Content
          className="site-layout-background"
          style={{
            margin: "17px 16px",
            padding: "15px 24px 24px 24px",
            minHeight: 380,
            height: "1200px",
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
