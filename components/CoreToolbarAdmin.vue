<template>
  <div>
    <v-app-bar app color="primary" dark class="elevation-0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer />
      <slot />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed dark app>
      <v-list rounded>
        <v-list-item
          color
          class="ma-2"
          active-class="white grey--text text--darken-4 border"
          v-for="item in items"
          :key="item.name"
          :to="item.route"
          :exact="item.isExact"
        >
          <v-list-item-action>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block dark depressed @click="logout">Logout</v-btn>
        </div>
      </template>
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
