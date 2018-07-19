<template>
  <div id="app">
    <app-header/>
    <slide-out menu="#menu" panel="#main" :toggleSelectors="['.navbar-burger']">
      <nav id="menu">
        <side-menu/>
      </nav>
      <main id="main">
        <router-view />
      </main>
    </slide-out>
      
  </div>
</template>

<script>
import SlideOut from "vue-slideout";
import Header from "./components/Header.vue";
import SideMenu from "./components/SideMenu.vue";
export default {
  name: "App",
  components: {
    SideMenu,
    SlideOut,
    appHeader: Header
  },

  computed: {
    showEditor() {
      return this.$store.getters.editor.show;
    }
  }
};
</script>

<style lang="scss">
$body-background-color: #222;
$text: #cacaca;
$link: #f1f1f1;

$table-background-color: #151515;
$table-color: $text;
$table-cell-heading-color: $text;
$table-row-active-background-color: #0f0f0f;

$modal-card-head-background-color: #0f0f0f;
$modal-card-head-border-bottom: 1px solid #000;
$modal-card-body-background-color: #151515;
$modal-card-foot-border-top: $modal-card-head-border-bottom;

$dropdown-content-background-color: #0f0f0f;
$dropdown-item-color: #cacaca;
$dropdown-divider-background-color: #555;

body {
  width: 100%;
  height: 100vh;
  margin: 0;
}

.slideout-menu {
  position: fixed;
  top: 3.25rem;
  bottom: 0;
  width: 256px;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 0;
  display: none;
  background-color: #1d1f20;
  color: white;
}

.slideout-menu-left {
  left: 0;
}

.slideout-menu-right {
  right: 0;
}

.slideout-panel {
  background-color: #0f0f0f;
  color: white;
  position: relative;
  z-index: 1;
  will-change: transform;
  min-height: 100vh;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
}

@import "../node_modules/bulma/bulma.sass";
</style>
