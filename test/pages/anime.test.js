import flushPromises from 'flush-promises';
import animeIndex from '~/pages/anime';
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

describe('Anime Index Page', () => {
  const mockPage = () => {
    store = global.createStore({ ...modules });
    return global.shallowMount(animeIndex, { store, mocks });
  };
  it('should anime Index page match snapshot', async () => {
    const wrapper = mockPage();
    await flushPromises();
    expect(wrapper.element).toMatchSnapshot();
  });
});
