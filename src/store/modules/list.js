import axios from "axios";

const state = {
  selectAll: false,
  lists: {
    posts: [],
    users: [],
    settings: []
  },
  filters: {
    orderby: "DESC",
    sortby: "id",
    limit: 20
  },
  total: 0,
  current: 1,
  activeType: ""
};

const getters = {
  total: state => state.total,
  current: state => state.current,
  filters: state => state.filters,
  selectAll: state => state.selectAll,
  activeType: state => state.activeType,
  records: state =>
    state.lists[state.activeType].filter(el => el !== null).map(el => {
      if (state.selectAll) {
        el.selected = true;
      }
      return el;
    }),
  rowsMarkedForChange: (state, getters) =>
    getters.records.filter(el => el.selected).map(el => el.columns.id)
};

const mutations = {
  SET_CURRENT(state, pageNum) {
    state.current = pageNum;
  },
  SET_SELECT_ALL(state, bool) {
    state.selectAll = bool;
  },
  SET_LIMIT(state, limit) {
    state.filters.limit = limit;
  },
  SET_ORDERBY(state, order) {
    state.filters.orderby = order;
  },
  SET_SORTBY(state, sort) {
    state.filters.sortby = sort;
  },
  SET_ACTIVE_TYPE(state, type) {
    state.activeType = type;
  },
  SET_TOTAL(state, total) {
    state.total = total;
  },
  SET_RECORDS(state, records) {
    state.lists[state.activeType] = records;
  },
  SELECT_UNSELECT_RECORD(state, { id, bool }) {
    const record = state.lists[state.activeType].find(
      el => el.columns.id === id
    );
    if (record) {
      record.selected = bool;
    }
  },
  RESET_FILTERS(state) {
    state.filters.sortBy = "id";
    state.filters.orderBy = "DESC";
  },
  CLEAR_RECORDS(state) {
    state.lists[state.activeType] = [];
  }
};

const actions = {
  setSelectAll({ commit }, bool) {
    commit("SET_SELECT_ALL", bool);
  },
  selectRow({ commit }, payload) {
    commit("SELECT_UNSELECT_RECORD", payload);
  },
  setCurrentPage({ commit }, pageNum) {
    commit("SET_CURRENT", pageNum);
  },
  setOrderBy({ commit }, val) {
    commit("SET_ORDERBY", val);
  },
  setSortBy({ commit }, val) {
    commit("SET_SORTBY", val);
  },
  setLimit({ commit }, val) {
    commit("SET_LIMIT", val);
  },
  setActiveType({ commit }, list) {
    commit("SET_ACTIVE_TYPE", list);
  },
  resetOnRouteChange({ commit }) {
    commit("RESET_FILTERS");
    commit("CLEAR_RECORDS");
  },
  async deleteRecords({ dispatch, state, getters, commit }) {
    const type = state.activeType;
    try {
      await axios.delete(`/${type}`, {
        params: { ids: getters.rowsMarkedForChange }
      });
      dispatch("fetchRecords");
    } catch (err) {
      console.log(err);
    }
  },
  async fetchRecords({ state, commit }) {
    const type = state.activeType;
    const params = {
      page: state.current,
      limit: state.filters.limit,
      orderBy: state.filters.orderby,
      sortBy: state.filters.sortby.toLowerCase()
    };
    try {
      const records = await axios.get(`/${type}`, { params });
      commit("SET_RECORDS", records.data[type].results);
      commit("SET_TOTAL", records.data[type].total);
    } catch (err) {
      console.error(err);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};