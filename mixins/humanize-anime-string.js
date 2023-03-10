const humanizeAnimeString = {
  data() {
    return {
      rateFloorDict: {
        81: {
          color: 'green',
          icon: 'mdi-emoticon-excited-outline',
        },
        61: {
          color: 'amber',
          icon: 'mdi-emoticon-happy-outline',
        },
        41: {
          color: 'lime',
          icon: 'mdi-emoticon-neutral-outline',
        },
        21: {
          color: 'deep-orange',
          icon: 'mdi-emoticon-sad-outline',
        },
        0: {
          color: 'red',
          icon: 'mdi-emoticon-cry-outline',
        }
      },
    }
  },
  filters: {
    animeTitle(title) {
      return title?.english || title?.romaji;
    },
    animeAverageScore(averageScore) {
      if (averageScore) return `${averageScore}%`
      return 'no score yet';
    },
  },
  methods: {
    getSelectedRating(averageScore) {
      const rateFloorArray = Object.keys(this.rateFloorDict).reverse()
      const selectedRateFloor = rateFloorArray.find(rateFloor => averageScore > Number(rateFloor));
      return this.rateFloorDict[selectedRateFloor] || { color: 'gray', icon: 'mdi-emoticon-neutral-outline' };
    },
    getRatingColor(averageScore) {
      const rate = this.getSelectedRating(averageScore);
      return rate.color;
    },
    getRatingIcon(averageScore) {
      const rate = this.getSelectedRating(averageScore);
      return rate.icon;
    },
    getColorText(averageScore) {
      return `${this.getRatingColor(averageScore)}--text`
    }
  }
};

export default humanizeAnimeString;
