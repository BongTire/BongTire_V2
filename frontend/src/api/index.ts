import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// 응답 인터셉터 처리
client.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        return {
          code: "400",
          message: "400",
        };
      }
      if (error.response.status === 401) {

        return {
          data:{
            status: {
              code: 4001,
              message: "잘못된 접근 입니다.",
            },
            data:''
        }}
      }
      if (error.response.status === 403) {
        return {
          code: "403",
          message: "403",
        };
      }
      if (error.response.status === 404) {
        return {
          data:{
            status:{
              code: 4004,
              message: "잘못된 주소 혹은 오류 입니다.",
            },
            data:''
          }
        }

      }
    }
    return Promise.reject(error);
  }
);


export default client;