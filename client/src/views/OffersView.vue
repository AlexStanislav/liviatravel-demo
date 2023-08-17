<template>
  <section class="offers">
    <section class="offers-sidebar">
      <h2>Filtreaza</h2>
      <section class="category-section">
        <div>
          <RadioButton
            v-model="offerType"
            id="offers-category"
            value="offers"
          />
          <label for="offers-category">Oferte</label>
        </div>
        <div>
          <RadioButton v-model="offerType" id="tours-category" value="tours" />
          <label for="tours-category">Circuite</label>
        </div>
      </section>
      <section class="search-section">
        <AutoComplete
          v-model="searchValue"
          :suggestions="searchSuggestions"
          @complete="offerSearch"
          placeholder="Cauta dupa nume"
          optionLabel="title"
          @clear="clearFilter"
          @item-select="offerItemSelect"
        />
      </section>
      <section class="price-section">
        <h2>Pret</h2>
        <div class="price-section-inputs">
          <InputText v-model.number="priceFilterValue[0]" />
          <InputText v-model.number="priceFilterValue[1]" />
        </div>
        <Slider
          v-model="priceFilterValue"
          range
          :min="priceMin"
          :max="priceMax"
        />
      </section>
      <section class="stars-section">
        <h2>Stele</h2>
        <div
          class="stars-checkbox"
          v-for="(category, index) in OFFERS_UTIL.starsCategory"
          :key="index"
        >
          <RadioButton
            v-model="starsFilterValue"
            :id="`${category.value}-stars`"
            :value="category.value"
          />
          <label :for="`${category.value}-stars`">{{ category.label }}</label>
        </div>
      </section>
      <section class="country-section">
        <h2>Tara</h2>
        <div
          class="country-checkbox"
          v-for="(category, index) in countryCategory"
          :key="index"
        >
          <RadioButton
            v-model="countryFilterValue"
            :id="`${category.value}-country`"
            :value="category.value"
          />
          <label :for="`${category.value}-country`">{{ category.label }}</label>
        </div>
      </section>
      <Button label="Filtreaza" @click="filterOffers()" />
    </section>

    <section class="offers-view-wrapper">
      <Title :text="'Ofertele noastre'" />
      <div class="offers-wrapper">
        <OfferCard
          v-for="offer in filteredOffers"
          :key="offer.title"
          :offer="offer"
        />
        <div class="no-offers" v-if="filteredOffers.length === 0">
          Nu exista oferte pentru filtrele selectate.
        </div>
      </div>
    </section>
  </section>
</template>
<script setup>
import Button from "primevue/button";
import AutoComplete from "primevue/autocomplete";
import Slider from "primevue/slider";
import { onMounted, ref, watch } from "vue";
import { useAppStore } from "../store/app";
import OfferCard from "../components/OfferCard.vue";
import RadioButton from "primevue/radiobutton";
import Title from "../components/Title.vue";
import InputText from "primevue/inputtext";

const store = useAppStore();

const offerType = ref("offers");
const searchValue = ref("");
const searchSuggestions = ref([]);
const filteredOffers = ref([]);
const starsFilterValue = ref();
const countryFilterValue = ref();
const countryCategory = ref([{ label: "Toate", value: "0" }]);

const priceMin = ref(0);
const priceMax = ref(100);

const priceFilterValue = ref([priceMin.value, priceMax.value]);

onMounted(() => {
  setTimeout(() => {
    switch (offerType.value) {
      case "offers":
        filteredOffers.value = store.offers;
        break;
      case "tours":
        filteredOffers.value = store.tours;
        break;
      default:
        break;
    }
    OFFERS_UTIL.loadCategories()
  }, 300);
});

const OFFERS_UTIL = {
  priceRange: function () {
    let tempArray = [];
    for (const offer of store[offerType.value]) {
      tempArray.push(offer.price);
    }

    return {
      min: Math.min(...tempArray),
      max: Math.max(...tempArray),
    };
  },
  offerCategory: [
    { label: "Oferte", value: "offers" },
    { label: "Circuite", value: "tours" },
  ],
  starsCategory: [
    { label: "Toate", value: "0" },
    { label: "1 Stele", value: "1" },
    { label: "2 Stele", value: "2" },
    { label: "3 Stele", value: "3" },
    { label: "4 Stele", value: "4" },
    { label: "5 Stele", value: "5" },
  ],
  loadCountryCategories: function () {
    let tempArray = [];
    for (const offer of store[offerType.value]) {
      tempArray.push(offer.country);
    }
    let uniqueArray = [...new Set(tempArray)];
    let finalArray = [{ label: "Toate", value: "0" }];
    for (const country of uniqueArray) {
      finalArray.push({ label: country, value: country });
    }
    return finalArray;
  },
  findFiltereOffer: (...arrays) => {
    const nonEmptyArrays = arrays.filter((array) => array.length > 0);

    if (nonEmptyArrays.length === 0) {
      // If all arrays are empty or no non-empty arrays, return an empty array
      return [];
    }

    return nonEmptyArrays.reduce((commonOfffer, currentArray) => {
      return commonOfffer.filter((offer) => {
        return currentArray.includes(offer);
      });
    });
  },
  loadCategories: () => {
    countryCategory.value = OFFERS_UTIL.loadCountryCategories();
    priceMin.value = OFFERS_UTIL.priceRange().min;
    priceMax.value = OFFERS_UTIL.priceRange().max;
    priceFilterValue.value = [priceMin.value, priceMax.value];
  }
};


function filterOffers() {
  let filterArray = [
    priceFilterValue.value,
    starsFilterValue.value,
    countryFilterValue.value,
  ];
  let filteredOffersPrice = store[offerType.value].filter((offer) => {
    return offer.price >= filterArray[0][0] && offer.price <= filterArray[0][1];
  });
  let filteredOffersStars = store[offerType.value].filter((offer) => {
    if (filterArray[1] !== undefined) {
      return offer.rating === filterArray[1];
    }
  });
  let filteredOffersCountry = store[offerType.value].filter((offer) => {
    if (filterArray[2] !== undefined) {
      return offer.country === filterArray[2];
    }
  });

  let finalArray = OFFERS_UTIL.findFiltereOffer(
    filteredOffersPrice,
    filteredOffersStars,
    filteredOffersCountry
  );

  filteredOffers.value = finalArray;
}

const offerSearch = (event) => {
  let filtered = store[offerType.value].filter((offer) => {
    return offer.title.toLowerCase().includes(event.query.toLowerCase());
  });
  searchSuggestions.value = filtered;
  filteredOffers.value = filtered;
};

const clearFilter = () => {
  searchValue.value = "";
  filteredOffers.value = store[offerType.value];
};

const offerItemSelect = (event) => {
  filteredOffers.value = [];
  filteredOffers.value.push(event.value);
};

watch(offerType, () => {
  if (offerType.value === "offers") {
    filteredOffers.value = store.offers;
  } else if (offerType.value === "tours") {
    filteredOffers.value = store.tours;
  }
  OFFERS_UTIL.loadCategories();
});
</script>
<style lang="scss">
.offers {
  width: 80%;
  margin: auto;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  gap: 1rem;
  padding: 2rem 0;
}
.offers-sidebar {
  width: 15%;
  height: fit-content;
  box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.5);
  border-radius: var(--border-radius);
  padding: 0 1rem 1rem 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-sizing: content-box;
  gap: 1rem;
  h2 {
    color: var(--color-3);
    text-align: center;
  }
  .p-radiobutton .p-radiobutton-box:hover {
    border-color: var(--color-4);
  }

  .p-radiobutton .p-radiobutton-box.p-highlight,
  .p-radiobutton .p-radiobutton-box.p-highlight:hover {
    background: var(--color-3);
    border-color: var(--color-3);
  }
}
.category-section,
.price-section,
.stars-section,
.country-section {
  width: 100%;
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  padding: 1rem;
  h2 {
    margin-top: 0rem;
  }
}

.category-section {
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  div {
    display: flex;
    gap: 0.5rem;
  }
}

.price-section-inputs {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  justify-content: space-between;
  margin-bottom: 1rem;
  input {
    width: 45%;
  }
}

.price-section {
  .p-slider-range {
    background: var(--color-4);
  }
  .p-slider-handle {
    border: 2px solid var(--color-4);
  }
  .p-slider-handle:focus,
  .p-slider-handle:hover {
    background: var(--color-3);
  }
}

.stars-checkbox,
.country-checkbox {
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.offers-view-wrapper {
  width: 85%;
  .offers-title {
    margin-top: 0;
    margin-bottom: 2rem;
  }
}

.offers-wrapper {
  height: fit-content;
  display: flex;
  flex-flow: row wrap;
  gap: 2rem;
  padding: 1rem;
}

.no-offers {
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--color-2);
}

@media screen and (max-width: 1366px) {
  .offers-wrapper {
    justify-content: center;
  }
  .offers-sidebar {
    width: 20%;
  }
}
</style>