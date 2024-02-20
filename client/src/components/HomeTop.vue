<template>
  <div class="home-container">
    <Carousel :value="carouselOffers" :show-navigators="false">
      <template #item="slotProps">
        <div class="carousel-container">
          <img :src="slotProps.data.img" alt="" />
          <div class="img-details">
            <h1>{{ slotProps.data.title }}</h1>
            <h2>{{ slotProps.data.country }} {{ slotProps.data.location }}</h2>
            <p>{{ slotProps.data.description.slice(0, 240) }}...</p>
            <Button
              class="offer-button"
              label="Vezi oferta"
              @click="showOffer(slotProps.data)"
            />
            <div class="gradient-bg"></div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
<script setup>
import Carousel from "primevue/carousel";
import Rating from "primevue/rating";
import Button from "primevue/button";
import { onMounted, ref } from "vue";
import { useAppStore } from "../store/app";
import { useRouter } from "vue-router";
const router = useRouter();
const carouselOffers = ref([]);
const store = useAppStore();

onMounted(async () => {
  carouselOffers.value = store.offers.slice(0, 3);
});

function showOffer(offer) {
  store.setOffer(offer);
  router.push({ name: "offer" });
}
</script>
<style lang="scss">
.home-container {
  position: relative;
  width: 100%;
  height: 100vh;
  .p-carousel-indicators {
    width: fit-content;
    position: absolute;
    bottom: 4.4rem;
    left: 46%;
    background: var(--color-2);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
    background: var(--color-3);
  }
}
.carousel-container {
  width: 100%;
  height: calc(100vh - 70px);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: bottom;
    position: absolute;
    z-index: -2;
    filter: brightness(0.8);
  }
  .img-details {
    width: 100%;
    height: 80%;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 3rem 2rem;
    gap: 1rem;
    h1 {
      color: #fff;
      font-size: 7rem;
      margin: 0;
      text-shadow: 2px 2px 0px var(--color-1);
    }
    h2 {
      color: #fff;
      font-size: 4rem;
      margin: 0;
      text-shadow: 2px 1px 0px var(--color-1);
    }
    .gradient-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      padding-top: 4rem;
      z-index: -2;
      top: 0;
      left: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.7)
      );
      display: none;
    }
    p {
      background: var(--color-2);
      color: #fff;
      width: 50%;
      text-align: justify;
      text-justify: distribute;
      font-size: 1.2rem;
      padding: 2rem;
      border-radius: 5px;
    }
  }
}

.offer-button {
  width: fit-content;
  background: var(--color-2);
  border: 1px solid var(--color-2);
  color: #fff;
}
.offer-button:hover {
  background: var(--color-5) !important;
  border: 1px solid var(--color-5) !important;
  color: var(--color-2) !important;
}
</style>