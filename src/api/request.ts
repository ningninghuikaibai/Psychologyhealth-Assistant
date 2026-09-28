import axios from "axios";

// 开发环境走 Vite 代理（见 vite.config.ts server.proxy），避免 CORS
export const BASE_URL = "/api";

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 请求拦截器：统一携带 token
request.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") ?? "";
  if (token) {
    config.headers.token = token;
  }
  return config;
});

// 响应拦截器：统一处理业务错误
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 后端响应壳层：{ code: "200" | 200, msg/message, success, data? }
    const code = res.code;
    const ok = res.success === true || code === 200 || code === "200";
    if (!ok) {
      const msg = res.msg ?? res.message ?? "请求失败";
      ElMessage.error(msg);
      return Promise.reject(new Error(msg));
    }
    // 有 data 字段时返回剥壳后的数据，否则返回整个 body
    return res.data !== undefined ? res.data : res;
  },
  (error) => {
    // HTTP 层错误（4xx/5xx）时优先取后端返回的中文 msg，避免出现英文状态码提示
    const data = error.response?.data;
    const bizMsg = data && typeof data === "object" ? (data.msg ?? data.message) : undefined;
    const msg = bizMsg ?? error.message ?? "网络异常";
    ElMessage.error(msg);
    return Promise.reject(new Error(msg));
  },
);

export default request;
