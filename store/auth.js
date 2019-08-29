const basePath = 'auth';

export const actions = {
  async verifyToken({ commit }, { token }) {
    try {
      const resUser = await this.$axios.$get(`/${basePath}/verify`);
      // commit('user/SET_USER', { token }, { root: true });
      this.$axios.setHeader('Authorization', `bearer ${token}`);
      console.log(resUser.message);
    } catch (error) {
      this.$cookies.remove('token');
      console.log('No se pudo loguear', error);
    }
  },

  async login({ commit }, payload = {}) {
    const resLogin = await this.$axios.$get(`/${basePath}/login`);

    commit('user/SET_USER', resLogin.data, { root: true });
    this.$router.push('/');

    console.log(resLogin);

    return resLogin;
  },

  async createToken({}, { header }) {
    const config = {
      auth: header
    };

    const resToken = await this.$axios.$get(`/${basePath}/token`, config);

    this.$axios.setHeader('Authorization', `bearer ${resToken.data.token}`);
    const myDate = new Date();
    const sevenDays = new Date(myDate.setDate(myDate.getDate() + 7));
    this.$cookies.set('token', resToken.data.token, {
      path: '/',
      expires: sevenDays
    });

    return resToken;
  },

  async register({ dispatch }, payload = {}) {
    const { body } = payload;
    const res = await this.$axios.$post(`/${basePath}/register`, body);
    this.$router.push('/auth/login');
    return res;
  },

  async forgot({ dispatch }, payload = {}) {
    const { body } = payload;
    const res = await this.$axios.$post(`/${basePath}/forgot`, body);

    return res;
  },

  async getResetPassword({ dispatch }, payload = {}) {
    const { queryParams } = payload;
    const res = await this.$axios.$get(`/${basePath}/reset/${queryParams._id}`);

    return res;
  },

  async postResetPassword({ dispatch }, payload = {}) {
    const { body, queryParams } = payload;
    const { password, username } = body;
    const res = await this.$axios.$post(
      `/${basePath}/reset/${queryParams._id}`,
      {
        password
      }
    );

    await dispatch('login', { header: { username, password } });

    return res;
  },

  async logout({ commit }) {
    commit('user/SET_USER', {}, { root: true });
    this.$cookies.remove('token');
    this.$router.push('/');
    this.$axios.setHeader('Authorization', `bearer`);
  }
};
