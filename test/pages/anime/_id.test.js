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
  },
  $vuetify: { mobileBreakpoint: {} }
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
  it.each([[{ status: 404 }], [{ status: 404 }]])('should anime detail page match snapshot when error: %s', async (response) => {
    animeMock.anime.actions.fetchAnimeDetail.mockImplementation(() => {
      const fetchError = new Error();
      fetchError.response = response;
      throw fetchError;
    });
    const wrapper = mockPage();
    await flushPromises();
    expect(wrapper.element).toMatchSnapshot();
  });
});
