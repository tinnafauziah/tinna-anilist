<template lang="pug">
v-app
  v-main
    v-app-bar(color='indigo lighten-4')
      v-toolbar-title.toolbar-title(@click='$router.push("/")') Anime List
    nuxt.mt-8.ml-8
</template>
