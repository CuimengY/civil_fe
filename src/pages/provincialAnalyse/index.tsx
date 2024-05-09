import { Form, Select } from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react'
import { getCountByDepartment, getDepartments, getUnits } from '../../api/provincial';
import PageLayout from '../../components/pageLayout';

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
interface Info {
    name:any,
    value:any
}
const ProvincialAnalyse = ()=>{
    const [form] = Form.useForm();
    const [units, setUnits] = useState<Job[]>([]);
    const [departments,setDepartments] = useState<Job[]>([]);
    const [info,setInfo] = useState<Info[]>([]);
    useEffect(()=>{
        getUnits().then(res=>{
            setUnits(res);
            form.setFieldValue('unit',res[1]?.unit);
            onChange(res[1]?.unit);
        })
    },[]);

    useEffect(()=>{
        console.log(info)
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
                  data: info,
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
    },[info])

    const onChange = (value:any)=>{
        setDepartments([]);
        form.setFieldValue('department','')
        getDepartments(value).then((res:Job[])=>{
            console.log(res)
            setDepartments(res);
            setInfo(res?.map(item=>({
                name:item?.department,
                value:item?.count
            })).filter((item:Info)=>item?.value!== 0))
        })
    }

    const onDepartmentChange = (value:any)=>{
        getCountByDepartment(form.getFieldsValue()).then((res:Job[])=>{
            setInfo(res?.map(item=>({
                name:item?.qualification,
                value:item?.count,
            }
            )).filter((item:Info)=>item?.value!== 0))
        })
    }

    return (
        <PageLayout>
            <Form form={form} style={{display:'flex'}}>
                <Form.Item label="招考单位" name="unit">
                    <Select 
                    style={{width:'240px',marginRight:'50px'}}
                    options={units?.map(item=>({
                        label:item?.unit,
                        value:item?.unit
                    }))}
                    onChange={onChange}
                    ></Select>
                    
                </Form.Item>
                <Form.Item label="招考部门" name="department">
                    <Select 
                    style={{width:'240px'}}
                    options={departments.map(item=>({
                        label:item?.department,
                        value:item?.department
                    }))}
                    onChange={onDepartmentChange}
                    ></Select>
                </Form.Item>
            </Form>
            <div id="chart_container" style={{width:'80%',height:'500px'}}></div>
        </PageLayout>
    )
}
export default ProvincialAnalyse;