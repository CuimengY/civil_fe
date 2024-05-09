import React, { useEffect, useState } from 'react'
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import {  Button, Calendar, CalendarProps, Drawer, Form,  Modal } from 'antd';
import Plan from '../../components/table/plan';
import { addDailyPlans, deleteDailyPlans, getDailyPlanByDate, getDailyPlans, updateDailyPlans } from '../../api/plan';

export default function MonthPlan() {

    const [open,setOpen]= useState(false);
    const [drawerOpen,setDrawerOpen] = useState(false);
    const [form] = Form.useForm();
    const [currentDate,setCurrentDate] = useState('');
    const [dataSource,setDataSource] = useState<{id:any,plan:any,date:any,complete:Boolean}[]>([]);
    const [editingKey, setEditingKey] = useState('');
    const [listDatas, setListDatas] = useState<{id:any,plan:any,date:any,complete:Boolean}[]>([]);

    useEffect(()=>{
        getDailyPlans().then(res=>{
            setListDatas(res);
        })
    },[open,drawerOpen]);

    const getListData = (value:any)=>{
        let listData: any;
        listData = listDatas.filter(item=>item.date === value);
        return listData || [];
    }

    const getDailyPlan = (date:any)=>{
        getDailyPlanByDate(date).then(res=>{
            setDataSource(res);
        })
    }


    const monthCellRender = (value: Dayjs) => {
        const listData = getListData(value.format('YYYY-MM'));
        return (
          <ul className="events">
            {listData.map((item:any) => (
              <li key={item.id}>
               {item.plan}
              </li>
            ))}
          </ul>
        );
      };

      const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value.format('YYYY-MM-DD'));
        return (
          <ul className="events">
            {listData.map((item:any) => (
              <li key={item.id}>
               {item.plan}
              </li>
            ))}
          </ul>
        );
      };
    
      const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
      };

      const onSelect=(date:Dayjs, obj:any)=>{
        if(obj.source === 'year') {
            return;
        }
        const current = obj.source === 'date' ? date.format('YYYY-MM-DD') : date.format('YYYY-MM');
        setCurrentDate(current);

        getDailyPlan(current);
        const listData = getListData(current);
        if(listData.length ===0) {
            setOpen(true);
        }else {
            setDrawerOpen(true);
        } 
    }

    const handleCancel = ()=>{
        setOpen(false);
        setDrawerOpen(false);
        form.resetFields();
        setDataSource([])
    }
    
    const save = async(record:any)=>{
        updateDailyPlans(form.getFieldValue('plan'),record.id,record.complete).then(()=>{
            setEditingKey('');
            getDailyPlan(currentDate);
        })
    }

    const cancel = ()=>{
        setEditingKey('');
    }

    const addPlan = ()=>{
        addDailyPlans(form.getFieldValue('add'),currentDate).then(()=>{
            form.resetFields();
            getDailyPlan(currentDate);
        })  
    }

    const editPlan = (record:any)=>{
        form.setFieldsValue({add:'', ...record });
        setEditingKey(record.id);
    }

    const deletePlan = (record:any)=>{
        deleteDailyPlans(record?.id).then(()=>{
            getDailyPlan(currentDate);
        })
    }

    const completePlan = (record:any)=>{
        updateDailyPlans(record.plan,record.id,true).then(()=>{
            getDailyPlan(currentDate);
        })
    }

    return (
        <>
            <Calendar cellRender={cellRender} onSelect={onSelect}/>
            <Modal open={open} onCancel={handleCancel} title="新建待办" footer={[]}>
                <Plan form={form}
                    selectKey={currentDate}
                    dataSource={dataSource} 
                    editingKey={editingKey}
                    add={addPlan} 
                    editPlan={editPlan} 
                    deletePlan={deletePlan} 
                    save={save} 
                    cancel={cancel}
                    completePlan={completePlan}
                    >

                </Plan>
                <div style={{display:'flex',justifyContent:'end',padding:0,margin:'10px 0 0 0'}}>
                    <Button key="cancel" onClick={handleCancel} style={{marginRight:'10px'}}>
                        关闭
                    </Button>
                </div>
                
            </Modal>
            <Drawer
                title="修改待办"
                open={drawerOpen}
                width={500}
                onClose={handleCancel}
            >
                <Plan form={form}
                        selectKey={currentDate}
                        dataSource={dataSource} 
                        editingKey={editingKey}
                        add={addPlan} 
                        editPlan={editPlan} 
                        deletePlan={deletePlan} 
                        save={save} 
                        cancel={cancel}
                        completePlan={completePlan}
                        >

                </Plan>
                <div style={{display:'flex',justifyContent:'end',padding:0,margin:'10px 0 0 0'}}>
                    <Button key="cancel" onClick={handleCancel} style={{marginRight:'10px'}}>
                        关闭
                    </Button>
                </div>
            </Drawer>
        </>
      );
}