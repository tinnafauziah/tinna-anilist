export const actions = {
  async saveToken(_, hash) {
    const hashArray = hash.split('&');
    const tokenArray = hashArray[0].split('=');
    if (!localStorage.getItem('token') || localStorage.getItem('token') !== tokenArray[1]) {
      localStorage.setItem('token', tokenArray[1]);
    }
  },
}

export default {
  namespaced: true,
  actions,
};
