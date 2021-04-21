<template>
    <v-fade-transition>
      <v-container align="center" justify="center" fill-height v-if="loading" class="loader-wrp">
        <v-row>
          <v-col>
            <v-img :src="require('@/assets/loader.png')" contain height="120" :transition="false" />
            <h2 class="text-center mt-4">{{$t('loading')}}</h2>
          </v-col>
        </v-row>
      </v-container>
    </v-fade-transition>
</template>

<script>

  export default {

    props: ['loading'],

    data: function() {
      return {

      }
    },

    computed: {
      // isLoading: function () {
      //   return this.$store.state.isLoading;
      // }
    },

    methods: {

    },

    components: {

    }
  }

</script>
<style scoped>
.loader-wrp {
  margin-left: auto;
  margin-right: auto;
}
</style>