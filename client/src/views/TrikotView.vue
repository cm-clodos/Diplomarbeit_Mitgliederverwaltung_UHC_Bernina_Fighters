<template>
  <main class="trikot">
    <h1>Übersicht Trikots</h1>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>Trikots
            <RouterLink to="/trikots/new" class="btn btn-primary float-end">Trikot hinzufügen</RouterLink>
          </h4>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>Mitglied</th>
              <th @click=""> Nummer
                <font-awesome-icon icon="sort"/>
              </th>
              <th @click=""> Trikotname
                <font-awesome-icon icon="sort"/>
              </th>
              <th>Verfügbar
                <font-awesome-icon icon="sort"/>
              </th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody v-if="this.trikots.length > 0">
            <tr v-for="(trikot, index) in trikots " :key="index">
              <td data-cell="mitglied">
                <select v-model="trikot.memberId">
                  <option value="null">- Nicht zugewiesen -</option>
                  <option v-for="member in members" :value="member.id">{{ renderMemberName(member) }}</option>
                </select>
              </td>
              <td data-cell="nummer"> {{ trikot.number }}</td>
              <td data-cell="trikotname"><input type="text" class="form-control border-transparent" v-model="trikot.name"></td>
              <td data-cell="verfügbar"> {{ trikot.available }} <input type="checkbox" @change="toggleAvailable(trikot)"
                                                 v-bind:checked="trikot.available ===1" :value="trikot.available"></td>
              <td data-cell="actions">
                <div class="actions-container">
                <button type="button"
                        @click="updateTrikot(trikot.number, trikot.memberId, trikot.available, trikot.name)"
                        class="btn btn-success action-btn">
                  <font-awesome-icon class="action-icon" icon="floppy-disk"/>
                </button>
                <button type="button" @click="deleteTrikot(trikot.number)" class="btn btn-danger action-btn">
                  <font-awesome-icon class="action-icon" icon="trash-can"/>
                </button>
                </div>
              </td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
              <td colspan="8" class="text-center">Daten werden geladen...</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useToast} from 'vue-toast-notification';
import axios from "/src/api/axios.mjs";
export default {
  name: "TrikotView",
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      toast: useToast(),
      trikots: [],
      members: [],
    }
  },
  mounted() {
    this.getAllTrikots();
    this.getAllMembers();
  },
  methods: {
    getAllTrikots() {
      axios.get('/trikots/')
          .then(res => {
            console.log(res.data)
            this.trikots = res.data;
          }).catch(error => {
            console.log(error)
            if ([500].includes(error.response.status)) {
              this.toast.error(error.response.data.message);
            }else {
              console.log("Unexpected error: " + error.response.status);
            }
          });
    },
    getAllMembers() {
      axios.get('/members/')
          .then(res => {
            console.log(res.data)
            this.members = res.data;
          }).catch(error => {
            console.log(error)
            if ([500].includes(error.response.status)) {
              this.toast.error(error.response.data.message);
            }else {
              console.log("Unexpected error: " + error.response.status);
            }
          });
    },
    updateTrikot(trikotNumber, memberId, available, trikotName) {
      axios.put('/trikots/' + trikotNumber, {
        member_id: memberId,
        available: available,
        name: trikotName
      })
          .then(res => {
            if (res.status === 200){
              console.log(res.data)
              this.toast.success(res.data.message);
            }
          }).catch(error => {
            console.log(error);
            if ([400, 404, 500].includes(error.response.status)) {
              this.toast.error(error.response.data.message);
            } else {
              console.log("Unexpected error: " + error.response.status);
            }
          });
    },
    deleteTrikot(trikotNumber) {
      axios.delete(`/trikots/${trikotNumber}`)
          .then(res => {
            if (res.status === 200) {
              console.log(res.data)
              this.toast.success(res.data.message);
              this.getAllTrikots();
            }
          }).catch(error => {
            console.log(error);
            if ([404, 500].includes(error.response.status)) {
              this.toast.error(error.response.data.message);
            } else {
              console.log("Unexpected error: " + error.response.status);
            }
          });
    },

    toggleAvailable(trikot) {
      trikot.available = trikot.available === 1 ? 0 : 1;
      console.log(trikot.available)
    },
    renderMemberName(member) {
      return member.firstname && member.lastname ? member.firstname + ' ' + member.lastname : '';
    },
  }
}
</script>

<style scoped>

</style>