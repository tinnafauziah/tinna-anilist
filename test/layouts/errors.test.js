import errorLayout from '~/layouts/error';
describe('Layout Error', () => {
  const mockPage = () => {
    return global.shallowMount(errorLayout);
  };
  it.each([
    [null],
    [{ statusCode: 404 }],
    [{ statusCode: 500 }]
  ])('should layout page match snapshot based on error props: %s', async (statusCode) => {
    const wrapper = mockPage();
    await wrapper.setProps({
      error: { statusCode }
    })
    expect(wrapper.element).toMatchSnapshot();
  });
});
