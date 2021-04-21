<template>
  <v-app class="ma-0" :class="{'app': $vuetify.breakpoint.mdAndUp}" style="background-color: white">
      <v-app-bar app fixed height="100" :class="{'app': $vuetify.breakpoint.mdAndUp}" v-if="currentPage != 'Home'">
        <v-row align="center">
          <v-col class="text-center" cols="2">
            <v-app-bar-nav-icon v-if="!$vuetify.breakpoint.mdAndUp">
              <v-btn icon href="javascript: window.close();">
                <v-icon x-large>close</v-icon>
              </v-btn>
            </v-app-bar-nav-icon>
          </v-col>
          <v-col class="text-center">
            <v-img :src="require('@/assets/logo2.png')" contain height="60" aspect-ratio="3.44"/>
          </v-col>
          <v-col class="text-center mr-1" cols="2">
            <v-app-bar-nav-icon> 
              <!-- 
              <v-btn text depressed @click="changeLocale">
                <span class="mr-3">{{ $i18n.locale.toUpperCase() }}</span>
                <v-icon x-large>language</v-icon>
              </v-btn>
              -->
            </v-app-bar-nav-icon>
          </v-col>
        </v-row>
      </v-app-bar>
    <v-content class="ma-0">
      <router-view v-if="!errors.status && !loading" class="pt-0"/>
    <!-- error -->
      <error-page
        v-if="errors.status"
        :error-message="errors.message"
      ></error-page>
    <!-- loader -->
    <loader
      :loading="loading"
    ></loader>
    </v-content>
<v-footer
    :class="{'footer': $vuetify.breakpoint.mdAndDown}"
    class="ma-0 pa-0"
  >
  <v-container class="pb-0">
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        class="primary mr-0 text-center white--text"
        cols="12"
      >
      Copyright © bofrost* S.p.a. - via Clauzetto 4, San Vito al Tagliamento (PN)
      </v-col>
    </v-row>
    <!-- <v-row
      justify="center"
      align="center"
    >    
      <v-col cols="12" class="mb-0 text-center white--text" style="background-color: #2e2e38"><b>Powered by EY Opschain Traceability</b></v-col>
      <v-col cols="12" class="pa-0 mt-0 text-center white--text" style="background-color: #2e2e38"><img class="eylogo" :src="require('@/assets/eywhite.png')"/></v-col>
    </v-row> -->
  </v-container>
  </v-footer>
  </v-app>
</template>

<script>
import ErrorPage from '@/components/ErrorPage.vue'
import Loader from '@/components/Loader.vue'
//import whitelist from '@/plugins/whitelist.js'

export default {
  name: 'App',
  components: {
    ErrorPage,
    Loader
  },
  data () {
    return {
  }
  },
  /* created () {
    var referrer = document.referrer
    var check = false
    whitelist.forEach(item => {
      if (referrer.indexOf(item) > -1)
      check = true
    })
    if (!check) {
      this.popup = true
    }
  }, */
  computed: {
    currentPage () {
      return this.$route.name
    },
    errors () {
      return this.$store.getters.getErrors
    },
    loading () {
      return this.$store.getters.getLoading
    },
    back () {
      if (this.$route.name == "Certification") {
        return true
      }
      else return false
    }
  },
  methods: {
    goBack () {
        this.$store.dispatch('setErrors', {status: false, message: ""}).then(() => 
        this.$router.go(-1)
        )
    },
    changeLocale () {
      if (this.$i18n.locale == 'en') {
      this.$vuetify.lang.current = 'it'
      this.$i18n.locale = 'it';
      }
      else { 
        this.$vuetify.lang.current = 'en'
        this.$i18n.locale = 'en'
      }
      
    }
  }
};
</script>
<style>
body {
  background-color: #F5F5F5
}
.eylogo {
  max-width: 30px;
  margin-left: 2%;
}
.v-textarea textarea {
  line-height: 1rem!important;
  font-size: 0.8rem;
  font-weight: normal;
  color: black!important;
  padding: 5px!important;
}
.v-textarea textarea#contenuto  {
  line-height: 1rem!important;
  font-size: 0.7rem;
  font-weight: normal;
  color:black!important;
  padding: 5px!important;
}
.content { 
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  word-wrap: break-word;
}
.app {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}
.fullwidth {
  width:100%
}
.logo-ey {
  width: 50%;
  max-width: 2em
}
.greens {
    margin-top: 0;
    margin-bottom: 0;
    background-color: #0D194D!important;
    color: white
}
.footer {
  font-size: 0.8em
}
a {
  text-decoration: none!important;
  color: black!important;
}
.h2-mobile {
        font-size: 1.2rem
    }
.h3-mobile {
        font-size: 1rem
    }
.tooltip {
  font-size: 0.8rem;
}
.badreferrer {
  font-size: 1.2rem
}

</style>

