import {  DownOutlined } from '@ant-design/icons';
import { ConfigProvider, Form, Tree, TreeDataNode } from 'antd';
import React, { useEffect, useState } from 'react';
import { addPlans, deletePlans, getPlans, updatePlans } from '../../api/plan';
import PageLayout from '../../components/pageLayout';
import Plan from '../../components/table/plan';

export default function MasterPlan(){
    const [form] = Form.useForm();
    const [selectKey,setSelectKey] = useState("资料分析");
    // const [edit,setEdit] = useState(false);
    const treeData:TreeDataNode[] = [
        {
            title:'行测',
            key:'0-0',
            children:[
                {
                    title:'资料分析',
                    key:'0-0-0',
                },
                {
                    title:'判断推理',
                    key:'0-0-1',
                },
                {
                    title:'言语理解',
                    key:'0-0-2',
                },
                {
                    title:'常识',
                    key:'0-0-3',
                },
                {
                    title:'数量关系',
                    key:'0-0-4',
                }
            ]
        },
        {
            title:'申论',
            key:'0-1'
        }
    ]
    
    const [editingKey, setEditingKey] = useState('');
    const [dataSource, setDataSource] = useState<{id:any,plan:any,part:any,complete:Boolean}[]>([]);

    useEffect(()=>{
        getPlan(selectKey);
    },[])
    const save = async(record:any)=>{
        updatePlans(record.id,form.getFieldValue('plan'),record.complete).then(()=>{
            getPlan(selectKey);
            setEditingKey('')
        })
        
    }
    const getPlan = (part:any)=>{
      getPlans(part).then(res=>{
          setDataSource(res);
      })
    }
    const cancel = ()=>{
        setEditingKey('');
    }
    const deletePlan = (record:any)=>{
        deletePlans(record?.id).then(()=>{
            getPlan(record.part);
        })
        
    }
    const editPlan = (record:any)=>{
        form.setFieldsValue({add:'', ...record });
        setEditingKey(record.id);
    }
   
    const addPlan = ()=>{
      addPlans(form.getFieldValue('add'),selectKey).then(()=>{
        getPlan(selectKey);
        form.resetFields();
      });
      
    }

    const completePlan = (record:any)=>{
        updatePlans(record.id,record.plan,true).then(()=>{
            getPlan(selectKey);
        })
    }
    

    const onSelect = (key:any, e:any)=>{
        setSelectKey(e?.node?.title); 
        getPlan(e?.node?.title);
    }

    return (
        <PageLayout>
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <ConfigProvider
                    theme={{
                        token: {
                        fontSize:16
                        },
                    }}
                >
                    <Tree
                        style={{width:'400px',marginRight:'50px'}}
                        showLine
                        defaultExpandedKeys={['0-0']}
                        defaultSelectedKeys={['0-0-0']}
                        switcherIcon={<DownOutlined />}
                        treeData={treeData}
                        onSelect={onSelect}
                    ></Tree>
                </ConfigProvider>
                <div style={{width:'calc(100% - 400px)',marginRight:'30px'}}>
                    <Plan selectKey={selectKey} 
                        dataSource={dataSource} 
                        editingKey={editingKey}
                        add={addPlan} 
                        form={form} 
                        editPlan={editPlan} 
                        deletePlan={deletePlan} 
                        save={save} 
                        cancel={cancel}
                        completePlan={completePlan}
                    ></Plan>
                </div>
            </div>
        </PageLayout>
    )
}