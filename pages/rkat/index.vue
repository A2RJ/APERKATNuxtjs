<template>
  <!-- <button @click="getrkat">getrkat</button> -->
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
          <h6 class="m-0 font-weight-bold text-primary">RKAT</h6>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <div class="mb-3">
            <NuxtLink class="btn btn-sm btn-outline-primary mt-1" to="/rkat/add"
              >Tambah RKAT</NuxtLink
            >
            <b-button variant="outline-success btn-sm mt-1" @click="download"
              >Download RKAT</b-button
            >
            <b-button variant="outline-info btn-sm mt-1" @click="importRKAT"
              >Import RKAT</b-button
            >
            <b-button variant="outline-info btn-sm mt-1" @click="deleteAll"
              >Reset RKAT</b-button
            >
          </div>
          <div class="mb-3 col-lg-6 mx-auto" v-show="importRkat">
            <b-alert v-model="importRkat" variant="primary" dismissible>
              <importDB />
            </b-alert>
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
            :items="rkat"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            show-empty
          >
            <template v-slot:cell(fullname)="row">
              {{ row.item.fullname | capitalize }}
            </template>
            <template v-slot:cell(total_anggaran)="row">
              RP. {{ row.item.total_anggaran | currency }}
            </template>
            <template v-slot:cell(mulai_program)="row">
              {{ row.item.mulai_program | convertDate }}
            </template>
            <template v-slot:cell(created_at)="row">
              {{ row.item.created_at | convertDate }}
            </template>
            <template v-slot:cell(anggaran_digunakan)="row">
              RP. {{ row.item.anggaran_digunakan | currency }}
            </template>
            <template v-slot:cell(actions)="row">
              <NuxtLink
                class="btn btn-sm btn-outline-info mt-1"
                :to="'rkat/edit/' + row.item.id_rkat"
                :key="'edit' + row.index"
                >Ubah</NuxtLink
              >
              <button
                class="btn btn-sm btn-outline-danger mt-1"
                @click="destroyrkat(row)"
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
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch("rkat/getrkat")]);
    return;
  },
  data() {
    return {
      fields: [
        { key: "fullname", label: "Fakultas/Unit Pelaksana" },
        { key: "kode_rkat", label: "Kode RKAT " },
        "mulai_program",
        { key: "mulai_program", label: "Waktu Kegiatan" },
        { key: "created_at", label: "Waktu Pengajuan" },
        { key: "total_anggaran", label: "Total Anggaran" },
        { key: "anggaran_digunakan", label: "Anggaran dicairkan" },
        "total_anggaran",
        "actions",
      ],
      perPage: 10,
      pageOptions: [5, 10, 15, 20, { value: 100, text: "Show a lot" }],
      filter: null,
      currentPage: 1,
      items: this.rkat,
      importRkat: false,
    };
  },
  computed: {
    ...mapState("rkat", {
      rkat: (state) => state.rkat,
    }),
    rows() {
      return this.rkat.length;
    },
  },
  mounted() {
    // this.SET_IS_AUTH(this.$store.state.auth.loggedIn);
    // this.SET_USER_DATA(this.$store.state.auth.user[0]);
  },
  methods: {
    ...mapMutations(["SET_IS_AUTH", "SET_USER_DATA"]),
    ...mapActions("rkat", ["getrkat", "deleterkat"]),

    destroyrkat(row) {
      this.$swal({
        title: "Warning!",
        text: "Yakin menghapus RKAT?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleterkat(row.item.id_rkat)
            .then(() => {
              this.$swal({
                width: 300,
                icon: "success",
                title: "Congrats!",
                text: "RKAT data was deleted successfully",
              });
              this.$nuxt.refresh();
            })
            .catch(() => {
              this.$swal({
                width: 300,
                icon: "error",
                title: "Oops...",
                text: "Please check your server or internet connection",
              });
            });
        }
      });
    },
    deleteAll() {
      this.$swal({
        title: "Warning!",
        text: "Yakin menghapus semua RKAT?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$axios
            .get("/rkat/destroy")
            .then(() => {
              this.$swal({
                width: 300,
                icon: "success",
                title: "Congrats!",
                text: "RKAT telah dihapus",
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
    async download() {
      await this.$axios
        .get("/rkat/pdf_rkat", {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "RKAT.pdf");
          document.body.appendChild(link);
          link.click();
          this.$swal({
            width: 300,
            icon: "success",
            title: "Congrats!",
            text: "RKAT telah dihapus",
          });
        })
        .catch(() => {
          this.$swal({
            width: 300,
            icon: "error",
            title: "Oops...",
            text: "Cek server atau koneksi anda",
          });
        });
    },
    importRKAT() {
      this.importRkat = true;
    },
  },
};
</script>

<style>
</style>