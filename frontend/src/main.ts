import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { createPinia } from 'pinia'


import router from "./routers"; // 추가

// if (import.meta.env.VITE_MOCK_SERVER_MODE === 'development') {
//     const { worker } = await import("./mocks/browser.js");
//     await worker.start({
//         onUnhandledRequest: 'bypass', // 정의되지 않은 요청은 무시
//         serviceWorker: {
//             url: '/mockServiceWorker.js', // 서비스 워커의 URL을 명시적으로 지정
//             options: { scope: '/' } // 스코프를 지정하여 초기화 범위를 줄임
//         }
//     });
//     console.log('Mocking enabled');
// }

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)




app.mount("#app"); // .use(router) 추가

