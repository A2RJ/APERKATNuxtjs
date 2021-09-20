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
          <custom-table :items="items" :fields="fields" :html="key" :actions="actions">
            <template v-slot:fullname="data">
              {{ data.value | capitalize }}
            </template>
            <template v-slot:total_anggaran="data">
              RP. {{ data.value | currency }}
            </template>
            <template v-slot:mulai_program="data">
              {{ data.value | convertDate }}
            </template>
            <template v-slot:created_at="data">
              {{ data.value | convertDate }}
            </template>
            <template v-slot:anggaran_digunakan="data">
              RP. {{ data.value | currency }}
            </template>
            <template v-slot:actions="row">
              <NuxtLink
                class="btn btn-sm btn-outline-info mt-1"
                :to="'rkat/edit/' + row.item.id_rkat"
                :key="'edit' + row.index"
                >Ubah</NuxtLink
              >
              <button
                class="btn btn-sm btn-outline-danger mt-1"
                @click="destroyrkat(row.item.id_rkat)"
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
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch("rkat/getrkat")]);
    return;
  },
  data() {
    return {
      key: "id_rkat",
      actions: [
        { name: "Tambah", type: "link", link: "rkat/add", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Reset", type: "func", func: "reset", link: "/rkat/destroy", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Print", type: "func", func: "print", link: "/rkat/pdf_rkat", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        // { name: "Import", type: "func", func: "importRKAT", link: "Print", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Select All", type: "func", func: "selectAll", link: "Select All", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Clear Selected", type: "func", func: "clearSelected", link: "Clear Selected", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Delete Selected", type: "func", func: "deleteSelected", link: "/rkat/pdf_selected_rkat/", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Print Selected", type: "func", func: "printSelected", link: "/rkat/pdf_selected_rkat/", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
      ],
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
      items: [],
    };
  },
  computed: {
    ...mapState("rkat", {
      rkat: (state) => state.rkat,
    })
  },
  mounted(){
    this.items = this.rkat
  },
  methods: {
    ...mapMutations(["SET_IS_AUTH", "SET_USER_DATA"]),
    ...mapActions("rkat", ["getrkat", "deleterkat", "getUser"]),

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
          this.deleterkat(row)
            .then(() => {
              this.$swal({
                width: 300,
                icon: "success",
                title: "Congrats!",
                text: "RKAT data was deleted successfully",
              });
              this.$nuxt.refresh();
              this.items = this.rkat
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
              this.items = this.rkat
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
      this.$axios
        .get("/user/rkatUser")
        .then((res) => {
          this.options = res.data.data;
        })
        .catch((e) => {});
    },
    handleFileUpload() {
      this.file1 = this.$refs.file.files[0];
    },
    downloadFile() {
      window.open("https://aperkat.uts.ac.id/RKATemplate.xlsx");
    },
    resetFile() {
      this.file1 = null;
      this.data = null;
      this.selected = [];
    },
    async submitFile() {
      if (this.selected) {
        this.pesan = false;

        /**
         * Submits the file to the server
         * Initialize the form data
         * Add the form data we need to submit
         * Make the request to the POST /single-file URL
         */
        let formData = new FormData();
        formData.append("file", this.file1);

        await this.$axios
          .post("/rkat/uploadRKAT", formData, {
            headers: {
              "Content-Type": "multipart/form-data;",
            },
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
            }.bind(this),
          })
          .then((res) => {
            this.data = res.data;

            this.error = null;
          })
          .catch((e) => {
            this.data = null;
            this.error = "Pastikan format file benar!";
          });
      } else {
        this.pesan = true;
      }
    },
    get(value) {
      if (value) {
        this.selected = value.label;
        this.id_user = value.code;
      }
    },
    postImport() {
      this.$axios
        .post(`/rkat/postImport/${this.id_user}`, this.data)
        .then((res) => {
          this.data = null;
          this.importRkat = false;

          this.$nuxt.refresh();
        })
        .catch((e) => {});
    },
  },
};
</script>

<style>
</style>