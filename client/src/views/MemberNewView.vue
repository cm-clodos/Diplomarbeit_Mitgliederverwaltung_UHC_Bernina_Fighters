<template>
  <main class="memberNew">
    <h1>Mitglied hinzufügen</h1>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Mitglied hinzufügen</h4>
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
                <input v-model="model.member.active" class="form-check-input" type="checkbox" id="active" checked required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="telephone" class="form-label">Telefon</label>
                <input type="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" class="form-control" id="telephone" v-model="model.member.telephone" required>
              </div>

              <div class="mb-3">
                <label for="role" class="form-label">Vereinsrolle</label>
                <select id="role" name="role" class="form-select" v-model="model.member.role_id" required>
                  <option value="">Wähle eine Rolle aus</option>
                  <option v-for="(role, index) in this.memberRoles" :key="index" :value="role.id">{{ role.role }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="entry_date" class="form-label">Eintrittsdatum</label>
                <input type="date" class="form-control" id="entry_date" v-model="model.member.entry_date" required>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <button type="button" @click="addMember" class="btn btn-primary">Mitglied hinzufügen</button>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import {useToast} from 'vue-toast-notification';

export default {
  name: "MemberNewView",
  data() {
    return {
      memberRoles: [],
      model: {
        member: {
          firstname: "",
          lastname: "",
          email: "",
          telephone: "",
          active: true,
          role_id: 4,
          entry_date: "",
        },
      },
      toast: useToast(),

    };
  },
  mounted() {
    this.getMemberRoles();


  },
  methods: {
    getMemberRoles() {
      axios
          .get("http://localhost:3000/members/roles")
          .then((res) => {
            // console.log(res.data)
            this.memberRoles = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    addMember() {
      console.log(this.model.member)

      axios
          .post("http://localhost:3000/members", this.model.member)
          .then((res) => {
            console.log(res.data)
            if (res.status === 201) {
              this.toast.success("Mitglied wurde erfolgreich hinzugefügt");
              console.log("Mitglied wurde erfolgreich hinzugefügt");
              this.$router.push("/members");
            }
          })
          .catch((error) => {
            console.log(error.response);
            console.log(error.response.data)
            if (error.response.status === 400 || error.response.status === 500) {
              this.toast.error("Fehler beim Hinzufügen des Mitglieds");
              console.log("Fehler beim Hinzufügen des Mitglieds");
              console.log(error);
            }
          });


    },
  },
}
</script>

<style scoped>

</style>