import Vue from "vue";
import Vuex from "vuex";
import {
  getDoc,
  doc,
  updateDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../main";
import themes from "./modules/themes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userEmail: null,
    userFirstName: null,
    userLastName: null,
    Username: null,
    userId: null,
    userInitials: null,
    userHasCreatedPlaylist: null,
    userPlaylistName: null,
    userPlaylistVideos: [],
    defaultData: [],
  },
  mutations: {
    UPDATE_SIGNED_IN_USER(state, document) {
      state.signedInUser = document;
    },
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    SET_USER_INFO(state, payload) {
      state.userEmail = payload.email;
      state.userFirstName = payload.firstName;
      state.userLastName = payload.lastName;
      state.userId = payload.id;
      state.Username = payload.username;
      state.userHasCreatedPlaylist = payload.hasCreatedPlaylist;
    },
    SET_INITIALS(state) {
      state.userInitials =
        state.userFirstName.match(/(\b\S)?/g).join("") +
        state.userLastName.match(/(\b\S)?/g).join("");
    },
    SET_PLAYLIST_NAME(state, name) {
      state.userPlaylistName = name;
    },
    ADD_VIDEO_TO_PLAYLIST() {
      console.log("ADDED");
    },
    SET_PLAYLIST_VIDEOS(state, payload) {
      state.userPlaylistVideos = payload;
    },
    SET_UP_INITIAL_DATA(state, payload) {
      state.defaultData = [];
      state.defaultData = payload;
    },
    PLAY(state) {
      state.defaultData = [];
      state.defaultData = state.userPlaylistVideos;
    },

    UPDATE_PLAYLIST_NAME(state) {
      state.userPlaylistName = null;
    },
    HAS_DELETED_PLAYLIST(state) {
      state.userHasCreatedPlaylist = false;
    },
  },
  actions: {
    async GET_CURRENT_USER({ commit }) {
      const auth = getAuth();
      const docRef = await doc(db, "users", auth.currentUser.uid);
      const getSnap = await getDoc(docRef);
      const docData = getSnap.data();
      commit("SET_USER_INFO", docData);
      commit("SET_INITIALS");
    },
    async UPDATE_USER_PLAYLIST_STATUS({ commit }, video) {
      console.log(video);
      const auth = getAuth();
      const docRef = await doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        hasCreatedPlaylist: true,
      });
      const updatedDoc = await doc(db, "users", auth.currentUser.uid);
      const getDocument = await getDoc(updatedDoc);
      const getDocumentData = getDocument.data();
      commit("SET_USER_INFO", getDocumentData);

      await setDoc(
        doc(
          db,
          "users",
          auth.currentUser.uid,
          "playlist",
          video.name,
          "videos",
          auth.currentUser.uid
        ),
        {
          title: video.title,
          subtitle: video.subtitle,
          description: video.description,
          source: video.source,
          thumb: video.thumb,
        }
      );
    },
    async GET_PLAYLIST({ commit }) {
      const auth = getAuth();
      const document = await doc(
        db,
        "users",
        auth.currentUser.uid,
        "playlist",
        "myPlaylist"
      );
      commit("SET_PLAYLIST_NAME", document.id);
    },
    async ADD_TO_PLAYLIST({ commit }, video) {
      const auth = getAuth();
      // eslint-disable-next-line no-unused-vars
      const document = await addDoc(
        collection(
          db,
          "users",
          auth.currentUser.uid,
          "playlist",
          "myPlaylist",
          "videos"
        ),
        {
          title: video.title,
          subtitle: video.subtitle,
          description: video.description,
          source: video.source,
          thumb: video.thumb,
          added: true,
        }
      );

      commit("ADD_VIDEO_TO_PLAYLIST");
    },

    async GET_PLAYLIST_VIDEOS({ commit }) {
      const auth = getAuth();
      const querySnapshot = await getDocs(
        collection(
          db,
          "users",
          auth.currentUser.uid,
          "playlist",
          "myPlaylist",
          "videos"
        )
      );
      const videoData = [];
      querySnapshot.forEach((doc) => {
        videoData.push(doc.data());
      });
      commit("SET_PLAYLIST_VIDEOS", videoData);
    },

    async DELETE_PLAYLIST({ commit }) {
      const auth = getAuth();
      const querySnapshot = await getDocs(
        collection(
          db,
          "users",
          auth.currentUser.uid,
          "playlist",
          "myPlaylist",
          "videos"
        )
      );

      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      const documentRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(documentRef, {
        hasCreatedPlaylist: false,
      });
      commit("HAS_DELETED_PLAYLIST");
      commit("UPDATE_PLAYLIST_NAME");
    },
    REMOVE_DATA_FROM_PLAYLIST({ commit, state }, payload) {
      if (state.userPlaylistVideos) {
        const videos = state.userPlaylistVideos.filter(
          (video) => video.title !== payload.title
        );
        console.log(videos);
        commit("SET_UP_INITIAL_DATA", videos);
      }
    },
  },
  modules: {
    themes,
  },
});
