<template>
  <main class="member-info">
    <h1>Mitglied Informationen</h1>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ this.model.member.firstname }} {{ this.model.member.lastname }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ this.model.member.role }}</h6>
        <p class="card-text">{{ this.model.member.telephone }}</p>
        <p class="card-text"><a href="mailto:{{ this.model.member.email }}">{{ this.model.member.email  }}</a></p>
        <p class="card-text">{{ formatActiveValue(this.model.member.active)}}</p>
        <p class="card-text"><small class="text-muted">Eintrittsdatum: {{ formatDate(this.model.member.entry_date )}}</small></p>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "/src/api/axios.mjs";
import {formatInSwissTime} from "/src/services/formatterService.mjs";
import {useToast} from 'vue-toast-notification';
export default {
  name: "MemberInfoCard",
  data() {
    return {
      model: {
        member: {
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          telephone: "",
          active: "",
          role: "",
          entry_date: "",
        },
        memberId: "",
        toast: useToast(),
      },
    }
  },

  mounted() {
    this.memberId = this.$route.params.id;
    this.getMemberInfo(this.$route.params.id);
  },
  methods: {
    getMemberInfo(id) {
      axios
          .get(`/members/${id}/info`)
          .then((res) => {
            if (res.status === 200){
              this.model.member = res.data;
            }

          })
          .catch((error) => {
            if (error.response.status === 404) {
              console.log("Mitglied wurde nicht gefunden")
              this.toast.error("Mitglied wurde nicht gefunden");
            }
            console.log(error);
          });
    },
    formatDate(date){
      return formatInSwissTime(date);
    },

    formatActiveValue(active){
      if(active === 1){
        return "Aktiv";
      }else{
        return "Inaktiv";
      }
    },
  },
}
</script>

<style scoped>

</style>