import flushPromises from 'flush-promises';
import bookmark from '~/pages/bookmark';
import animeMock from '~/test/mocks/store-mocks/anime-mocks';

let store;
const mocks = {
  $router: {
    push: jest.fn(),
  },
};
const modules = { ...animeMock };

describe('Bookmark Page', () => {
  const mockPage = () => {
    store = global.createStore({ ...modules });
    return global.shallowMount(bookmark, { store, mocks });
  };
  it('should bookmark page match snapshot', async () => {
    const wrapper = mockPage();
    await flushPromises();
    expect(wrapper.element).toMatchSnapshot();
  });
});
