<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <div class="row">
            <form class="col s12" v-on:submit.prevent="onSubmit">
              <div class="row center-align">
                <div class="col s12">
                  <avatar />
                </div>
              </div>

              <div class="row">
                <div class="input-field">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    v-model="lastname"
                  />
                  <label for="lastname">
                    {{ 'PROFILE_LABEL_LASTNAME' | localize }}
                  </label>
                  <!--                  <span class="helper-text invalid">-->
                  <!--                    {{ 'PROFILE_MESSAGE_INVALID_LASTNAME' | localize }}-->
                  <!--                  </span>-->
                </div>

                <div class="input-field">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    v-model="firstname"
                  />
                  <label for="firstname">
                    {{ 'PROFILE_LABEL_FIRSTNAME' | localize }}
                  </label>
                  <!--                  <span class="helper-text invalid">-->
                  <!--                    {{ 'PROFILE_MESSAGE_INVALID_FIRSTNAME' | localize }}-->
                  <!--                  </span>-->
                </div>

                <div class="input-field">
                  <input
                    id="middlename"
                    name="middlename"
                    type="text"
                    v-model="middlename"
                  />
                  <label for="middlename">
                    {{ 'PROFILE_LABEL_MIDDLENAME' | localize }}
                  </label>
                  <!--                  <span class="helper-text invalid">-->
                  <!--                    {{ 'PROFILE_MESSAGE_INVALID_MIDDLENAME' | localize }}-->
                  <!--                  </span>-->
                </div>
              </div>

              <div class="row">
                <div class="input-field">
                  <input id="email" name="email" type="text" v-model="email" />
                  <label for="email">
                    {{ 'PROFILE_LABEL_EMAIL' | localize }}
                  </label>
                  <!--                  <span class="helper-text invalid">-->
                  <!--                    {{ 'PROFILE_MESSAGE_INVALID_EMAIL' | localize }}-->
                  <!--                  </span>-->
                </div>
              </div>

              <button class="btn waves-effect waves-light" type="submit">
                {{ 'PROFILE_BUTTON_UPDATE' | localize }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import Avatar from '@/components/Avatar';

export default {
  name: 'Profile',
  components: { Avatar },
  data: () => ({
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    avatar: '',
  }),
  computed: {
    user: function () {
      return this.$store.getters.user || {};
    },
  },
  watch: {
    user: {
      handler: 'userChanged',
      immediate: true,
    },
  },
  methods: {
    userChanged: function () {
      this.firstname = this.user.firstname ?? '';
      this.lastname = this.user.lastname ?? '';
      this.middlename = this.user.middlename ?? '';
      this.email = this.user.email ?? '';
      this.avatar = this.user.avatar ?? '';
    },
    onSubmit: function () {},
  },

  mounted() {
    M.updateTextFields();
  },
};
</script>

<style scoped></style>
