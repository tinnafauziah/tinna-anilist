import flushPromises from 'flush-promises';
import index from '~/pages/index';
import animeMock from '~/test/mocks/store-mocks/anime-mocks';

let store;
const mocks = {
  $router: {
    push: jest.fn(),
  },
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
  it('should redirect to detail', async () => {
    const wrapper = mockPage();

    await flushPromises();

    const selectedDetailCard = await wrapper.find('.anime_detail_card');
    selectedDetailCard.vm.$emit('click');

    expect(mocks.$router.push).toBeCalledWith('anime/127230');
  });
});
