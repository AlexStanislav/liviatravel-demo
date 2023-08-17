<template>
  <div class="app-container">
    <header>
      <span>{{ routeName }}</span>
      <Avatar label="A" class="mr-2" size="large" shape="circle" />
    </header>
    <section>
      <nav>
        <router-link to="/"><i class="pi pi-file-edit"></i><span>Oferte</span></router-link>
        <router-link to="/rezervations"><i class="pi pi-calendar"></i><span>Oferte Rezervate</span></router-link>
        <router-link to="/tours"><i class="pi pi-users"></i><span>Circuite</span></router-link>
        <router-link to="/tours_rezervations"><i class="pi pi-calendar-times"></i><span>Circuite Rezervate</span></router-link>
        <router-link to="/custom_offers"><i class="pi pi-wrench"></i><span>Solicitari Oferte</span></router-link>
      </nav>
      <main>
        <router-view></router-view>
      </main>
    </section>
    <footer></footer>
  </div>
</template>
<script setup>
import Avatar from "primevue/avatar";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const routeName = computed(() => route.name);

</script>
<style lang="scss" scoped>
header {
  width: 100%;
  height: 50px;
  background: var(--surface-f);
  border-radius: var(--border-radius);
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 2rem;
  span {
    font-size: 1.5rem;
  }
}

section {
  margin-top: 1vw;
  height: calc(100vh - 70px - 1vw);
  display: flex;
  flex-flow: row;
  gap: 1vw;
}

nav {
  width: 10vw;
  height: 100%;
  background: var(--surface-f);
  border-radius: var(--border-radius);
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-top: 1rem;
  gap: 0.8rem;
  a {
    width: 80%;
    text-align: center;
    text-decoration: none;
    color: var(--text-color);
    font-size: 0.7vw;
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    text-transform: uppercase;
  }
  a:hover {
    color: var(--primary-500);
  }
  .pi{
    font-size: 1.3rem;
  }
  span{
    width: 80%;
    text-align: left;
  }
}

main {
  width: 90vw;
  border-radius: var(--border-radius);
}

.p-avatar {
  width: 40px !important;
  height: 40px !important;
  background-color: var(--primary-700) !important;
}
</style>