<template>
  <div class="app-container">
    <header>
      <nav class="main-navigation">
        <div class="logo-container">
          <img class="logo" :src="logoURL" alt="logo" />
          <div class="logo-text">Livia Travel</div>
        </div>
        <router-link to="/">Acasa</router-link> | 
        <router-link to="/oferte">Sejururi/Circuite</router-link> | 
        <router-link to="/contact">Contact</router-link> | 
        <router-link to="/solicitare">Solicita Oferta</router-link> | 
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <div class="footer-container">
        <div class="footer-logo">
          <Logo :bg="`var(--color-5)`" :plane="`var(--color-2)`" />
          <div>Livia Travel</div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, earum
          aliquid, harum corporis incidunt quaerat nisi officia, placeat dolor
          voluptatum qui eius fuga necessitatibus facere rem quos eum
          consectetur? Quidem.
        </p>
      </div>
      <div class="footer-container">
        <h3>Contact</h3>
        <ul class="footer-contact">
          <li><i class="pi pi-facebook" /> <a href="#">Livia Travel</a></li>
          <li>
            <i class="pi pi-envelope" /> <a href="mailto:">mail@exemplu.com</a>
          </li>
          <li>
            <i class="pi pi-phone" /><a href="tel:+4012345678">+4012345678</a>
          </li>
        </ul>
      </div>
      <div class="footer-container">
        <h3>Adresa</h3>
        <div class="footer-address">
          <i class="pi pi-map-marker" /> Strada Exemplu nr. 123, Campina,
          Prahova
        </div>
        <div class="footer-program">
          <div>Luni-Vineri:</div>
          09:00-18:00
        </div>
        <div class="footer-program">
          <div>Sambata:</div>
          09:00-15:00
        </div>
        <div class="footer-program">
          <div>Duminica:</div>
          Inchis
        </div>
      </div>
    </footer>
    <Dialog v-model:visible="store.rezervationVisible" modal header="Rezerva">
      <p>
        <RezervationForm />
      </p>
    </Dialog>
    <Toast />
    <ScrollTop />
    <div class="loader-container" v-if="store.showLoader">
      <div class="spinner-container">
        <div class="loader-spinner-1"></div>
        <div class="loader-spinner-2"></div>
        <div class="loader-spinner-3"></div>
      </div>
      <div class="loader-logo">
        <Logo :bg="`var(--color-2)`" :plane="`#fff`" />
        <div>Livia Travel</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import ScrollTop from "primevue/scrolltop";
import Dialog from "primevue/dialog";
import { useAppStore } from "./store/app";
import RezervationForm from "./components/RezervationForm.vue";
import Toast from "primevue/toast";
import Logo from "./components/Logo.vue";

const store = useAppStore();

let logoURL = new URL("./assets/img/logo.svg", import.meta.url);
let isScrolled = ref(false);

onMounted(async () => {
  await store.getOffers();
  if (store.showLoader === true) {
    document.querySelector("body").style.overflow = "hidden";
  }
});
</script>
<style lang="scss">
header {
  width: 100%;
  background: var(--color-2);
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  z-index: 5;
}

.logo-container {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 1rem;
  font-style: italic;
  color: var(--color-5);
  text-shadow: 0.5px 0.5px 0.5px var(--color-5);
  position: absolute;
  left: 10%;
}

.main-navigation {
  width: 90%;
  height: 70px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 2rem;
  gap: 1rem;
  color: var(--color-5);
  a {
    text-decoration: none;
    text-transform: uppercase;
    color: var(--color-5);
    cursor: pointer;
    font-weight: 600;
  }
}

main {
  margin-top: 70px;
}
.logo {
  width: 50px;
}

.p-dialog {
  p {
    margin: 2rem 0;
  }
  .p-button {
    background: var(--color-2);
    border: 1px solid var(--color-2);
  }
}

.p-dialog-header {
  color: var(--color-3) !important;
}

footer {
  display: flex;
  width: 100%;
  background: var(--color-2);
  justify-content: center;
  gap: 3rem;
  padding: 1rem;
}

.footer-container {
  width: 20%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  h3 {
    width: 100%;
    text-align: center;
    color: #fff;
  }
  ul {
    list-style: none;
    i {
      font-size: 1.5rem;
      color: #fff;
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
  }
  a {
    text-decoration: none;
    color: #fff;
  }
  p {
    width: 80%;
    color: #fff;
    font-size: 0.8rem;
  }
  div {
    color: #fff;
  }

  .footer-address {
    margin-bottom: 0.5rem;
    font-style: italic;
  }

  .footer-program {
    display: flex;
    div {
      width: 100px;
    }
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 1rem;
  svg {
    width: 50px;
  }
  div {
    font-size: 1.5rem;
    color: #fff;
    font-style: italic;
    text-shadow: 0.5px 0.5px 0.5px var(--color-4);
  }
}

.footer-contact {
  li {
    text-align: center;
  }
  a {
    text-align: left;
    display: inline-block;
    width: 150px;
  }
}

.footer-nav {
  li {
    padding: 0.2rem 0;
    font-size: 1.2rem;
    text-align: right;
  }
}

.loader-container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  gap: 3rem;
}

.spinner-container {
  width: 200px;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-spinner-1 {
  width: 200px;
  height: 200px;
  border: 10px solid #fff;
  border-radius: 50%;
  border-top: 10px solid var(--color-2);
  border-bottom: 10px solid var(--color-2);
  animation: spin 2s linear infinite;
  position: absolute;
}

.loader-spinner-2 {
  width: 150px;
  height: 150px;
  border: 10px solid #fff;
  border-radius: 50%;
  border-top: 10px solid var(--color-1);
  border-bottom: 10px solid var(--color-1);
  animation: spin 1s linear infinite;
  position: absolute;
}

.loader-spinner-3 {
  width: 100px;
  height: 100px;
  background: var(--color-2);
  border-radius: 100%;
  scale: 0.5;
  animation: grow 1s linear infinite;
}

.loader-logo {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 1rem;
  div {
    font-size: 2.5rem;
    font-style: italic;
    color: var(--color-2);
    font-weight: 600;
    text-shadow: 0.5px 0.5px 0.5px var(--color-4);
  }
  svg {
    width: 100px;
  }
}

@keyframes grow {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 1366px) {
  .footer-container {
    width: 30%;
  }
}
</style>
