<template>
  <div>
    <nonRkat />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import nonRkat from "~/components/form/nonRkat.vue";

export default {
  async asyncData({ store, params }) {
    await Promise.all([store.dispatch("subordinate/ikuParent")]);
    return;
  },
  components: {
    nonRkat,
  },
  mounted() {},
  methods: {
    ...mapActions("subordinate", ["ikuParent"]),
  },
};
</script>

<style>
</style>