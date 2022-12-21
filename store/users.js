import { gql } from 'nuxt-graphql-request';

export const state = () => ({
  currentUser: null,
});
export const getters = {
  getCurrentUser: (state) => state.currentUser,
};
export const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },
};

export const actions = {
  async fetchCurrentUser({ commit }) {
    const query = gql`
      query {
        Viewer {
          id
          name
        }
      }
    `;
    const requestHeaders = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const user = await this.$graphql.default.request(query, {}, requestHeaders);
    commit('setCurrentUser', user.Viewer);
    return user;
  },
}
export default {
  namespace: true,
  actions,
  mutations,
  getters,
  state,
}
