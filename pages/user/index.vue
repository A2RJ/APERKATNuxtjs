<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
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
          <NuxtLink class="dropdown-item" to="/user/add">Add RKAT</NuxtLink>
        </div>
      </div>
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
      <!-- sticky-header -->
      <b-table
        responsive
        head-variant="light"
        hover
        id="my-table"
        :items="user"
        :fields="fields"
        :filter="filter"
        :per-page="perPage"
        :current-page="currentPage"
        show-empty
      >
        
        <template v-slot:cell(nama_struktur)="row">
          <p
            v-if="row.item.nama_struktur_child2 !== '0' && row.item.nama_struktur_child1 !== '0'"
            class="text-uppercase"
          >
            {{ row.item.nama_struktur_child1 }}
          </p>
          <p
            v-if="row.item.nama_struktur_child1 !== '0' && row.item.nama_struktur_child2 == '0'"
            class="text-uppercase"
          >
            {{ row.item.nama_struktur }}
          </p>
          <p
            v-if="row.item.nama_struktur == 'Rektor' && row.item.nama_struktur_child1 == '0'"
            class="text-uppercase"
          >
            {{ row.item.nama_struktur }}
          </p>
          <p
            v-if="row.item.nama_struktur == 'Warek' && row.item.nama_struktur_child1 == '0'"
            class="text-uppercase"
          >
            Rektor
          </p>
          <p
            v-if="row.item.nama_struktur == 'Direktur Keuangan' && row.item.nama_struktur_child1 == '0'"
            class="text-uppercase"
          >
            Warek
          </p>
          <p
            v-if="row.item.nama_struktur == 'Sekniv' && row.item.nama_struktur_child1 == '0'"
            class="text-uppercase"
          >
            Sekniv
          </p>
        </template>

        <template v-slot:cell(Action)="row">
          <NuxtLink
            class="btn-sm btn-warning m-2"
            :to="'user/edit/' + row.item.id_user"
            :key="'edit' + row.index"
            >Detail</NuxtLink
          >
          <button class="btn-sm btn-danger mt-2" @click="deleteUser(row)">
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
        { key: "nama_struktur", label: "Fakultas/Unit Pelaksana" },
        { key: "created_at", label: "Register Date" },
        "Action",
      ],
      perPage: 10,
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
    rows() {
      return this.user.length;
    },
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["getuser", "deleteuser"]),
    deleteUser(row) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteuser(row.item.id_user)
            .then(() => {
              this.$swal({
                width: 300,
                icon: "success",
                title: "Congrats!",
                text: "User data was deleted successfully",
              });
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
  },
};
</script>

<style>
</style>