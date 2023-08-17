<template>
  <div>
    <DataTable
      v-model:filters="tourFilters"
      :value="tours"
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
              v-model="tourFilters['global'].value"
              placeholder="Cautare globala"
            />
          </span>
          <Button
            icon="pi pi-plus"
            class="p-button-success"
            label="Adauga circuit nou"
            @click="createTourVisible = true"
          />
          <Button
            icon="pi pi-refresh"
            class="p-button-warning"
            label="Actualizare"
            @click="getTours()"
          />
        </div>
      </template>
      <Column field="title" header="Titlu"></Column>
      <Column field="price" header="Pret"></Column>
      <Column field="country" header="Tara"></Column>
      <Column field="duration" header="Durata"></Column>
      <Column field="available" header="Disponibilitate"></Column>
      <Column field="rating" header="Stele"></Column>
      <Column field="departure" header="Plecare"></Column>
      <Column field="arrival" header="Sosire"></Column>
      <Column>
        <template #body="slotProps">
          <div class="table-actions">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success"
              @click="editTour(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              @click="deleteTour(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <Dialog
      class="tour-dialog"
      modal
      v-model:visible="createTourVisible"
      header="Creeaza circuit"
      maximizable
    >
      <form>
        <div class="form-row">
          <div class="form-column">
            <span class="p-float-label">
              <InputText id="title" v-model="newTour.title" />
              <label for="title">Titlu</label>
            </span>
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-euro"></i>
              <InputText id="price" v-model="newTour.price" type="number" />
              <label for="price">Pret</label>
            </span>
          </div>
          <div class="form-column">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-map-marker"></i>
              <InputText id="location" v-model="newTour.location" />
              <label for="location">Locatie</label>
            </span>
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-map-marker"></i>
              <InputText id="country" v-model="newTour.country" />
              <label for="country">Tara</label>
            </span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-column">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-sun"></i>
              <InputText id="duration" v-model="newTour.duration" />
              <label for="duration">Zile</label>
            </span>
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-users"></i>
              <InputText
                id="adults"
                type="number"
                v-model="newTour.available"
              />
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
                v-model="newTour.rating"
              />
              <label for="rating">Stele</label>
            </span>
          </div>
          <div class="form-column">
            <span class="p-float-label p-input-icon-left">
              <i class="pi pi-angle-double-right"></i>
              <InputText id="departure" v-model="newTour.departure" />
              <label for="departure">Plecare</label>
            </span>
          </div>
        </div>
        <div class="form-row">
            <div class="form-column">
              <span class="p-float-label p-input-icon-left">
                <i class="pi pi-angle-double-left"></i>
                <InputText id="arrival" v-model="newTour.arrival" />
                <label for="arrival">Sosire</label>
              </span>
            </div>
        </div>
        <div class="form-column">
          <span class="p-float-label" style="width: 100%">
            <Textarea id="description" v-model="newTour.description" />
            <label for="description">Descriere</label>
          </span>
        </div>
        <div class="form-column form-image">
          <label for="img">Imagine</label>
          <input id="img" type="file" accept="image/*" @input="createIMGURL" />
        </div>
        <div class="image-preview">
            <img :src="imagePreview" />
          </div>
        <Button
          type="submit"
          label="Salveaza"
          class="p-button-success"
          @click="saveTour"
        />
      </form>
    </Dialog>
  </div>
</template>
<script setup>
import axios from "axios";
import DataTable from "primevue/datatable";
import { ref, onMounted } from "vue";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import { FilterMatchMode } from "primevue/api";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

const tours = ref([]);
const newTour = ref({});
const createTourVisible = ref(false);
const isEditingTour = ref(false);


const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : window.location.origin;

const tourFilters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

function getTours() {
  axios.get(`${url}/tours`).then((res) => {
    tours.value = res.data;
  });
}

onMounted(() => {
  getTours();
});


const imageFile = ref(null);
const imagePreview = ref("");

const createIMGURL = (e) => {
  imageFile.value = e.target.files[0];
  let imgURL = `${url}/images/${imageFile.value.name}`;
  newTour.value.img = imgURL;
  imagePreview.value = imgURL;
};


const deleteTour = (offer) => {
  axios.delete(`${url}/tours/${offer.id}`).then(() => {
    getTours();
  });
};

const editTour = (offer) => {
  newTour.value = offer;
  isEditingTour.value = true;
  createTourVisible.value = true;
};

const saveTour = (e) => {
  e.preventDefault();
  
  if (isEditingTour.value === true) {
    axios.put(`${url}/tours/${newTour.value.id}`, newTour.value).then(() => {
      createTourVisible.value = false;
      isEditingTour.value = false;
      getTours();
    });
  } else {
    axios
      .post(`${url}/newTour`, newTour.value)
      .then((res) => {
        createTourVisible.value = false;
        getTours();
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
.tour-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tour-dialog {
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

    .form-row {
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
  .image-preview {
    overflow: hidden;
    object-fit: contain;
    object-position: center;
    width: 400px;
    height: 400px;
    border: 1px solid var(--surface-border);
    border-radius: var(--border-radius);
  }
}

</style>