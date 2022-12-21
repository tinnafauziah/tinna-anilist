import flushPromises from 'flush-promises';
import detail from '~/pages/anime/_id';
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

describe('Anime Detail Page', () => {
  const mockPage = () => {
    store = global.createStore({ ...modules });
    return global.shallowMount(detail, { store, mocks });
  };
  it('should anime detail page match snapshot', async () => {
    const wrapper = mockPage();
    await flushPromises();
    expect(wrapper.element).toMatchSnapshot();
  });
});
