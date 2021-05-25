<template>
  <div class="row">
    <div class="col-lg-3 mb-4">
      <div class="card bg-primary text-white shadow">
        <div class="card-body">
          Total Anggaran
          <div class="text-white-50 small">{{ 69696969 | numFormat }}</div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 mb-4">
      <div class="card bg-success text-white shadow">
        <div class="card-body">
          Sisa Anggaran
          <div class="text-white-50 small">{{ 69696969 | numFormat }}</div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 mb-4">
      <div class="card bg-info text-white shadow">
        <div class="card-body">
          Pengajuan diproses
          <div class="text-white-50 small">{{ 1 | numFormat }}</div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 mb-4">
      <div class="card bg-warning text-white shadow">
        <div class="card-body">
          Pengajuan diterima
          <div class="text-white-50 small">{{ 2 | numFormat }}</div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-8 col-lg-7">
          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Info</h6>
                </div>
                <div class="card-body">
                  <chart
                    ref="skills_chart"
                    :chart-data="chartData"
                    :options="options"
                  >
                  </chart>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-3 mb-4">
                  <div class="card bg-primary text-white shadow">
                    <div class="card-body">
                      Pengajuan I
                      <div class="text-white-50 small">#4e73df</div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 mb-4">
                  <div class="card bg-success text-white shadow">
                    <div class="card-body">
                      Pengajuan II
                      <div class="text-white-50 small">#1cc88a</div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 mb-4">
                  <div class="card bg-info text-white shadow">
                    <div class="card-body">
                      Pengajuan III
                      <div class="text-white-50 small">#33b9cc</div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 mb-4">
                  <div class="card bg-warning text-white shadow">
                    <div class="card-body">
                      Pengajuan IV
                      <div class="text-white-50 small">#f3c23e</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">
                LOOPING Pengajuan beserta status
              </h6>
            </div>
            <div class="card-body">
              <ul>
                <li>Pengajuan I</li>
                <li>Pengajuan II</li>
                <li>Pengajuan III</li>
                <li>Pengajuan IV</li>
                <li>Pengajuan V</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  async asyncData({ store, params }) {
    await Promise.all([store.dispatch("subordinate/getGrafik", params.index)]);
    return;
  },
  data() {
    return {
      options: {
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
      },
      chartData: {
        labels: ["skill1", "skill2", "skill3"],
        datasets: [
          {
            backgroundColor: [
              "rgb(255,73,93)",
              "rgb(255,244,93)",
              "rgb(23,244,255)",
            ],
            data: [100, 50, 50],
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("subordinate", {
      grafik: (state) => state.grafik
    }),
  },
  methods: {
    ...mapActions("subordinate", ["getGrafik"]),
  },
};
</script>

<style>
</style>