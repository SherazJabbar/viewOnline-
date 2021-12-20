<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="8">
        <v-card class="pa-2" outlined tile>
          <app-video-player :videoData="vidData"></app-video-player>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-card class="pa-2" outlined tile>
          <app-videos-list @getVideo="playVideo"></app-videos-list>
        </v-card>
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
    };
  },
  methods: {
    playVideo(data) {
      this.vidData = data;
      console.log(data);
    },
  },
};
</script>

<style scoped></style>
