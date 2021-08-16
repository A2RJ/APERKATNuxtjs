<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">User</h6>
    </div>
    <div class="card-body">
      <div class="mb-3">
        <NuxtLink class="btn btn-sm btn-outline-primary mt-1" to="/user/add"
          >Tambah User</NuxtLink
        >
        <b-button variant="outline-info btn-sm mt-1" @click="deleteAll"
          >Reset User</b-button
        >
      </div>
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
      <!-- <template #cell(index)="data">
            {{ data.index + 1 }}
          </template> -->
        <template v-slot:cell(fullname)="row">
          <p>{{ row.item.fullname | capitalize }}</p>
        </template>
        <template v-slot:cell(created_at)="row">
          <p>{{ row.item.created_at | convertDate }}</p>
        </template>
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

        <template v-slot:cell(Action)="row">
          <NuxtLink
            class="btn btn-sm btn-outline-info mt-1"
            :to="'user/edit/' + row.item.id_user"
            :key="'edit' + row.index"
            >Ubah</NuxtLink
          >
          <button
            class="btn btn-sm btn-outline-danger mt-1"
            @click="deleteUser(row)"
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
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  async asyncData({ store }) {
    await Promise.all([store.dispatch("user/getuser")]);
    return;
  },
  data() {
    return {
      fields: [
        // { key: "index", label: "No."},
        { key: "fullname", label: "User" },
        { key: "nama_struktur", label: "Fakultas/Unit Pelaksana" },
        { key: "created_at", label: "Register Date" },
        "Action",
      ],
      perPage: 10,
      pageOptions: [5, 10, 15, 20, { value: 100, text: "Show a lot" }],
      filter: null,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState("user", {
      user: (state) => state.user,
    }),
    rows() {
      return this.user.length;
    },
  },
  mounted() {
  },
  methods: {
    ...mapActions("user", ["getuser", "deleteuser"]),
    deleteUser(row) {
      this.$swal({
        title: "Warning!",
        text: "Yakin menghapus user ini?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteuser(row.item.id_user)
            .then(() => {
              this.$swal({
                width: 300,
                icon: "success",
                title: "Congrats!",
                text: "User data telah dihapus",
              });
              this.$nuxt.refresh();
            })
            .catch(() => {
              this.$swal({
                width: 300,
                icon: "error",
                title: "Oops...",
                text: "Cek server atau koneksi anda",
              });
            });
        }
      });
    },
    deleteAll() {
      this.$swal({
        title: "Warning!",
        text: "Yakin menghapus user ini?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios
            .post("/user/destroy")
            .then(() => {
              this.$swal({
                width: 300,
                icon: "success",
                title: "Congrats!",
                text: "User data telah dihapus",
              });
              this.$nuxt.refresh();
            })
            .catch(() => {
              this.$swal({
                width: 300,
                icon: "error",
                title: "Oops...",
                text: "Cek server atau koneksi anda",
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