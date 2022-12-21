import { actions } from '~/store/anime';
import { gql } from 'nuxt-graphql-request';

describe('Store: anime', () => {
  actions.$graphql = {
    default: {
      request: jest.fn(),
    }
  };

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer eyJ0eXAiOiJ",
    "Content-Type": "application/json",
  }

  jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValue('eyJ0eXAiOiJ');

  it('should call fetchAnimeList properly', () => {
    const query = gql`
      query ($page: Int, $perPage: Int, $search: String, $sort: [MediaSort], $genre_in: [String] ) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
            hasNextPage
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
  it('should call fetchAnimeDetail properly', () => {
    const query = gql`
      query ($id: Int) {
        Media(id: $id) {
          id
          title {
            romaji
            english
          }
          genres
          coverImage {
            extraLarge
          }
          description
          averageScore
        }
      }
    `;
    const variables = { id: 123 };

    actions.fetchAnimeDetail(null, variables);
    expect(actions.$graphql.default.request).toBeCalledWith(query, variables);
  });
  it('should call addBookmarkAnime properly', () => {
    const query = gql`
      mutation ($animeId: Int) {
        ToggleFavourite(animeId: $animeId) {
          anime {
            pageInfo {
              total
              perPage
              hasNextPage
            }
            nodes {
              title {
                romaji
                english
              }
              isFavourite
            }
          }
        }
      }
    `;

    const variables = { animeId: 123 };

    actions.addBookmarkAnime(null, variables);
    expect(actions.$graphql.default.request).toBeCalledWith(query, variables, headers);
  });
  it('should call fetchAnimeBookmarks properly', () => {
    const query = gql`
      query ($page: Int, $perPage: Int) {
        Viewer {
          id
          name
          favourites {
            anime(page: $page, perPage: $perPage) {
              pageInfo {
                total
                perPage
                hasNextPage
              }
              nodes {
                title {
                  romaji
                  english
                }
                genres
                coverImage {
                  large
                }
                averageScore
                isFavourite
              }
            }
          }
        }
      }
    `;

    const variables = { page: 1, perPage: 50 };

    actions.fetchAnimeBookmarks(null, variables);
    expect(actions.$graphql.default.request).toBeCalledWith(query, variables, headers);
  });
});
