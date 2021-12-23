<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <div class="row">
            <form class="col s12" v-on:submit.prevent="onSubmit">
              <div class="row">
                <div class="input-field">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    v-model="username"
                  />
                  <label for="username">
                    {{ LOGIN_LABEL_USERNAME | localize }}
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="input-field">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    v-model="password"
                  />
                  <label for="password">
                    {{ LOGIN_LABEL_PASSWORD | localize }}
                  </label>
                </div>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                {{ 'LOGIN_BUTTON_LOGIN' | localize }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('login', { username: this.username, password: this.password })
        .then(() => {
          // todo development: move to app.vue (/home)
        })
        .catch((error) => this.$error(error));
    },
  },
};
</script>

<style scoped></style>
