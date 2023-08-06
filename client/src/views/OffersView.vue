<template>
  <div class="offers">
    <div class="offers-sidebar">
      <h2>Filtreaza</h2>
      <AutoComplete
        v-model="searchValue"
        :suggestions="searchSuggestions"
        @complete="offerSearch"
        placeholder="Cauta Hotel"
        optionLabel="title"
        @clear="clearFilter"
        @item-select="offerItemSelect"
      />
      <Accordion>
        <AccordionTab header="Stele">
          <div
            class="stars-checkbox"
            v-for="(category, index) in starsCategory"
            :key="index"
          >
            <RadioButton
              v-model="starsFilterValue"
              :id="`${category.value}-stars`"
              :value="category.value"
            />
            <label :for="`${category.value}-stars`">{{ category.label }}</label>
          </div>
        </AccordionTab>
        <AccordionTab header="Tara">
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
            <label :for="`${category.value}-country`">{{
              category.label
            }}</label>
          </div>
        </AccordionTab>
      </Accordion>
    </div>

    <div class="offers-view-wrapper">
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
    </div>
  </div>
</template>
<script setup>
import AutoComplete from "primevue/autocomplete";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { onMounted, ref, watch } from "vue";
import { useAppStore } from "../store/app";
import OfferCard from "../components/OfferCard.vue";
import RadioButton from "primevue/radiobutton";
import Title from "../components/Title.vue";

const store = useAppStore();

const searchValue = ref("");
const searchSuggestions = ref([]);
const filteredOffers = ref([]);

const starsFilterValue = ref();
const starsCategory = ref([
  { label: "Toate", value: "0" },
  { label: "1 Stele", value: "1" },
  { label: "2 Stele", value: "2" },
  { label: "3 Stele", value: "3" },
  { label: "4 Stele", value: "4" },
  { label: "5 Stele", value: "5" },
]);

const countryFilterValue = ref();
const countryCategory = ref([{ label: "Toate", value: "0" }]);

onMounted(() => {
  setTimeout(() => {
    filteredOffers.value = store.offers;
    countryCategory.value = loadCountryCategories();
  }, 300);
});

function loadCountryCategories() {
  let tempArray = [];
  for (const offer of store.offers) {
    tempArray.push(offer.country);
  }
  let uniqueArray = [...new Set(tempArray)];
  let finalArray = [{ label: "Toate", value: "0" }];
  for (const country of uniqueArray) {
    finalArray.push({ label: country, value: country });
  }
  return finalArray;
}

const offerSearch = (event) => {
  let filtered = store.offers.filter((offer) => {
    return offer.title.toLowerCase().includes(event.query.toLowerCase());
  });
  searchSuggestions.value = filtered;
  filteredOffers.value = filtered;
};

const clearFilter = () => {
  searchValue.value = "";
  filteredOffers.value = store.offers;
};

const offerItemSelect = (event) => {
  filteredOffers.value = [];
  filteredOffers.value.push(event.value);
};

watch(starsFilterValue, () => {
  let tempArr = [];
  tempArr.push(...starsFilterValue.value);

  tempArr.some((value) => {
    if (parseInt(value, 10) !== 0) {
      filteredOffers.value = store.offers.filter((offer) => {
        if (offer.rating !== null) {
          return offer.rating.toString().includes(value);
        }
      });
    } else {
      filteredOffers.value = store.offers;
    }
  });
});

watch(countryFilterValue, () => {
  let tempArr = [];
  if(countryFilterValue.value === "0"){
    filteredOffers.value = store.offers;
  }else{
    for (const offer of store.offers) {
      if(offer.country === countryFilterValue.value){
        tempArr.push(offer);
      }
    }
    filteredOffers.value = tempArr;
  }
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
  height: 85vh;
  box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.5);
  border-radius: var(--border-radius);
  padding: 0 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-sizing: content-box;
  gap: 1rem;
  h2 {
    color: var(--color-3);
    text-align: center;
  }
}

.p-accordion {
  width: 100%;
}

.stars-checkbox,
.country-checkbox {
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;

  .p-radiobutton .p-radiobutton-box:hover {
    border-color: var(--color-4);
  }

  .p-radiobutton .p-radiobutton-box.p-highlight,
  .p-radiobutton .p-radiobutton-box.p-highlight:hover {
    background: var(--color-3);
    border-color: var(--color-3);
  }
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
</style>