<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        Home
        <ul>
          <li>
            <nuxt-link to="/admin">admin</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/auth/login">login</nuxt-link>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
