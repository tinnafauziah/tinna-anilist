import defaultLayout from '~/layouts/default';

const initialMocks = {
  $router: {
    push: jest.fn(),
  },
  $route: {
    path: '/',
  },
};

describe('Layout Default', () => {
  const mockPage = (customMocks) => {
    const mocks = { ...initialMocks, ...customMocks }
    return global.shallowMount(defaultLayout, { mocks });
  };
  it.each([['/'], ['/authorize']])('should layout page match snapshot when page is %s', () => {
    const customPath = {
      $route: {
        path: '/',
      }
    }
    const wrapper = mockPage(customPath);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('should redirect to home', async () => {
    const wrapper = mockPage();
    const toolbarTitle = await wrapper.find('.toolbar-title');
    toolbarTitle.trigger('click');

    expect(initialMocks.$router.push).toBeCalledWith('/');
  });
});
