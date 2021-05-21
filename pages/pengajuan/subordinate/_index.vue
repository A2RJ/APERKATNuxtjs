<template>
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div
          class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">Pengajuan</h6>
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
              <NuxtLink class="dropdown-item" to="add"
                >Tambah Pengajuan</NuxtLink
              >
              <NuxtLink class="dropdown-item" to="/rkat/reset"
                >Reset Pengajuan</NuxtLink
              >
            </div>
          </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <b-alert
            :show="dismissCountDown"
            dismissible
            :variant="alertNotif.color"
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
          >
            <p>{{ alertNotif.message }}</p>
            <b-progress
              variant="warning"
              :max="dismissSecs"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
          </b-alert>
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
          <b-table
            responsive
            head-variant="light"
            sticky-header
            hover
            id="my-table"
            :items="pengajuan"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :filter="filter"
            show-empty
          >
            <template v-slot:cell(nama_struktur_child1)="row">
              <p
                v-if="row.item.nama_struktur_child1 == 0"
                class="text-uppercase"
              >
                {{ row.item.fullname }}
              </p>
              <p v-else class="text-uppercase">
                {{ row.item.nama_struktur_child1 }}
              </p>
            </template>
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
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch("subordinate/getpengajuan", params.index),
    ]);
    return;
  },
  data() {
    return {
      fields: [
        { key: "fullname", label: "User" },
        { key: "nama_struktur_child1", label: "Fakultas/Unit Pelaksana" },
        { key: "created_at", label: "Waktu Pengajuan" },
        "actions",
      ],

      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      filter: null,
      currentPage: 1,
      items: this.pengajuan,
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      alertNotif: {
        color: null,
        message: null,
      },
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
      this.deletepengajuan(row.item.id_pengajuan)
        .then(() => {
          this.alertNotif.color = "success";
          this.alertNotif.message = "Pengajuan data was deleted";
          this.dismissCountDown = this.dismissSecs;
          this.getpengajuan(this.$route.params.index);
        })
        .catch((e) => {
          this.alertNotif.color = "warning";
          this.alertNotif.message = e.data;
          this.dismissCountDown = this.dismissSecs;
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>

<style>
</style>