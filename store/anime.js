import { gql } from 'nuxt-graphql-request';

export const actions = {
  async fetchAnimeList(_, variables) {
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

    const animes = await this.$graphql.default.request(query, variables);
    return animes;
  },
  async fetchGenres(_) {
    const query = gql`
      query {
        GenreCollection
      }
    `;

    const animes = await this.$graphql.default.request(query);
    return animes;
  },
  async fetchAnimeDetail(_, variables) {
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

    const anime = await this.$graphql.default.request(query, variables);

    return anime;
  },
  async addBookmarkAnime(_, variables) {
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
    const requestHeaders = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const anime = await this.$graphql.default.request(query, variables, requestHeaders);
    return anime;
  },
  async fetchAnimeBookmarks(_, variables) {
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
                isFavourite
              }
            }
          }
        }
      }
    `;
    const requestHeaders = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const anime = await this.$graphql.default.request(query, variables, requestHeaders);
    return anime;
  },
}
export default {
  namespace: true,
  actions,
}
