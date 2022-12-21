export const actions = {
  async saveCode(_, code) {
    if (!localStorage.getItem('code') || localStorage.getItem('code') !== code) {
      localStorage.setItem('code', code);
    }
  },
}

export default {
  namespaced: true,
  actions,
};
