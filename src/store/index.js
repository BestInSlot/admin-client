import Vue from "vue";
import Vuex from "vuex";

import list from "./modules/list.js";
import auth from "./modules/auth.js";

Vue.use(Vuex);

const modules = {
  list,
  auth
};

export default new Vuex.Store({ modules });
