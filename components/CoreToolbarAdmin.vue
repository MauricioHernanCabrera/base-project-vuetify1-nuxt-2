<template>
  <div>
    <v-toolbar app color="primary" dark class="elevation-0">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />
      <slot />
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" fixed dark app>
      <v-layout row wrap fill-height class="primary">
        <v-flex xs12>
          <v-list rounded>
            <!-- active-class="white--text" -->
            <v-list-tile
              color
              class="ma-2"
              active-class="white grey--text text--darken-4 border"
              v-for="item in items"
              :key="item.name"
              :to="item.route"
              :exact="item.isExact"
            >
              <v-list-tile-action>
                <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>

        <v-flex xs12>
          <v-spacer></v-spacer>
        </v-flex>

        <v-flex xs12 align-self-end>
          <div class="pa-2">
            <v-btn block dark depressed @click="logout">Logout</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    title: {
      type: String,
      required: true
    },

    iconBackName: {
      type: String,
      default: "arrow_back"
    },

    backActive: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      drawer: null,

      items: [
        {
          name: "Home",
          route: "/",
          icon: "mdi-home-outline",
          isExact: true
        },
        {
          name: "Dashboard",
          route: "/admin",
          icon: "mdi-view-dashboard-outline",
          isExact: true
        },
        {
          name: "Examples",
          route: "/admin/example",
          icon: "mdi-alarm-light-outline",
          isExact: true
        }
      ]
    };
  },

  methods: {
    ...mapActions("user", ["logout"])
  }
};
</script>

<style>
.border {
  border-radius: 5px;
}
</style>
