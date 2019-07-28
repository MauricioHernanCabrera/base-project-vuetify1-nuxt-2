import Vue from 'vue';
import { Vuetify, VApp, VGrid, transitions } from 'vuetify';
import {
  VFlex,
  VLayout,
  VToolbar,
  VBtn,
  VIcon,
  VSpacer,
  VContent,
  VContainer,
  VCard,
  VCardText,
  VCardActions,
  VCardTitle,
  VForm,
  VDialog,
  VFooter,
  VSnackbar,
  VToolbarSideIcon,
  VToolbarItems,
  VToolbarTitle,
  VNavigationDrawer,
  VList,
  VListTile,
  VListTileAction,
  VListTileContent,
  VListTileTitle,
  VTextField
} from 'vuetify/lib';

import { Ripple, Scroll, ClickOutside } from 'vuetify/es5/directives';
// import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  components: {
    VApp,
    VGrid,
    transitions,
    VFlex,
    VLayout,
    VToolbar,
    VBtn,
    VIcon,
    VSpacer,
    VContent,
    VContainer,
    VCard,
    VCardText,
    VCardActions,
    VCardTitle,
    VForm,
    VDialog,
    VFooter,
    VSnackbar,
    VToolbarSideIcon,
    VToolbarItems,
    VToolbarTitle,
    VNavigationDrawer,
    VList,
    VListTile,
    VListTileAction,
    VListTileContent,
    VListTileTitle,
    VTextField
  },
  directives: {
    Ripple,
    Scroll,
    ClickOutside
  },
  options: {
    minifyTheme(css) {
      return css.replace(/[\s|\r\n|\r|\n]/g, '');
    }
  },

  theme: {
    primary: '#7CD6C7',
    // primary: '#99d7cd',
    secondary: '#836DD6',
    success: '#99d7cd',
    warning: '#FFC466',
    error: '#FF6060',
    info: '#4FB6D6'
  }
});
