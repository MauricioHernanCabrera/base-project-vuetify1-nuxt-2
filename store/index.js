export const actions = {
  async nuxtServerInit({ dispatch, $axios }) {
    try {
      const token = this.$cookies.get('token');
      console.log('>>> nuxtServerInit <<<');

      if (token) {
        await dispatch('user/verifyToken', { headerData: { token } });
      } else {
        console.log('No entro');
      }
    } catch (error) {
      console.log('Fallo');
      console.log(error);
    }
  }
};
