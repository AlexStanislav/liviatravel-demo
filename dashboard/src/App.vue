<template>
  <div>
    <div class="app-container" v-if="store.isLoggedIn">
      <header>
        <span>{{ routeName }}</span>
        <Avatar
          label="A"
          class="mr-2"
          size="large"
          shape="circle"
          style="cursor: pointer"
          @click="toggleUserPanel"
        />
        <OverlayPanel ref="userMenu">
          <ul>
            <li @click="dialogVisible = !dialogVisible">
              <div class="menu-icon cog-icon"><i class="pi pi-cog"></i></div>
              <div class="menu-text pass-text">Schimba Parola</div>
            </li>
            <li @click="logout()">
              <div class="menu-icon logout-icon">
                <i class="pi pi-sign-out"></i>
              </div>
              <div class="menu-text exit-text">Deconectare</div>
            </li>
          </ul>
        </OverlayPanel>
      </header>
      <section>
        <nav>
          <router-link to="/dashboard"
            ><i class="pi pi-file-edit"></i><span>Oferte</span></router-link>
          <router-link to="/tours"
            ><i class="pi pi-users"></i><span>Circuite</span></router-link>
        </nav>
        <main>
          <router-view></router-view>
        </main>
      </section>
      <footer></footer>
    </div>
    <div class="login-screen" v-if="!store.isLoggedIn">
      <div class="login-container">
        <h1>Login</h1>
        <span class="p-float-label">
          <InputText type="text" v-model="loginInfo.username" />
          <label>Username</label>
        </span>
        <span class="p-float-label">
          <Password
            inputStyle="width: 100%"
            :feedback="false"
            v-model="loginInfo.password"
          />
          <label>Parola</label>
        </span>
        <Button label="Login" @click="handleLogin()" />
      </div>
    </div>
    <Dialog
      v-model:visible="dialogVisible"
      modal
      header="Confirmare"
      class="p-fluid"
    >
      <p class="pass-change">
        <span class="p-float-label">
          <InputText id="username" v-model="newInfo.username" />
          <label for="username">Username</label>
        </span>
        <span class="p-float-label">
          <InputText id="oldPassword" v-model="newInfo.oldPassword" />
          <label for="oldPassword">Parola Veche</label>
        </span>
        <span class="p-float-label">
          <InputText id="newPasswod" v-model="newInfo.newPassword" />
          <label for="newPasswod">Parola noua</label>
        </span>
      </p>
      <Button class="p-button p-button-info" @click="changePass()"
        >Schimba</Button
      >
    </Dialog>
  </div>
</template>
<script setup>
import Dialog from "primevue/dialog";
import OverlayPanel from "primevue/overlaypanel";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "./store/index";
import axios from "axios";
const store = useAppStore();
const route = useRoute();
const routeName = computed(() => route.name);
const userMenu = ref();
const dialogVisible = ref(false);

const toggleUserPanel = (event) => {
  userMenu.value.toggle(event);
};

const loginInfo = ref({
  username: "",
  password: "",
});

const newInfo = ref({
  username: "",
  oldPassword: "",
  newPassword: "",
});

const handleLogin = () => {
  axios
    .post(`${store.url}/login`, loginInfo.value, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        store.toggleLogin(true);
      }
    });
};

const changePass = () => {
  axios
    .put(`${store.url}/userUpdate`, newInfo.value)
    .then((response) => {
      if (response.status === 200) {
        dialogVisible.value = false;
      } else {
        console.log(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const logout = () => {
  axios
    .post(`${store.url}/logout`)
    .then((response) => {
      if (response.status === 200) {
        store.toggleLogin(false);
      } else {
        console.log(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
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
  .pi {
    font-size: 1.3rem;
  }
  span {
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

.login-screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  width: 20vw;
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 2rem;
  .p-button,
  .p-inputtext,
  .p-inputwrapper,
  .p-float-label {
    width: 100%;
  }
}

.p-overlaypanel-content {
  ul {
    padding: 0;
    list-style: none;
    li {
      margin: 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
  }
}
.menu-icon {
  width: 30px;
}

.cog-icon,
.pass-text {
  fill: var(--blue-200);
  color: var(--blue-200);
}

.logout-icon,
.exit-text {
  fill: var(--red-500);
  color: var(--red-500);
}

.pass-change {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}
.p-button-info {
  display: flex;
  justify-content: center;
}
</style>