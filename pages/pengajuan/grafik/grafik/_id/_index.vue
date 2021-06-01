<template>
  <div class="row mb-4">
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
                {{ grafik.data.user.nama_struktur }} <br> {{ grafik.data.user.email }} <br> {{ grafik.data.user.nomor_wa }}
              </div>
              <div
                v-if="
                  grafik.data.user.nama_struktur_child1 !== '0' &&
                  grafik.data.user.nama_struktur_child2 == '0'
                "
              >
                {{ grafik.data.user.nama_struktur_child1 }} <br> {{ grafik.data.user.email }} <br> {{ grafik.data.user.nomor_wa }}
              </div>
              <div
                v-if="
                  grafik.data.user.nama_struktur_child1 !== '0' &&
                  grafik.data.user.nama_struktur_child2 !== '0'
                "
              >
                {{ grafik.data.user.nama_struktur_child2 }} <br> {{ grafik.data.user.email }} <br> {{ grafik.data.user.nomor_wa }}
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
      {{ grafik.data.user }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  async asyncData({ store, params }) {
    await Promise.all([store.dispatch("subordinate/getGrafik", params.id)]);
    return;
  },
  data() {
    return {
      options: {},
      chartData: {},
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
  },
};
</script>

<style>
</style>