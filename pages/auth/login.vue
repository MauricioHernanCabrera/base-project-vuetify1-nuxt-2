<template>
  <v-form @submit.prevent="sendRequest(loginAndReport)">
    <v-card text max-width="350px">
      <v-card-text>
        <div class="my-5 d-flex justify-center">
          <logo original size="64" />
        </div>

        <h1 class="font-weight-regular my-3 text-center">Inicia sesión con tu email</h1>

        <v-text-field
          v-model="form.email"
          prepend-icon="mdi-email-outline"
          label="Email"
          name="email"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          prepend-icon="mdi-key-outline"
          :append-icon="!showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="Contraseña"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-layout>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            small
            class="subtitle-1 text-lowercase"
            to="/auth/reset"
          >¿Olvidaste tu contraseña?</v-btn>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn text to="/auth/register">registrate</v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :disabled="$v.$invalid || loading"
          :loading="loading"
          type="submit"
          depressed
          color="primary"
        >
          Iniciar sesión
          <span slot="loader" class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import sendRequest from "@/mixins/sendRequest";
export default {
  mixins: [sendRequest],
  middleware: "isAuth",
  layout: "auth",

  validations: {
    form: {
      email: { required },
      password: { required }
    }
  },

  data() {
    return {
      form: {
        email: "holas@gmail.com",
        password: "123456789"
      },
      showPassword: false
    };
  },

  methods: {
    ...mapActions("auth", ["login", "createToken"]),

    async loginAndReport() {
      this.showPassword = false;
      const { email: username, password } = this.form;
      await this.createToken({ header: { username, password } });
      return this.login();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>