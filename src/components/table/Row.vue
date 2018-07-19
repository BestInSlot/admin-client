<template>
    <tr>
        <td><input type="checkbox" :checked="selected" @change="setSelected"></td>
        <td v-for="(item, key) in record" :key="key" >
            <span>{{item}}</span>
        </td>
        <td>
            <div class="dropdown is-right is-hoverable">
                <div class="dropdown-trigger">
                    <i class="fa fa-ellipsis-v"></i>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content">
                        <router-link :to="`/manage/${activeType}/edit/${record.id}`" class="dropdown-item">
                          <i class="fa fa-edit"></i>
                          <span>Edit</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item">
                          <i class="fa fa-trash" @click.prevent="deleteRecord"></i>
                          <span>Delete</span>
                        </a>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      required: true
    },
    dropDownIndex: {
      type: Number
    },
    activeDropDown: {
      type: Number
    },
    selected: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    selectAll() {
      return this.$store.getters.selectAll;
    },
    activeType() {
      return this.$store.getters.activeType;
    }
  },

  methods: {
    setSelected() {
      this.$store.dispatch("selectRow", {
        id: this.record.id,
        bool: !this.selected
      });
    },
    deleteRecord() {
      this.$store.dispatch("selectRow", { id: this.record.id, bool: true });
      this.$store.dispatch("deleteRecords");
    }
  },

  watch: {
    selectAll(bool) {
      this.$store.dispatch("selectRow", { id: this.record.id, bool });
    }
  }
};
</script>

<style>
.dropdown-menu {
  right: 30px;
}
.dropdown-content > .dropdown-item > span {
  margin-left: 5px;
}
</style>
