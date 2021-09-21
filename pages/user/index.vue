<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">User</h6>
    </div>
    <div class="card-body">
      <custom-table
        :items="items"
        :fields="fields"
        :html="key"
        :actions="actions"
      >
        <template v-slot:fullname="row">
          <p>{{ row.item.fullname | capitalize }}</p>
        </template>
        <template v-slot:created_at="row">
          <p>{{ row.item.created_at | convertDate }}</p>
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

        <template v-slot:Action="row">
          <NuxtLink
            class="btn btn-sm btn-outline-info mt-1"
            :to="'user/edit/' + row.item.id_user"
            :key="'edit' + row.index"
            >Ubah</NuxtLink
          >
          <button
            class="btn btn-sm btn-outline-danger mt-1"
            @click="deleteUser(row.item.id_user)"
          >
            Hapus
          </button>
        </template>
      </custom-table>
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
      key: "id_user",
      actions: [
        {
          name: "Tambah",
          type: "link",
          link: "user/add",
          color: "btn btn-sm btn-outline-primary mt-1 ml-2",
        },
        {
          name: "Reset",
          type: "func",
          func: "reset",
          color: "btn btn-sm btn-outline-primary mt-1 ml-2",
        },
        {
          name: "Print",
          type: "func",
          func: "print",
          color: "btn btn-sm btn-outline-primary mt-1 ml-2",
        },
        {
          name: "Select All",
          type: "func",
          func: "selectAll",
          color: "btn btn-sm btn-outline-primary mt-1 ml-2",
        },
        {
          name: "Clear Selected",
          type: "func",
          func: "clearSelected",
          color: "btn btn-sm btn-outline-primary mt-1 ml-2",
        },
        {
          name: "Delete Selected",
          type: "func",
          func: "deleteSelected",
          color: "btn btn-sm btn-outline-primary mt-1 ml-2",
        },
        {
          name: "Print Selected",
          type: "func",
          func: "printSelected",
          color: "btn btn-sm btn-outline-primary mt-1 ml-2",
        },
      ],
      fields: [
        { key: "fullname", label: "User" },
        { key: "nama_struktur", label: "Fakultas/Unit Pelaksana" },
        { key: "created_at", label: "Register Date" },
        "Action",
      ],
      items: [],
    };
  },
  computed: {
    ...mapState("user", {
      user: (state) => state.user,
    }),
  },
  mounted() {
    this.items = this.user;
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