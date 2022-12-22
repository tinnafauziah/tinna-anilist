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
      template(v-else-if='currentUser')
        .title.mr-4 Hi, {{ currentUser.name }}!
        v-btn(@click='logout()') Logout
      v-btn(v-else, @click='loginWithAnilist()') Login with Anilist
    nuxt.mt-8.ml-8
</template>

<script>
import { mapGetters } from "vuex";
import authorize from "~/mixins/authorize";

export default {
  name: "DefaulLayout",
  mixins: [authorize],
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
      onlyViewerPages: ["/bookmark/"],
    };
  },
  async mounted() {
    try {
      if (localStorage.getItem("token")) {
        await this.$store.dispatch("users/fetchCurrentUser");
      }
    } catch {
      this.authorize();
    } finally {
      this.isLoadingCurrentUser = false;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.dispatch("users/clearCurrentUser");
      console.log(this.$route.path);
      if (this.onlyViewerPages.includes(this.$route.path)) {
        this.$router.push("/");
      }
    },
    isAuthorizeRoute() {
      return this.$route.path.includes("/authorize");
    },
  },
};
</script>
