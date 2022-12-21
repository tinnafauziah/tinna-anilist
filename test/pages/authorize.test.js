import flushPromises from 'flush-promises';
import authorize from '~/pages/authorize';
import authMock from '~/test/mocks/store-mocks/auth-mocks';

let store;
const initialMocks = {
  $router: {
    push: jest.fn(),
  },
};
const modules = { ...authMock };

describe('Index Page', () => {
  const mockPage = (customMocks) => {
    const mocks = { ...initialMocks, ...customMocks }
    store = global.createStore({ ...modules });
    return global.shallowMount(authorize, { store, mocks });
  };
  it('should authorize page run properly with $route no hash', async () => {
    mockPage();
    await flushPromises();
    expect(initialMocks.$router.push).toBeCalledWith("/");
  });
  it('should authorize page run properly with $route has hash', async () => {
    const $route = {
      hash: 'hash',
    };
    const wrapper = mockPage({ $route });
    await flushPromises();
    expect(modules.auth.actions.saveToken).toBeCalled();
    expect(initialMocks.$router.push).toBeCalledWith("/");
  });
});
