<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
    </div>
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
            :items="user"
            :fields="fields"
            :filter="filter"
            :per-page="perPage"
            :current-page="currentPage"
            show-empty
      >
        <template v-slot:cell(Detail)="row">
          <NuxtLink
            class="btn-sm btn-warning mb-2"
            :to="'rkat/edit/' + row.item.id_rkat"
            :key="'edit' + row.index"
            >Detail</NuxtLink
          >
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch("user/getuser")]);
    return;
  },
  data() {
    return {
      fields: [
        { key: "fullname", label: "User" },
        { key: "nama_struktur_child1", label: "Fakultas/Unit Pelaksana" },
        { key: "created_at", label: "Register Date" },
        "Detail",
      ],
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      filter: null,
      currentPage: 1,
    };
  },
  components: {},
  computed: {
    ...mapState("user", {
      user: (state) => state.user,
    }),
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["getuser", "deleteuser"]),
    destroyrkat() {
      // this.deleterkat(row.item.id_rkat).catch((e) => {
      //   console.log(e);
      // });
    },
  },
};
</script>

<style>
</style>