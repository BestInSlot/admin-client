<template>
    <div id="controls" class="column is-half is-flex">
        <div class="buttons">
          <button class="button is-default is-small" :disable="disableButton" @click.prevent="$store.dispatch('toggleEditor', true)">
            <i class="fa fa-plus"></i>  
            <span class="text">Create</span>
          </button>
          <button class="button is-primary is-small" :disabled="disableButton" @click.prevent="$emit('update:showModal', true)">
            <i class="fa fa-trash"></i>
            <span class="text">Delete All</span>
          </button>
          <button class="button is-primary is-small" :disabled="disableButton">
            <i class="fa fa-newspaper"></i>
            <span class="text">Publish All</span>
          </button>
          <option-item v-for="(opts, key) in options" 
            :key="'_'+key" 
            :values="opts.values" 
            :label="key" 
            :active="dropdown"
            @change="setDropDown"></option-item>
        </div>
        
    </div>
</template>

<script>
import Option from "./Filter";
export default {
  name: "filter-list",
  components: {
    "option-item": Option
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    showModal: {
      type: Boolean
    }
  },

  data() {
    return {
      dropdown: "",
      isSending: false
    };
  },

  computed: {
    disableButton() {
      return !this.rows.length || this.isSending;
    },
    rows() {
      return this.$store.getters.rowsMarkedForChange;
    }
  },

  methods: {
    setDropDown(key) {
      if (this.dropdown === key) {
        this.dropdown = "";
      }
      this.dropdown = key;
      this.$emit("change");
    },

    async deleteRecords() {
      this.isSending = true;
      try {
        await this.$store.dispatch("deleteRecords");
      } finally {
        this.isSending = false;
      }
    }
  }
};
</script>


<style lang="scss">
#controls {
  justify-content: flex-end;
  .text {
    margin-left: 5px;
  }
}
</style>
