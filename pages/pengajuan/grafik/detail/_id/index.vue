<template>
  <div>
    <components />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import grafikDetail from "~/components/form/grafikDetail.vue";

export default {
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch("subordinate/getpengajuanID", params.id),
      store.dispatch("subordinate/getstatus", params.id),
      store.dispatch("subordinate/gethistory", params.id),
      store.dispatch("subordinate/kodeRKAT"),
      store.dispatch("subordinate/ikuParent"),
    ]);
    return;
  },
  components: {
    components: grafikDetail,
  },
  mounted() {
  },
  methods: {
    ...mapActions("subordinate", ["getpengajuanID", "getstatus", "gethistory"]),
  },
};
</script>

<style>
</style>