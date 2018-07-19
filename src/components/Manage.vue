<template>
    <div class="container" v-if="content">
        <component :is="type" :content.sync="content"/>
    </div>
</template>


<script>
import { get } from "axios";
import Post from "./ManagePost";
export default {
  name: "Manage",
  components: {
    Post
  },

  async beforeRouteEnter(to, from, next) {
    let type = to.path.split("/")[2],
      id = to.params.id,
      result;
    if (to.path.split("/")[3] === "new") {
      next(vm => {
        vm.type = type.replace(/s$/, "");
        vm.content = vm.fields[type];
      });
    } else {
      try {
        result = await get(`/${type}/${id}`);
        next(vm => {
          vm.type = type.replace(/s$/, "");
          vm.content = result.data[vm.type];
        });
      } catch (err) {
        next(false);
      }
    }
  },

  data() {
    return {
      content: null,
      type: "",
      fields: {
        post: {
          title: {
            value: "",
            id: "title",
            label: "Title",
            type: "text",
            validators: {
              required: true,
              alpha_num: true,
              min: 10,
              max: 25
            }
          },
          body: {
            value: "",
            id: "raw",
            label: "Body",
            validators: {
              required: true,
              min: 100,
              max: 1000
            }
          }
        }
      }
    };
  },

  computed: {
    records() {
      return this.$store.getters.records;
    }
  },

  methods: {
    async fetchRecord(path) {
      let result;
      try {
        result = await this.$http.get(path);
      } catch (err) {
        console.error(err);
      }
      return result.data[this.type];
    }
  }
};
</script>
