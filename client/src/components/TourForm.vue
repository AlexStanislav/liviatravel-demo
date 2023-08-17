<template>
  <form class="tour-form">
    <div class="form-row tour-form-row">
      <span class="p-float-label">
        <InputText
          id="last_name"
          type="text"
          v-model="store.tourRezervation.lastName"
        />
        <label for="last_name">Nume</label>
      </span>
      <span class="p-float-label">
        <InputText
          id="first_name"
          type="text"
          v-model="store.tourRezervation.firstName"
        />
        <label for="first_name">Prenume</label>
      </span>
    </div>
    <div class="form-row tour-form-row">
      <span class="p-float-label">
        <InputText
          id="email"
          type="text"
          v-model="store.tourRezervation.email"
        />
        <label for="email">Email</label>
      </span>
      <span class="p-float-label">
        <InputText
          id="phone"
          type="text"
          v-model="store.tourRezervation.phone"
        />
        <label for="phone">Telefon</label>
      </span>
    </div>
    <div class="form-row tour-form-row">
      <span class="p-float-label">
        <InputText
          id="adults"
          type="number"
          v-model="store.tourRezervation.adults"
        />
        <label for="adults">Adulti</label>
      </span>
      <span class="p-float-label">
        <InputText
          id="children"
          type="number"
          v-model="store.tourRezervation.children"
        />
        <label for="children">Copii</label>
      </span>
    </div>
    <span class="tour-form-info">
      <ul>
        <li>
          Circuit: <span>{{ store.rezervationTour.title }}</span>
        </li>
        <li>
          Persoane:
          <span>{{
            parseInt(store.tourRezervation.adults, 10) +
            parseInt(store.tourRezervation.children, 10)
          }}</span>
        </li>
        <li>
          Pret:
          <span
            >{{
              parseInt(store.rezervationTour.price, 10) *
                parseInt(store.tourRezervation.adults, 10) +
              parseInt(store.tourRezervation.children, 10)
            }}
            &euro;</span
          >
        </li>
      </ul>
    </span>
    <Button label="Rezervare" @click="rezerveTour" />
  </form>
</template>
<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import axios from "axios";
import { useAppStore } from "../store/app";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
const router = useRouter();
const toast = useToast();
const store = useAppStore();

function rezerveTour(e) {
  e.preventDefault();

  const rezervationData = {
    firstName: store.tourRezervation.firstName,
    lastName: store.tourRezervation.lastName,
    email: store.tourRezervation.email,
    phone: store.tourRezervation.phone,
    adults: store.tourRezervation.adults,
    children: store.tourRezervation.children,
    tourName: store.rezervationTour.title,
  };

  try {
    axios
      .post(`${store.url}/newRezervationTour`, rezervationData)
      .then((res) => {
        if (res.status === 200) {
          store.setTour(res.data.tour);
          toast.add({
            severity: "success",
            summary: "Succes",
            detail: "Rezervare realizata cu succes!",
            life: 3000,
          });

          router.push({ name: "offers" });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      });
  } catch (error) {
    console.log(error);
  }
}
</script>
<style lang="scss">
.tour-form {
  .p-button {
    width: 100%;
  }
}

.tour-form-row {
  span {
    width: 50%;
  }
  input {
    width: 100%;
  }
}

.tour-form-info {
  ul {
    list-style: none;
    font-size: 1.5rem;
    margin: 2rem 0;
    padding: 0;
    color: var(--color-3);
    span {
      font-weight: bold;
      color: var(--color-2);
    }
  }
}
</style>