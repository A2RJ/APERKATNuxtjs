<template>
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div
          class="
            card-header
            py-3
            d-flex
            flex-row
            align-items-center
            justify-content-between
          "
        >
          <h6 class="m-0 font-weight-bold text-primary">Pengajuan</h6>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <custom-table :items="items" :fields="fields" :html="key" :actions="actions">
            <template v-slot:fullname="row">
              <p>
                {{ row.item.fullname | capitalize }}
              </p>
            </template>
            <template v-slot:nama_struktur="row">
              <p
                v-if="
                  row.item.nama_struktur !== '0' &&
                  row.item.nama_struktur_child1 == '0' &&
                  row.item.nama_struktur_child2 == '0'
                "
                class="text-uppercase"
              >
                {{ row.item.nama_struktur }}
              </p>
              <p
                v-if="
                  row.item.nama_struktur !== '0' &&
                  row.item.nama_struktur_child1 !== '0' &&
                  row.item.nama_struktur_child2 == '0'
                "
                class="text-uppercase"
              >
                {{ row.item.nama_struktur }}
              </p>
              <p
                v-if="
                  row.item.nama_struktur !== '0' &&
                  row.item.nama_struktur_child1 !== '0' &&
                  row.item.nama_struktur_child2 !== '0'
                "
                class="text-uppercase"
              >
                {{ row.item.nama_struktur_child1 }}
              </p>
            </template>
            <template v-slot:validasi_status="row">
              <p v-if="row.item.validasi_status == 0">
                <b-badge variant="danger"
                  >Ditolak: {{ row.item.nama_status }}</b-badge
                >
              </p>
              <p v-if="row.item.validasi_status == 1">
                <b-badge variant="warning"
                  >Input/Revisi: {{ row.item.nama_status }}</b-badge
                >
              </p>
              <p v-if="row.item.validasi_status == 2">
                <b-badge variant="success"
                  >Diterima: {{ row.item.nama_status }}</b-badge
                >
              </p>
              <p v-if="row.item.validasi_status == 3">
                <b-badge variant="success"
                  >Pencairan: {{ row.item.nama_status }}</b-badge
                >
              </p>
            </template>
            <template v-slot:created_at="row">
              <p>{{ row.item.created_at | convertDate }}</p>
            </template>
            <template v-slot:actions="row">
              <NuxtLink
                class="btn btn-sm btn-outline-info mt-1"
                :to="'edit/' + row.item.id_pengajuan"
                :key="'edit' + row.index"
                >Detail</NuxtLink
              >
              <button
                class="btn btn-sm btn-outline-danger mt-1"
                @click="destroypengajuan(row.item.id_pengajuan)"
              >
                Hapus
              </button>
            </template>
          </custom-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch(
        "subordinate/getpengajuan",
        store.$auth.$state.user[0].id_user
      ),
    ]);
    return;
  },
  data() {
    return {
      key: "id_pengajuan",
      actions: [
        { name: "Tambah", type: "link", link: "user/add", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Reset", type: "func", func: "deleteAll", link: "Reset", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Print", type: "func", func: "print", link: "Print", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Import", type: "func", func: "importRKAT", link: "Print", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Select All", type: "func", func: "selectAll", link: "Select All", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Clear Selected", type: "func", func: "clearSelected", link: "Clear Selected", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Delete Selected", type: "func", func: "deleteSelected", link: "Delete Selected", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Print Selected", type: "func", func: "printSelected", link: "Print Selected", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
      ],
      fields: [
        { key: "fullname", label: "User" },
        { key: "kode_rkat", label: "Kode RKAT " },
        { key: "nama_struktur", label: "Fakultas/Unit Pelaksana" },
        { key: "validasi_status", label: "Status Pengajuan" },
        { key: "created_at", label: "Waktu Pengajuan" }, 
        "actions",
      ],
      items: [],
    };
  },
  computed: {
    ...mapState("subordinate", {
      pengajuan: (state) => state.pengajuan,
    }),
    rows() {
      return this.pengajuan.length;
    },
  },
  mounted() {
    this.items = this.pengajuan.length
  },
  methods: {
    ...mapActions("subordinate", ["getpengajuan", "deletepengajuan"]),
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status_message === 0) return "table-success";
    },
    destroypengajuan(row) {
      this.$swal({
        title: "Warning!",
        text: "Yakin menghapus pengajuan?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK, Hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletepengajuan(row.item.id_pengajuan)
            .then(() => {
              this.$swal({
                width: 300,
                icon: "success",
                title: "Congrats!",
                text: "Data telah dihapus",
              });
              this.$nuxt.refresh();
            })
            .catch(() => {
              this.$swal({
                width: 300,
                icon: "error",
                title: "Oops...",
                text: "Server error atau cek koneksi anda",
              });
            });
        }
      });
    },
    deleteAll() {
      this.$swal({
        title: "Warning!",
        text: "Hapus semua pengajuan?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$axios
            .get(`/pengajuan/destroy/${this.$store.state.auth.user[0].id_user}`)
            .then(() => {
              this.$swal({
                width: 300,
                icon: "success",
                title: "Congrats!",
                text: "Semua pengajuan telah dihapus",
              });
              this.$nuxt.refresh();
            })
            .catch(() => {
              this.$swal({
                width: 300,
                icon: "error",
                title: "Oops...",
                text: "Cek server atau koneksi anda",
              });
            });
        }
      });
    },
  },
};
</script>

<style>
</style>