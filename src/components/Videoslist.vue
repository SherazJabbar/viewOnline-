<template>
  <v-list dense plain>
    <div class="d-flex justify-space-between">
      <v-subheader>Videos</v-subheader>
      <v-btn plain @click="setDefault">clear</v-btn>
    </div>

    <v-list-item-group v-model="selectedItem">
      <v-list-item
        v-for="(video, index) in videos"
        :key="index"
        @click="clicked(video)"
      >
        <v-list-item-avatar size="70" border-radius="10px" tile>
          <v-img :src="video.thumb"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="video.title"></v-list-item-title>
          <v-list-item-subtitle v-html="video.subtitle"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text
            v-show="IsUserLoggedIn && hasCreatedPlaylist === false"
          >
            <v-menu
              bottom
              left
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-dialog
                  v-model="dialog"
                  :retain-focus="false"
                  persistent
                  max-width="300px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-icon>
                        <v-icon>mdi-playlist-plus</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title> Create Playlist</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Create a Playlist</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              label="Name"
                              required
                              v-model="name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-select
                              :items="items"
                              label="Select Status"
                              dense
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="createPlaylist(video)"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list>
            </v-menu>
          </v-list-item-action-text>

          <v-list-item-action-text
            v-show="IsUserLoggedIn && hasCreatedPlaylist"
          >
            <v-menu
              bottom
              left
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list v-show="IsUserLoggedIn && hasCreatedPlaylist">
                <template v-if="video.added">
                  <v-list-item @click="removeVideoFromPlaylist(video)">
                    <v-list-item-icon>
                      <v-icon>mdi-playlist-remove</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        Remove from Playlist
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>

                <v-dialog
                  v-model="dialog"
                  :retain-focus="false"
                  persistent
                  max-width="300px"
                  v-else
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-icon>
                        <v-icon>mdi-playlist-plus</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title> Add to Playlist </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>

                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Add to playlist</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-checkbox
                              v-model="checkbox"
                              :label="`${playlistName}`"
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="addVideoToPlaylist(video)"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list>
            </v-menu>
          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mediaJSON } from "../utils/util";

export default {
  data: () => ({
    checkbox: true,
    selectedItem: 0,
    name: "",
    dialog: false,
    items: ["Public", "Private"],
  }),
  methods: {
    clicked(item) {
      this.$emit("getVideo", item);
    },
    createPlaylist(video) {
      const obj = {
        name: this.name,
        selectItem: this.selectedItem,
      };
      const obj2 = { ...video, ...obj };
      this.$store.dispatch("UPDATE_USER_PLAYLIST_STATUS", obj2);
      this.dialog = false;
    },
    addVideoToPlaylist(video) {
      this.$store.dispatch("ADD_TO_PLAYLIST", video);
      this.dialog = false;
      this.$store.dispatch("GET_PLAYLIST_VIDEOS");
    },
    setDefault() {
      this.$store.commit("SET_UP_INITIAL_DATA", mediaJSON);
    },
    removeVideoFromPlaylist(video) {
      this.$store.dispatch("REMOVE_DATA_FROM_PLAYLIST", video);
    },
  },
  computed: {
    IsUserLoggedIn() {
      return this.$store.state.user;
    },
    hasCreatedPlaylist() {
      return this.$store.state.userHasCreatedPlaylist;
    },
    playlistName() {
      return this.$store.state.userPlaylistName;
    },
    videos() {
      return this.$store.state.defaultData;
    },
  },
};
</script>

<style scoped>
.v-list-item-avatar {
  transition: opacity 0.4s ease-in-out;
}

.vv-list-item-avatar:not(.on-hover) {
  opacity: 0.6;
}
</style>
