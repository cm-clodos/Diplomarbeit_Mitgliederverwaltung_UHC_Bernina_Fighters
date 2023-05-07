<template>
  <div class="statistics">
    <h1>Mitglieder Statistik und Exporte</h1>
   <MemberExport />
    <TrikotExport />
    <EmailExport />
  </div>
</template>
<script>


import MemberExport from "@/components/MemberExport.vue";
import TrikotExport from "@/components/TrikotExport.vue";
import EmailExport from "@/components/MailExport.vue";

export default {
  name: "MemberStatisticExportView",
  components: {EmailExport, TrikotExport, MemberExport},
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