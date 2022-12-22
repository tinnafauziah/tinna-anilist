<template lang="pug">
.index-anime
  .display-2.mb-4 Bookmarked Anime
  v-layout.scroll_container(wrap, @scroll='handleScroll(debounceLoadAnimeList)')
    template(v-if='isFirstLoading')
      v-card.mb-4.mr-4(v-for="index in 8" :key="index", width='350')
        SkeletonAnimeCard(v-for="index in 8" :key="index", width='350')
    template(v-else-if='animes.length > 0')
      AnimeCard(v-for='anime in animes', :anime='anime', :key='anime.id')
    template(v-else)
      div
        .title-1.mb-2 You don't have any bookmarked Anime yet
        .subtitle-1 Check out
          span &nbsp;
            NuxtLink(to='/') Anime List !
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
  name: "BookmarkPage",
  mixins: [humanizeAnimeString],
  components: { AnimeCard, SkeletonAnimeCard },
  data() {
    return {
      isLoadingAnimeList: false,
      isFirstLoading: false,
      isLazyLoading: false,
      hasNextPage: false,
      animes: [],
      page: 1,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "users/getCurrentUser",
    }),
  },
  async mounted() {
    if (!this.currentUser && !localStorage.getItem("token"))
      this.$router.push("/");
    else {
      this.fetchAnimeBookmarks();
    }
  },
  methods: {
    async fetchAnimeBookmarks(isFirst = true) {
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

      try {
        const response = await this.$store.dispatch(
          "anime/fetchAnimeBookmarks",
          variables
        );

        const { nodes, pageInfo } = response.Viewer.favourites.anime;

        this.animes = [...this.animes, ...nodes];
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
    redirectAnimeDetail(anime) {
      this.$router.push(`/anime/${anime.id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll_container {
  overflow: scroll;
  height: 700px;
}
</style>
