<template>
  <v-card class="pa-4 ma-auto" max-width="500" >
    <v-card-title class="text-center">Login</v-card-title>

    <v-card-text>
      <v-form @submit.prevent="login" v-model="isFormValid" lazy-validation>
        <v-text-field v-model="loginData.email" label="Email" prepend-icon="mdi-email" type="email" required/>

        <v-text-field v-model="loginData.password" label="Senha" prepend-icon="mdi-lock" type="password" required/>

        <!-- Botão de login -->
        <v-btn class="mt-4" color="primary" block @click="login">
          Entrar
        </v-btn>

        <!-- Ou login com Google -->
        <v-divider class="my-4"></v-divider>
        <v-btn color="red darken-1" class="white--text" prepend-icon="mdi-google" block @click="loginWithGoogle">
          Entrar com Google
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter} from 'vue-router';
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const loginData = ref({})
const $route = useRouter();
const isFormValid = ref(false);



const login = async () => {
  const auth = getAuth();
  const email = loginData.value.email;
  const password = loginData.value.password;
  try {
    await setPersistence(auth, browserLocalPersistence);

    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    console.log("Login bem-sucedido com e-mail e senha:", user);
    $route.push('/meus-eventos');

  } catch (error) {
    console.error("Erro no login com e-mail e senha:", error);
  }
};

const loginWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
      })
      .then((result) => {
        const user = result.user;
        console.log("Usuário logado:", user);
        $route.push('/meus-eventos');

      })
      .catch((error) => {
        console.error("Erro no login com Google:", error);
      });
  } catch (error) {
    console.error("Erro no login com Google:", error);
  }
};

</script>

