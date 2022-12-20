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
  v-layout(wrap)
      v-card.mb-4.mr-4(v-for='anime in animes', width='275', :key='anime.id')
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
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      genres: [],
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
      return averageScore || 'tidak diketahui';
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
    async fetchAnimeList() {
      let variables = {
        sort: this.selectedSort
      };

      if(this.selectedGenres.length > 0) variables = {...variables, genre_in: this.selectedGenres}

      try {
        const response = await this.$store.dispatch('anime/fetchAnimeList', variables);
        const { media, pageInfo } = response.Page;
        this.animes = media;
      } finally {}
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
  }
}
</script>
