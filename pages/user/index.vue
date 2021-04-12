<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <b-table responsive striped hover :items="user" :fields="fields">
          <template v-slot:cell(Detail)="row">
            <NuxtLink
              class="btn-sm btn-warning mb-2"
              :to="'rkat/edit/' + row.item.id_rkat"
              :key="'edit' + row.index"
              >Detail</NuxtLink
            >
          </template>
        </b-table>
      </div>
    </div>
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
    return {
      fields: [
        { key: "fullname", label: "User" },
        { key: "nama_struktur_child1", label: "Fakultas/Unit Pelaksana" },
        { key: "created_at", label: "Register Date" },
        "Detail",
      ],
    };
  },
  components: {},
  computed: {
    ...mapState("user", {
      user: (state) => state.user,
    }),
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["getuser", "deleteuser"]),
    destroyrkat() {
      // this.deleterkat(row.item.id_rkat).catch((e) => {
      //   console.log(e);
      // });
    },
  },
};
</script>

<style>
</style>