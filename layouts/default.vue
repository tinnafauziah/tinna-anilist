<template lang="pug">
v-app
  v-main
    v-app-bar(color='indigo lighten-4', v-if='!isAuthorizeRoute()')
      v-toolbar-title.toolbar-title(@click='$router.push("/")') Anime List
      v-spacer
      v-skeleton-loader(
        v-if='isLoadingCurrentUser',
        class='mx-auto',
        type='button'
      )
      v-menu(offset-y, v-else-if='currentUser')
        template(v-slot:activator="{ on, attrs }")
          v-btn(
            color="primary",
            dark,
            v-bind="attrs",
            v-on="on") Hi, {{ currentUser.name }}!
        v-list
          v-list-item
            v-list-item-title Logout
      v-btn(v-else, @click='loginWithAnilist()') Login with Anilist
    nuxt.mt-8.ml-8
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DefaulLayout",
  computed: {
    ...mapGetters({
      currentUser: "users/getCurrentUser",
    }),
  },
  data() {
    return {
      isLoadingCurrentUser: true,
      nodeEnvOauthUrl: {
        production:
          "https://anilist.co/api/v2/oauth/authorize?client_id=10464&response_type=token",
        development:
          "https://anilist.co/api/v2/oauth/authorize?client_id=10461&response_type=token",
      },
    };
  },
  async mounted() {
    try {
      await this.$store.dispatch("users/fetchCurrentUser");
    } finally {
      this.isLoadingCurrentUser = false;
    }
  },
  methods: {
    loginWithAnilist() {
      const nodeEnv = process.env.NODE_ENV;
      window.location.replace(this.nodeEnvOauthUrl[nodeEnv]);
    },
    isAuthorizeRoute() {
      this.$route.path === "/authorize";
    },
  },
};
</script>
