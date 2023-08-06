<template>
  <div class="home-container">
    <div class="home-filter"></div>
    <img :src="img" class="home-image" />
    <div class="home-card">
      <Logo :bg="`var(--color-3)`" :plane="`#fff`" />
      <h2>Noua ta aventura incepe aici!</h2>
      <div class="call-to-action-container">
        <div class="cta-box">
          <h3>Oferta zilei!</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
            eveniet nihil aperiam, velit illo cupiditate dolorum minima fugiat
            optio!
          </p>
          <Button label="Vizioneaza oferta" @click="goToSection('#special-offer')" />
        </div>
        <div class="cta-box">
          <h3>Oferte populare!</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
            eveniet nihil aperiam, velit illo cupiditate dolorum minima fugiat
            optio!
          </p>
          <Button label="Rasfoieste ofertele" @click="goToSection('#offers')" />
        </div>
      </div>
    </div>
    <div class="home-search-container">
      <div class="home-search-bg">
        <i class="pi pi-map-marker"></i>
        <Dropdown
          v-model="searchParams.location"
          :options="locationOptions()"
          optionLabel="label"
          optionValue="value"
          placeholder="Locatie"
          showClear
        />
        <Calendar
          v-model="searchParams.date"
          dateFormat="dd/mm/yy"
          showIcon
          placeholder="Data plecare"
          showClear
        />
        <span class="p-input-icon-left p-float-label">
          <i class="pi pi-home"></i>
          <InputText v-model="searchParams.rooms" type="number" />
          <label for="rooms">Camere</label>
        </span>
        <span class="p-input-icon-left p-float-label">
          <i class="pi pi-user"></i>
          <InputText v-model="searchParams.adults" type="number" />
          <label for="rooms">Adulti</label>
        </span>
        <span class="p-input-icon-left p-float-label">
          <i class="pi pi-users"></i>
          <InputText v-model="searchParams.children" type="number" />
          <label for="rooms">Copii</label>
        </span>
        <Button class="home-search-button" type="button" @click="searchOffer()"
          >Cauta</Button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import { useAppStore } from "../store/app";
import InputText from "primevue/inputtext";
import router from "../router/index";
import Logo from "./Logo.vue";
const store = useAppStore();
const searchParams = ref({
  location: "",
  date: "",
  rooms: "",
  adults: "",
  children: "",
});

function locationOptions() {
  let tempArray = new Set();
  for (const offer of store.offers) {
    tempArray.add(offer.country);
  }

  let finalArray = [...tempArray].map((country) => {
    return {
      label: country,
      value: country,
    };
  });
  return finalArray;
}

let img = `${
  new URL(
    "../assets/img/frank-mckenna-OD9EOzfSOh0-unsplash.jpg",
    import.meta.url
  ).href
}`;

function searchOffer() {
  store.setSearchParams(searchParams.value);
  router.push({ name: "offers" });
}

function goToSection(location) {
  window.location.href = location;
}

</script>
<style lang="scss">
.home-container {
  position: relative;
}
.home-image {
  width: 99.1vw;
  height: 85vh;
  object-fit: cover;
  object-position: center;
}
.home-filter {
  // background: linear-gradient(
  //   to bottom,
  //   rgba(0, 0, 0, 0.2) 70%,
  //   rgba(255, 255, 255, 1) 100%
  // );
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 85vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.home-card {
  width: 100%;
  position: absolute;
  top: 5%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  z-index: 3;
  svg {
    width: 80px;
  }
  h2 {
    font-size: 2.5rem;
    font-weight: 400;
  }
}

.call-to-action-container {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-box {
  width: 40%;
  border: 2px solid var(--color-2);
  border-radius: var(--border-radius);
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  background: var(--color-2);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  .p-button {
    background: var(--color-3);
    border: 1px solid var(--color-3);
  }
  h3 {
    text-align: center;
    font-size: 2rem;
  }
  p {
    text-align: center;
    font-size: 1.2rem;
  }
}

.home-search-container {
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 2rem;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  .p-dropdown-label {
    font-size: 1.5rem;
  }
  .p-calendar {
    height: 55px;
  }
  .p-button {
    background: var(--color-3);
    border: 1px solid var(--color-3);
  }
  .p-inputtext {
    width: 200px;
  }
  .p-inputtext[type="number"] {
    width: 120px;
    height: 55px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}

.home-search-button {
  height: 55px;
  font-size: 1.3rem;
}

.home-search-bg {
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.5);
  .pi-map-marker {
    font-size: 2rem;
    color: var(--color-3);
  }
}

@media screen and (max-width: 1366px) {

  .home-image{
    width: 100%;
    height: 90vh;
  }

  .home-filter {
    height: 90vh;
  }

  .home-card {
    h2 {
      font-size: 1.5rem;
    }
    svg {
      width: 60px;
    }
  }

  .call-to-action-container {
    width: 100%;
  }

  .cta-box {
    padding: 1rem;
    width: 25%;
    h3 {
      margin-bottom: 0.8rem;
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }

  .home-search-container {
    width: 100%;
    height: 110px;
    left: 0;
    bottom: 1.5rem;
    .p-inputtext {
      width: 100px;
    }
    .p-dropdown-label {
      font-size: 1rem;
    }
    .p-inputtext[type="number"] {
      width: 100px;
      height: 52px;
    }
    .p-calendar {
      height: 48px;
    }
  }
  .home-search-bg {
    width: 75%;
    .pi-map-marker {
      font-size: 1.5rem;
    }
  }
  .home-search-button {
    height: 49px;
  }


}

@media screen and (max-width: 1024px) {
  .home-image {
    width: 100%;
  }

  .home-card {
    h2 {
      font-size: 1.5rem;
    }
    svg {
      width: 60px;
    }
  }

  .call-to-action-container {
    width: 100%;
  }

  .cta-box {
    padding: 1rem;
    width: 40%;
    h3 {
      margin-bottom: 0.8rem;
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }

  .home-search-container {
    width: 100%;
    height: 110px;
    left: 0;
    bottom: 1rem;
    .p-inputtext {
      width: 100px;
    }
    .p-dropdown-label {
      font-size: 1rem;
    }
    .p-inputtext[type="number"] {
      width: 100px;
      height: 52px;
    }
    .p-calendar {
      height: 48px;
    }
  }
  .home-search-bg {
    width: 95%;
    .pi-map-marker {
      font-size: 1.5rem;
    }
  }
  .home-search-button {
    height: 49px;
  }
}
</style>