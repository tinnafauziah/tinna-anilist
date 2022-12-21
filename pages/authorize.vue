<template lang="pug">
</template>

<script>
export default {
  async mounted() {
    const { hash } = this.$route;
    if (!hash) this.goToHomepage();
    else {
      await this.$store.dispatch("auth/saveToken", hash);
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
