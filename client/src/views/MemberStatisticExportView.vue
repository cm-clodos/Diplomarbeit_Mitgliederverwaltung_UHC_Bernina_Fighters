<template>
  <div class="statistics">
    <h1>Mitglieder Statistik und Exporte</h1>
   <MemberExport />
  </div>
</template>
<script>


import MemberExport from "@/components/MemberExport.vue";

export default {
  name: "MemberStatisticExportView",
  components: {MemberExport},
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