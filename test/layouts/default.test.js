import defaultLayout from '~/layouts/default';

let store;
const mocks = {
  $router: {
    push: jest.fn(),
  },
};

describe('Layout Default', () => {
  const mockPage = () => {
    return global.shallowMount(defaultLayout, { store, mocks });
  };
  it('should layout page match snapshot', () => {
    const wrapper = mockPage();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('should redirect to home', async () => {
    const wrapper = mockPage();
    const toolbarTitle = await wrapper.find('.toolbar-title');
    toolbarTitle.trigger('click');

    expect(mocks.$router.push).toBeCalledWith('/');
  });
});
