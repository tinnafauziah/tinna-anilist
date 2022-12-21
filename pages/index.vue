<template lang="pug">
.index-anime
  .display-2.mb-4 Cari Anime
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
          v-chip(v-if='index <= 2')
            span {{ item }}
          span.grey--text.ml-1(v-if='index === 3') (+{{ selectedGenres.length - 4 }} others)
    v-flex.xs4.ml-2
      v-select(
        v-model='selectedSort',
        :items='sorts',
        label='Urut berdasarkan',
        outlined,
        item-text='text',
        item-value='value'
      )
    v-flex.ml-2
      v-btn(color='teal accent-4', x-large, @click='fetchAnimeList()') Cari
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
      v-card.mb-4.mr-4(v-for='anime in animes', width='350', :key='anime.id')
        v-img(height='400', :src='anime.coverImage.large')
        v-card-text
          .subtitle-1.font-weight-bold.mb-1 {{ anime.title | animeTitle }}
          v-layout(wrap, align-center)
            v-flex.xs1.mr-1
              v-icon(:color='getRatingColor(anime.averageScore)') {{ getRatingIcon(anime.averageScore) }}
            v-flex.xs10
              span.subtitle-1 {{ anime.averageScore | animeAverageScore }}
        v-card-actions
          v-btn(text, color='teal accent-4') Detail
    template(v-if='hasNextPage')
      v-card.mb-4.mr-4(v-for="index in 8" :key="index", width='350')
          v-skeleton-loader(
            class='mx-auto'
            height='540',
            width='350',
            type='card'
          )
</template>

<script>
import { debounce } from 'lodash-es';

export default {
  name: 'IndexPage',
  data () {
    return {
      genres: [],
      isLoadingAnimeList: false,
      isFirstLoading: false,
      isLazyLoading: false,
      hasNextPage: false,
      sorts: [
        {
          text: 'Trending',
          value: 'TRENDING_DESC',
        }
      ],
      rateFloorDict: {
        81: {
          color: 'green',
          icon: 'mdi-emoticon-excited-outline',
        },
        61: {
          color: 'yellow',
          icon: 'mdi-emoticon-happy-outline',
        },
        41: {
          color: 'lime',
          icon: 'mdi-emoticon-neutral-outline',
        },
        21: {
          color: 'orange',
          icon: 'mdi-emoticon-sad-outline',
        },
        0: {
          color: 'red',
          icon: 'mdi-emoticon-cry-outline',
        }
      },
      selectedGenres: [],
      selectedSort: 'TRENDING_DESC',
      animes: [],
      page: 1,
    }
  },
  async mounted() {
    this.fetchGenres();
    this.fetchAnimeList();
  },
  filters: {
    animeTitle(title) {
      return title?.english || title?.romaji;
    },
    animeAverageScore(averageScore) {
      if(averageScore) return `${averageScore}%`
      return 'belum ada penilaian';
    },
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await this.$store.dispatch('anime/fetchGenres');
        this.genres = [...this.genres, ...response.GenreCollection];
      }
      finally {}
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
        sort: this.selectedSort
      };

      if(this.selectedGenres.length > 0) variables = {...variables, genre_in: this.selectedGenres}

      try {
        const response = await this.$store.dispatch('anime/fetchAnimeList', variables);
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
    getSelectedRating(averageScore) {
      const rateFloorArray = Object.keys(this.rateFloorDict).reverse()
      const selectedRateFloor = rateFloorArray.find(rateFloor => averageScore > Number(rateFloor));
      return this.rateFloorDict[selectedRateFloor] || { color: 'gray', icon: 'mdi-emoticon-neutral-outline' };
    },
    getRatingColor(averageScore) {
      const rate = this.getSelectedRating(averageScore);
      return rate.color;
    },
    getRatingIcon(averageScore) {
      const rate = this.getSelectedRating(averageScore);
      return rate.icon;
    },
    handleScroll(debounceLoadFunction) {
      const selectedContainer = document.querySelector('.scroll_container');
      if (
        selectedContainer &&
        selectedContainer.scrollHeight <= selectedContainer.scrollTop + selectedContainer.offsetHeight + 0.5
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
      { maxWait: 1000 },
    ),
  }
}
</script>
<style lang="scss" scoped>
.scroll_container {
  overflow: scroll;
  height: 586px;
}
</style>
