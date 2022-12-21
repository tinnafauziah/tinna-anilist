import Page from '~/test/mocks/api-mocks/anime-list';

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
    },
    namespaced: true,
  },
};

export default animeMock;
