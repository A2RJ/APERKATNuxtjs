<template>
  <div class="row card shadow mb-4">
    <div class="col-xl-12 col-lg-12 card-body">
      <b-tabs content-class="mt-3" v-if="userLogin == 120">
        <b-tab title="Belum Pencairan" active>
          <custom-table
            :items="listPencairan"
            :fields="fieldsWR2TF"
            :html="key"
            :actions="actions"
          >
            <template v-slot:kode_rkat="row">
              {{ row.item.rkat.kode_rkat }}
            </template>
            <template v-slot:rkat="row">
              {{ row.item.rkat.nama_program }}
            </template>
            <template v-slot:biaya_program="row">
              RP. {{ row.item.biaya_program | currency }}
            </template>
            <template v-slot:biaya_disetujui="row">
              RP. {{ row.item.biaya_disetujui | currency }}
            </template>
            <template v-slot:pencairan="row">
              <ul
                v-for="pencairan in row.item.pencairan"
                :key="pencairan.index"
              >
                <li>
                  <a :href="pencairan.images"
                    >Rp. {{ pencairan.nominal | currency }}</a
                  >
                </li>
              </ul>
            </template>
            <template v-slot:actions="row">
              <NuxtLink
                class="btn btn-sm btn-outline-info"
                :to="'/pengajuan/subordinate/edit/' + row.item.id_pengajuan"
                :key="'edit' + row.index"
                >Detail</NuxtLink
              >
            </template>
          </custom-table>
        </b-tab>
        <b-tab title="Sudah Pencairan">
          <custom-table
            :items="listSudahPencairan"
            :fields="fieldsWR2TF"
            :html="key"
            :actions="actions"
          >
            <template v-slot:kode_rkat="row">
              {{ row.item.rkat.kode_rkat }}
            </template>
            <template v-slot:rkat="row">
              {{ row.item.rkat.nama_program }}
            </template>
            <template v-slot:biaya_program="row">
              RP. {{ row.item.biaya_program | currency }}
            </template>
            <template v-slot:biaya_disetujui="row">
              RP. {{ row.item.biaya_disetujui | currency }}
            </template>
            <template v-slot:pencairan="row">
              <ul
                v-for="pencairan in row.item.pencairan"
                :key="pencairan.index"
              >
                <li>
                  <a :href="pencairan.images"
                    >Rp. {{ pencairan.nominal | currency }}</a
                  >
                </li>
              </ul>
            </template>
            <template v-slot:actions="row">
              <NuxtLink
                class="btn btn-sm btn-outline-info"
                :to="'/pengajuan/subordinate/edit/' + row.item.id_pengajuan"
                :key="'edit' + row.index"
                >Detail</NuxtLink
              >
            </template>
          </custom-table>
        </b-tab>
      </b-tabs>
      <b-tabs content-class="mt-3" v-else-if="userLogin == 121">
        <b-tab title="LPJ Keuangan" active>
          <custom-table
            :items="listLPJKeuangan"
            :fields="fieldsWR2LPJ"
            :html="key"
            :actions="actions"
          >
            <template v-slot:kode_rkat="row">
              {{ row.item.rkat.kode_rkat }}
            </template>
            <template v-slot:rkat="row">
              {{ row.item.rkat.nama_program }}
            </template>
            <template v-slot:biaya_program="row">
              RP. {{ row.item.biaya_program | currency }}
            </template>
            <template v-slot:biaya_disetujui="row">
              RP. {{ row.item.biaya_disetujui | currency }}
            </template>
            <template v-slot:pencairan="row">
              <ul
                v-for="pencairan in row.item.pencairan"
                :key="pencairan.index"
              >
                <li>
                  <a :href="pencairan.images"
                    >Rp. {{ pencairan.nominal | currency }}</a
                  >
                </li>
              </ul>
            </template>
            <template v-slot:actions="row">
              <b-button
                @click="aprroveLPJKeuangan(row.item.id_pengajuan)"
                variant="warning"
                class="btn btn-sm mr-1"
              >
                Terima</b-button
              >
              <b-button
                @click="declineLPJKeuangan(row.item.id_pengajuan)"
                variant="danger"
                class="btn btn-sm my-1 mr-1"
              >
                Tolak</b-button
              >
              <NuxtLink
                class="btn btn-sm btn-outline-info"
                :to="'/pengajuan/subordinate/edit/' + row.item.id_pengajuan"
                :key="'edit' + row.index"
                >Detail</NuxtLink
              >
            </template>
          </custom-table>
        </b-tab>
        <b-tab title="Belum LPJ Keuangan">
          <custom-table
            :items="belumLPJKeuangan"
            :fields="fieldsWR2LPJ"
            :html="key"
            :actions="actions"
          >
            <template v-slot:kode_rkat="row">
              {{ row.item.rkat.kode_rkat }}
            </template>
            <template v-slot:rkat="row">
              {{ row.item.rkat.nama_program }}
            </template>
            <template v-slot:biaya_program="row">
              RP. {{ row.item.biaya_program | currency }}
            </template>
            <template v-slot:biaya_disetujui="row">
              RP. {{ row.item.biaya_disetujui | currency }}
            </template>
            <template v-slot:pencairan="row">
              <ul
                v-for="pencairan in row.item.pencairan"
                :key="pencairan.index"
              >
                <li>
                  <a :href="pencairan.images"
                    >Rp. {{ pencairan.nominal | currency }}</a
                  >
                </li>
              </ul>
            </template>
            <template v-slot:actions="row">
              <NuxtLink
                class="btn btn-sm btn-outline-info"
                :to="'/pengajuan/subordinate/edit/' + row.item.id_pengajuan"
                :key="'edit' + row.index"
                >Detail</NuxtLink
              >
            </template>
          </custom-table>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch("subordinate/transfer"),
      store.dispatch("subordinate/lpj"),
    ]);
    return;
  },
  data() {
    return {
      userLogin: this.$store.state.auth.user[0].id_user,
      key: "id_pengajuan",
      actions: [],
      fieldsWR2TF: [
        { key: "kode_rkat", label: "Kode RKAT" },
        { key: "rkat", label: "Nama Program" },
        { key: "tanggal", label: "Waktu Pelaksanaan" },
        { key: "biaya_program", label: "RAB diajukan" },
        { key: "biaya_disetujui", label: "RAB disetujui" },
        { key: "pencairan", label: "Pencairan" },
        "actions",
      ],
      listPencairan: [],
      listSudahPencairan: [],
      fieldsWR2LPJ: [
        { key: "kode_rkat", label: "Kode RKAT" },
        { key: "rkat", label: "Nama Program" },
        { key: "tanggal", label: "Waktu Pelaksanaan" },
        { key: "biaya_program", label: "RAB diajukan" },
        { key: "biaya_disetujui", label: "RAB disetujui" },
        { key: "pencairan", label: "Pencairan" },
        { key: "lpj_keuangan", label: "LPJ Keuangan" },
        "actions",
      ],
      listLPJKeuangan: [],
      belumLPJKeuangan: [],
    };
  },
  computed: {
    // ...mapState("subordinate", {
    //   transfer: (state) => state.transfer,
    //   lpj: (state) => state.lpj,
    // }),
  },
  mounted() {
    if (this.userLogin == 120) {
      this.pencairan();
      this.sudahPencairan();
    }

    if (this.userLogin == 121) {
      this.lpjKeuangan();
      this.getBelumLPJKeuangan();
    }
  },
  methods: {
    ...mapActions("subordinate", ["approved", "declined"]),
    async lpjKeuangan() {
      this.$axios
        .get("/pengajuan/lpjKeuangan")
        .then((response) => {
          this.listLPJKeuangan = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getBelumLPJKeuangan() {
      this.$axios
        .get("/pengajuan/belumLPJKeuangan")
        .then((response) => {
          this.belumLPJKeuangan = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async pencairan() {
      this.$axios
        .get("/pengajuan/transfer")
        .then((res) => {
          if (res.data) {
            this.listPencairan = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async sudahPencairan() {
      this.$axios
        .get("/pengajuan/sudahTransfer")
        .then((res) => {
          if (res.data) {
            this.listSudahPencairan = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    aprroveLPJKeuangan(params) {
      this.$swal({
        title: "Warning!",
        text: "Terima LPJ Keuangan ?",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK",
        preConfirm: (login) => {},
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.loader("loading...");
          this.approved({
            id: params,
            message: result.value,
            status_validasi: 4,
            id_struktur: 24,
            nama_status: "Direktorat Keuangan",
            next: 21,
          })
            .then(async () => {
              this.success("Berhasil terima pengajuan");
              this.lpjKeuangan();
              this.getBelumLPJKeuangan();
            })
            .catch(() => {
              this.failed("Whoops Server Error");
            });
        }
      });
    },
    declineLPJKeuangan(params) {
      this.$swal({
        title: "Warning!",
        text: "Tolak LPJ Keuangan ?",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK",
        preConfirm: (login) => {},
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.loader("loading...");
          this.approved({
            id: params,
            message: result.value,
            status_validasi: 0,
            id_struktur: 24,
            nama_status: "Direktorat Keuangan",
            next: 24,
          })
            .then(async () => {
              this.success("Berhasil terima pengajuan");
              this.lpjKeuangan();
              this.getBelumLPJKeuangan();
            })
            .catch(() => {
              this.failed("Whoops Server Error");
            });
        }
      });
    },
    success(params) {
      this.$swal({
        width: 300,
        icon: "success",
        title: "Congrats!",
        text: params,
      });
    },
    failed(params) {
      this.$swal({
        width: 300,
        icon: "error",
        title: "Oops...",
        text: params,
      });
    },
    loader(params) {
      this.$swal({
        title: "Please wait",
        width: 300,
        text: params,
        imageUrl: "/Rocket.gif",
        showConfirmButton: false,
        allowOutsideClick: true,
      });
    },
  },
};
</script>
