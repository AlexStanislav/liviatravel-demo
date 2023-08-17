<template>
  <div>
    <DataTable
      v-model:filters="customFilters"
      :value="customOffers"
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
              v-model="customFilters['global'].value"
              placeholder="Cautare globala"
            />
          </span>
          <Button
            icon="pi pi-refresh"
            class="p-button-warning"
            @click="getCustomOffers()"
          />
        </div>
      </template>
      <Column field="first_name" sortable header="Prenume"></Column>
      <Column field="last_name" sortable header="Nume"></Column>
      <Column field="email" sortable header="Email"></Column>
      <Column field="phone" sortable header="Telefon"></Column>
      <Column field="adults" sortable header="Adulti"></Column>
      <Column field="children" sortable header="Copii"></Column>
      <Column field="destination" sortable header="Destinatie"></Column>
      <Column field="max_budget" sortable header="Buget maxim"></Column>
      <Column field="coin_type" sortable header="Moneda"></Column>
      <Column>
        <template #body="slotProps">
          <div class="table-actions">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="deleteCustomOffer(slotProps.data)"
            />
            <Button
              icon="pi pi-ellipsis-h"
              class="p-button-rounded"
              @click="viewOfferInfo(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Dialog
      modal
      v-model:visible="offerInfoVisible"
      header="Info solicitare"
      maximizable
    >
    <ul class="offer-info">
      <li><div class="list-key">Nume</div>{{ dialogOffer.first_name }}</li>
      <li><div class="list-key">Prenume</div>{{ dialogOffer.last_name }}</li>
      <li><div class="list-key">Email</div>{{ dialogOffer.email }}</li>
      <li><div class="list-key">Telefon</div>{{ dialogOffer.phone }}</li>
      <li><div class="list-key">Buget maxim</div>{{ dialogOffer.max_budget }}</li>
      <li><div class="list-key">Moneda</div>{{ dialogOffer.coin_type }}</li>
      <li><div class="list-key">Destinatie</div>{{ dialogOffer.destination }}</li>
      <li><div class="list-key">Adulti</div>{{ dialogOffer.adults }}</li>
      <li><div class="list-key">Copii</div>{{ dialogOffer.children }}</li>
      <li><div class="list-key">Data plecare</div>{{ dialogOffer.departure_date }}</li>
      <li><div class="list-key">Data returnare</div>{{ dialogOffer.return_date }}</li>
      <li><div class="list-key">Nopti</div>{{ dialogOffer.duration }}</li>
      <li><div class="list-key">Destinatie</div>{{ dialogOffer.destination }}</li>
      <li><div class="list-key">Acomodare</div>{{ dialogOffer.accomodation }}</li>
      <li><div class="list-key">Detalii</div>{{ dialogOffer.details }}</li>
    </ul>
    </Dialog>
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
import Dialog from "primevue/dialog";

const offerInfoVisible = ref(false);
const customOffers = ref([]);
const dialogOffer = ref({})
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : window.location.origin;

onMounted(() => {
  getCustomOffers();
});

const getCustomOffers = () => {
  axios.get(`${url}/customOffers`).then((res) => {
    customOffers.value = res.data;
  });
};

const customFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  first_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  last_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  phone: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  people: { value: null, matchMode: FilterMatchMode.EQUALS },
  adults: { value: null, matchMode: FilterMatchMode.EQUALS },
  children: { value: null, matchMode: FilterMatchMode.EQUALS },
  destination: { value: null, matchMode: FilterMatchMode.EQUALS },
  max_budget: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const deleteCustomOffer = (offer) => {
  axios.delete(`${url}/customOffers/${offer.id}`).then(() => {
    getCustomOffers();
  });
};

const viewOfferInfo = (offer) => {
  offerInfoVisible.value = true;
  dialogOffer.value = offer;
}
</script>
<style lang="scss">
.offer-info{
  list-style: none;
  margin: 0;
  padding: 0;
  li{
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid white;
    div{
      width: 10vw;
      font-weight: bold;
    }
  }
  li:last-child{
    border-bottom: none;
  }
}
</style>