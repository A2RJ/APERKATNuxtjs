<template>
  <div class="row mb-4">
    HAHAHAHAHAHHAHAHHAHAHA
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  async asyncData({ store, params }) {
    await Promise.all([store.dispatch("subordinate/getGrafik", store.$auth.$state.user[0].id_user)]);
    return;
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState("subordinate", {
      grafik: (state) => state.grafik,
    }),
  },
  mounted() {
  },
  methods: {
    ...mapActions("subordinate", ["getGrafik"]),
  },
};
</script>

<style>
</style>