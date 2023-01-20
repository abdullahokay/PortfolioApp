import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    binance24HrData: [],
    modalIsOpen: false,
    walletIsOpen: false,
    portfolio: [],
  },

  mutations: {
    INIT_DATA(state, newCoin) {
      state.binance24HrData = newCoin;
    },

    OPEN_WALLET(state) {
      state.walletIsOpen = true;
    },

    CLOSE_WALLET(state) {
      state.walletIsOpen = false;
    },

    OPEN_MODAL(state) {
      state.modalIsOpen = true;
    },

    CLOSE_MODAL(state) {
      state.modalIsOpen = false;
    },

    ADD_COIN(state, data) {
      state.portfolio.push(data);
    },

    DELETE_COIN(state, payload) {
      for (let i = 1; i <= payload.count; i++) {
        state.portfolio.splice(state.portfolio.indexOf(payload.item));
      }
    },
  },

  actions: {
    initData(context) {
      axios
        .get("https://api2.binance.com/api/v3/ticker/24hr")
        .then((response) => {
          context.commit("INIT_DATA", response.data);
          console.log("Binance", response.data);
        });
    },

    saveCoinToPortfolio(context, payload) {
      for (let i = 1; i <= payload.count; i++) {
        context.commit("ADD_COIN", payload.data);
      }
    },

    deleteCoinFromPortfolio(context, payload) {
      context.commit("DELETE_COIN", payload);
    },

    openWallet({ commit }) {
      commit("OPEN_WALLET");
    },

    closeWallet({ commit }) {
      commit("CLOSE_WALLET");
    },

    openModal({ commit }) {
      commit("OPEN_MODAL");
    },

    closeModal({ commit }) {
      commit("CLOSE_MODAL");
    },
    
  },

  getters: {
    getCoinsDetails(state) {
      return state.binance24HrData;
    },

    getPorfolio(state) {
      return state.portfolio;
    },
  },
});

export default store;
