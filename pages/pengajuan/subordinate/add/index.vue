<template>
  <div>
    <subordinate />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import subordinate from "~/components/form/subordinate.vue";

export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch("subordinate/kodeRKAT", store.$auth.$state.user[0].id_user)]);
    await Promise.all([store.dispatch("subordinate/ikuParent")]);
    return;
  },
  components: {
    subordinate: subordinate,
  },
  mounted() {
    // this.SET_IS_AUTH(this.$store.state.auth.loggedIn);
    // this.SET_USER_DATA(this.$store.state.auth.user[0]);
  },
  methods: {
    ...mapMutations(["SET_IS_AUTH", "SET_USER_DATA"]),
    ...mapActions("subordinate", ["getpengajuan", "kodeRKAT"]),
  },
};
</script>

<style>
</style>