<template>
  <Card>
    <template #header>
      <img :src="offer.img" alt="" />
    </template>
    <template #title>
      {{ offer.title }}
    </template>
    <template #subtitle>
      <div>{{ offer.country }} {{ offer.location }}</div>
      <Rating v-model="intRating" :stars="5" readonly :cancel="false" />
    </template>
    <template #content>
      <p v-if="!isTour">
        {{ offer.description }}
      </p>
      <p v-if="isTour">
        <ul>
          <li>Plecare - <span>{{ offer.departure }}</span></li>
          <li>Intoarcere - <span>{{ offer.arrival }}</span></li>
          <li>Locuri disponibile: <span>{{ offer.available }}</span></li>
        </ul>
      </p>
    </template>
    <template #footer>
      <Button v-if="!isTour" label="Vezi Oferta" @click="showOffer(offer)"/>
      <Button v-if="isTour" label="Vezi Oferta" @click="showTour(offer)"/>
      <div class="offer-price">
        <div class="offer-price-container">
          <div class="price-text">Incepand de la</div>
          <div class="price-value">
            {{ parseFloat(offer.price).toLocaleString("ro-RO") }}
            <span class="currency">&euro;</span>
          </div>
          <div class="price-text">per pers.</div>
        </div>
        <div class="price-specification">{{ offer.duration }} <span v-if="!isTour">nopti</span> <span v-if="isTour">zile</span></div>
      </div>
    </template>
  </Card>
</template>
<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import Rating from "primevue/rating";
import { useAppStore } from "../store/app";
import { ref, onMounted } from "vue";
import router from "../router";

const store = useAppStore();

const props = defineProps({
  offer: {
    type: Object,
    required: true,
    default: () => {
      return {};
    },
  },
});

const isTour = ref(false);
let intRating = ref(0)

function showOffer(offer) {
  store.setOffer(offer);
  store.setOfferType("offer");
  router.push({ name: "offer" });
}

function showTour(tour) {
  store.setTour(tour);
  store.setOfferType("tour");
  router.push({ name: "offer" });
}

function setRating() {
  intRating.value = parseInt(props.offer.rating, 10);
}

onMounted(() => {
  setRating();
  isTour.value = props.offer.arrival !== undefined;
});

</script>
<style lang="scss">
.p-card {
  width: 18vw;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  .p-button {
    background: var(--color-2);
    border: 1px solid var(--color-2);
    color: #fff;
  }
  .p-rating {
    margin-top: 1rem;
  }
}
.p-card-header {
  img {
    width: 100%;
    height: auto;
    object-position: center;
    object-fit: cover;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }
}

.p-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .offer-price {
    font-size: 1.5rem;
    color: var(--color-2);
    .currency {
      font-size: 1rem;
    }
  }
}

.p-card-content {
  height: 130px;
  text-overflow: ellipsis;
  overflow: hidden;
  p{
    margin: 0;
  }
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
    color: var(--color-3);
    span{
      font-weight: bold;
    }
  }
}

.price-text {
  font-size: 0.7rem;
  text-align: right;
  color: var(--gray-600);
  font-style: italic;
}


.price-specification {
  font-size: 0.8rem;
  text-align: right;
  color: var(--color-3);
}

.price-value{
  text-align: right;
}

.offer-price-container{
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 1366px) {
  .p-card {
    width: 23vw;
  }
}
</style>