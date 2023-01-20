<template>
  <v-btn x-small color="#0EDC79" @click="saveCoinToPortfolio()">
    <v-icon>
      mdi-plus
    </v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';
export default {

  props: {
    selectedCoin: [],
    count: {
      type: Number,
      default: 1
    }
  },

  name: 'AddButton',

  methods: {
    ...mapActions(['saveCoinToPortfolio']),
    
    saveCoinToPortfolio() {
      this.$store.dispatch('saveCoinToPortfolio', { data: this.selectedCoin, count: this.count })
    }
  }
}
</script>