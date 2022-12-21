const authorize = {
  data() {
    return {
      nodeEnvOauthUrl: {
        production:
          "https://anilist.co/api/v2/oauth/authorize?client_id=10464&response_type=token",
        development:
          "https://anilist.co/api/v2/oauth/authorize?client_id=10461&response_type=token",
      },
    }
  },
  methods: {
    authorize() {
      if (process.browser) {
        localStorage.setItem("token", null);
        this.loginWithAnilist();
      }
    },
    loginWithAnilist() {
      const nodeEnv = process.env.NODE_ENV;
      window.location.replace(this.nodeEnvOauthUrl[nodeEnv]);
    },
  }
};

export default authorize;
