<template>
  <v-container fluid fill-height :pa-0="$vuetify.breakpoint.xsOnly">
    <v-layout :align-center="!$vuetify.breakpoint.xsOnly" justify-center>
      <v-form
        @submit.prevent="sendRequest({ 
            callbackTry: loginAndReport,
          })"
      >
        <v-card flat max-width="350px">
          <v-card-text>
            <div class="mt-5 text-xs-center">
              <v-btn flat icon color="grey" to="/">
                <v-icon style="font-size: 92px;">account_circle</v-icon>
              </v-btn>
            </div>

            <h1 class="font-weight-regular my-3">Sign in with username</h1>

            <v-text-field v-model="form.username" prepend-icon="face" label="Username" type="text"></v-text-field>

            <v-text-field
              v-model="form.password"
              prepend-icon="vpn_key"
              :append-icon="!showPassword ? 'visibility_off' : 'visibility'"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              large
              :disabled="$v.$invalid || loading"
              :loading="loading"
              type="submit"
              depressed
              color="primary"
            >
              Sign in
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      <!-- </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import sendRequest from "@/mixins/sendRequest";

export default {
  mixins: [sendRequest],

  middleware: "isAuth",

  validations: {
    form: {
      username: { required },
      password: { required }
    }
  },

  data() {
    return {
      form: {
        username: "",
        password: ""
      },

      showPassword: false
    };
  },

  methods: {
    ...mapActions("user", ["login"]),

    loginAndReport() {
      this.showPassword = false;
      return this.login({ header: this.form });
    }
  }
};
</script>
</script>

<style lang="scss" scoped>
</style>