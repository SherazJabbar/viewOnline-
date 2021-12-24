<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <app-video-player :videoData="vidData" v-if="helper"></app-video-player>
      </v-col>
      <v-col cols="6" md="4">
        <app-videos-list @getVideo="playVideo"></app-videos-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer.vue";
import Videoslist from "../components/Videoslist.vue";

export default {
  components: {
    "app-video-player": VideoPlayer,
    "app-videos-list": Videoslist,
  },
  data() {
    return {
      vidData: null,
      helper: true,
    };
  },
  methods: {
    playVideo(data) {
      this.vidData = data;
      this.helper = false;
      this.$nextTick(() => {
        this.helper = true;
      });
    },
  },
};
</script>

<style scoped></style>
