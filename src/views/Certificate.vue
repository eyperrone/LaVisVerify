<template>
    <v-container class="content" v-if="response != ''">
        <div class="certificate-poster-wrapper">
            <div class="certificate-poster">
                <div class="ribbon-wrapper">
                    <h2 class="ribbon">
                        <span class="ribbon-content" :class="{ 'ribbon-mobile': $vuetify.breakpoint.mdAndDown }">
                            {{$t('certificatetitle')}}
                        </span>
                    </h2>
                </div>
                <v-row>
                    <v-col>
                        <h4>{{$t('id')}}</h4> {{response.data.id}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h4>{{$t('blockhash')}}</h4> {{response.data.hash}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h4>{{$t('timestamp')}}</h4>
                        {{response.timestamp | moment("subtract", "2 hours") | moment("DD/MM/YYYY HH:mm:ss")}} UTC
                    </v-col>
                </v-row>
                <v-row class="mb-0">
                    <v-col>
                        <h4>{{$t('txhash')}}</h4> {{response.txhash}}
                    </v-col>
                </v-row>
                <v-row class="mt-0">
                    <v-col>
                        <v-btn :href="$network + '/tx/' + response.txhash" target="_blank">{{$t('etherscan')}}</v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
        <v-row class="greens mt-2">
            <v-col>
                <h2 :class="{ 'h2-mobile': $vuetify.breakpoint.mdAndDown }">{{$t('checkintegrity')}}
                </h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h3 :class="{ 'h3-mobile': $vuetify.breakpoint.mdAndDown }">{{$t('blockinfo')}}
                    <v-tooltip right>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" tile icon v-clipboard:copy="JSON.stringify(response.source_data)"
                                v-clipboard:success="onCopy" v-clipboard:error="onError">
                                <v-icon class="black--text">content_copy</v-icon>
                            </v-btn>
                        </template>
                        <span class="tooltip" style="height: 20px">{{$t('copy')}}</span>
                    </v-tooltip>
                </h3>
                <v-row v-if="$vuetify.breakpoint.smAndUp" class="justify-center">
                    <v-col cols="12">
                        <v-btn icon large class="secondary" @click="json = false" v-if="json == true">
                            <v-icon class="white--text">notes</v-icon>
                        </v-btn>
                        <v-btn icon large class="secondary" @click="json = true" v-if="json == false">
                            <v-icon class="white--text">code</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col v-if="json" cols="12" sm="6" md="6" lg="6" xl="6" xs="12" class="mx-auto">
                        <v-textarea dark class="ma-0 json" :rows="dataRows" id="dati" no-resize readonly
                            background-color="grey lighten-3" hide-details outlined
                            :value="JSON.stringify(response.source_data, undefined, 4)" />
                    </v-col>
                    <v-col v-else cols="12" sm="1a" md="10" lg="10" xl="10" xs="12" class="mx-auto">
                        <v-tabs v-if="response.source_data" center-active show-arrows next-icon="navigate_next" prev-icon="navigate_before" v-model="tab" height="auto" background-color="accent"
                            color="primary" grow dark class="tab-dati mt-1">
                            <v-tab v-for="(item, index) in originalData" :key="index" class="tab-index">
                                <h5>{{ index | titleCase }}</h5>
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab" class="tab-item">
                            <v-tab-item v-for="(item, index) in originalData" :key="index">
                                <v-container>
                                    <v-row outlined light v-for="(value , key , pos) in item" :key="pos">
                                        <v-col class="mx-auto pa-0" cols="7">
                                            <b>{{ key | titleCase }}</b> : {{value}}
                                            <!-- {{ $t(key) || null }} -->
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-col>
                </v-row>
                <v-row v-if="$vuetify.breakpoint.xs" class="justify-center">
                    <v-col cols="12">
                        <v-btn small fab icon right top class="fabby secondary" @click="json = false" v-if="json == true">
                            <v-icon class="white--text">notes</v-icon>
                        </v-btn>
                        <v-btn small fab icon right top class="fabby secondary" @click="json = true" v-if="json == false">
                            <v-icon class="white--text">code</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <!-- <v-row v-if="!showCheck">
            <v-col>
                <v-btn @click="checkTx" class="accent white--text">{{$t('verify')}}</v-btn>
            </v-col>
        </v-row> -->
        <!-- <v-row v-if="showCheck">
            <v-col>
                <h2>{{$t('verifyprocess')}}</h2>
            </v-col>
        </v-row> -->
        <v-row v-if="showCheck" class="text-left verification">
            <v-col v-html="verification" />
        </v-row>
        <v-dialog v-model="popup" max-width="400">
            <v-card class="text-left">
                <v-card-title class="headline">{{$t('verifyoutcome')}}</v-card-title>

                <v-card-text>
                    {{message}}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="darken-1" text @click="popup = false">
                        {{$t('close')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar width="500" v-model="snackbar" :timeout=6000>
            {{ copyMessage}}
        </v-snackbar>
    </v-container>
</template>
<script>
// import mock from '@/mock/secondaChiamataNewsCert.json'
import axios from 'axios'
// import SHA256 from "crypto-js/sha256"
import store from '@/store'
import i18n from '@/plugins/i18n.js'

// import router from '@/router'

export default {
    name: "Certification",
    data() {
        return {
            text: '',
            showCheck: false,
            verification: '',
            message: '',
            popup: false,
            getterValue: '',
            copyMessage: '',
            snackbar: false,
            json: false,
            tab: null
        }
    },
    beforeRouteEnter: (to, from, next) => {
        next(() => {
            store.dispatch('setLoading', true).then(() => {
                if (to.params.txHash) {
                     let apiUrl = 'https://blockchain.casagirelli.it/transactions/'
                     console.log(apiUrl)
                    axios.get(apiUrl +  to.params.txHash).then(response => {
                        // axios.get('/txResponse.json').then(response => {
                        if (response.data[0].txhash && response.data[0].timestamp) {
                            if (to.params.tab) {
                                store.dispatch('setState', {
                                    variable: 'tab',
                                    value: parseInt(to.params.tab)
                                })
                            } else {
                                store.dispatch('setState', {
                                    variable: 'tab',
                                    value: 0
                                })
                            }
                            store.dispatch('setState', {
                                variable: 'certificate',
                                value: response.data[0]
                            }).then(() =>
                                store.dispatch('setLoading', false).then(() =>
                                    next()
                                )
                            )
                        } else {
                            store.dispatch('setErrors', {
                                status: true,
                                message: i18n.t('error.tonotarize')
                            }).then(() =>
                                store.dispatch('setLoading', false).then(() => next())
                            )
                        }
                    }).catch(error => {
                        console.log(error)
                        store.dispatch('setErrors', {
                            status: true,
                            message: i18n.t('error.generic')
                        }).then(() =>
                            store.dispatch('setLoading', false).then(() => next())
                        )
                    })
                } else {
                    store.dispatch('setErrors', {
                        status: true,
                        message: i18n.t('error.insertblock')
                    }).then(() => store.dispatch('setLoading', false).then(() => next()))
                }
            })
        })
    },
    computed: {
        dataRows() {
            if (this.$vuetify.breakpoint.lgAndUp) {
                return 10
            } else return 6
        },
        response() {
            return this.$store.getters.getCertificate
        },
        originalData() {
            //if (!Array.isArray(this.response.source_data)) {
            //    return [this.response.source_data]
            //}
            // else {
            return this.response.source_data
            // }
        }
    },
    mounted() {
        this.tab = this.$store.getters.getTab
    },
    methods: {
        onCopy: function () {
            this.snackbar = true
            this.copyMessage = this.$i18n.t('copyok')
        },
        onError: function () {
            this.snackbar = true
            this.copyMessage = this.$i18n.t('copyko')
        },
        // checkTx() {
        //     this.showCheck = true
        //     this.verification = 'Verifying transaction data for <b>' + this.$route.params.id + '</b> ...'
        //     setTimeout(() => {
        //         this.verification += '<br><b>Calculating hash</b> of the content…'
        //         setTimeout(() => {
        //             this.verification += '<br><b>Input</b>: ' + JSON.stringify(this.response.source_data).substring(0, 400).concat('.....')
        //             setTimeout(() => {
        //                 this.verification += '<br><b>Output</b>: ' + SHA256(JSON.stringify(this.response.source_data))
        //                 setTimeout(() => {
        //                     if (this.response.data.hash.toUpperCase() == SHA256(JSON.stringify(this.response.source_data)).toString().toUpperCase()) {
        //                         this.message = this.$i18n.t('verifysuccess')
        //                         this.verification += '<br><h2>Hash matches! Content verified successfully!</h2>'
        //                         setTimeout(() => this.popup = true, 1500)
        //                     } else {
        //                         this.message = this.$i18n.t('verifyfailed')
        //                         this.verification += '<br><b>Hash doesn\'t match! Content verification failed!</b>'
        //                         setTimeout(() => this.popup = true, 1500)
        //                     }
        //                 }, 2000)
        //             }, 2000)
        //         }, 2000)
        //     }, 2000)
        // }
    },
}
</script>
<style lang="scss" scoped>
.fabby {
    margin-right: -90%;
    margin-top: -22%;
}
.tab-dati {
    -webkit-overflow-scrolling: touch;
}
.fabby-desktop {
    margin-right: -80%;
    margin-top: -5%;
}
.tab-index {
    min-height: 40px;
}
.tab-item {
    background-color: #e2e2e2
}
.carousel {
    max-height: 400px;
    border-radius: 10px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    background-color: #EEEEEE;
}
.json {
    border-radius: 10px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    overflow: hidden;
}
.certificate-poster-wrapper {
  border: 1px solid #CE1628;
  padding: 10px;
  margin: 45px auto 1rem auto;

  .certificate-poster {
    border: 3px solid #CE1628;
    padding: 15px;

    .ribbon-wrapper {
    margin-top: -70px;
    }

    .ribbon-content {
      font-size: 1.5rem;
    }

    .ribbon-mobile {
        font-size: 1.2rem
    }

    h3, h4, h5, h6 {
      text-align: center;
      margin: 0;
      padding: 0.25em 0 0 0;
      img {
        top: -3px;
        position: relative;
      }
    }
    h4 {

      text-transform: uppercase;
      //font-size: 1.75rem;
    }
    p {
      text-align: center;

      &.id {
        -ms-word-break: break-all;
        word-break: break-all;
        word-break: break-word;
        -webkit-hyphens: auto;
        -moz-hyphens: auto;
        -ms-hyphens: auto;
        hyphens: auto;
        line-height: 0.7em;
        padding-top: 0.35em;
      }


    }
    small {
      font-size: 60%;
    }

  }
}
.ribbon-wrapper {
  position: relative;
  z-index: 1;
}
.ribbon {
  font-size: 13px !important;
  /* This ribbon is based on a 16px font side and a 24px vertical rhythm. I've used em's to position each element for scalability. If you want to use a different font size you may have to play with the position of the ribbon elements */
  width: auto;
  max-width: 70%;
  position: relative;
  background: #CE1628;
  color: #fff;
  text-align: center;
  padding: 1em 1.1em; /* Adjust to suit */
  margin: 1em auto 0; /* Based on 24px vertical rhythm. 48px bottom margin - normally 24 but the ribbon 'graphics' take up 24px themselves so we double it. */
}
.ribbon:before, .ribbon:after {
  content: "";
  position: absolute;
  display: block;
  bottom: -1em;
  border: 1.5em solid rgb(224, 25, 45);
  z-index: -1;
}
.ribbon:before {
  left: -2em;
  border-right-width: 1.5em;
  border-left-color: transparent;
}
.ribbon:after {
  right: -2em;
  border-left-width: 1.5em;
  border-right-color: transparent;
}
.ribbon .ribbon-content:before, .ribbon .ribbon-content:after {
  content: "";
  position: absolute;
  display: block;
  border-style: solid;
  border-color: rgb(206, 14, 33);
  bottom: -1em;
}
.ribbon .ribbon-content:before {
  left: 0;
  border-width: 1em 0 0 1em;
}
.ribbon .ribbon-content:after {
  right: 0;
  border-width: 1em 1em 0 0;
}
.verification {
    font-size: 0.8rem;
    font-style: italic;
    margin-left: 0.5%;
    margin-right: 0.5%;
}
</style>