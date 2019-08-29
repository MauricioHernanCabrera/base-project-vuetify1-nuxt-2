const basePath = 'users';

export const state = () => ({
  user: {}
});

export const getters = {
  isAuth({ user: { username = null } }) {
    return !!username;
  }
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};

export const actions = {};
