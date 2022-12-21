const authMock = {
  auth: {
    actions: {
      saveToken: jest.fn(),
    },
    namespaced: true,
  },
};

export default authMock;
