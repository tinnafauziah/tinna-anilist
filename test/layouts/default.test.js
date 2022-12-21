import flushPromises from 'flush-promises';
import defaultLayout from '~/layouts/default';
import userMock from '~/test/mocks/store-mocks/user-mocks';
import currentUser from '~/test/mocks/api-mocks/current-user'

let store;
const initialMocks = {
  $router: {
    push: jest.fn(),
  },
  $route: {
    path: '/',
  },
};
const modules = { ...userMock };

describe('Layout Default', () => {
  const mockPage = (customMocks) => {
    store = global.createStore({ ...modules });
    const mocks = { ...initialMocks, ...customMocks }
    return global.shallowMount(defaultLayout, { store, mocks });
  };
  it.each([['/'], ['/authorize']])('should layout page match snapshot when page is %s', async () => {
    const customPath = {
      $route: {
        path: '/',
      }
    }
    const wrapper = mockPage(customPath);
    await flushPromises();
    expect(wrapper.element).toMatchSnapshot();
  });
  it.each([[null], [currentUser]])('should layout page match snapshot when current user is %s', async (currentUser) => {
    userMock.users.getters.getCurrentUser.mockReturnValue(currentUser);
    const wrapper = mockPage();
    await flushPromises();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('should redirect to home', async () => {
    const wrapper = mockPage();
    await flushPromises();
    const toolbarTitle = await wrapper.find('.toolbar-title');
    toolbarTitle.trigger('click');

    expect(initialMocks.$router.push).toBeCalledWith('/');
  });
});
