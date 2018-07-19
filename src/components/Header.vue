<template>
    <nav id="top" class="navbar is-black">
        <div class="container is-fluid">
            <div class="navbar-brand">
                <a href="" class="navbar-item">AdminCP v0.0.1a</a>
                <a role="button" :class="navButtonClasses" @click.prevent="isActive = !isActive">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    
                </div>
            </div>
        </div>
    </nav> 
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  },

  computed: {
    navButtonClasses() {
      return ["navbar-burger", { "is-active": this.isActive }];
    }
  }
};
</script>

<style lang="scss">
#top {
  .container.is-fluid {
    margin-left: 16px;
    margin-right: 16px;
  }
  .navbar-item {
    order: 2;
  }
  .navbar-burger {
    display: block !important;
    border-right: 1px solid #555;
    order: 1;
  }
}
</style>
