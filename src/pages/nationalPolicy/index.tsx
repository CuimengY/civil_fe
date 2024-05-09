import {Table, Tabs} from 'antd'
import React from 'react'
import PageLayout from '../../components/pageLayout'

export default function NationalPolicy() {
    const columns = [
        {
            title: "年份",
            dataIndex: "year",
            key: ":year"
        },
        {
            title: "发布公告时间",
            dataIndex: "release",
            key: ":release"
        },
        {
            title: "报名时间",
            dataIndex: "registration ",
            key: ":registration "
        },
        {
            title: "审查时间",
            dataIndex: "review",
            key: ":review"
        },
        {
            title: "确认时间",
            dataIndex: "confirm",
            key: ":confirm"
        },
        {
            title: "打印准考证时间",
            dataIndex: "print",
            key: ":print"
        },
        {
            title: "考试时间",
            dataIndex: "exam",
            key: ":exam"
        }
    ]

    const dataSource = [
        {
            year: '2020',
            release: '10月28日-10月30日',
            registration: '10月28日-10月30日',
            review: '10月28日-10月30日',
            confirm: '10月28日-10月30日',
            print: '10月28日-10月30日',
            exam: '10月28日-10月30日'
        }
    ]

    const items = [
        {
            key: "outline",
            label: "考试大纲",
            children: <a
                href='http://bm.scs.gov.cn/pp/gkweb/core/web/ui/business/article/articledetail.html?ArticleId=8a81f6d08b136fb3018b285a0cd00261&id=0000000062b7b2b60162bccd55ec0006&eid=0000000062b7b2b60162bccdd5860007'>考试大纲</a>
        },
        {
            key: "time",
            label: "报名时间",
            children: <Table columns={columns} dataSource={dataSource} key="key"></Table>
        }
    ]


    const onChange = () => {

    }
    return (
        <PageLayout>
            <Tabs
                type='card'
                onChange={onChange}
                items={items}
            />

        </PageLayout>
    )
}