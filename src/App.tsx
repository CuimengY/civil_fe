import './App.css';
import SideMenu from './pages/sideMenu';
import Content from './pages/content';
import { useLocation } from 'react-router';
import Layout, { Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';
import { Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';


function App() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    return (
        // <div className="App">
        //     {
        //         location.pathname === '/login' ? null : <div className='title-container'>
        //         <span style={{ lineHeight: '50px', paddingLeft: '20px', fontSize: '20px'}}>上岸站</span>
        //     </div>
        //     }
        //     <div className='content-container'>
        //         <SideMenu></SideMenu>
        //         <Content></Content>
        //     </div>

        // </div>
        <Layout>
            {
                location.pathname === '/login' ? <Content></Content> :
                <>
                        <Sider trigger={null} collapsible collapsed={collapsed} style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}>
                            <div className="logo" />
                            <SideMenu></SideMenu>
                        </Sider>
                        <Layout className='site-layout' style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }}>
                            <Header className='site-layout-background' style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                                {
                                    collapsed ? <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} /> : <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
                                }
                            </Header>
                            <Content></Content>
                        </Layout>
                </>
            }
            
        </Layout>
    );
}

export default App;
