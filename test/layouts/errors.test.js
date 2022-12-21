import errorLayout from '~/layouts/error';
describe('Layout Error', () => {
  const mockPage = () => {
    const propsData = {};
    return global.shallowMount(errorLayout, { propsData });
  };
  it('should layout page match snapshot', () => {
    const wrapper = mockPage();
    expect(wrapper.vm.error);
    expect(wrapper.element).toMatchSnapshot();
  });
});
