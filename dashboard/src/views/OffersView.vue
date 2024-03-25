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
            label="Creeaza oferta"
            @click="openCreateOffer()"
          />
          <Button
            icon="pi pi-refresh"
            class="p-button-warning"
            label="Actualizeaza tabelul"
            @click="getOffers()"
          />
          <!-- <FileUpload mode="basic" name="offers" :url="`${url}/textOffers`" accept="text/*"  @upload="uploadOffers" /> -->
        </div>
      </template>
      <Column field="title" sortable header="Titlu"></Column>
      <Column field="price" sortable header="Pret"></Column>
      <Column field="location" sortable header="Locatie"></Column>
      <Column field="country" sortable header="Tara"></Column>
      <Column field="duration" sortable header="Nopti"></Column>
      <Column field="rating" sortable header="Stele"></Column>
      <Column field="details" sortable header="Detalii">
        <template #body="slotProps">
          {{ formatDetails(slotProps.data.details) }}
        </template>
      </Column>
      <Column field="is_special" sortable header="Oferta Speciala">
        <template #body="slotProps">
          <i
            class="pi"
            :class="slotProps.data.is_special ? 'pi-check' : 'pi-times'"
          ></i>
        </template>
      </Column>
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
              @click="deleteOffer($event, slotProps.data)"
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
          <div class="form-column">
            <span class="p-float-label">
              <Dropdown v-model="newOffer.type" :options="['Intern', 'Extern']" />
            </span>
          </div>
          <div class="form-colum">
            <span class="p-label special-offer">
              <label for="isSpecial">Oferta Speciala</label>
              <ToggleButton
                id="isSpecial"
                v-model="newOffer.is_special"
                onLabel="Da"
                offLabel="Nu"
              />
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
          <div
            class="details-container"
            v-for="(detail, index) in detailType"
            :key="index"
          >
            <Checkbox v-model="detailValue" :value="detail.label" />
            <label for="facilitatiCopii">{{ detail.label }}</label>
          </div>
        </div>
      </form>
      <div class="image-upload">
        <section>
          <img :src="imagePreview" alt="" />
          <div class="file-info" v-if="imageFile">
            Filename: {{ imageFile.name}} <br />
            File size: {{ formatBytes(imageFile.size, 2)}}
          </div>
        </section>
        <section>
          <div class="p-button p-button-success file-upload">
            <i class="pi pi-upload"></i>
            <span class="p-button-label">Alege Imagine</span>
            <input type="file" @change="onFileChange" accept="image/*" />
          </div>
        </section>
      </div>
      <template #footer>
        <Button
          type="submit"
          label="Salveaza"
          class="p-button-success"
          @click="saveOffer"
        />
      </template>
    </Dialog>
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>
<script setup>
import ToggleButton from "primevue/togglebutton";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import { ref, onMounted } from "vue";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import axios from "axios";
import { useConfirm } from "primevue/useconfirm";
import ConfirmPopup from "primevue/confirmpopup";
import Dropdown from 'primevue/dropdown';
const confirm = useConfirm();

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
  is_special: false,
  type: "Intern",
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

const detailValue = ref();

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
const imagePreview = ref("");

const onFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    imagePreview.value = reader.result;
    imageFile.value = file;
  };
  reader.readAsDataURL(file);
};
const formatBytes = function (bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

onMounted(() => {
  getOffers();
});

const getOffers = () => {
  axios.get(`${url}/offers`).then((res) => {
    offers.value = res.data.offers;
  });
};

const openCreateOffer = () => {
  isEditingOffer.value = false;
  createOfferVisible.value = true;
  newOffer.value = {
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
    is_special: false,
    type: "Intern",
  }
}

const formatDetails = (details) => {
  const detailsArray = details.split(", ");
  const filteredArray = detailsArray.filter((detail) => detail !== "");
  return filteredArray.join(", ");
};

const editOffer = (offer) => {
  newOffer.value = offer;
  isEditingOffer.value = true;
  createOfferVisible.value = true;
  detailValue.value = newOffer.value.details.split(", ");
  imagePreview.value = offer.img;
  newOffer.value.type = offer.type;
};

const deleteOffer = (event, offer) => {
  confirm.require({
    target: event.currentTarget,
    message: "Esti sigur ca vrei sa stergi oferta?",
    header: "Confirm",
    acceptClass: "p-button-danger",
    acceptLabel: "Da",
    rejectLabel: "Nu",
    icon: "pi pi-info-circle",
    accept: () => {
      axios.delete(`${url}/offers/${offer.id}`).then(() => {
        getOffers();
      });
    },
  });
};

const formatOffer = (offer) => {
  let finalDetails = "";

  for (const iterator of detailValue.value) {
    finalDetails += iterator + ", ";
  }

  for (const key in newOffer.value) {
    const value = newOffer.value[key];
    if(value === "") {
      newOffer.value[key] = null
    }
  }

  return {
    title: offer.title,
    description: offer.description,
    price: offer.price,
    location: offer.location,
    country: offer.country,
    rating: offer.rating,
    duration: offer.duration,
    details: finalDetails,
    img: offer.img,
    is_special: offer.is_special,
    type: offer.type,
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
    }).then(() => {
      let formData = new FormData();
      formData.append("offerImage", imageFile.value);
      axios
        .post(`${url}/imageOffers`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }).then((res) => {
          if (res.status === 200) {
            console.log("Success");
          }
        }).catch((err) => {
          console.log(err);
        })
    })
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
  width: 100vw;
  max-height: 100%;
  height: 100vw;
  .p-dialog-content {
    height: 100%;
    display: flex;
    gap: 2rem;
    padding-top: 2rem;
  }
  form {
    display: flex;
    flex-flow: column;
    gap: 1.5rem;
    width: 50%;
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
      height: 20rem;
      resize: none;
    }
    #details {
      height: 5rem;
    }
  }
}

.image-upload {
  section {
    display: flex;
    margin-bottom: 1rem;
    gap: 1rem;
  }
  img {
    width: 400px;
    height: 400px;
    object-fit: cover;
    object-position: center center;
  }
}

.file-upload {
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}

.special-offer {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.form-column-details {
  position: relative;
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