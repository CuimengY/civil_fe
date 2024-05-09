import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Popconfirm, Table, Typography } from "antd";
import EditableCell from "./EditableCell";

export default function Plan(props:any) {
    const isEditing = (record: any) => record.id === props.editingKey;
    
    const columns = [
        {
            title: 'plan',
            dataIndex: 'plan',
            width: '75%',
            editable: true,
          },
          {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: any) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link onClick={() => props.save(record)} style={{ marginRight: 8 }}>
                    Save
                  </Typography.Link>
                  <Popconfirm title="Sure to cancel?" onConfirm={props.cancel}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                    <Typography.Link disabled={props.editingKey !== ''} onClick={() => props.editPlan(record)} style={{ marginRight: 8 }}>
                    <EditOutlined  style={{fontSize:'16px'}} />
                    </Typography.Link>
                    <Typography.Link disabled={props.editingKey !== ''}>
                        <Popconfirm title="Sure to delete?" onConfirm={() => props.deletePlan(record)}>
                        <DeleteOutlined  style={{fontSize:'16px'}} />
                        </Popconfirm>
                    </Typography.Link>
                    <Typography.Link disabled={props.editingKey !== '' || record.complete} onClick={() => props.completePlan(record)} style={{ marginLeft: 8 }}>
                    <CheckCircleOutlined  style={{fontSize:'16px'}} />
                    </Typography.Link>
                </span>
              );
            },
          },
    ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record:any) => ({
            record,
            inputType: col.dataIndex === 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });
      
    return (
        <Form form={props.form}>
            <div style={{marginBottom:'20px',fontSize:18, color:'red'}}>{props.selectKey}</div>
                        <div style={{display:'flex'}}>
                            <Form.Item name="add" label="计划" style={{width:'100%',marginRight:'20px'}}>
                                <Input allowClear onPressEnter={props.add}></Input>
                            </Form.Item>
                        </div>
                        <Table components={{body: {
                        cell: EditableCell,
                        },}} 
                        rowKey={record=>record?.id}
                        dataSource={props.dataSource} 
                        columns={mergedColumns} 
                        showHeader={false} 
                        pagination={false}>
                                
                    </Table>
                    </Form>
    )
}