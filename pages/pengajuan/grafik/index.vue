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
          <h6 class="m-0 font-weight-bold text-primary">Grafik Pengajuan</h6>
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
          <!-- sticky-header -->
          <b-table
            id="my-table"
            head-variant="light"
            hover
            responsive
            show-empty
            :items="items"
            :fields="fields"
            :filter="filter"
            :per-page="perPage"
            :current-page="currentPage"
          >
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
             <template v-slot:cell(created_at)="row">
              <p>{{ row.item.created_at | convertDate }}</p>
            </template>
            <template v-slot:cell(actions)="row">
              <NuxtLink
                class="btn btn-sm btn-outline-info"
                :to="'grafik/' + row.item.id_user"
                :key="'edit' + row.index"
                >Detail</NuxtLink
              >
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
        "subordinate/getSubordinatesGrafik",
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
        { key: "created_at", label: "Waktu Pengajuan" },
        "actions",
      ],

      perPage: 2,
      pageOptions: [10, 15, 20, { value: 100, text: "Show a lot" }],
      filter: null,
      currentPage: 1,
      items: [],
    };
  },
  computed: {
    ...mapState("subordinate", {
      subordinatesGrafik: (state) => state.subordinatesGrafik,
    }),
    rows() {
      return this.subordinatesGrafik.data.length;
    },
  },
  mounted() {
    this.items = this.subordinatesGrafik.data;
  },
  methods: {
    ...mapActions("subordinate", ["getpengajuan"]),
  },
};
</script>

<style>
</style>