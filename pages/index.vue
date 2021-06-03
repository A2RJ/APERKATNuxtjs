<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="row">
        <div class="col-lg-12 mb-1">
          <div class="card bg-white text-center text-black shadow">
            <div class="card-body">
              <div>
                <img
                  class="img-profile rounded-circle"
                  src="~/assets/img/undraw_profile.svg"
                  style="height: 50px"
                />
              </div>

              <div
                v-if="
                  grafik.data.user.nama_struktur_child1 == '0' &&
                  grafik.data.user.nama_struktur_child1 == '0'
                "
              >
                {{ grafik.data.user.nama_struktur }} <br />
                {{ grafik.data.user.email }} <br />
                {{ grafik.data.user.nomor_wa }}
              </div>
              <div
                v-if="
                  grafik.data.user.nama_struktur_child1 !== '0' &&
                  grafik.data.user.nama_struktur_child2 == '0'
                "
              >
                {{ grafik.data.user.nama_struktur_child1 }} <br />
                {{ grafik.data.user.email }} <br />
                {{ grafik.data.user.nomor_wa }}
              </div>
              <div
                v-if="
                  grafik.data.user.nama_struktur_child1 !== '0' &&
                  grafik.data.user.nama_struktur_child2 !== '0'
                "
              >
                {{ grafik.data.user.nama_struktur_child2 }} <br />
                {{ grafik.data.user.email }} <br />
                {{ grafik.data.user.nomor_wa }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-1">
          <div class="card bg-primary text-white shadow">
            <div class="card-body">
              Total anggaran
              <div class="text-white-50 small">
                RP. {{ grafik.data.total_anggaran_rkat | numFormat }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-1">
          <div class="card bg-success text-white shadow">
            <div class="card-body">
              Anggaran digunakan
              <div class="text-white-50 small">
                RP. {{ grafik.data.total_rkat_diterima | numFormat }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-1">
          <div class="card bg-info text-white shadow">
            <div class="card-body">
              Pengajuan diterima
              <div class="text-white-50 small">
                {{ grafik.data.pengajuan_diterima | numFormat }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mb-1">
          <div class="card bg-warning text-white shadow">
            <div class="card-body">
              Pengajuan diproses
              <div class="text-white-50 small">
                {{ grafik.data.pengajuan_progress | numFormat }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 card">
      <chart ref="skills_chart" :chart-data="chartData" :options="options">
      </chart>
    </div>
    <div class="col-lg-12 card mt-2">
      <div class="mt-2 m-1">
        <h4>Data RKAT</h4>
        <b-table show-empty striped hover :items="grafik.data.rkat" :fields="fields">
          <template v-slot:cell(total_anggaran)="row">
            {{ row.item.total_anggaran | numFormat }}
          </template>
          <template v-slot:cell(sisa_anggaran)="row">
            {{ row.item.sisa_anggaran | numFormat }}
          </template>
          <template v-slot:cell(actions)="row">
            <NuxtLink
              class="btn-sm btn-warning mb-2"
              :to="'rkat/edit/' + row.item.id_rkat"
              :key="'edit' + row.index"
              >Detail</NuxtLink
            >
          </template>
        </b-table>
      </div>
      <div class="mt-2 m-1">
        <h4>Data Pengajuan</h4>
        <b-table
          striped
          hover show-empty
          :items="grafik.data.pengajuan"
          :fields="pengajuan"
        >
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
            <p
              v-if="
                row.item.validasi_status == 2 &&
                row.item.nama_status !== 'Sekniv'
              "
            >
              <b-badge variant="success"
                >Diterima: {{ row.item.nama_status }}</b-badge
              >
            </p>
            <p v-if="row.item.validasi_status == 3">
              <b-badge variant="success"
                >Pencairan: {{ row.item.nama_status }}</b-badge
              >
            </p>
            <p
              v-if="
                row.item.validasi_status == 2 &&
                row.item.nama_status == 'Sekniv'
              "
            >
              <b-badge variant="success"
                >Selesai: {{ row.item.nama_status }}</b-badge
              >
            </p>
          </template>
          <template v-slot:cell(actions)="row">
            <NuxtLink
              class="btn-sm btn-warning mb-2"
              :to="'pengajuan/grafik/detail/' + row.item.id_pengajuan"
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
import { mapActions, mapState } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch(
        "subordinate/getGrafik",
        store.$auth.$state.user[0].id_user
      ),
    ]);
    return;
  },
  data() {
    return {
      options: {},
      chartData: {},
      fields: [
        { key: "fullname", label: "Fakultas/Unit Pelaksana" },
        { key: "mulai_program", label: "Waktu Kegiatan" },
        { key: "created_at", label: "Waktu Pengajuan" },
        { key: "total_anggaran", label: "Total Anggaran" },
        { key: "sisa_anggaran", label: "Sisa Anggaran" },
        "actions",
      ],
      pengajuan: [
        { key: "fullname", label: "Fakultas/Unit Pelaksana" },
        { key: "validasi_status", label: "Status Pengajuan" },
        { key: "created_at", label: "Waktu Pengajuan" },
        "actions",
      ],
    };
  },
  computed: {
    ...mapState("subordinate", {
      grafik: (state) => state.grafik,
    }),
  },
  mounted() {
    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
    };

    this.chartData = {
      labels: ["Kas", "Kredit"],
      datasets: [
        {
          backgroundColor: ["#4e73df", "#1cc88a"],
          data: [
            this.grafik.data.total_anggaran_rkat,
            this.grafik.data.total_rkat_diterima,
          ],
        },
      ],
    };
  },
  methods: {
    ...mapActions("subordinate", ["getGrafik"]),
    checkValidIP() {
      const randomNumber = async () => {
        return Math.floor(Math.random() * 100);
      };

      const randomNumberSum = async () => {
        const firstNumber = await randomNumber();
        const secondNumber = await randomNumber();
        console.log(firstNumber + secondNumber);
      };

      randomNumberSum();

      const isValidPIN = (pin) => {
        if (pin.length >= 4 || pin.length >= 6) {
          return !isNaN(pin) && pin !== "";
        }

        return false;
      };

      console.log(isValidPIN("12346")); //True
      console.log(isValidPIN("")); //False
      console.log(isValidPIN("a2bO")); //False
    },
  },
};
</script>

<style>
</style>