<template>
  <div>
    <DataTable
      v-model:filters="rezFilters"
      :value="rezervations"
      paginator
      :rows="6"
      filterDisplay="row"
      removableSort
    >
      <template #header>
        <div class="table-header">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="rezFilters['global'].value"
              placeholder="Cautare globala"
            />
          </span>
          <Button
            icon="pi pi-refresh"
            class="p-button-warning"
            @click="getRezervations()"
          />
        </div>
      </template>
      <Column field="first_name" sortable header="Prenume"></Column>
      <Column field="last_name" sortable header="Nume"></Column>
      <Column field="email" sortable header="Email"></Column>
      <Column field="phone" sortable header="Telefon"></Column>
      <Column field="people" sortable header="Persoane"></Column>
      <Column field="offer_duration" sortable header="Durata"></Column>
      <Column field="offer_price" sortable header="Pret Oferta"></Column>
      <Column field="offer_name" sortable header="Nume Oferta"></Column>
    </DataTable>
  </div>
</template>
<script setup>

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import { ref, onMounted } from "vue";

const rezFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  first_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH},
  last_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  people: { value: null, matchMode: FilterMatchMode.EQUALS },
  offer_duration: { value: null, matchMode: FilterMatchMode.CONTAINS },
  offer_price: { value: null, matchMode: FilterMatchMode.EQUALS },
  offer_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const rezervations = ref([]);
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : window.location.origin;

onMounted(() => {
  getRezervations();
});

const getRezervations = () => {
  axios.get(`${url}/rezervations`).then((res) => {
    rezervations.value = res.data;
  });
};
</script>
<style lang="scss">
</style>