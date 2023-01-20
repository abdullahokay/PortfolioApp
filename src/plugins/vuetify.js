import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#FB8C00',
          secondary: '#00B0FF',
          divider: '#000000'
        },
        dark: {
          primary: '#64DD17',
          secondary: '#00B0FF',
          divider: '#FFFFFF'
        },
      },
    },

});
