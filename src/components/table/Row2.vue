<template>
    <tr>
        <td><input type="checkbox" :checked="selected" @change="setSelected"></td>
        <td v-for="(item, key) in record" :key="key" >
            <span>{{item}}</span>
        </td>
        <td>
            <div :class="['dropdown is-right', { 'is-active': activeDropDown === dropDownIndex}]" @click.prevent.stop="toggleMenu">
                <div class="dropdown-trigger">
                    <i class="fa fa-ellipsis-v"></i>
                </div>
                <div class="dropdown-menu">
                    <div class="dropdown-content">
                        <a class="dropdown-item">Edit</a>
                        <a class="dropdown-item">Delete</a>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
const TOGGLE_OFF_MENU = 0;
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
    dropDownIsActve() {
      return this.activeDropDown !== TOGGLE_OFF_MENU;
    }
  },

  beforeDestroy() {
      document.body.removeEventListener("click", this.closeMenu, false);
  },

  methods: {
    setSelected() {
      this.$store.dispatch("selectRow", {
        id: this.record.id,
        bool: !this.selected
      });
    },
    toggleMenu() {
      if (this.activeDropDown === this.dropDownIndex) {
        this.closeMenu();
      } else {
        this.$emit("update:activeDropDown", this.dropDownIndex);
      }
    },
    closeMenu(e) {
      console.log(e);
      this.$emit("update:activeDropDown", TOGGLE_OFF_MENU);
    }
  },

  watch: {
    selectAll(bool) {
      this.$store.dispatch("selectRow", { id: this.record.id, bool });
    },

    dropDownIsActve(active) {
      if (active) {
        document.body.addEventListener("click", this.closeMenu, false);
      } else {
        document.body.removeEventListener("click", this.closeMenu, false);
      }
    }
  }
};
</script>
