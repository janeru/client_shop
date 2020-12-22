import axios from 'axios';
import https from 'https'
const service = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
    headers: {
        'Content-Type': "application/json;charset=utf-8",
        'Accept': "application/json;charset=utf-8",
    },
    httpsAgent: new https.Agent({
        rejectUnauthorized: false,//add when working with https sites
        requestCert: false,//add when working with https sites
        agent: false,//add when working with https sites
    }),
    timeout: 5000
});

service.interceptors.request.use(
    config => {

        config.headers = { // 如果沒有cors的問題則可以都不加
            "Access-Control-Allow-Origin": process.env.VUE_APP_API_ROOT,
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
            'Access-Control-Allow-Credentials': 'true',
            "Access-Control-Allow-Headers": "Content-Type,Access-Token",
            "Access-Control-Expose-Headers": "*",
            "Access-Control-Max-Age": "86400"
        }
        return config
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        let errorMessage = '';
        if (error && error.response) {
            switch (error.response.status) {
                case 404:
                    console.log("找不到該頁面");
                    errorMessage = '找不到該頁面'
                    break;

                case 500:
                    console.log("伺服器出錯");
                    errorMessage = '伺服器出錯'
                    break;
                case 503:
                    console.log("服務失效");
                    errorMessage = '服務失效'
                    break;
                default:
                    console.log(`連接錯誤${error.response.status}`);
                    errorMessage = `連接錯誤${error.response.status}`
            }
        } else {
            console.log("連接到服務器失敗");
            errorMessage = '連接到服務器失敗'
        }
        return Promise.resolve({ error: errorMessage });
    }
);

export default function (method, url, data = {}, config) {
    method = method.toLowerCase();
    switch (method) {
        case "post":
            return service.post(url, data, config);
        case "get":
            return service.get(url, { params: data });
        case "delete":
            console.log(data)
            return service.delete(url, { data: data });
        case "put":
            return service.put(url, data);
        case "patch":
            return service.patch(url, data);
        default:
            console.log(`未知的 method: ${method}`);
            return false;
    }
}