<template>
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div
          class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">
            Data Pengajuan Bawahan
          </h6>
        </div>
        <!-- Card Body -->
        <div class="card-body">
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
            :items="subordinate"
            :fields="fields"
            :filter="filter"
            :per-page="perPage"
            :current-page="currentPage"
            show-empty
          >
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
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch("subordinate/getsubordinates", params.index),
    ]);
    return;
  },
  data() {
    return {
      fields: [
        { key: "fullname", label: "User" },
        // { key: "nama_struktur_child2", label: "Prodi/Unit Pelaksana" },
        { key: "nama_struktur_child1", label: "Fakultas/Unit Pelaksana" },
        { key: "created_at", label: "Waktu Pengajuan" },
        "actions",
      ],

      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      filter: null,
      currentPage: 1,
      items: this.subordinate,
    };
  },
  computed: {
    ...mapState("subordinate", {
      subordinate: (state) => state.subordinate,
    }),
    rows() {
      return this.subordinate.length;
    },
  },
  mounted() {},
  methods: {
    ...mapMutations(["SET_SUBORDINATE"]),
    ...mapActions("subordinate", ["getsubordinates"]),
  },
};
</script>

<style>
</style>