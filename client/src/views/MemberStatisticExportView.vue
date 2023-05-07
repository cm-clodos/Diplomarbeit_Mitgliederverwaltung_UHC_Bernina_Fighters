<template>
  <div class="statistics">
    <h1>Mitglieder Statistik und Exporte</h1>
    <div>
      <form ref="downloadForm" action="http://localhost:3000/members/export/download" method="POST" hidden>
        <input type="hidden" name="_method" value="POST"/>
      </form>
      <button class="btn btn-primary" @click="download">Export Mitgliederliste</button>
    </div>
  </div>
</template>

<script>
import {useToast} from 'vue-toast-notification';
export default {
  name: "MemberStatisticExportView",
  components: {},
  data() {
    return {
      toast: useToast(),
    }
  },
  mounted() {

  },
  methods: {
    download() {
      this.$refs.downloadForm.submit();
    },
  }
}
</script>

<style scoped>

</style>