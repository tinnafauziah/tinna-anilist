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
      v-btn(v-if='currentUser', color='teal lighten-4', x-large, @click='$router.push("/bookmark/")')
        v-icon(left, dark) mdi-bookmark
        span Bookmark Anime List
  v-layout.scroll_container(wrap, @scroll='handleScroll(debounceLoadAnimeList)')
    template(v-if='isFirstLoading')
      SkeletonAnimeCard(v-for="index in 8" :key="index", width='350')
    template(v-else-if='animes.length > 0')
      AnimeCard(v-for='anime in animes', :anime='anime', :key='anime.id')
    template(v-else)
      div
        .title-1.mb-2 Anime not found
        .subtitle-1 Try another genre or sort!
          span &nbsp;
            NuxtLink(to='/') Anime List !
    template(v-if='hasNextPage')
    template(v-if='hasNextPage')
      SkeletonAnimeCard(v-for="index in 8" :key="index", width='350')
</template>

<script>
import { debounce } from "lodash-es";
import { mapGetters } from "vuex";
import humanizeAnimeString from "~/mixins/humanize-anime-string";
import AnimeCard from "~/components/AnimeCard";
import SkeletonAnimeCard from "~/components/SkeletonAnimeCard";

export default {
  name: "IndexPage",
  components: { AnimeCard, SkeletonAnimeCard },
  mixins: [humanizeAnimeString, AnimeCard],
  computed: {
    ...mapGetters({
      currentUser: "users/getCurrentUser",
    }),
  },
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
          text: "ID",
          value: "ID",
        },
        {
          text: "Average Score",
          value: "SCORE_DESC",
        },
        {
          text: "Trending",
          value: "TRENDING_DESC",
        },
        {
          text: "Popularity",
          value: "POPULARITY_DESC",
        },
      ],
      selectedGenres: [],
      selectedSort: "ID",
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
