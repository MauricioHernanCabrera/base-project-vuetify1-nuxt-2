const basePath = 'auth';

export const state = () => ({
  user: {}
});

export const getters = {
  isAuth({ user }) {
    return !!user.token;
  }
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {
  async login({ commit }, { bodyData }) {
    const config = {
      auth: bodyData
    };

    const res = await this.$axios.$post(`/${basePath}/token`, null, config);

    commit('SET_USER', { token: res.data.access_token });

    const myDate = new Date();
    const sevenDays = new Date(myDate.setDate(myDate.getDate() + 7));

    this.$cookies.set('token', res.data.access_token, {
      path: '/',
      expires: sevenDays
    });

    this.$axios.setHeader('Authorization', `bearer ${res.data.access_token}`);

    this.$router.push('/admin');

    return res;
  },

  async verifyToken({ commit }, { headerData }) {
    try {
      const resUser = await this.$axios.$get(`/${basePath}/verify`);
      commit('SET_USER', { token: headerData.token });
      console.log(resUser.message);
    } catch (error) {
      this.$cookies.remove('token');
      console.log('No se pudo loguear', error);
    }
  },

  async logout({ commit }) {
    commit('SET_USER', {});
    this.$cookies.remove('token');
    this.$router.push('/');
    this.$axios.setHeader('Authorization', `bearer`);
  }
};
