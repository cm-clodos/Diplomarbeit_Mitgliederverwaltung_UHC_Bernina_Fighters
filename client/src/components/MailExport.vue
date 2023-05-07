<template>
  <div class="export">
    <h3>Export Mailliste</h3>
    <form ref="downloadForm" action="" method="POST">
      <input type="hidden" name="_method" value="POST" />
      <div class="form-check">
        <input class="form-check-input" type="radio" value="all" v-model="selectedOption" />
        <label class="form-check-label">Alle</label>
      </div>
      <div class="form-check">
        <label for="payPeriod">Wähle Bezahlperiode:</label>
        <select class="form-control" id="period" v-model="selectedPeriod">
          <option value="" disabled selected>Bitte wählen</option>
          <option v-for="year in periodsInYears" :value="year">{{ year }}</option>
        </select>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" value="paid" v-model="selectedOption" />
        <label class="form-check-label">Bezahlt</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" value="unpaid" v-model="selectedOption" />
        <label class="form-check-label">Nicht bezahlt</label>
      </div>
      <button class="btn btn-primary" @click="handleMailExport">Export Mailliste</button>
    </form>
  </div>
</template>
<script>
import axios from "../api/axios.mjs"

export default {
  name: "MailExport",
  components: {},
  data() {
    return {
      selectedOption: "all",
      selectedPeriod: "",
      periods: [],
      periodsInYears: []
    }
  },
  mounted() {
    this.getAllPaymentPeriods();
  },
  methods: {
    handleMailExport() {
      const baseUrl = "http://localhost:3000/members/mail/export/download";
      const queryParam = `filter=${this.selectedOption}`;
      const queryParam2 = `&period=${this.selectedPeriod}`;
      this.$refs.downloadForm.action = `${baseUrl}?${queryParam}${queryParam2}`;
      this.$refs.downloadForm.submit();
    },
    getAllPaymentPeriods(){
      axios.get("/members/payments/period").then(res => {
        this.periods = res.data
        this.periodsInYears = this.renderPeriodsToYears(this.periods);
      })
    },
    renderPeriodsToYears(periods){
      const years = periods.map(item => new Date(item.created_at).getFullYear());
      return years.filter((year, index) => years.indexOf(year) === index);
    },
  }
}
</script>

<style scoped>



</style>