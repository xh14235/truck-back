import Vue from "vue";
import Vuex from "vuex";

import common from "./common";
import popup from "./popup";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    common,
    popup
  }
});
