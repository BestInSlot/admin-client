<template>
    <div class="nav-menu">
        <div class="nav-start">
            <router-link to="/" class="nav-item">
                <i class="fa fa-home"></i>
                <span>Home</span>
            </router-link>
            <router-link to="/manage/users" class="nav-item">
                <i class="fa fa-users"></i>
                <span>Users</span>
            </router-link>
            <router-link to="/manage/posts" class="nav-item">
                <i class="fa fa-comments"></i>
                <span>Posts</span>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss">
#menu,
.nav-menu,
.nav-start {
  display: flex;
  flex-direction: column;
  color: #cacaca;
  flex: 1;
}

#menu {
    font-family: "Lato", sans-serif;
    .nav-item {
        padding: 0.5rem 0 0 1rem;
        &:hover {
            background-color: #151515;
        }
    }
    span {
        padding-left: 0.75rem;
    }
}
</style>
