<template>
  <main class="home">
    <h1>Übersicht Mitgliederverwaltung</h1>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>Mitglieder
            <RouterLink to="/members/new" class="btn btn-primary float-end">Mitglied hinzufügen</RouterLink>
          </h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-9 mb-3">
              <input type="text" @keyup.enter="searchMember" class="form-control" id="search" v-model="search"
                     placeholder="Suche nach Nachname...">
            </div>
            <div class="col-sm-3 mb-3">
              <button type="button" @click="searchMember" class="btn btn-primary btn-block">Suchen</button>
            </div>
          </div>

          <table class="table table-bordered">
            <thead>
            <tr>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Aktiv</th>
              <th>Eintritt</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody v-if="this.members.length > 0">
            <tr v-for="(member, index) in this.members" :key="index">
              <td data-cell="vorname"> {{ member.firstname }}</td>
              <td data-cell="nachname"> {{ member.lastname }}</td>
              <td data-cell="email"> {{ member.email }}</td>
              <td data-cell="telefon"> {{ member.telephone }}</td>
              <td data-cell="aktiv"> {{ this.formatActiveValue(member.active) }}</td>
              <td data-cell="eintritt"> {{ this.formatDate(member.entry_date) }}</td>
              <td data-cell="actions">
                <div class="actions-container">
                <RouterLink :to="{path: 'members/' + member.id + '/info' }" class="btn bg-warning"> <font-awesome-icon  class="action-icon" icon="eye" /></RouterLink>
                <RouterLink :to="{path: 'members/' + member.id }" class="btn btn-success"> <font-awesome-icon class="action-icon" icon="pencil"/></RouterLink>
                <button type="button" @click="deleteMember(member.id)" class="btn btn-danger"><font-awesome-icon class="action-icon" icon="trash-can"/></button>
                </div>
              </td>
            </tr>
            <div class="row">
              <div class="mb-3 d-inline-block">
                <h3 class="sum-text">Total aktive Mitglieder: {{ this.sumActiveMembers }}</h3>
              </div>
            </div>

            </tbody>
            <tbody v-else>
            <tr>
              <td colspan="8" class="text-center">Mitgliederdaten werden geladen...</td>
            </tr>

            </tbody>

          </table>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "/src/api/axios.mjs";
import {useToast} from 'vue-toast-notification';
import {formatInSwissTime} from "@/services/formatterService.mjs";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: 'MitgliederView',
  computed: {},
  components: {
    FontAwesomeIcon,
    Header,
  },
  //inject: ['host'],
  data() {
    return {
      members: [],
      toast: useToast(),
      search: '',
      filteredMembers: [],
      sumActiveMembers: 0,

    };
  },
  mounted() {
    this.getMembers();

  },
  methods: {
    getMembers() {
      axios.get("/members/").then(res => {
        this.members = res.data
        //console.log(this.members)
        this.filterActiveMembers();
      })
    },
    deleteMember(id) {
      if (confirm("Möchten Sie das Mitglied wirklich löschen?")) {
        axios.delete(`/members/${id}`).then(res => {
          console.log(res)
          if (res.status === 200) {
            this.toast.success('Mitglied wurde gelöscht');
            this.getMembers();
          }
        }).catch(error => {
          if (error.response.status === 404) {
            console.log("Mitglied wurde nicht gefunden")
            this.toast.error("Mitglied wurde nicht gefunden");
          }
        });
      }

    },
    searchMember() {
      console.log(this.search)
      if (this.search.length > 0) {
        const matchingLastNames = this.members.filter(member => {
          return member.lastname.toLocaleLowerCase().includes(this.search.toLocaleLowerCase());
        }).map(member => member);

        console.log(matchingLastNames);
        this.members = matchingLastNames;
      } else {
        this.getMembers();
        console.log("Bitte geben Sie einen Suchbegriff ein")
      }
    },
    filterActiveMembers() {
      const activeMembers = this.members.filter(member => member.active === 1);
      this.sumActiveMembers = activeMembers.length;

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

  }
}

</script>

<style lang="scss" scoped>

</style>
