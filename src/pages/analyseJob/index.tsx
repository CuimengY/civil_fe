import {Button, Col, Form, Row, Select, Table, Tabs} from 'antd'
import React, { useEffect, useState } from 'react'
import { getBureauByDepartment, getCountByBureau, getDepartments } from '../../api/national';
import PageLayout from '../../components/pageLayout'
import * as echarts from 'echarts'
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
    followed:any,
    departmentid: any,
    departmentname:any,
    website:any,
    number1:any,
    number2:any,
    number3:any,
    qualification:any,
    count:any,
    bureau:any
}
interface Info {
    name:any,
    value:any
}
export default function AnalyseJob() {
    const [form] = Form.useForm();
    const [departments, setDepartments] = useState<Job[]>([]);
    const [bureau,setBureau] = useState<Job[]>([]);
    const [bureauInfo,setBureauInfo] = useState<Info[]>([])
    
    useEffect(()=>{
        getDepartments().then(res=>{
            console.log(res)
            setDepartments(res.data);
            form.setFieldValue('departmentid',res.data[1]?.departmentid);
            onSelectDepartment(res.data[1]?.departmentid);
        })
        
    },[])

    useEffect(()=>{
        let myChart = echarts.init(document.getElementById('chart_container'));
        myChart.setOption({
            title:{
                text: 'Recruitment number',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
              },
            legend: {
                type:'scroll',
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                  name: 'count',
                  type: 'pie',
                  radius: '65%',
                  data: bureauInfo,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
        })
        return ()=>myChart.dispose();
    },[bureauInfo])
    const filterOption = (input:string,option?:{label:string,value:string})=>{
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    }
    const onSelectDepartment = (value:any)=>{
        setBureau([]);
        form.setFieldValue('bureau','');
        getBureauByDepartment(value).then(res=>{
            setBureau(res.data);
            setBureauInfo(res.data?.map((item:Job)=>(
                {
                    name:item?.bureau,
                    value:item?.count
                }
            )).filter((item:Info)=>item?.value!== 0))
        })
        
    }

    const onBureauChange = ()=>{
        getCountByBureau(form.getFieldsValue()).then(res=>{
            setBureauInfo(res.data?.map((item:Job)=>(
                {
                    name:item?.qualification,
                    value:item?.count
                }
            )).filter((item:Info)=>item?.value!== 0))
        })
    }


    
    return (
        <PageLayout>
            <div className="search-part" style={{marginBottom:'20px',display:'flex',justifyContent:'start'}}>
                    <Form 
                        form={form}
                        labelCol={{ span: 6 }}
                        style={{display:'flex'}}
                    >
                        <Form.Item label="部门名称" name="departmentid">
                            <Select
                                style={{width:'240px',marginRight:'50px'}}
                                showSearch
                                onChange={onSelectDepartment}
                                filterOption={filterOption}
                                options={departments?.map(item=>({label:item?.departmentname,value:item?.departmentid}))}
                            />
                        </Form.Item>
                        <Form.Item label="用人司局" name="bureau">
                            <Select 
                            style={{width:'240px'}}
                            options={bureau.map(item=>({
                                label:item?.bureau,
                                value:item?.bureau
                            }))}
                            onChange={onBureauChange}
                            ></Select>
                </Form.Item>
                    </Form>
                </div>
                <div id="chart_container" style={{width:'80%',height:'500px', marginTop:'30px'}}></div>
        </PageLayout>
    )
}