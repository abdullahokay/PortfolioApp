<template>
  <v-dialog v-model="$store.state.modalIsOpen" width="750" height="500px !important" scrollable overlay-opacity="0.075">
    <v-card height="100%">
      <v-toolbar flat>
        <v-text-field placeholder="Coin Arayın" hide-details="auto" single-line dense prepend-inner-icon="mdi-magnify"
          v-model="search">
        </v-text-field>
      </v-toolbar>
      <v-data-table dense :headers="dataTableHeaders" :items="filteredCoins" :items-per-page="5">

        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="coin in items" :key="coin.symbol">
              <td>{{ coin.symbol }}</td>
              <td>{{ coin.lastPrice }}</td>
              <td>
                <v-btn icon x-small text @click="coin.counter++">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-counter :value="coin.counter" />
                <v-btn icon x-small text @click="coin.counter--">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </td>
              <td v-if="portfolio.includes(coin.symbol)">
                <UpdateDeleteButtons :selected-coin="coin" :count="coin.counter" />
              </td>
              <td v-else>
                <AddButton :selected-coin="coin" :count="coin.counter" />
              </td>
            </tr>
          </tbody>
        </template>

      </v-data-table>
    </v-card>
  </v-dialog>
</template>
<script>
import AddButton from './AddButton.vue'
import UpdateDeleteButtons from './UpdateDeleteButtons.vue';
export default {
  name: "AddUpdateModal",
  components: {
    AddButton,
    UpdateDeleteButtons
  },

  data: () => ({
    search: "",
    dataTableHeaders: [
      { text: 'Kripto Paralar', align: 'start', sortable: false, value: 'symbol' },
      { text: 'Son Fiyat', value: 'lastPrice' },
    ]
  }),

  methods: {
    closeModal() {
      this.$store.commit('CLOSE_MODAL')
    }
  },

  computed: {
    filteredCoins() {
      return this.$store.state.binance24HrData.map(coin => {
        return { ...coin, counter: 0 }
      }).filter(c => {
        return c.symbol.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      });
    },

    portfolio() {
      return this.$store.state.portfolio.map(coin => coin.symbol);
    },

    coinCounter: {
      get() {
        return this.coin.counter;
      },
      set(value) {
        this.coin.counter = value;
      }
    },
  }
}
</script>

<style>
.v-btn-toggle {
  flex-direction: column;
}

.v-counter {
  align-items: center;
}
</style>