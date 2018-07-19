<template>
    <div class="container is-fluid has-padding-top" v-if="records.length">
        <div class="columns is-vcentered">
          <div class="column is-half">
              <search-input v-model="search"></search-input>
          </div>
          <app-tools :showModal.sync="showModal" :options="options" @change="changePage(current)"/>
        </div>
        <div class="columns">
          <div class="column">
            <pagination :total="total" :per-page="filters.limit" :current="current" :size="'is-small'"  @change="changePage"/>
          </div>
        </div>
        <table class="table is-fullwidth is-hoverable">
          <thead>
            <th><input type="checkbox" :checked="selectAll" @click.prevent="setSelectAll(!selectAll)"></th>
            <th v-for="header in headers" :key="header" v-if="headers.length">
              <div class="is-flex">
                <span>{{header}}</span>
                <div class="sort-options">
                  <button class="up" @click.prevent="setOrderSort('ASC', header.toLowerCase())"><i class="fa fa-sort-up"/></button>
                  <button class="down" @click.prevent="setOrderSort('DESC', header.toLowerCase())"><i class=" fa fa-sort-down"/></button>
                </div>
              </div>
            </th>
            <th></th>
          </thead>
          <tbody>
            <app-row v-for="(record, index) in records"
              :activeDropDown.sync="dropdown"
              :dropDownIndex="index+1" 
              :key="index" 
              :selected="record.selected" 
              :record="record.columns"/>
          </tbody>
        </table>
        <delete-prompt :showModal.sync="showModal"/>
    </div>
</template>


<script>
import Row from "./Row";
import Tools from "../Tools";
import DeletePrompt from "../DeletePrompt";
import SearchInput from "../Input";
import Pagination from "../Pagination";
import debounce from "lodash/debounce";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "list",
  props: {
    type: {
      type: String,
      required: true
    }
  },

  components: {
    DeletePrompt,
    Pagination,
    appTools: Tools,
    appRow: Row,
    SearchInput
  },

  data() {
    return {
      options: {
        Limit: {
          values: [20, 40, 60]
        }
      },
      search: "",
      showModal: false,
      dropdown: 0,
    };
  },

  computed: {
    headers() {
      return Object.keys(this.records[0].columns).map(key => key.toUpperCase());
    },
    ...mapGetters([
      "records",
      "total",
      "current",
      "filters",
      "selectAll",
    ])
  },
  methods: {
    ...mapActions([
      "setOrderBy",
      "setSortBy",
      "setCurrentPage",
      "fetchRecords",
      "setSelectAll"
    ]),

    setOrderSort(order, sort) {
      this.setOrderBy(order);
      this.setSortBy(sort);
      this.changePage(this.current);
    },

    changePage(num) {
      this.setCurrentPage(num);
      this.fetchRecords();
    }
  }
};
</script>


<style lang="scss">
.has-padding-top {
  padding-top: 30px;
}

.sort-options {
  margin-left: 3px;
  margin-top: 1px;
  .up,
  .down {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    width: 2px;
    height: 2px;
    color: #cacaca;
    &:focus {
      outline: none;
    }
    &:hover {
      color: #555;
    }
  }
}
</style>
