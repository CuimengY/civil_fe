import { Form, Input } from 'antd';
import React from 'react'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: {
        plan:string
    };
    index: number;
    children: React.ReactNode;
  }
const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
})=>{
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0 }}>
                    <Input />
                </Form.Item>
            ): children}
        </td>
    )
}
export default EditableCell;