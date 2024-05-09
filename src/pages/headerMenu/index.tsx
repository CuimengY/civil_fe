import React, {useEffect, useState} from 'react'
import {Menu} from 'antd'
import {
    ReadOutlined,
    GlobalOutlined,
    FlagOutlined,
    ProfileOutlined,
    SignatureOutlined,
    CarryOutOutlined,
    SoundOutlined,
    PieChartOutlined,
    FundOutlined,
    BarChartOutlined,
    FormOutlined,
    RedditOutlined
} from "@ant-design/icons"
import './index.css'
import {useLocation, useNavigate} from 'react-router-dom'

export default function HeaderMenu() {
    const items = [
        {
            label: "国考",
            key: "/national",
            icon: <GlobalOutlined/>,
            children: [
                {
                    label: "政策",
                    key: "/national/policy",
                    icon: <SoundOutlined/>,
                },
                {
                    label: "岗位表",
                    key: "/national/jobs",
                    icon: <BarChartOutlined/>,
                },
                {
                    label: "岗位分析",
                    key: "/national/analyse",
                    icon: <FundOutlined/>,
                },
            ]
        },
        {
            label: "省考",
            key: "/provincial",
            icon: <ReadOutlined/>,
            children: [
                {
                    label: "政策",
                    key: "/provincial/policy",
                    icon: <SoundOutlined/>,
                },
                {
                    label: "岗位表",
                    key: "/provincial/jobs",
                    icon: <BarChartOutlined/>,
                },
                {
                    label: "岗位分析",
                    key: "/provincial/analyse",
                    icon: <FundOutlined/>,
                },

            ]
        },
        {
            label: "题型统计",
            key: "/total",
            icon: <PieChartOutlined/>,
            children: [
                {
                    label: "行测",
                    key: "/policy/administration",
                    icon: <RedditOutlined/>,
                },
                {
                    label: "申论",
                    key: "/policy/essay",
                    icon: <FormOutlined/>,
                },
            ]
        }, {
            label: "计划",
            key: "/plan",
            icon: <CarryOutOutlined/>,
            children: [
                {
                    label: "总计划",
                    key: "/plan/master",
                    icon: <ProfileOutlined/>,
                },
                {
                    label: "详细计划",
                    key: "/plan/daily",
                    icon: <SignatureOutlined/>,
                },
            ]
        }
    ];
    const [openKeys, setopenKeys] = useState<string[]>([]);
    const location = useLocation();
    const {pathname} = location;
    const getDefaultSelect = (pathName: any) => {
        let key = "/";
        items.forEach(item => {
            item.children.forEach((child) => {
                if (pathname.indexOf(child.key) !== -1) {
                    key = child.key;
                }
            })
        })
        return key;
    }
    const getDefaultOpen = (pathname: any) => {
        let key = "/";
        items.forEach(item => {
            if (pathname.indexOf(item.key) !== -1) {
                key = item.key;
            }
        })
        return key;
    }
    const [selectKeys, setSelectKeys] = useState<string[]>([getDefaultSelect(pathname)]);
    const navigate = useNavigate();

    useEffect(() => {
        setSelectKeys([getDefaultSelect(pathname)]);
        setopenKeys([getDefaultOpen(pathname)]);
    }, [])

    const onOpenChange = (keys: string[]) => {
        const rootSubmenuKeys = items.map(i => i.key);
        const lastestOpenKey: any = keys.find((i) => openKeys.indexOf(i) === -1);
        if (rootSubmenuKeys.indexOf(lastestOpenKey) === -1) {
            setopenKeys(keys);
        } else {
            setopenKeys(lastestOpenKey ? [lastestOpenKey] : []);
        }
    }
    const onClick = (select: any) => {
        navigate(select.key)
        setSelectKeys([select.key])
    }
    return (
        <div className='sideBar'>
            <Menu
                mode='inline'
                items={items}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={onClick}
                selectedKeys={selectKeys}
            />
        </div>
    )
}