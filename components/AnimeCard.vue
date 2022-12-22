<template lang="pug">
v-tooltip(top)
  template(v-slot:activator='{ on, attrs }')
    v-card.mb-4.mr-4.anime_card(
      width='350',
      @click='redirectAnimeDetail()',
      v-bind='attrs',
      v-on='on')
      v-img(height='400', :src='anime.coverImage.large')
      v-card-text
        .subtitle-1.font-weight-bold.mb-1 {{ anime.title | animeTitle }}
        v-layout.mb-4(wrap, align-center)
          v-flex.xs1.mr-1
            v-icon(:color='getRatingColor(anime.averageScore)') {{ getRatingIcon(anime.averageScore) }}
          v-flex.xs10.mb-1
            span.subtitle-1 {{ anime.averageScore | animeAverageScore }}
        v-chip.mb-4.mr-4(v-for='genre in anime.genres', :key='genre') {{ genre }}
  span See Anime's Detail
</template>

<script>
import humanizeAnimeString from "~/mixins/humanize-anime-string";

export default {
  mixins: [humanizeAnimeString],
  name: "AnimeCard",
  props: {
    anime: {
      type: Object,
      default: () => ({
        id: null,
        coverImage: { large: null },
        title: {
          english: null,
          romaji: null,
        },
        averageScore: null,
        genres: [],
      }),
    },
  },
  methods: {
    redirectAnimeDetail() {
      this.$router.push(`/anime/${this.anime.id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll_container {
  overflow: scroll;
  height: 586px;
}
</style>
