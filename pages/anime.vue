<template lang="pug">
.anime
  nuxt-child(v-if='$route.params.id')
  template(v-else)
    .display-1 Anime Not Found
    .subtitle-1 Please return to
      span &nbsp;
        NuxtLink(to='/') Home page
</template>
