<template>
  <div :class="['modal', { 'is-active': showModal}]">
      <div class="modal-background"></div>
      <div class="modal-card">
          <header class="modal-card-head">
              <p class="modal-card-title">Delete</p>
              <button class="delete" @click="$emit('update:showModal', false)"></button>
          </header>
          <section class="modal-card-body">
              <div class="columns is-vcentered">
                <div class="column is-narrow">
                    <i class="fa fa-exclamation-triangle fa-3x"></i>
                </div>
                <div class="column">
                   <div class="content">
                        Are you sure you wish to delete these record(s)? This action is not reversable.
                   </div>
                </div>
            </div>
          </section>
          <footer class="modal-card-foot">
              <button class="button is-primary" @click="deleteRecords">Delete</button>
              <button class="button" @click.prevent="$emit('update:showModal', false)">Cancel</button>
          </footer>
      </div>
  </div>
</template>

<script>
export default {
  name: "delete-prompt",
  props: ["showModal"],

  methods: {
      deleteRecords() {
          this.$store.dispatch("deleteRecords");
          this.$emit('update:showModal', false);
      }
  }
};
</script>

