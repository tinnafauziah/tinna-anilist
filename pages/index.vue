<template lang="pug">
.index-anime
  .display-2.mb-4 Search Anime
  v-layout(wrap)
    v-flex.xs4
      v-select(
        v-model='selectedGenres',
        :items='genres',
        label='Pilih genre',
        outlined,
        multiple
        )
        template(v-slot:selection='{ item, index }')
          v-chip(v-if='index < showedGenresLength') {{ item }}
          span.grey--text.ml-1(v-if='index === showedGenresLength') (+{{ selectedGenres.length - showedGenresLength }} others)
    v-flex.xs4.ml-2
      v-select(
        v-model='selectedSort',
        :items='sorts',
        label='Sorted by',
        outlined,
        item-text='text',
        item-value='value'
      )
    v-flex.xs1.ml-4.mr-6
      v-btn(color='teal accent-4', x-large, @click='fetchAnimeList()') Search
    v-spacer
    v-flex.ml-6
      v-btn(color='teal accent-4', x-large, @click='$router.push("/bookmark/")') Bookmarked Anime
  v-layout.scroll_container(wrap, @scroll='handleScroll(debounceLoadAnimeList)')
    template(v-if='isFirstLoading')
      v-card.mb-4.mr-4(v-for="index in 8" :key="index", width='350')
        v-skeleton-loader(
          class='mx-auto',
          height='540',
          width='350',
          type='card'
        )
    template(v-else)
      AnimeCard(v-for='anime in animes', :anime='anime', :key='anime.id')
    template(v-if='hasNextPage')
      v-card.mb-4.mr-4(v-for='index in 8' :key='index', width='350')
          v-skeleton-loader(
            class='mx-auto'
            height='540',
            width='350',
            type='card'
          )
</template>

<script>
import { debounce } from "lodash-es";
import humanizeAnimeString from "~/mixins/humanize-anime-string";
import AnimeCard from "~/components/AnimeCard";

export default {
  name: "IndexPage",
  components: { AnimeCard },
  mixins: [humanizeAnimeString, AnimeCard],
  data() {
    return {
      genres: [],
      isLoadingAnimeList: false,
      isFirstLoading: false,
      isLazyLoading: false,
      hasNextPage: false,
      showedGenresLength: 3,
      sorts: [
        {
          text: "Trending",
          value: "TRENDING_DESC",
        },
      ],
      selectedGenres: [],
      selectedSort: "TRENDING_DESC",
      animes: [],
      page: 1,
    };
  },
  async mounted() {
    this.fetchGenres();
    this.fetchAnimeList();
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await this.$store.dispatch("anime/fetchGenres");
        this.genres = [...this.genres, ...response.GenreCollection];
      } finally {
      }
    },
    async fetchAnimeList(isFirst = true) {
      if (isFirst) {
        this.isFirstLoading = true;
        this.page = 1;
        this.animes = [];
      } else this.isLazyLoading = true;

      let variables = {
        page: this.page,
        perPage: 40,
        sort: this.selectedSort,
      };

      if (this.selectedGenres.length > 0)
        variables = { ...variables, genre_in: this.selectedGenres };

      try {
        const response = await this.$store.dispatch(
          "anime/fetchAnimeList",
          variables
        );
        const { media, pageInfo } = response.Page;

        this.animes = [...this.animes, ...media];
        this.isFirstLoading = true;
        this.hasNextPage = pageInfo.hasNextPage;
        this.page += 1;
      } finally {
        this.isLazyLoading = false;
        this.isFirstLoading = false;
      }
    },
    handleScroll(debounceLoadFunction) {
      const selectedContainer = document.querySelector(".scroll_container");
      if (
        selectedContainer &&
        selectedContainer.scrollHeight <=
          selectedContainer.scrollTop + selectedContainer.offsetHeight + 0.5
      ) {
        debounceLoadFunction();
      }
    },
    debounceLoadAnimeList: debounce(
      function load() {
        this.isLastData = !this.isFirstLoading && !this.hasNextPage;
        if (this.isLazyLoading || !this.hasNextPage) return;
        this.fetchAnimeList(false);
      },
      500,
      { maxWait: 1000 }
    ),
  },
};
</script>
<style lang="scss" scoped>
.scroll_container {
  overflow: scroll;
  height: 800px;
}
</style>
