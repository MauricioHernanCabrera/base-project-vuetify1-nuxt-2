<template>
  <div>
    <v-app-bar color="rgba(0,0,0,0.35)" elevation="0" dense dark app>
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn v-if="title != 'Electronic Key'" small icon text to="/" exact-link>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title :class="{ 'pl-0': title != 'Electronic Key' }">{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn text :to="item.to" v-for="item in routes" :key="item.to">
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list dense nav>
        <v-list-item v-for="item in routes" :key="item.to" :to="item.to" :color="colorActive" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: "Electronic Key"
    }
  },

  data() {
    return {
      routes: [
        {
          to: "/",
          title: "Home",
          icon: "mdi-home"
        },
        {
          to: "/animations",
          title: "Animations",
          icon: "mdi-animation"
        },
        {
          to: "/colors",
          title: "Colors",
          icon: "mdi-palette"
        },
        {
          to: "/config",
          title: "Configuration",
          icon: "mdi-settings"
        }
      ],

      drawer: false
    };
  },

  computed: {
    ...mapState(["colorActive"])
  }
};
</script>

<style lang="scss" scoped>
</style>