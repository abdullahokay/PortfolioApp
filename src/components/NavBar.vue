<template>
  <v-container id="Navbar">
    <v-row class="mb-5">
      <v-col>
        <v-btn large color="primary" @click.stop="openModal" class="mr-5" elevation-15>
          Add / Update
        </v-btn>
        <v-btn large color="secondary" @click="reloadPage()" elevation-15>
          Refresh Page
        </v-btn>
      </v-col>
      <v-icon>mdi-weather-sunny</v-icon>
      <v-switch :value="darkMode" @change="toggleDarkMode" class="ml-3 mr-1"></v-switch>
      <v-icon>mdi-weather-night</v-icon>
    </v-row>
    <v-row>
      <v-divider class="divider"></v-divider>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NavBar',

  components: {},

  data: () => ({
    darkMode: false
  }),

  methods: {
    reloadPage() {
      window.location.reload();
    },

    toggleDarkMode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.darkMode = !this.darkMode;
    },

    openModal() {
      this.$store.commit('OPEN_MODAL');
    },

    openWallet() {
      this.$store.commit('OPEN_WALLET');
    },
  },

  computed: {

    switchLabel: function () {
      return this.darkMode ? 'light' : 'dark';
    }
  }
}
</script>