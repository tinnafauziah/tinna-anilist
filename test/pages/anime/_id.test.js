import flushPromises from 'flush-promises';
import index from '~/pages/anime/_id';
import animeMock from '~/test/mocks/store-mocks/anime-mocks';

let store;
const mocks = {
  $router: {
    push: jest.fn(),
  },
  $route: {
    params: {
      id: 123
    }
  }
};
const modules = { ...animeMock };

describe('Index Page', () => {
  const mockPage = () => {
    store = global.createStore({ ...modules });
    return global.shallowMount(index, { store, mocks });
  };
  it('should index page match snapshot', async () => {
    const wrapper = mockPage();
    await flushPromises();
    expect(wrapper.element).toMatchSnapshot();
  });
});
