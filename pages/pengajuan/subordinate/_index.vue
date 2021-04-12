<template>
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div
          class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">Data Pengajuan</h6>
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
              <NuxtLink class="dropdown-item" to="subordinate/add"
                >Add RKAT</NuxtLink
              >
              <NuxtLink class="dropdown-item" to="/rkat/reset"
                >Reset RKAT</NuxtLink
              >
            </div>
          </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <b-table responsive striped hover :items="pengajuan" :fields="fields" show-empty>
            <template v-slot:cell(actions)="row">
              <NuxtLink
                class="btn-sm btn-warning mb-2"
                :to="'edit/' + row.item.id_pengajuan"
                :key="'edit' + row.index"
                >Detail</NuxtLink
              >
              <button
                class="btn-sm btn-danger mt-2"
                @click="destroypengajuan(row)"
              >
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
import { mapActions, mapState } from "vuex";

export default {
  async asyncData({ store, params }) {
    await Promise.all([store.dispatch("subordinate/getpengajuan", params.index)]);
    return;
  },
  data() {
    return {
      fields: [
        { key: 'fullname', label: 'User' },
        { key: 'nama_struktur_child1', label: 'Fakultas/Unit Pelaksana' },
        { key: 'created_at', label: 'Waktu Pengajuan' },
        "actions"]
    };
  },
  computed: {
    ...mapState("subordinate", {
      pengajuan: (state) => state.pengajuan,
    }),
  },
  mounted() {},
  methods: {
    ...mapActions("subordinate", ["getpengajuan", "deletepengajuan"]),

    destroypengajuan(row) {
      this.deletepengajuan(row.item.id_pengajuan).catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>

<style>
</style>