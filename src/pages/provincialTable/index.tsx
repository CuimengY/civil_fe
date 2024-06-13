import {Button, Col, Descriptions, Form, Input, Modal, Row, Select, Table, Tabs} from 'antd'
import React, { useEffect, useState } from 'react'
import { getJobs, getUnits, getDepartments, getFollows, follow } from '../../api/provincial'
import PageLayout from '../../components/pageLayout'
import handleExportExcel from '../../components/utils/handleExportExcel'

interface Job {
    id:any,
    name:any,
    unit:any,
    sum:any,
    department:any,
    count:any,
    major:any,
    qualification:any,
    otherterms:any,
    catagory:any,
    level:any,
    subjecttype:any,
    number:any,
    psychologicaltest:any,
    physicalfitness:any,
    nature:any,
    introduction:any,
    followed:any
}

export default function ProvincialTable() {
    const [form] = Form.useForm();
    const [units, setUnits] = useState<Job[]>([]);
    const [departments, setDepartments] = useState<Job[]>([]);
    const [dataSources,setDataSources] = useState<Job[]>([]);
    const [dataSource, setDataSource] = useState<Job>();
    const [followList, setFollowList] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [followloading, setFollowLoading] = useState(false);
    const [tabKey, setTabKey] = useState('job');
    const [isopen, setOpen] = useState(false);
    const [total,setTotal] = useState(0);
    const columns = [
        {
            title: "招考部门",
            dataIndex: "department",
            key: "department"
        },
        {
            title: "招考单位",
            dataIndex: "unit",
            key: "unit"
        },
        {
            title: "招考职位",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "招考人数",
            dataIndex: "count",
            key: "count",
            sorter:(a:any,b:any)=>a.count-b.count
        },
        {
            title: "专业",
            dataIndex: "major",
            key: "major"
        },
        {
            title: "学历",
            dataIndex: "qualification",
            key: "qualification"
        },
        
        {
            title: "职位简介",
            dataIndex: "introduction",
            key: "introduction"
        },
        {
            title: "其他资格条件",
            dataIndex: "otherterms",
            key: "otherterms"
        },
        {
            title: "操作",
            key: "action",
            render: (_: any, record: any) => (
                <div style={{display:'flex'}}>
                    <Button type='link' onClick={()=>{
                    setDataSource(record);
                    setOpen(true);
                    }}>详情</Button>
                    {
                        tabKey==='job' && <Button type='link' onClick={()=>{
                            follow(record?.id,true).then(()=>{
                                searchJob();
                            })
                        }} disabled={record?.followed}>关注</Button>
                    }
                    {
                        tabKey==='follow' && <Button type='link' onClick={()=>{
                            follow(record?.id,false).then(()=>{
                                searchJob();
                            })
                        }}>删除</Button>
                    }
                </div>
                
            )
        },
    ]
    const getJobsInfo = (page:any, pageSize: any)=>{
        setDataSources([]);
        setLoading(true);
        getJobs({...form.getFieldsValue(),
            page,
            pageSize
        }).then(res=>{
            setTotal(res?.total)
            setDataSources(res?.list);
            setLoading(false);
        })
    }
    const items = [
        {
            key:"job",
            label:"岗位信息",
            children:
            <>
            <Button style={{float:'right', marginBottom:'10px'}} onClick={()=>handleExportExcel("岗位信息",[{title:"岗位信息",columns:columns,dataSource:dataSources}])}>导出</Button>
            <Table loading={loading} columns={columns} dataSource={dataSources} rowKey={record=>record.id} pagination={{
                onChange: getJobsInfo,
                defaultPageSize: 10,
                defaultCurrent: 1,
                total: total
            }} />
            </>
        },
        {
            key:"follow",
            label:"关注列表",
            children:
            <>
            <Button style={{float:'right', marginBottom:'10px'}} onClick={()=>handleExportExcel("关注列表",[{title:"关注列表",columns:columns,dataSource:followList}])}>导出</Button>
            <Table loading={followloading} columns={columns} dataSource={followList} rowKey={record=>record.id} />
            </>
        }
    ]
    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(()=>{
        getUnits().then(res=>{
            setUnits(res);
        })
        getJobsInfo(1,10);
    },[])
    const getFollowList = ()=>{
        setFollowList([]);
        setFollowLoading(true);
        getFollows(form.getFieldsValue()).then(res=>{
            setFollowList(res);
            setFollowLoading(false);
        })
    }
    const onSelectDepartment = (value:any)=>{
        setDepartments([]);
        form.setFieldValue("department","");
        getDepartments(value).then(res=>{
            setDepartments(res);
        })
    }

    const resetJob = ()=>{
        form.resetFields();
        if(tabKey === 'job') {
            getJobsInfo(1,10);
        } else {
            getFollowList();
        }
    }
    const searchJob = ()=>{
        if(tabKey === 'job') {
            getJobsInfo(1,10);
        } else {
            getFollowList();
        }
    }
    const changeTab = (key:any)=>{
        form.resetFields();
        setTabKey(key);
        if(key === 'job') {
            getJobsInfo(1,10);
        } else {
            getFollowList();
        }
    }
    return (
        <PageLayout>
            <div className="job-container">
                <div className="search-part" style={{marginBottom:'20px'}}>
                    <Form 
                        form={form}
                        labelCol={{ span: 6 }}
                    >
                        <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item label="招考单位" name="unit">
                                    <Select
                                        showSearch
                                        onChange={onSelectDepartment}
                                        filterOption={filterOption}
                                        options={units?.map(item=>({label:item?.unit,value:item?.unit}))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="招考部门" name="department">
                                <Select 
                                        showSearch
                                        filterOption={filterOption}
                                        options={departments?.map(item=>({label:item?.department,value:item?.department}))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="专业" name="major">
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="学历" name="qualification">
                                    <Select
                                        options={[
                                            {value: "研究生", label: "研究生"},
                                            {value: '大学本科及以上', label: "大学本科及以上"},
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <div style={{display:'flex',justifyContent:'end'}}>
                                    <Button type='primary' onClick={resetJob} style={{marginRight:'10px'}}>重置</Button>
                                    <Button type='primary' onClick={searchJob}>查询</Button>
                                </div>
                                
                            </Col>
                        </Row>
                    </Form>
                </div>
                <Tabs
                    type='card'
                    defaultActiveKey='job'
                    items={items}
                    onChange={changeTab}
                />   
                <Modal title="详细信息" open={isopen} footer={null} onCancel={()=>setOpen(false)} width="40%">
                    <div style={{marginTop:'20px'}}>
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="招考职位">{dataSource?.name}</Descriptions.Item>
                            <Descriptions.Item label="职位性质">{dataSource?.nature}</Descriptions.Item>
                            <Descriptions.Item label="职位类别">{dataSource?.catagory}</Descriptions.Item>
                            <Descriptions.Item label="职位层级">{dataSource?.level}</Descriptions.Item>
                            <Descriptions.Item label="公共科目类型">{dataSource?.subjecttype}</Descriptions.Item>
                            <Descriptions.Item label="招考部门电话">{dataSource?.number}</Descriptions.Item>
                            <Descriptions.Item label="心理素质测评">{dataSource?.psychologicaltest}</Descriptions.Item>
                            <Descriptions.Item label="体能恶评">{dataSource?.physicalfitness}</Descriptions.Item>
                        </Descriptions>
                        <div style={{display:'flex',justifyContent:'end',marginTop:'10px'}}><Button type='primary' onClick={()=>setOpen(false)}>关闭</Button></div>
                    </div>
                </Modal>
            </div>
        </PageLayout>
    )
}