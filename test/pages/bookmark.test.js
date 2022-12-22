import flushPromises from 'flush-promises';
import bookmark from '~/pages/bookmark';
import animeMock from '~/test/mocks/store-mocks/anime-mocks';
import userMock from '~/test/mocks/store-mocks/user-mocks';
import View from '~/test/mocks/api-mocks/current-user';

let store;
const mocks = {
  $router: {
    push: jest.fn(),
  },
};
const modules = { ...animeMock, ...userMock };

describe('Bookmark Page', () => {
  const mockPage = () => {
    store = global.createStore({ ...modules });
    return global.shallowMount(bookmark, { store, mocks });
  };
  it.each([[null], [{ View }]])('should bookmark page match snapshot, based on current user : %s', async (currentUser) => {
    userMock.users.getters.getCurrentUser.mockReturnValue(currentUser);
    const wrapper = mockPage();
    await flushPromises();
    expect(wrapper.element).toMatchSnapshot();
  });
});
