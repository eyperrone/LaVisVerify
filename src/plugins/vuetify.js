import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#0D194D', // #E53935
            secondary: '#38557F', // #FFCDD2
            accent: '#CE1628' // #3F51B5
          },
        },
      }
});

