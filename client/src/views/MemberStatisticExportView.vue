<template>
  <div class="statistics">
    <h1>Mitglieder Statistik und Exporte</h1>
   <MemberExport />
    <TrikotExport />
  </div>
</template>
<script>


import MemberExport from "@/components/MemberExport.vue";
import TrikotExport from "@/components/TrikotExport.vue";

export default {
  name: "MemberStatisticExportView",
  components: {TrikotExport, MemberExport},
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>