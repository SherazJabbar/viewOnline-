<template>
  <v-card class="mx-auto" max-width="400">
    <v-list dense>
      <v-subheader>Videos</v-subheader>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          class="d-flex justify-space-between"
          @click="clicked(item)"
        >
          <v-list-item-avatar>
            <v-img :src="item.thumb"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mediaJSON } from "../utils/util";

export default {
  data: () => ({
    selectedItem: 1,
    items: [...mediaJSON],
  }),
  methods: {
    clicked(item) {
      console.log(item);
      this.$emit("getVideo", item);
    },
  },
  created() {
    console.log(this.items);
  },
};
</script>

<style scoped></style>
