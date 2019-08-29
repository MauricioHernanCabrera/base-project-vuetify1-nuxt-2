export const state = () => ({});

export const mutations = {};

export const actions = {
  async nuxtServerInit({ dispatch, $axios, commit }) {
    try {
      const token = this.$cookies.get('token');
      console.log('>>> nuxtServerInit <<<');

      if (token) {
        await dispatch('auth/verifyToken', { token });
        await dispatch('auth/login');
        // commit('user/SET_USER', data);
      }
    } catch (error) {
      // console.log(error);
      console.log('No se pudo loguear');
    }
  }
};
