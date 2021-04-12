<template>
  <!-- <button @click="getrkat">getrkat</button> -->
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div
          class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">Data RKAT</h6>
          <div class="dropdown no-arrow">
            <a
              class="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
              aria-labelledby="dropdownMenuLink"
              style=""
            >
              <div class="dropdown-header">Opsi:</div>
              <NuxtLink class="dropdown-item" to="/rkat/add">Add RKAT</NuxtLink>
              <NuxtLink class="dropdown-item" to="/rkat/reset"
                >Reset RKAT</NuxtLink
              >
            </div>
          </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <b-table responsive striped hover :items="rkat" :fields="fields" show-empty>
            <template v-slot:cell(actions)="row">
              <NuxtLink
                class="btn-sm btn-warning mb-2"
                :to="'rkat/edit/' + row.item.id_rkat"
                :key="'edit' + row.index"
                >Update</NuxtLink
              >
              <button class="btn-sm btn-danger mt-2" @click="destroyrkat(row)">
                Hapus
              </button>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch("rkat/getrkat")]);
    return;
  },
  data() {
    return {
      fields: [
        { key: 'nama_struktur_child1', label: 'Fakultas/Unit Pelaksana' },
        "mulai_program",
        { key: 'created_at', label: 'Waktu Pengajuan' },
        "total_anggaran",
        "actions",
      ],
      delete: null,
    };
  },
  computed: {
    ...mapState("rkat", {
      rkat: (state) => state.rkat,
    }),
  },
  mounted() {
    this.SET_IS_AUTH(this.$store.state.auth.loggedIn);
    this.SET_USER_DATA(this.$store.state.auth.user[0]);
    this.SET_API_TOKEN(this.$store.state.auth.user[0].token);
  },
  methods: {
    ...mapMutations(["SET_IS_AUTH", "SET_API_TOKEN", "SET_USER_DATA"]),
    ...mapActions("rkat", ["getrkat", "deleterkat"]),

    destroyrkat(row) {
      this.deleterkat(row.item.id_rkat).catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>

<style>
</style>