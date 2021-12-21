<template>
  <div class="item">
    <div class="player">
      <video-player
        class="vjs-custom-skin"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videoData: Object,
  },
  // },
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
    };
  },

  mounted() {
    this.videoData
      ? (this.playerOptions.sources[0].src = this.videoData.sources)
      : (this.playerOptions.sources[0].src =
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
  },
};
</script>
