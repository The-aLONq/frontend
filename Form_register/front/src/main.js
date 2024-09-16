import { createApp } from 'vue' 
import App from './App' 
import Toaster from "@meforma/vue-toaster"; 
 
createApp(App).use(Toaster).mount("#app");