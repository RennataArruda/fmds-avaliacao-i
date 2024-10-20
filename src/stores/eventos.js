import { defineStore } from 'pinia';

export const useEventosStore = defineStore("eventos", {
  state: () => ({
    eventos: [],
  }),
  getters: {
    getEventos(state) {
      return state.eventos;
    },
    getEventoById: (state) => (id) => {
      return state.eventos.find(e => e.id === id);
    }
  },
  actions: {
    addEvento(evento) {
      this.eventos.push(evento);
    },
    removeEvento(evento) {
      const index = this.eventos.findIndex(e => e.id === evento.id);
      this.eventos.splice(index, 1);
    },
    updateEvento(evento, id) {
      const index = this.eventos.findIndex(e => e.id === id);
      this.eventos[index] = evento;
    }
  }
});
