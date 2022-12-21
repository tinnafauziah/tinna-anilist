import AnimeCard from '~/components/AnimeCard';
import animeIndexData from '~/test/mocks/api-mocks/anime-list'

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

const anime = animeIndexData.media[0];

describe('Anime Index Page', () => {
  const mockPage = (propsData = {}) => {
    return global.shallowMount(AnimeCard, { mocks, propsData });
  };
  it('should anime Index page match snapshot by default anime props', async () => {
    const wrapper = mockPage();
    expect(wrapper.element).toMatchSnapshot();
  });
  it('should anime Index page match snapshot', async () => {
    const wrapper = mockPage();
    await wrapper.setProps({ anime });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('should redirect to detail', async () => {
    const wrapper = await mockPage({ anime });
    wrapper.vm.redirectAnimeDetail();

    expect(mocks.$router.push).toBeCalledWith(`/anime/${anime.id}`);
  });
});
