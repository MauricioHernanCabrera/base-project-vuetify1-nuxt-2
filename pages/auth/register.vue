<template>
  <v-form @submit.prevent="sendRequest(registerAndReport)">
    <v-card text max-width="350px">
      <v-card-text>
        <div class="my-5 d-flex justify-center">
          <logo original size="64" />
        </div>

        <h1 class="font-weight-regular my-3 text-center">Registrate con tu email</h1>

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
      </v-card-text>

      <v-card-actions>
        <v-btn text to="/auth/login">Inicia sesión</v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :disabled="$v.$invalid || loading"
          :loading="loading"
          type="submit"
          depressed
          color="primary"
        >
          Registrarme
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
    ...mapActions("auth", ["register", "createToken", "login"]),

    async registerAndReport() {
      this.showPassword = false;
      const { email, password } = this.form;
      const resRegister = await this.register({
        body: {
          email,
          password
        }
      });

      await this.createToken({
        header: {
          username: email,
          password
        }
      });

      await this.login();

      return resRegister;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>