import React, { useState } from 'react';
import {
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {Link, Outlet, useLocation} from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to={"/admin"}>Dashboard</Link>, '1', <PieChartOutlined />),
    getItem("Product", 'sub1', <UserOutlined />, [
        getItem(<Link to={"/admin/products"}>List Product</Link>, '3'),
        getItem('Biến thể', '4'),
        getItem('Bộ sưu tầm', '5'),
    ]),
    getItem('User', 'sub2', <UserOutlined />, [
        getItem('Tom', '6'),
        getItem('Bill', '7'),
        getItem('Alex', '8'),
    ]),
    getItem('Team', 'sub3', <TeamOutlined />, [getItem('Team 1', '9'), getItem('Team 2', '10')]),
    getItem('Files', "11", <FileOutlined />),
];

const HeaderAdmin: React.FC = () => {
    const location = useLocation();

    const breadcrumbItems = location.pathname
        .split("/")
        .filter((path) => path)
        .map((path, index, arr) => {
            const url = `/${arr.slice(0, index + 1).join("/")}`;
            return {
                title: <Link to={url}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>,
            };
        });
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
            <Sider width={"280px"} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <h1 style={{ color: '#000', margin: 0, paddingLeft: 16 }}>Hello Ngô Toản legit</h1>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >

                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default HeaderAdmin;