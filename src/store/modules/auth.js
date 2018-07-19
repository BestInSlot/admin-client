import axios from "axios";
import interceptors from "../../helpers/interceptors";

// interceptors();

const state = {
  isAuthenticated: null,
  userDetails: null
};

const getters = {
  isAuthenticated: state => !!state.isAuthenticated,
  userDetails: state => state.userDetails
};

const mutations = {
  SET_USER(state, user) {
    state.userDetails = user;
  },
  SET_AUTHENTICATE(state, bool) {
    set.isAuthenticated = bool;
  }
};
const actions = {
  async authenticate({ commit }, credentials) {
    try {
      const res = await axios.post("/admin/login", credentials);
      if (res.status >= 200 && res.status < 300) {
        const token = res.data.access_token;
        window.localStorage.setItem("adminToken", token);
        dispatch("setAuthenticate", token.split(".")[0]);
        dispatch("setUserDetails");
      }
    } catch (err) {
      console.error(err);
    }
  },

  invalidate({ commit }) {
    window.localStorage.removeItem("adminToken");
    commit("SET_AUTHENTICATE", null);
    commit("SET_USER", null);
  },

  async setUserDetails({ commit }) {
    try {
      const res = await axios.get("/me");
      if (res.status >= 200 && res.status < 400) {
        commit("SET_USER", res.data.user);
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status === 401;
        const expired = err.response.data.token_expired;
        if (status && expired) {
          dispatch("invalidate");
        }
      }
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
