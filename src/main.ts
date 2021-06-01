import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import MockAdapter from "@/core/mock/MockService.ts";
import ApiService from "@/core/services/ApiService.ts";

import "@/core/plugins/nitto.ts";
import "popper.js";
 
import ElementPlus from "element-plus";

import "bootstrap";
import "@/core/plugins/prismjs.ts";

const app = createApp(App);
ApiService.init(app);
initInlineSvg(app);
 
MockAdapter.init(app);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
