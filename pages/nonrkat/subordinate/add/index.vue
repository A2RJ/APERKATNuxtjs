<template>
  <div>
    <nonRkat />
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import nonRkat from "~/components/form/nonRkat.vue";

export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch("subordinate/ikuParent")]);
    return;
  },
  components: {
    nonRkat
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