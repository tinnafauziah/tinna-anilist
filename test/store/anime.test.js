import { actions } from '~/store/anime';
import { gql } from 'nuxt-graphql-request';

describe('Store: anime', () => {
  actions.$graphql = {
    default: {
      request: jest.fn(),
    }
  };
  it('should call fetchAnimeList properly', () => {
    const query = gql`
      query ($page: Int, $perPage: Int, $search: String, $sort: [MediaSort], $genre_in: [String] ) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
          }
          media(search: $search, type: ANIME, sort: $sort, genre_in: $genre_in) {
            id
            title {
              romaji
              english
            }
            genres
            coverImage {
              large
            }
            averageScore
          }
        }
      }
    `;
    const variables = { sort: 'TRENDING_DESC' };
    actions.fetchAnimeList(null, variables);
    expect(actions.$graphql.default.request).toBeCalledWith(query, variables);
  });
  it('should call fetchGenres properly', () => {
    const query = gql`
      query {
        GenreCollection
      }
    `;
    actions.fetchGenres(null);
    expect(actions.$graphql.default.request).toBeCalledWith(query);
  });
});
