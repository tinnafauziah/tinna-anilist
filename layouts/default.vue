<template lang="pug">
v-app
  v-main
    v-app-bar(color='indigo lighten-4', v-if='!isAuthorizeRoute()')
      v-toolbar-title.toolbar-title(@click='$router.push("/")') Anime List
      v-spacer
      v-menu(offset-y, v-if='currentUser')
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
      currentUser: "user/getCurrentUser",
    }),
  },
  mounted() {
    this.$store.dispatch("user/fetchCurrentUser");
  },
  methods: {
    loginWithAnilist() {
      window.location.replace(
        "https://anilist.co/api/v2/oauth/authorize?client_id=10461&response_type=token"
      );
    },
    isAuthorizeRoute() {
      this.$route.path === "/authorize";
    },
  },
};
</script>
