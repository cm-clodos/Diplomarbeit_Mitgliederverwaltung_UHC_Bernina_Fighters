<template>
  <main class="trikotNew">
    <div class="container mt-5">
      <form ref="form" @submit.prevent="handleSubmit">
      <div class="card">
        <div class="card-header">
          <h4>Trikot hinzufügen</h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="trikotNumber" class="form-label">Trikotnummer</label>
                <input type="number" class="form-control" id="trikotNumber " v-model="model.trikot.number">
                <span v-if="v$.model.trikot.number.$error" :class="`${v$.model.trikot.number.$error ? 'error-message' : ''}`">
              {{ v$.model.trikot.number.required.$message }}
            </span>
              </div>
              <div class="mb-3">
                <label for="trikotName" class="form-label">Trikotname</label>
                <input type="text" class="form-control" id="trikotName" v-model="model.trikot.name" >
                <span v-if="v$.model.trikot.name.$error" :class="`${v$.model.trikot.name.$error ? 'error-message' : ''}`">
              {{ v$.model.trikot.name.required.$message }}
            </span>
              </div>
              <div class="mb-3">
                <label for="available" class="form-label">Verfügbar</label>
                <input class="form-check-input" type="checkbox" id="available" v-model="model.trikot.available" checked>
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
            <button type="submit" class="btn btn-primary">Trikot hinzufügen</button>
          </div>
        </div>
      </div>
      </form>
    </div>
  </main>
</template>

<script>
import {useToast} from 'vue-toast-notification';
import axios from "/src/api/axios.mjs";
import {useVuelidate} from "@vuelidate/core";
import {required, helpers} from "@vuelidate/validators";
export default {
  setup() {
    return {v$: useVuelidate()}
  },
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
  validations(){
    return {
      model: {
        trikot: {
          number: {required: helpers.withMessage('Trikotnummer ist erforderlich', required)},
          name: {required: helpers.withMessage('Trikotname ist erforderlich', required)}
        }
      }
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
              if (error.response.data.message) {
                this.toast.error(error.response.data.message);
              } else if (error.response.data.length > 0) {
                error.response.data.forEach((errorObj) => {
                  Object.values(errorObj).forEach((errorMessage) => {
                    this.toast.error(String(errorMessage));
                  });
                });
              }
              console.log(error.response.data);
            } else {
              console.log("Unexpected error: " + error.response.status);
            }
          });
    },
    async handleSubmit() {
      const valid = await this.v$.$validate();
      if (valid) {
        try {
          this.addTrikot();
        } catch (err) {
          this.toast.error("Fehler beim übermitteln des Formulars!")
          console.log(err)
        }
      } else {
        this.toast.error("Bitte fülle die Felder korrekt aus!")
      }
    },
  }
}
</script>

<style scoped>

</style>