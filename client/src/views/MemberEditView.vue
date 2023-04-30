<template>
  <main class="memberNew">
    <h1>Mitglied bearbeiten</h1>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Mitglied bearbeiten</h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="firstname" class="form-label">Vorname</label>
                <input type="text" class="form-control" id="firstname" v-model="model.member.firstname" required>
              </div>
              <div class="mb-3">
                <label for="lastname" class="form-label">Nachname</label>
                <input type="text" class="form-control" id="firstname" v-model="model.member.lastname" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" v-model="model.member.email" required>
              </div>
              <div class="mb-3">
                <label for="active" class="form-label">Aktiv</label>
                <input v-model="model.member.active" class="form-check-input" type="checkbox" id="active"
                       v-bind:checked="model.member.active ===1" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="telephone" class="form-label">Telefon</label>
                <input type="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" class="form-control" id="telephone"
                       v-model="model.member.telephone" required>
              </div>

              <div class="mb-3">
                <label for="role" class="form-label">Vereinsrolle</label>
                <select id="role" name="role" class="form-select" v-model="model.member.role_id" required>
                  <option value="">Wähle eine Rolle aus</option>
                  <option v-for="(role, index) in this.memberRoles" :key="index" :value="role.id">{{
                      role.role
                    }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="entry_date" class="form-label">Eintrittsdatum</label>
                <input type="date" class="form-control" id="entry_date" v-model="model.member.entry_date" required>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <button type="button" @click="updateMember" class="btn btn-primary">Speichern</button>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import axios from "/src/api/axios.mjs";
import {useToast} from 'vue-toast-notification';
import {formatInSwissTime} from "/src/services/formatterService.mjs";

export default {
  name: "MemberEditView",
  data() {
    return {
      memberId: "",
      memberRoles: [],
      model: {
        member: {
          firstname: "",
          lastname: "",
          email: "",
          telephone: "",
          active: "",
          role_id: 4,
          entry_date: "",
        },
      },
      toast: useToast(),
      formattedDate: "",

    };
  },
  mounted() {
    this.getMemberRoles();
    this.memberId = this.$route.params.id;
    this.getMemberById(this.$route.params.id);
  },
  methods: {
    getMemberById(id) {
      axios
          .get(`/members/${id}`)
          .then((res) => {
            console.log(res.data)
            if (res.status === 200) {
              this.model.member = res.data;
              this.model.member.entry_date = this.formatDate(this.model.member.entry_date);
            }
          })
          .catch((error) => {
            console.log(error);
            if ([404, 500].includes(error.response.status)) {
              this.toast.error(error.response.data.message);
            } else {
              console.log("Unexpected error: " + error.response.status);
            }
          });
    },

    getMemberRoles() {
      axios
          .get("/members/roles")
          .then((res) => {
            this.memberRoles = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    updateMember() {
      console.log(this.model.member)
      axios
          .put(`/members/${this.memberId}`, this.model.member)
          .then((res) => {
            if (res.status === 200) {
              this.toast.success(res.data.message);
              this.$router.push("/members");
            }
          })
          .catch((error) => {
            console.log(error);
            if ([400, 404, 500].includes(error.response.status)) {
              this.toast.error(error.response.data.message);
            } else {
              console.log("Unexpected error: " + error.response.status);
            }
          });
    },

    formatDate(entry_date) {
      const swissTimeString = formatInSwissTime(entry_date);
      let parts = swissTimeString.split(".");
      let formatDatePicker = `${parts[2]}-${parts[1]}-${parts[0]}`;
      console.log(formatDatePicker)
      return formatDatePicker
    },
  },
}

</script>

<style scoped>

</style>