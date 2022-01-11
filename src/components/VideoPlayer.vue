<template>
  <div class="item container">
    <div class="player">
      <video-player
        class="vjs-custom-skin"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
      >
      </video-player>
      <div class="data">
        <h3>{{ data.title }}</h3>
        <p>{{ data.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoData: Object,
  },

  data() {
    return {
      playerOptions: {
        height: "500",
        autoplay: true,
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: "",
          },
        ],
      },
      data: {},
    };
  },

  mounted() {
    const dummyData = { title: "Dummy", description: "lorem Ipsum" };
    this.videoData
      ? (this.playerOptions.sources[0].src = this.videoData.source) &&
        (this.data = this.videoData)
      : (this.playerOptions.sources[0].src =
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4") &&
        (this.data = dummyData);
  },
};
</script>

<style scoped>
.data {
  margin-top: 1rem;
}
</style>
