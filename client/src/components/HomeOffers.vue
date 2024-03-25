<template>
  <div class="home-offers">
    <Title :text="`Oferta Zilei`" />
    <div id="special-offer" class="special-offer-container">
      <div
        class="special-offer"
        :style="{ backgroundImage: `url(${specialOffer.img})` }"
      >
        <h4 class="ribbon">Oferta Zilei!</h4>
        <div class="special-offer-info">
          <div class="bg"></div>
          <div class="special-offer-details">
            <h1>{{ specialOffer.title }}</h1>
            <h2>{{ specialOffer.country }}</h2>
            <h5>{{ specialOffer.location }}</h5>
            <Rating
              v-model="specialOffer.rating"
              :stars="5"
              readonly
              :cancel="false"
            />
            <p>{{ specialOffer.description }}</p>
          </div>
          <div class="offer-details">
            <Button
              label="Rezervă"
              @click="showRezervationDialog(specialOffer)"
            />
            <div class="special-offer-price">
              <div>
                {{ parseFloat(specialOffer.price).toLocaleString("ro-RO") }}
                <span class="currency">&euro;</span>
              </div>
              <div class="price-specification">
                {{ specialOffer.duration }} nopti
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Title :text="`Ultimele oferte adaugate`" />
    <div id="offers" class="offers-container">
      <OfferCard v-for="offer in offers" :key="offer.id" :offer="offer" />
    </div>
    <div id="tours" class="tours-container">
      <TourCard v-for="tour in tours" :key="tour.id" :tour="tour" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAppStore } from "../store/app";
import Button from "primevue/button";
import OfferCard from "./OfferCard.vue";
import Title from "./Title.vue";
import Rating from "primevue/rating";
import TourCard from "./TourCard.vue";

const store = useAppStore();
const specialOffer = ref({});
const offers = ref(store.offers);
const tours = ref(store.tours);

onMounted(() => {
  setTimeout(() => {
    if (store.offers.length > 0) {
      for (const offer of store.offers) {
        if (offer.is_special) {
          specialOffer.value = offer;
        }
      }
    }
    offers.value = latestOffers();
    tours.value = latestTours();
  }, 300);
});

const latestOffers = () => {
  return store.offers
    .reduce((acc, curr) => {
      if (
        !acc.length ||
        new Date(curr.date_created) > new Date(acc[0].date_created)
      ) {
        return [curr];
      } else if (
        new Date(curr.date_created).getTime() ===
        new Date(acc[0].date_created).getTime()
      ) {
        acc.push(curr);
        return acc;
      } else {
        return acc;
      }
    }, [])
    .slice(0, 6);
};

const latestTours = () => {
  return store.tours
    .reduce((acc, curr) => {
      if (
        !acc.length ||
        new Date(curr.date_created) > new Date(acc[0].date_created)
      ) {
        return [curr];
      } else if (
        new Date(curr.date_created).getTime() ===
        new Date(acc[0].date_created).getTime()
      ) {
        acc.push(curr);
        return acc;
      } else {
        return acc;
      }
    }, [])
    .slice(0, 3);
};

function showRezervationDialog(offer) {
  store.setRezervationVisible(true);
  store.setOffer(offer);
}
</script>
<style lang="scss">
.home-offers {
  margin-top: 3rem;
  .offers-title:first-of-type {
    margin: 0 auto 3rem auto;
  }
}

.special-offer-container {
  width: 90%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
}

.special-offer {
  width: 55vw;
  height: 65vh;
  border-radius: var(--border-radius);
  background-size: cover;
  position: relative;
  overflow: hidden;
  box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.5);
  img {
    width: 50%;
    border-radius: var(--border-radius);
  }
}

.special-offer-info {
  width: 100%;
  position: absolute;
  display: flex;
  flex-flow: column;
  bottom: 0;
  padding: 1rem 2rem;
  color: #fff;

  .p-rating {
    margin-top: 1rem;
  }

  h1,
  h2,
  h5 {
    margin: 0;
    text-align: left;
    color: #fff;
  }
  h1 {
    text-shadow: 2px 2px 2px #000;
  }
  .p-button {
    background: var(--color-2);
    border: 1px solid var(--color-2);
    color: #fff;
  }
  .p-button:hover {
    background: var(--color-5) !important;
    border: 1px solid var(--color-5) !important;
    color: var(--color-2) !important;
  }
  .special-offer-details {
    display: flex;
    flex-flow: column;
    position: relative;
    z-index: 2;
    p {
      height: 100px;
      overflow: hidden;
      text-emphasis: ellipsis;
    }
  }
  .offer-details {
    display: flex;
    justify-content: space-between;
  }
}

.special-offer-price {
  font-size: 2rem;
  position: relative;
  z-index: 2;
  .currency {
    font-size: 1.5rem;
  }
}

.price-specification {
  font-size: 0.8rem;
  text-align: right;
  color: var(--color-3);
}

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.8) 70%
  );
}

.offers-container {
  width: 90%;
  margin: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 0;
}

.tours-container {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

@media screen and (max-width: 1366px) {
  .offers-container {
    width: 100%;
    justify-content: center;
  }
}
</style>