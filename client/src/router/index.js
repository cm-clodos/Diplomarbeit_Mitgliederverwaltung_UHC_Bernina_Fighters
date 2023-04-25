import {createRouter, createWebHistory} from 'vue-router'
import MemberView from "@/views/MemberView.vue";
import MemberNewView from "@/views/MemberNewView.vue";
import MemberEditView from "@/views/MemberEditView.vue";
import MemberInfoView from "@/views/MemberInfoView.vue";
import MemberStatisticExportView from "@/views/MemberStatisticExportView.vue";
import MemberPaymentView from "@/views/MemberPaymentView.vue";
import TrikotView from "@/views/TrikotView.vue";
import TrikotNewView from "@/views/TrikotNewView.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {name: "Home", path: '/', component: MemberView},
    {name: "Mitgliederverwaltung", path: '/members', component: MemberView},
    {name: "Mitglieder hinzufügen", path: '/members/new', component: MemberNewView},
    {name: "Mitglied bearbeiten", path: '/members/:id', component: MemberEditView},
    {name: "Mitglieds informationen", path: '/members/:id/info', component: MemberInfoView},
    {name: "Mitglieder Statistik und Exporte", path: '/members/export', component: MemberStatisticExportView},
    {name: "Bezahlübersicht", path: '/members/payment', component: MemberPaymentView},
    {name: "Trikotverwaltung", path: '/trikots', component: TrikotView},
    {name: "Trikot hinzufügen", path: '/trikots/new', component: TrikotNewView},


  ]

})

export default router
