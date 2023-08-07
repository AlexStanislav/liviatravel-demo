<template>
  <div class="current-offer-wrapper">
    <Title :text="`Oferta`" />
    <div class="current-offer-container">
      <img :src="store.rezervationOffer.img" />
      <div class="current-offer-info">
        <div class="current-offer-detail current-offer-title">
          {{ store.rezervationOffer.title }}
        </div>
        <div class="current-offer-detail current-offer-location">
          {{ store.rezervationOffer.location }}
          {{ store.rezervationOffer.country }}
        </div>
        <Rating v-model="intRating" :stars="5" readonly :cancel="false" />
        <div class="current-offer-detail current-offer-duration">
          Durata sejur: <span>{{ store.rezervationOffer.duration }} nopti</span>
        </div>

        <div class="current-offer-detail current-offer-facilities">
          Facilitati:
        </div>
        <ul>
          <li v-for="(facility, index) in offerFacilities()" :key="index">
            {{ facility }}
          </li>
        </ul>
        <div class="current-offer-detail current-offer-price">
          <div class="current-offer-price-text">Incepand de la</div>
          <div class="current-offer-price-value">
            {{ store.rezervationOffer.price }}
            <span class="current-offer-price-detail">&euro;</span>
          </div>
        </div>
        <!-- <Button class="current-offer-btn" @click="goToRezervaionForm()">Rezerva</Button> -->
      </div>
    </div>
    <div class="current-offer-desc">
      <Title :text="`Descriere`" />
      <p>{{ store.rezervationOffer.description }}</p>
    </div>
    <div class="current-offer-form">
      <Title :text="`Formular rezervare`" />
      <RezervationForm />
    </div>
  </div>
</template>
<script setup>
import Button from "primevue/button";
import Rating from "primevue/rating";
import { onMounted, ref } from "vue";
import Title from "../components/Title.vue";
import { useAppStore } from "../store/app";
import RezervationForm from "../components/RezervationForm.vue";

const store = useAppStore();

const intRating = ref(0);

onMounted(() => {
  if (store.rezervationOffer !== null) {
    intRating.value = parseInt(store.rezervationOffer.rating, 10);
  }
});

const offerFacilities = () => {
  return store.rezervationOffer.details
    .split(",")
    .filter((item) => item !== " ");
};

console.log(offerFacilities());
</script>
<style lang="scss">
.current-offer-wrapper {
  padding: 1rem 0 3rem 0;
  .offers-title {
    margin: 1rem auto 3rem auto;
  }
  .p-button {
    background: var(--color-3);
    border: 1px solid var(--color-3);
  }
}
.current-offer-container {
  width: 80%;
  margin: auto;
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
  img {
    border-radius: var(--border-radius);
  }
}

.current-offer-title {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-3);
}

.current-offer-location {
  font-size: 1.3rem;
  color: var(--gray-600);
  font-style: italic;
}

.current-offer-duration {
  font-size: 1.1rem;
  color: var(--gray-600);
  span {
    color: var(--color-3);
  }
}

.current-offer-info {
  position: relative;
  width: 45%;
  .p-rating {
    margin: 1rem 0;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      font-size: 1.2rem;
      font-style: italic;
      color: var(--color-3);
    }
  }
  .p-button {
    margin: 4rem 0 0 0;
  }
}

.current-offer-facilities {
  font-size: 1.5rem;
  margin: 1rem 0 0.5rem 0;
  color: var(--gray-600);
}

.current-offer-price {
  width: fit-content;
  margin-top: 3rem;
  margin-bottom: 1rem;
  text-align: right;
//   position: absolute;
  //   right: 0;
  left: 0;
  bottom: 0;
}

.current-offer-price-text {
  font-size: 0.9rem;
  color: var(--gray-600);
  font-style: italic;
  font-weight: bold;
  line-height: 5px;
}

.current-offer-price-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-3);
}

.current-offer-price-detail {
  font-size: 1.7rem;
  font-weight: bold;
  color: var(--color-3);
}

.current-offer-desc {
  width: 80%;
  margin: auto;
  margin-top: 5rem;
  margin-bottom: 10rem;
  p {
    font-size: 1.2rem;
  }
}

.current-offer-form {
  .offers-title {
    width: 40vw;
  }
  width: fit-content;
  margin: auto;
  .rezervation {
    width: fit-content;
    margin: auto;
    .p-button {
      width: 100%;
      position: relative;
    }
  }
}

@media screen and (max-width: 1366px) {
  .current-offer-container {
    justify-content: center;
  }
  .current-offer-info {
    text-align: center;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  .p-rating {
    width: fit-content;
  }
  .current-offer-price {
    width: 100%;
    text-align: center;
  }
}
</style>