import View from '~/test/mocks/api-mocks/current-user';

const userMock = {
  users: {
    getters: {
      getCurrentUser: jest.fn().mockReturnValue(View),
    },
    actions: {
      fetchCurrentUser: jest.fn().mockReturnValue({
        View
      }),
    },
    namespaced: true,
  },
};

export default userMock;
