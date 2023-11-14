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
      <Column field="adults" sortable header="Adulti"></Column>
      <Column field="children" sortable header="Copii"></Column>
      <Column field="price" sortable header="Pret"></Column>
      <Column field="tour_name" sortable header="Nume circuit"></Column>
      <Column>
        <template #body="slotProps">
          <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="deleteRezervation(slotProps.data)"
            />
        </template>
      </Column>
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
  first_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  last_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  people: { value: null, matchMode: FilterMatchMode.EQUALS },
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
  axios.get(`${url}/tourRezervations`).then((res) => {
    rezervations.value = res.data;
  });
};

const deleteRezervation = (rezervation) => {
  axios.delete(`${url}/tourRezervations/${rezervation.id}`).then(() => {
    getRezervations();
  });
}
</script>
<style lang="scss">
</style>
