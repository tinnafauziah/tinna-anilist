<template lang="pug">
v-app
  v-main
    v-app-bar(color='indigo lighten-4', v-if='!isAuthorizeRoute()')
      v-toolbar-title.toolbar-title(@click='$router.push("/")') Anime List
      v-spacer
      v-btn(@click='loginWithAnilist()') Login with Anilist
    nuxt.mt-8.ml-8
</template>

<script>
export default {
  name: "DefaulLayout",
  methods: {
    loginWithAnilist() {
      window.location.replace(
        "https://anilist.co/api/v2/oauth/authorize?client_id=10461&redirect_uri=http://localhost:3000/authorize&response_type=code"
      );
    },
    isAuthorizeRoute() {
      this.$route.path === "/authorize";
    },
  },
};
</script>
