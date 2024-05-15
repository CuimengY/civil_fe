import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router";
import { getPublicKey, login } from "../../api/auth";
import './index.css'
import JSEncrypt from "jsencrypt";

export default function LoginPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onClick = ()=>{
        // navigate("/policy/national")
        getPublicKey().then((res)=>{
            var encryptor = new JSEncrypt();
            encryptor.setPublicKey(res);
            var encryptPassword = encryptor.encrypt(form.getFieldValue("password"));
            console.log(encryptPassword)
            login(form.getFieldValue("username"),encryptPassword).then(res=>{
                if(res){
                    navigate("/policy/national");
                }else {
                    message.error("用户名或密码错误")
                }
            });
        })
    }
    return (
        <div className="login_container">
            <div className="loginImage">
                <img src="/login.jpg" alt="" width="100%" style={{width:'100%',height:'100%'}}/>
            </div>
            <div className="form_container">
                <p style={{fontSize:'30px'}}>civil</p>
                <Form form={form} labelCol={{span: 0}}>
                    <Form.Item name="username">
                        <Input placeholder="请输入用户名"></Input>
                    </Form.Item>
                    <Form.Item name="password">
                        <Input type="password" placeholder="请输入密码"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={onClick} style={{width: '80%',marginLeft:'10%'}}>登录</Button>
                    </Form.Item>
                </Form>
            </div>
            
        </div>
    );
}