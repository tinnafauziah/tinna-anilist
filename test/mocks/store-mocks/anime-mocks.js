import Page from '~/test/mocks/api-mocks/anime-list';
import Media from '~/test/mocks/api-mocks/anime-detail';

const animeMock = {
  anime: {
    actions: {
      fetchAnimeList: jest.fn().mockReturnValue({
        Page
      }),
      fetchGenres: jest.fn().mockReturnValue({
        GenreCollection: [
          'Action',
          'Adventure',
          'Comedy',
          'Drama',
          'Ecchi',
          'Fantasy',
          'Hentai',
          'Horror',
          'Mahou Shoujo',
          'Mecha',
          'Music',
          'Mystery',
          'Psychological',
          'Romance',
          'Sci-Fi',
          'Slice of Life',
          'Sports',
          'Supernatural',
          'Thriller'
        ]
      }),
      fetchAnimeDetail: jest.fn().mockReturnValue({ Media }),
    },
    namespaced: true,
  },
};

export default animeMock;
