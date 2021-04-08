<template>
  <div class="">ini daftar user
    {{ user }}
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch("user/getuser")]);
    return;
  },
  data() {
    return {};
  },
    computed: {
    ...mapState("user", {
      user: (state) => state.user,
    }),
  },
  mounted() {

  },
  methods: {
    ...mapActions("user", ["getuser", "deleteuser"]),

    destroyrkat(row) {
      // this.deleterkat(row.item.id_rkat).catch((e) => {
      //   console.log(e);
      // });
    },
  },
};
</script>

<style>
</style>