<template>
  <div>
    <nonRkat />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import nonRkat from "~/components/form/nonRkat.vue";

export default {
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch("subordinate/getpengajuanID", params.id),
      store.dispatch("subordinate/getstatus", params.id),
      store.dispatch("subordinate/gethistory", params.id),
      store.dispatch("subordinate/ikuParent"),
    ]);
    return;
  },
  components: {
    components: nonRkat,
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