<template>
    <div :class="['dropdown is-right', { 'is-active': labelToCompare === active }]" @click.stop>
        <div class="dropdown-trigger" @click.prevent="$emit('change', labelToCompare)">
            <button class="button is-info is-small">
                <span>{{label}}:{{filterValue}}</span>
                <i class="fa fa-angle-down"></i>
            </button>
        </div>
        <div class="dropdown-menu">
            <div class="dropdown-content">
                <template v-for="(val, index) in values">
                    <a class="dropdown-item"  @click.prevent.stop="setFilter(val)" :key="index">{{val}}</a>
                    <div class="dropdown-divider" v-if="index !== values.length-1" :key="'divider_'+index"></div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "filter-item",
  props: {
    label: {
      type: String,
      required: true
    },
    values: {
      type: [Object, Array],
      required: true
    },
    active: {
      type: String,
      required: true
    }
  },
  computed: {
    filterValue() {
        return this.$store.getters.filters[this.labelToCompare];
    },
    labelToCompare() {
        return this.label.toLowerCase().replace(/\s+/, "");
    },
  },
  methods: {
    setFilter(val) {
      this.$store.dispatch(`set${this.label.replace(/\s+/, "")}`, val);
      this.$emit("change", "");
    }
  }
};
</script>


