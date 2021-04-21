<template>
  <v-container class="home ma-0 pl-0 pr-0">
        <v-row>
          <v-col>
            <v-img :src="require('@/assets/loader.png')" contain height="120" :transition="false" />
          </v-col>
        </v-row>
    <v-row class="mt-2">
      <v-col>
      <h2 :class="{ 'h2-mobile': $vuetify.breakpoint.mdAndDown }" class="grey darken-2 title-home pl-1 text-left">EY OpsChain Traceability</h2>
      </v-col>
    </v-row>
    <v-row class="pl-1 pr-1">
      <v-col>
      <p>Grazie alla tecnologia Blockchain è possibile tracciare e certificare ogni singolo processo operativo e di lavorazione lungo la filiera con l’obbiettivo di comunicare al cliente il reale valore del prodotto e con esso tutte le fasi a partire dalle materie prime che hanno portato alla produzione di un alimento o bevanda.</p>
      <p>EY OpsChain Traceability è la suite di servizi integrata e basata su tecnologia blockchain pubblica di Ethereum che ha come obbiettivo la conferma che i processi e i dati condivisi siano sincronizzati tra le reti dei vari attori della filiera andando a riprodurre i processi di business esistenti con token e smart contracts.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
      <h2 :class="{ 'h2-mobile': $vuetify.breakpoint.mdAndDown }" class="grey darken-2 title-home pl-1 text-left">Come funziona EY OpsChain Traceability</h2>
      </v-col>
    </v-row>
    <v-row class="pl-1 pr-1">
          <v-col>
      <p>Questa tecnologia permette a noi di Nastro Azzurro di certificare le fasi che hanno accompagnato la produzione della nostra Birra, renderle disponibile al consumatore garantendo la massima qualità. </p>
      <p><strong> Attraverso il QR code applicato sull'etichetta sarà possibile:
        </strong>
      </p>
      <ul class="home-list">
        <li><span><b>Ottenere informazioni dettagliate delle relative fasi di produzione sino al consumatore finale</b></span>
        </li>
        <li><span><b>Verificare i dati rilevanti in blockchain come time stamp e transaction hash ed esplorarli all’interno del block explorer della blockchain di Ethereum</b></span></li>
        <li><span><b>Permettere al consumatore di andare a constatare se le stesse informazioni sono dichiarate in maniera immutabile in blockchain e così apportare maggior sicurezza e consapevolezza di ciò che consumiamo. </b></span></li>
      </ul><br>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ml-0 mr-0">
      <h2 :class="{ 'h2-mobile': $vuetify.breakpoint.mdAndDown }" class="grey darken-2 title-home pl-1 text-left">La tecnologia alla base </h2>
      </v-col>
    </v-row>
    <v-row class="pl-1 pr-1">
      <v-col>
      <p>Con Blockchain si intende un registro virtuale, immutabile e distribuito contenente le specifiche di tutte le informazioni che circolano nella rete. Per ottenere questo risultato vi è un processo composto da:</p>
      <ol>
        <li>Raccolta dati</li>
        <li>Digitalizzazione dei processi </li>
        <li>Notarizzazione/ tokenizzazione per scrivere i dati in blockchain</li>
        <li>Meccanismo di certificazione e di scrittura dati in maniera immutabile collegata ad un time-stamp</li>
        <li>Visualizzazione del consumatore finale della storia del prodotto attraverso una interfaccia web.</li>
      </ol>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>
<style scoped>
.home {
  color: #333333;
}
.title-home {
  color: #ffe600;
}
.home-list {
  list-style: disc;
  color: #ffe600
}
.home-list li span {
  color: #4c514d;
}
</style>