<template lang="pug">
</template>

<script>
export default {
  async mounted() {
    const { code } = this.$route.query;
    if (!code) this.goToHomepage();
    else {
      await this.$store.dispatch("auth/saveCode", code);
      this.goToHomepage();
    }
  },
  methods: {
    goToHomepage() {
      this.$router.push("/");
    },
  },
};
</script>
