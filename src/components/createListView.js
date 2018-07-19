import Table from "./table/Table.vue";
import store from "../store/";

export default function createListView(type) {
  return {

    async beforeRouteEnter(to, from, next) {
      store.dispatch("setActiveType", type);
      try {
        await store.dispatch("fetchRecords");
        next();
      } catch (err) {
        console.log(err);
        next(false);
      }
    },

    beforeRouteLeave(to, from, next) {
      this.$store.dispatch("setCurrentPage", 1);
      next();
    },

    render(h) {
      return h(Table, { props: { type } });
    },

    
  };
}
