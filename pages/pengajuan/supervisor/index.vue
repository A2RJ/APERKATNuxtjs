<template>
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Need Approval" active>
            <custom-table
              :items="itemsneed"
              :fields="fields"
              :html="key"
              :actions="actions"
            >
              <template v-slot:fullname="row">
                <p>
                  {{ row.item.fullname | capitalize }} <br>
                  <b-badge v-if="row.item.validasi_status == 0" variant="danger"
                    >Ditolak: {{ row.item.nama_status }}</b-badge
                  >
                  <b-badge
                    v-if="row.item.validasi_status == 1"
                    variant="warning"
                    >Input/Revisi: {{ row.item.nama_status }}</b-badge
                  >
                  <b-badge
                    v-if="row.item.validasi_status == 2"
                    variant="success"
                    >Diterima: {{ row.item.nama_status }}</b-badge
                  >
                  <b-badge
                    v-if="row.item.validasi_status == 3"
                    variant="success"
                    >Pencairan: {{ row.item.nama_status }}</b-badge
                  >
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
              <template v-slot:created_at="row">
                <p>{{ row.item.created_at | convertDate }}</p>
              </template>
              <template v-slot:actions="row">
                <NuxtLink
                  class="btn btn-sm btn-outline-info"
                  :to="'edit/' + row.item.id_pengajuan"
                  :key="'edit' + row.index"
                  >Detail</NuxtLink
                >
              </template>
            </custom-table></b-tab
          >
          <b-tab title="On Proggress">
            <custom-table
              :items="items"
              :fields="fields"
              :html="key"
              :actions="actions"
            >
              <template v-slot:fullname="row">
                <p>
                  {{ row.item.fullname | capitalize }} <br>
                  <b-badge v-if="row.item.validasi_status == 0" variant="danger"
                    >Ditolak: {{ row.item.nama_status }}</b-badge
                  >
                  <b-badge
                    v-if="row.item.validasi_status == 1"
                    variant="warning"
                    >Input/Revisi: {{ row.item.nama_status }}</b-badge
                  >
                  <b-badge
                    v-if="row.item.validasi_status == 2"
                    variant="success"
                    >Diterima: {{ row.item.nama_status }}</b-badge
                  >
                  <b-badge
                    v-if="row.item.validasi_status == 3"
                    variant="success"
                    >Pencairan: {{ row.item.nama_status }}</b-badge
                  >
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
              <template v-slot:created_at="row">
                <p>{{ row.item.created_at | convertDate }}</p>
              </template>
              <template v-slot:actions="row">
                <NuxtLink
                  class="btn btn-sm btn-outline-info"
                  :to="'edit/' + row.item.id_pengajuan"
                  :key="'edit' + row.index"
                  >Detail</NuxtLink
                >
              </template>
            </custom-table>
          </b-tab>
          <b-tab title="Completed">
            <b-col class="my-1 float-right">
              <b-form-group
                label="Filter"
                label-for="filter-input"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-form-datepicker
                  id="filter1"
                  v-model="filter1"
                  class="mb-2"
                  size="sm"
                  today-button
                  reset-button
                  close-button
                  locale="IDN"
                ></b-form-datepicker>
                <b-form-datepicker
                  id="filter2"
                  v-model="filter2"
                  class="mb-2"
                  size="sm"
                  today-button
                  reset-button
                  close-button
                  locale="IDN"
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <custom-table
              :items="itemsSelesai"
              :fields="fields"
              :html="key"
              :actions="actions"
            >
              <template v-slot:fullname="row">
                <p>
                  {{ row.item.fullname | capitalize }} <br>
                  <b-badge v-if="row.item.validasi_status == 0" variant="danger"
                    >Ditolak: {{ row.item.nama_status }}</b-badge
                  >
                  <b-badge
                    v-if="row.item.validasi_status == 1"
                    variant="warning"
                    >Input/Revisi: {{ row.item.nama_status }}</b-badge
                  >
                  <b-badge
                    v-if="row.item.validasi_status == 2"
                    variant="success"
                    >Diterima: {{ row.item.nama_status }}</b-badge
                  >
                  <b-badge
                    v-if="row.item.validasi_status == 3"
                    variant="success"
                    >Pencairan: {{ row.item.nama_status }}</b-badge
                  >
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
              <template v-slot:created_at="row">
                <p>{{ row.item.created_at | convertDate }}</p>
              </template>
              <template v-slot:actions="row">
                <NuxtLink
                  class="btn btn-sm btn-outline-info"
                  :to="'edit/' + row.item.id_pengajuan"
                  :key="'edit' + row.index"
                  >Detail</NuxtLink
                >
              </template>
            </custom-table>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch(
        "subordinate/pengajuanNeedApproved",
        store.$auth.$state.user[0].id_user
      ),
      store.dispatch(
        "subordinate/getsubordinates",
        store.$auth.$state.user[0].id_user
      ),
      store.dispatch(
        "subordinate/pengajuanSelesai",
        store.$auth.$state.user[0].id_user
      ),
    ]);
    return;
  },
  data() {
    return {
      key: "id_pengajuan",
      actions: [],
      fields: [
        { key: "fullname", label: "User" },
        { key: "kode_rkat", label: "Kode RKAT " },
        { key: "nama_struktur", label: "Pelaksana" },
        // { key: "validasi_status", label: "Status Pengajuan" },
        { key: "created_at", label: "Waktu Pengajuan" },
        "actions",
      ],
      items: [],
      itemsneed: [],

      data: [],
      login: null,
      filter1: null,
      filter2: null,
      itemsSelesai: [],
      itemsCadangan: [],
    };
  },
  computed: {
    ...mapState("subordinate", {
      subordinate: (state) => state.subordinate,
      subordinateneed: (state) => state.subordinateneed,
      peng: (state) => state.pengajuanDir,
    }),
  },
  mounted() {
    this.items = this.subordinate;
    this.itemsneed = this.subordinateneed;

    this.itemsSelesai = this.peng;
    this.itemsCadangan = this.peng;
    this.login = this.$store.state.auth.user[0].id_user;
  },
  methods: {
    ...mapActions("subordinate", ["getpengajuan", "pengajuanSelesai"]),
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status_message === 0) return "table-success";
    },
    filter() {
      if (this.filter1 && this.filter2) {
        var startDate = new Date(this.filter1),
          endDate = new Date(this.filter2),
          result = [];

        if (this.itemsSelesai.length > this.itemsCadangan.length) {
          var result = this.itemsSelesai;
        } else {
          var result = this.itemsCadangan;
        }

        result = result.filter(
          (a) =>
            new Date(a.created_at) >= startDate &&
            new Date(a.created_at) <= endDate
        );
        this.itemsSelesai = result;
      } else {
        this.reset();
      }
    },
    reset() {
      this.items = this.itemsCadangan;
    },
  },
  watch: {
    filter1: function () {
      this.filter();
    },
    filter2: function () {
      this.filter();
    },
  },
};
</script>

<style>
</style>