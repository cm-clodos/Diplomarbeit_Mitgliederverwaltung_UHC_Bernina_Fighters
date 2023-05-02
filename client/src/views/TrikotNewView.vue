<template>
  <main class="trikotNew">
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Trikot hinzufügen</h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="trikotNumber" class="form-label">Trikotnummer</label>
                <input type="number" class="form-control" id="trikotNumber " v-model="model.trikot.number" required>
              </div>
              <div class="mb-3">
                <label for="trikotName" class="form-label">Trikotname</label>
                <input type="text" class="form-control" id="trikotName" v-model="model.trikot.name" required>
              </div>
              <div class="mb-3">
                <label for="available" class="form-label">Verfügbar</label>
                <input class="form-check-input" type="checkbox" id="available" v-model="model.trikot.available" checked
                       required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="member" class="form-label">Mitglied</label>
                <select id="member" name="member" class="form-select" v-model="model.trikot.member_id" required>
                  <option value="null">- Nicht zugewiesen -</option>
                  <option v-for="member in members" :value="member.id">{{ renderMemberName(member) }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <button type="button" @click="addTrikot" class="btn btn-primary">Trikot hinzufügen</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {useToast} from 'vue-toast-notification';
import axios from "/src/api/axios.mjs";
export default {
  name: "TrikotNewView",
  data() {
    return {
      members: [],
      toast: useToast(),
      model: {
        trikot: {
          number: '',
          name: '',
          available: true,
          member_id: null
        }
      },
    }
  },
  mounted() {
    this.getAllMembers();
  },
  methods: {
    getAllMembers() {
      axios.get('/members')
          .then(res => {
            this.members = res.data;
          })
          .catch(error => {
            console.log(error)
            this.toast.error('Fehler beim Laden der Mitglieder');
          });
    },
    renderMemberName(member) {
      return member.firstname && member.lastname ? member.firstname + ' ' + member.lastname : '';
    },
    addTrikot() {
      axios.post('/trikots', this.model.trikot)
          .then(res => {
            if (res.status === 201) {
              this.toast.success(res.data.message);
              this.$router.push({name: 'Trikotverwaltung'});
            }
          })
          .catch(error => {
            console.log(error);
            if ([400, 500].includes(error.response.status)) {
              this.toast.error(error.response.data.message);
              console.log(error.response.data)
            } else {
              console.log("Unexpected error: " + error.response.status);
            }
          });
    }
  }
}
</script>

<style scoped>

</style>