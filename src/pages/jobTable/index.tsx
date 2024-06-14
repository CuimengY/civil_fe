import {Button, Col, Descriptions, Form, Input, Modal, Row, Select, Table, Tabs} from 'antd'
import React, { useEffect, useState } from 'react'
import { deleteFollowJob, exportFollow, followJob, getBureauByDepartment, getDepartments, getFollowByInfo, getJobsByInfo } from '../../api/national'
import PageLayout from '../../components/pageLayout'
import './index.css'
import handleExportExcel from '../../components/utils/handleExportExcel'

interface Job {
    name:any,
    nature:any,
    distribution:any,
    introduction:any,
    examcatagory:any,
    grassroots:any,
    experience:any,
    professionaltest:any,
    proportion:any,
    settleposition:any,
    remark:any,
    followed:any
}
interface Department {
    departmentid: any,
    departmentname:any,
    website:any,
    number1:any,
    number2:any,
    number3:any
}
interface Bureau {
    bureau:any,
    bureaunature:any,
    level:any,
    dapartmentname:any
    departmentid:any

}

export default function JobTable() {
    const [form] = Form.useForm();
    const columns = [
        {
            title: "部门名称",
            dataIndex: "departmentname",
            key: "departmentname"
        },
        {
            title: "用人司局",
            dataIndex: "bureau",
            key: "bureau"
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
            sorter:(a:any,b:any)=>a.count - b.count
        },
        {
            title: "职位简介",
            dataIndex: "introduction",
            key: "introduction"
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
            title: "政治面貌",
            dataIndex: "political",
            key: "political"
        },
        {
            title: "工作地点",
            dataIndex: "workposition",
            key: "workposition"
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
                            followJob(record).then((res)=>{
                                console.log(res);
                                searchJob();
                            })
                        }} disabled={record?.followed}>关注</Button>
                    }
                    {
                        tabKey==='follow' && <Button type='link' onClick={()=>{
                            deleteFollowJob(record).then(()=>{
                                searchJob();
                            })
                        }}>删除</Button>
                    }
                </div>
                
            )
        },
    ]
   
    const bureauColumns = [
        {
            title: "用人司局",
            dataIndex: "bureau",
            key: "bureau"
        },
        {
            title: "机构层级",
            dataIndex: "level",
            key: "level"
        },
        {
            title: "机构性质",
            dataIndex: "bureaunature",
            key: "bureaunature"
        },
        {
            title: "部门名称",
            dataIndex: "departmentname",
            key: "departmentname"
        },
        {
            title: "部门网站",
            dataIndex: "website",
            key: "website"
        },
        {
            title: "咨询电话1",
            dataIndex: "number1",
            key: "number1"
        },
        {
            title: "咨询电话2",
            dataIndex: "number2",
            key: "number2"
        },
        {
            title: "咨询电话3",
            dataIndex: "number3",
            key: "number3"
        }
       
    ]
    const [dataSources,setDataSources] = useState([]);
    const [dataSource, setDataSource] = useState<Job>();
    const [followList, setFollowList] = useState([]);
    const [departments, setDepartments] = useState<Department[]>();
    const [bureaus, setBureaus] = useState<Bureau[]>();
    const [bureauDatasource, setBureauDatasource] = useState<Bureau[]>();
    const [loading, setLoading] = useState(false);
    const [bureauLoading, setBureauLoading] = useState(false);
    const [followloading, setFollowLoading] = useState(false);
    const [tabKey, setTabKey] = useState('bureau');
    const [isopen, setOpen] = useState(false);

    const exportByServer = ()=>{
        exportFollow(form.getFieldsValue()).then(res=>{
            let url = window.URL.createObjectURL(new Blob([res],{
                type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            }))
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = "关注信息.xlsx";
            a.click();
            setTimeout(()=>{
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            },0)
        })
    }

    const items = [
        {
            key:"bureau",
            label:"机构信息",
            children:<>
            <Button style={{float:'right', marginBottom:'10px'}} onClick={()=>handleExportExcel("机构信息",[{title:"机构信息",columns:bureauColumns,dataSource:bureauDatasource}])}>导出</Button>
            <Table loading={bureauLoading} columns={bureauColumns} dataSource={bureauDatasource} rowKey={record=>record.departmentid+""+record?.bureau+record?.level} />
            </>
        },
        {
            key:"job",
            label:"岗位信息",
            children:
            <>
            <Button style={{float:'right', marginBottom:'10px'}} onClick={()=>handleExportExcel("岗位信息",[{title:"岗位信息",columns:columns,dataSource:dataSources}])}>导出</Button>
            <Table loading={loading} columns={columns} dataSource={dataSources} rowKey={record=>record.id+""+record?.departmentid} />
            </>
        },
        {
            key:"follow",
            label:"关注列表",
            children:
            <>
            <Button style={{float:'right', marginBottom:'10px'}} onClick={exportByServer}>导出</Button>
            <Table loading={followloading} columns={columns} dataSource={followList} rowKey={record=>record.id+""+record?.departmentid} />
            </>
        }
    ]
    useEffect(()=>{
        //获取部门信息
        console.log(tabKey)
        setBureauLoading(true);
        getDepartments().then(res=>{
            console.log(res)
            setDepartments(res.data);
        });
        getBureausInfo();
        
    },[])
    
    const getAllJobs = ()=>{
        setLoading(true)
        getJobsByInfo(form.getFieldsValue()).then(res=>{
            setDataSources(res.data);
            setLoading(false);
        })
    }
    const getBureausInfo = ()=>{
        setBureauLoading(true);
        getBureauByDepartment(form.getFieldValue("departmentid")).then(res=>{
            setBureauDatasource(res.data);
            setBureauLoading(false);
        })
    }
    const getFollowList = ()=>{
        setFollowLoading(true);
        getFollowByInfo(form.getFieldsValue()).then((res)=>{
            setFollowList(res.data);
            setFollowLoading(false);
        })
    }
    const onSelectDepartment = (value:any)=>{
        setBureaus([]);
        form.setFieldValue("bureau",null);
        getBureauByDepartment(value).then(res=>{
            setBureaus(res.data)
        })
    }
    const searchJob = ()=>{
        if(tabKey==='job') {
            getAllJobs();
        } else if(tabKey==='bureau'){
            getBureausInfo();
        } else {
            getFollowList();
        }
    }
    const resetJob = ()=>{
        form.resetFields();
        if(tabKey==="job") {
            setDataSources([]);
            setBureaus([]);
            getAllJobs();
        } else if(tabKey === 'bureau') {
            setBureauDatasource([])
            getBureausInfo();
        } else {
            setFollowList([])
            getFollowList();
        }
    }
    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const changeTab = (key:any)=>{
        setTabKey(key);
        form.resetFields();
        if(key==="job") {
            getAllJobs();
        } else if(key === 'department') {
            getBureausInfo();
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
                                <Form.Item label="部门名称" name="departmentid">
                                    <Select
                                        showSearch
                                        onChange={onSelectDepartment}
                                        filterOption={filterOption}
                                        options={departments?.map(item=>({label:item?.departmentname,value:item?.departmentid}))}
                                    />
                                </Form.Item>
                            </Col>
                            {tabKey !=="bureau" && <>
                            <Col span={6}>
                                <Form.Item label="用人司局" name="bureau">
                                <Select 
                                        showSearch
                                        filterOption={filterOption}
                                        options={bureaus?.map(item=>({label:item?.bureau,value:item?.bureau}))}
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
                                            {value: "硕士研究生及以上", label: "硕士研究生及以上"},
                                            {value: '仅限硕士研究生', label: "仅限硕士研究生"},
                                            {value: '仅限博士研究生', label: "仅限博士研究生"},
                                            {value: '本科及以上', label: "本科及以上"},
                                            {value: '仅限本科', label: "仅限本科"},
                                            {value: '本科或硕士研究生', label: "本科或硕士研究生"},
                                            {value: '大专及以上', label: "大专及以上"}
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="政治面貌" name="political">
                                    <Select
                                        options={[
                                            {value: "不限", label: "不限"},
                                            {value: '中共党员', label: "中共党员"},
                                            {value: '中共党员或共青团员', label: "中共党员或共青团员"}
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="工作地点" name="workposition">
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                            </>}
                            <Col span={12}>
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
                    defaultActiveKey='bureau'
                    items={items}
                    onChange={changeTab}
                />   
                <Modal title="详细信息" open={isopen} footer={null} onCancel={()=>setOpen(false)} width="40%">
                    <div style={{marginTop:'20px'}}>
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="招考职位">{dataSource?.name}</Descriptions.Item>
                            <Descriptions.Item label="职位性质">{dataSource?.nature}</Descriptions.Item>
                            <Descriptions.Item label="职位分布">{dataSource?.distribution}</Descriptions.Item>
                            <Descriptions.Item label="职位简介">{dataSource?.introduction}</Descriptions.Item>
                            <Descriptions.Item label="考试类别">{dataSource?.examcatagory}</Descriptions.Item>
                            <Descriptions.Item label="基层工作最低年限">{dataSource?.grassroots}</Descriptions.Item>
                            <Descriptions.Item label="服务基层项目工作经历">{dataSource?.experience}</Descriptions.Item>
                            <Descriptions.Item label="是否在面试阶段组织专业能力测试">{dataSource?.professionaltest}</Descriptions.Item>
                            <Descriptions.Item label="面试人员比例">{dataSource?.proportion}</Descriptions.Item>
                            <Descriptions.Item label="落户地点">{dataSource?.settleposition}</Descriptions.Item>
                            <Descriptions.Item label="备注">{dataSource?.remark}</Descriptions.Item>
                        </Descriptions>
                        <div style={{display:'flex',justifyContent:'end',marginTop:'10px'}}><Button type='primary' onClick={()=>setOpen(false)}>关闭</Button></div>
                    </div>
                </Modal>
            </div>
        </PageLayout>
    )
}