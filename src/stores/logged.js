import { defineStore } from 'pinia';

export const useLoggedStore = defineStore("logged", {
  state: () => ({
    isLogged: {
    }
  }),
  getters: {
    getIsLogged(state) {
      return state.isLogged;
    }
  },
  actions: {
    setIsLogged(isLogged) {
      this.isLogged.value = isLogged;
    }
  }
});
