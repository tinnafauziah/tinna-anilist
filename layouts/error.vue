<template lang="pug">
v-app
  .display-1 {{ errorMessage }}
  .subtitle-1 Please return to
    span &nbsp;
      NuxtLink(to='/') Home page
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Page Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title = this.errorMessage;
    return {
      title
    }
  },
  methods: {
    errorMessage() {
      return this.error && this.error?.statusCode === 404 ? this.pageNotFound : this.otherError
    }
  }
}
</script>
