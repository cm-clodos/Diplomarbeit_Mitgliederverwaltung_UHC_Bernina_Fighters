<template>
  <div class="statistics">
    <h1>Mitglieder Statistik und Exporte</h1>
    <div class="container mt-5">
      <MemberExport />
      <TrikotExport />
      <MailExport />
    </div>
  </div>
</template>
<script>


import MemberExport from "@/components/MemberExport.vue";
import TrikotExport from "@/components/TrikotExport.vue";
import MailExport from "@/components/MailExport.vue";

export default {
  name: "ExportView",
  components: {MailExport, TrikotExport, MemberExport},
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.container {
    display: flex;
}

</style>