<template>
  <div>
    <subordinate />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import subordinate from "~/components/form/subordinate.vue";

export default {
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch("subordinate/getpengajuanID", params.id),
    ]);
    return;
  },
  components: {
    subordinate: subordinate,
  },
  mounted() {
    this.SET_IS_AUTH(this.$store.state.auth.loggedIn);
    this.SET_USER_DATA(this.$store.state.auth.user[0]);
    this.SET_API_TOKEN(this.$store.state.auth.user[0].token);
  },
  methods: {
    ...mapMutations([
      "SET_IS_AUTH",
      "SET_API_TOKEN",
      "SET_USER_DATA",
      "SET_STATUS",
      "SET_HISTORY",
    ]),
    ...mapActions("subordinate", ["getpengajuanID"]),
  },
};
</script>

<style>
</style>