<template>
  <v-card max-width="500" class="mx-auto overflow-auto">
    <v-list dense>
      <v-subheader>Videos</v-subheader>
      <v-list-item-group v-model="selectedItem">
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="clicked(item)"
        >
          <v-list-item-avatar size="70">
            <v-img :src="item.thumb"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text>
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
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-playlist-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title @click="addToPlaylist(item)"
                        >add to playlist</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mediaJSON } from "../utils/util";

export default {
  data: () => ({
    selectedItem: 0,
    items: [...mediaJSON],
  }),
  methods: {
    clicked(item) {
      this.$emit("getVideo", item);
    },
    addToPlaylist() {
      console.log("Added to Playlist");
    },
  },
};
</script>

<style scoped></style>
