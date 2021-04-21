<template>
  <v-container class="content pt-0">
    <v-row class="greens">
      <v-col class="d-flex justify-center">
    <h2 class="white--text">{{$t('error.title')}}</h2>
      </v-col>
    </v-row>
    <v-row v-if="errorMessage">
      <v-col class="d-flex justify-center">
    <p class="text-center">{{errorMessage}}</p>
      </v-col>
    </v-row>
  <v-row>
    <v-col class="d-flex justify-center">
        <v-btn @click="goToAnsa">{{$t('error.backtoansa')}}</v-btn>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>

  export default {
    props: ['errorMessage'],
    methods: {
      goToAnsa () {
        this.$store.dispatch('setErrors', {status: false, message: ""}).then(() => 
        window.open('https://blockchain.bofrost.it/' + this.$route.params.filiera)
        )
      },
      tryAgain () {
        this.$store.dispatch('setErrors', {status: false, message: ""}).then(() => 
        this.$router.go(0)
        )}
    }
  }

</script>
