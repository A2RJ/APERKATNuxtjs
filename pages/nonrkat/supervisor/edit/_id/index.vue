<template>
  <div>
    <nonRkat />
  </div>
</template>

<script>
import nonRkat from "~/components/form/nonRkat.vue";

export default {
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch("nonrkat/getNonRKATById", params.id),
      store.dispatch("subordinate/ikuParent"),
    ]);
    return;
  },
  components: {
    nonRkat,
  },
  mounted() {
    },
  methods: {
  },
};
</script>

<style>
</style>