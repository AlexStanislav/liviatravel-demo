<template>
  <div>
    <DataTable
      v-model:filters="filters"
      paginator
      :rows="6"
      filterDisplay="row"
      :value="offers"
      removableSort
    >
      <template #header>
        <div class="table-header">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Cautare globala"
            />
          </span>
          <Button
            icon="pi pi-plus"
            class="p-button-success"
            @click="createOfferVisible = true"
          />
          <Button
            icon="pi pi-refresh"
            class="p-button-warning"
            @click="getOffers()"
          />
          <!-- <FileUpload mode="basic" name="offers" :url="`${url}/textOffers`" accept="text/*"  @upload="uploadOffers" /> -->
        </div>
      </template>
      <Column field="title" sortable header="Titlu"></Column>
      <Column field="description" sortable header="Descriere"></Column>
      <Column field="price" sortable header="Pret"></Column>
      <Column field="location" sortable header="Locatie"></Column>
      <Column field="country" sortable header="Tara"></Column>
      <Column field="duration" sortable header="Nopti"></Column>
      <Column field="available" sortable header="Locuri"></Column>
      <Column field="rating" sortable header="Stele"></Column>
      <Column field="details" sortable header="Detalii"></Column>
      <Column>
        <template #body="slotProps">
          <div class="table-actions">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success"
              @click="editOffer(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="deleteOffer(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Dialog
      class="offer-dialog"
      modal
      v-model:visible="createOfferVisible"
      header="Creeaza oferta"
      maximizable
    >
      <form>
        <div class="form-row">
          <div class="form-column">
            <span class="p-float-label">
              <InputText id="title" v-model="newOffer.title" />
              <label for="title">Titlu</label>
            </span>
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-euro"></i>
              <InputText id="price" v-model="newOffer.price" type="number" />
              <label for="price">Pret</label>
            </span>
          </div>
          <div class="form-column">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-map-marker"></i>
              <InputText id="location" v-model="newOffer.location" />
              <label for="location">Locatie</label>
            </span>
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-map-marker"></i>
              <InputText id="country" v-model="newOffer.country" />
              <label for="country">Tara</label>
            </span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-column">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-moon"></i>
              <InputText id="duration" v-model="newOffer.duration" />
              <label for="duration">Nopti</label>
            </span>
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-users"></i>
              <InputText id="adults" type="number" v-model="newOffer.available" />
              <label for="adults">Locuri</label>
            </span>
          </div>
          <div class="form-column">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-star"></i>
              <InputText
                id="rating"
                type="number"
                :min="1"
                :max="5"
                v-model="newOffer.rating"
              />
              <label for="rating">Stele</label>
            </span>
          </div>
        </div>
        <div class="form-column">
          <span class="p-float-label" style="width: 100%">
            <Textarea id="description" v-model="newOffer.description" />
            <label for="description">Descriere</label>
          </span>
        </div>
        <div class="form-column-details">
          <h5>Facilitati</h5>
          <div class="details-container" v-for="(detail, index) in detailType" :key="index">
            <Checkbox v-model="detailValue" :value="detail.label" />
            <label for="facilitatiCopii">{{ detail.label }}</label>
          </div>
        </div>
        <div class="form-column">
          <label for="img">Imagine</label>
          <input id="img" type="file" accept="image/*" @input="createIMGURL" />
        </div>
        <Button
          type="submit"
          label="Salveaza"
          class="p-button-success"
          @click="saveOffer"
        />
      </form>
    </Dialog>
  </div>
</template>
<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { ref, onMounted } from "vue";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import Checkbox from "primevue/checkbox";
import axios from "axios";

const createOfferVisible = ref(false);
const isEditingOffer = ref(false);
const newOffer = ref({
  title: "",
  description: "",
  price: 0,
  location: "",
  country: "",
  details: "",
  img: "",
  duration: 1,
  available: 1,
  rating: 1,
});

const detailType = [
  { label: "Facilitati Copii" },
  { label: "Activitati Sportive" },
  { label: "Piscina" },
  { label: "Parcare" },
  { label: "Plaja" },
  { label: "Spa" },
  { label: "Divertisment" },
  { label: "Park Acvatic" },
];

const detailValue = ref()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  price: { value: null, matchMode: FilterMatchMode.CONTAINS },
  location: { value: null, matchMode: FilterMatchMode.CONTAINS },
  country: { value: null, matchMode: FilterMatchMode.CONTAINS },
  rooms: { value: null, matchMode: FilterMatchMode.CONTAINS },
  adults: { value: null, matchMode: FilterMatchMode.CONTAINS },
  children: { value: null, matchMode: FilterMatchMode.CONTAINS },
  date: { value: null, matchMode: FilterMatchMode.CONTAINS },
  details: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const offers = ref([]);
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : window.location.origin;
const imageFile = ref(null);

const createIMGURL = (e) => {
  imageFile.value = e.target.files[0];
  newOffer.value.img = `${url}/images/${imageFile.value.name}`;
};

onMounted(() => {
  getOffers();
});

const getOffers = () => {
  axios.get(`${url}/offers`).then((res) => {
    offers.value = res.data.offers;
  });
};

const editOffer = (offer) => {
  newOffer.value = offer;
  isEditingOffer.value = true;
  createOfferVisible.value = true;
};

const deleteOffer = (offer) => {
  axios.delete(`${url}/offers/${offer.id}`).then(() => {
    getOffers();
  });
};

const formatOffer = (offer) => {
  let date = new Date(offer.date);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  const offerDate = `${day}/${month}/${year}`;
  let finalDetails = ""

  for (const iterator of detailValue.value) {
    finalDetails += iterator + ", "
  }

  return {
    title: offer.title,
    description: offer.description,
    price: offer.price,
    location: offer.location,
    country: offer.country,
    rooms: offer.rooms,
    adults: offer.adults,
    children: offer.children,
    date: offerDate,
    details: finalDetails,
    img: offer.img,
  };
};

const saveOffer = (e) => {
  e.preventDefault();
  const offer = formatOffer(newOffer.value);

  if (isEditingOffer.value) {
    axios.put(`${url}/offers/${newOffer.value.id}`, newOffer.value).then(() => {
      createOfferVisible.value = false;
      isEditingOffer.value = false;
      getOffers();
    });
  } else {
    offer.img = `${url}/images/${imageFile.value.name}`;
    axios
      .post(`${url}/newOffer`, offer)
      .then((res) => {
        createOfferVisible.value = false;
        getOffers();
      })
      .catch((err) => {
        console.log(err);
      });

    let formData = new FormData();
    formData.append("offerImage", imageFile.value);
    axios
      .post(`${url}/imageOffers`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>
<style lang="scss">
.offer-dialog {
  .p-dialog-content {
    padding: 2rem;
  }
  form {
    display: flex;
    flex-flow: column;
    gap: 1.5rem;

    .p-inputtext {
      width: 10vw;
    }

    .form-row{
      display: flex;
      gap: 1rem;
    }

    .form-column {
      display: flex;
      gap: 1rem;
      i {
        top: 1.2em;
      }
    }
    .p-inputtextarea {
      width: 100%;
      min-height: 10rem;
      resize: none;
    }
    #details {
      min-height: 5rem;
    }
  }
}

.table-actions {
  width: fit-content;
  display: flex;
  gap: 0.5rem;
}

.table-header {
  display: flex;
  gap: 0.5rem;
}
</style>