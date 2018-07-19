<template>
  <div class="container is-flex is-vcentered">
    <div id="auth">
      <form>
        <fieldset :disabled="sending">
          <app-input v-for="input in credentials" 
            :key="input.id" 
            :label="input.label"  
            :id="input.id" 
            :type="input.type"
            :validators="input.validators"
            v-model="input.value"
          />          
        </fieldset>
      </form>
    </div>
  </div>
</template>


<script>
import Input from "./Input.vue";
export default {
  name: "authentication",
  components: { appInput: Input },
  data() {
    return {
      credentials: {
        email: {
          value: "",
          label: "EMAIL ADDRESS *",
          id: "email",
          type: "input",
          validators: {
            required: true,
            email: true
          }
        },
        password: {
          value: "",
          label: "PASSWORD *",
          id: "email",
          type: "password",
          validators: {
            required: true,
            min: 8,
            max: 20,
            alpha_num: true
          }
        }
      },
      sending: false
    };
  },
  computed: {
    isDisabled() {
      const credentials = this.credentials;
      //if any of the properties returns false, we'll disable the button.
      return Object.keys(credentials).some(key => !credentials[key]);
    }
  }
};
</script>


<style lang="scss">
#auth {
  background-color: #1f1f1f;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  width: 100%;
}
</style>
