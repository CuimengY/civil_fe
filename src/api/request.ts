import { message } from "antd";
import { extend } from "umi-request";

const request = extend({
    credentials:'include'
})
request.interceptors.response.use(
    async (response, options) => {
        const {status} = response;
        if(status === 203) {
            window.location.href = "/login"
            message.error("登录失效，请重新登陆！")
        }
        return response;
    },
    {
        global:false
    }
)

export default request;