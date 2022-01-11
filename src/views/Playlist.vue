<template>
  <div class="mt-10">
    <v-row no-gutters class="">
      <v-col cols="12" sm="4">
        <v-hover v-slot="{ hover }">
          <v-card
            max-width="300"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            v-show="hasPlaylist"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>{{ playlistName }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0"> Total Videos: 6 </v-card-subtitle>

            <v-card-text class="text--primary">
              <div></div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text @click="play">
                <v-icon>mdi-play</v-icon> Play
              </v-btn>

              <v-btn color="orange" text @click="deletePlaylist"
                ><v-icon>mdi-delete</v-icon> Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    play() {
      this.$store.commit("PLAY");
      this.$router.replace({ path: "/" });
    },
    deletePlaylist() {
      this.$store.dispatch("DELETE_PLAYLIST");
      this.$router.replace({ path: "/" });
    },
  },
  computed: {
    playlistName() {
      return this.$store.state.userPlaylistName;
    },
    hasPlaylist() {
      return this.$store.state.userHasCreatedPlaylist;
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
  margin-left: 4rem;
}
@media (max-width: 960px) {
  .v-card {
    margin: auto;
  }
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.v-card:hover {
  cursor: pointer;
}
</style>
