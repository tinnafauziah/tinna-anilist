<template lang="pug">
.detail-anime
  v-layout(wrap)
    template(v-if='isLoadingMedia')
      v-flex.xs3.mr-3
        v-skeleton-loader(
          class='mx-auto',
          type='image'
        )
        v-skeleton-loader.mt-3(
          class='mx-auto',
          type='heading'
        )
      v-flex.xs6.mr-3
        v-skeleton-loader.mb-3(
          class='mx-auto',
          type='heading'
        )
        v-skeleton-loader(
          class='mx-auto',
          type='paragraph'
        )
    template(v-else-if='errorMessage')
      v-flex
        .display-1 {{ errorMessage }}
        .subtitle-1 Please return to
          span &nbsp;
            NuxtLink(to='/') Home page
    template(v-else)
      v-flex.xs3.mr-3
        v-img(:src='media.coverImage.extraLarge')
        v-layout(wrap, align-center)
          v-flex.xs1.mr-1
            v-icon(:color='getRatingColor(media.averageScore)') {{ getRatingIcon(media.averageScore) }}
          v-flex.xs10
            span.subtitle-1 {{ media.averageScore | animeAverageScore }}
      v-flex.xs6
        .title {{ media.title | animeTitle  }}
        .subtitle-1(v-html='media.description')
</template>

<script>
import humanizeAnimeString from '~/mixins/humanize-anime-string';

export default {
  name: 'DetailPage',
  mixins: [humanizeAnimeString],
  data () {
    return {
      media: {
        coverImage: {
          extraLarge: null
        },
      },
      errorMessage: '',
      isLoadingMedia: true,
    }
  },
  async mounted() {
    this.fetchAnimeDetail();
  },
  methods: {
    async fetchAnimeDetail() {
      this.errorMessage = '';
      if(this.$route?.params?.id) {
          let variables = {
            id: this.$route.params.id,
          };
          try {
            this.isLoadingMedia = true;
            const response = await this.$store.dispatch('anime/fetchAnimeDetail', variables);
            this.media = { ...response.Media };
          }
          catch(error) {
            this.errorMessage = 'An error occurred'
            const errorStatus = error?.response?.status;
            if(errorStatus && errorStatus === 404) {
              this.errorMessage = 'Anime Not Found';
            }
          }
          finally {
            this.isLoadingMedia = false;
          }
        } else {
          this.isLoadingMedia = false;
        }
      },
  }
}
</script>
<style lang="scss" scoped>
.scroll_container {
  overflow: scroll;
  height: 586px;
}
</style>
