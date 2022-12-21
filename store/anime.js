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

    const animes = await this.$graphql.default.request(query, variables);
    return animes;
  },
}
export default {
  namespace: true,
  actions,
}
