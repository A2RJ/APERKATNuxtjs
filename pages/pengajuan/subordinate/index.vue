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
          <div class="mb-3 mt-1">
            <NuxtLink
              class="btn btn-sm btn-outline-primary"
              to="/pengajuan/subordinate/add"
              >Tambah Pengajuan</NuxtLink
            >
            <b-button variant="outline-info btn-sm" @click="deleteAll"
              >Reset Pengajuan</b-button
            >
          </div>
          <b-row>
            <b-col sm="5" md="6" class="my-1">
              <b-form-group
                label="Per page"
                label-for="per-page-select"
                label-cols-sm="6"
                label-cols-md="4"
                label-cols-lg="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-form-select
                  id="per-page-select"
                  v-model="perPage"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="6" class="my-1 float-right">
              <b-form-group
                label="Filter"
                label-for="filter-input"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- sticky-header -->
          <b-table
            responsive
            head-variant="light"
            hover
            id="my-table"
            :items="pengajuan"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            show-empty
          >
            <template v-slot:cell(fullname)="row">
              <p>
                {{ row.item.fullname | capitalize }}
              </p>
            </template>
            <template v-slot:cell(nama_struktur)="row">
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
            <template v-slot:cell(validasi_status)="row">
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
            <template v-slot:cell(created_at)="row">
              <p>{{ row.item.created_at | convertDate }}</p>
            </template>
            <template v-slot:cell(actions)="row">
              <NuxtLink
                class="btn btn-sm btn-outline-info"
                :to="'edit/' + row.item.id_pengajuan"
                :key="'edit' + row.index"
                >Detail</NuxtLink
              >
              <button
                class="btn btn-sm btn-outline-danger"
                @click="destroypengajuan(row)"
              >
                Hapus
              </button>
            </template>
          </b-table>

          <div class="overflow-auto">
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
            ></b-pagination>
          </div>
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
      fields: [
        { key: "fullname", label: "User" },
        { key: "nama_struktur", label: "Fakultas/Unit Pelaksana" },
        { key: "validasi_status", label: "Status Pengajuan" },
        { key: "created_at", label: "Waktu Pengajuan" },
        "actions",
      ],

      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      filter: null,
      currentPage: 1,
      items: this.pengajuan,
      convert: null,
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
  mounted() {},
  methods: {
    ...mapActions("subordinate", ["getpengajuan", "deletepengajuan"]),

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