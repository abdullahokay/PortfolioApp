<template>
  <v-app>
    <v-container class="m-3">
      <NavBar />
      <br>
      <div id="modal">
        <AddUpdateModal v-show="$store.state.modalIsOpen" />
      </div>
      <v-row>
        <v-col>
          <h2 class="mb-5">Portföy Detayları</h2>
          <v-card height="430px">
            <MainPageDataTable v-show="showComponent" />
          </v-card>
        </v-col>
        <v-divider class="divider" vertical inset></v-divider>
        <v-col>
          <PieChart />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue';
import PieChart from './components/PieChart.vue';
import MainPageDataTable from './components/MainPageDataTable.vue';
import AddUpdateModal from './components/AddUpdateModal';

// eslint-disable-next-line no-unused-vars
import store from './store/store'


export default {
  name: 'App',
  data: () => ({
    timer: ''
  }),
  components: {
    NavBar,
    AddUpdateModal,
    PieChart,
    MainPageDataTable,
  },

  created() {
    this.$store.dispatch("initData")
    this.timer = setInterval(() => { this.$store.dispatch("initData") }, 1200000);
  },

  watch: {
    '$store.state.portfolio': {
      handler() {
        this.showComponent
      }
    }
  },

  methods: {
    cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  },

  beforeUnmount() {
    this.cancelAutoUpdate();
  },

  computed: {
    showComponent() {
      return this.$store.state.portfolio.length > 0
    }
  },
};
</script>