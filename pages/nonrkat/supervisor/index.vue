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
          <h6 class="m-0 font-weight-bold text-primary">
            Pengajuan Sub Divisi
          </h6>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <b-tabs content-class="mt-3" v-if="userLogin == 120">
            <b-tab title="Pencairan" active> </b-tab>
          </b-tabs>
          <b-tabs content-class="mt-3" v-else-if="userLogin == 121">
            <b-tab title="LPJ Keuangan" active> </b-tab>
          </b-tabs>
          <b-tabs content-class="mt-3" v-else>
            <b-tab title="Need Approval" active>
              <custom-table
                :items="subdivisineed"
                :fields="fields"
                :html="key"
                :actions="actions"
              >
                <template v-slot:fullname="row">
                  <p>
                    {{ row.item.fullname | capitalize }}
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
                <template v-slot:validasi_status="row">
                  <p v-if="row.item.validasi_status == 0">
                    <b-badge variant="danger"
                      >Ditolak: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 1">
                    <b-badge variant="warning"
                      >Input/Revisi: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 2">
                    <b-badge variant="success"
                      >Diterima: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 3">
                    <b-badge variant="success"
                      >Pencairan: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                </template>
                <template v-slot:created_at="row">
                  <p>{{ row.item.created_at | convertDate }}</p>
                </template>
                <template v-slot:actions="row">
                  <NuxtLink
                    class="btn btn-sm btn-outline-info"
                    :to="'edit/' + row.item.id_nonrkat"
                    :key="'edit' + row.index"
                    >Detail</NuxtLink
                  >
                </template>
              </custom-table>
            </b-tab>
            <b-tab title="LPJ Kegiatan" v-if="userLogin == 21">
              <custom-table
                :items="items"
                :fields="fields"
                :html="key"
                :actions="actions"
              >
                <template v-slot:fullname="row">
                  <p>
                    {{ row.item.fullname | capitalize }}
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
                <template v-slot:validasi_status="row">
                  <p v-if="row.item.validasi_status == 0">
                    <b-badge variant="danger"
                      >Ditolak: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 1">
                    <b-badge variant="warning"
                      >Input/Revisi: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 2">
                    <b-badge variant="success"
                      >Diterima: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 3">
                    <b-badge variant="success"
                      >Pencairan: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                </template>
                <template v-slot:created_at="row">
                  <p>{{ row.item.created_at | convertDate }}</p>
                </template>
                <template v-slot:actions="row">
                  <NuxtLink
                    class="btn btn-sm btn-outline-info"
                    :to="'edit/' + row.item.id_nonrkat"
                    :key="'edit' + row.index"
                    >Detail</NuxtLink
                  >
                </template>
              </custom-table>
            </b-tab>
            <b-tab title="On Progress">
              <custom-table
                :items="items"
                :fields="fields"
                :html="key"
                :actions="actions"
              >
                <template v-slot:fullname="row">
                  <p>
                    {{ row.item.fullname | capitalize }}
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
                <template v-slot:validasi_status="row">
                  <p v-if="row.item.validasi_status == 0">
                    <b-badge variant="danger"
                      >Ditolak: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 1">
                    <b-badge variant="warning"
                      >Input/Revisi: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 2">
                    <b-badge variant="success"
                      >Diterima: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 3">
                    <b-badge variant="success"
                      >Pencairan: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                </template>
                <template v-slot:created_at="row">
                  <p>{{ row.item.created_at | convertDate }}</p>
                </template>
                <template v-slot:actions="row">
                  <NuxtLink
                    class="btn btn-sm btn-outline-info"
                    :to="'edit/' + row.item.id_nonrkat"
                    :key="'edit' + row.index"
                    >Detail</NuxtLink
                  >
                </template>
              </custom-table>
            </b-tab>
            <b-tab title="Completed">
              <custom-table
                :items="items"
                :fields="fields"
                :html="key"
                :actions="actions"
              >
                <template v-slot:fullname="row">
                  <p>
                    {{ row.item.fullname | capitalize }}
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
                <template v-slot:validasi_status="row">
                  <p v-if="row.item.validasi_status == 0">
                    <b-badge variant="danger"
                      >Ditolak: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 1">
                    <b-badge variant="warning"
                      >Input/Revisi: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 2">
                    <b-badge variant="success"
                      >Diterima: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                  <p v-if="row.item.validasi_status == 3">
                    <b-badge variant="success"
                      >Pencairan: {{ row.item.nama_status }}</b-badge
                    >
                  </p>
                </template>
                <template v-slot:created_at="row">
                  <p>{{ row.item.created_at | convertDate }}</p>
                </template>
                <template v-slot:actions="row">
                  <NuxtLink
                    class="btn btn-sm btn-outline-info"
                    :to="'edit/' + row.item.id_nonrkat"
                    :key="'edit' + row.index"
                    >Detail</NuxtLink
                  >
                </template>
              </custom-table>
            </b-tab>
          </b-tabs>
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
        "nonrkat/getSubdivisi",
        store.$auth.$state.user[0].id_user
      ),
      store.dispatch(
        "nonrkat/subDivisiNeed",
        store.$auth.$state.user[0].id_user
      )
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
        { key: "validasi_status", label: "Status Pengajuan" },
        { key: "created_at", label: "Waktu Pengajuan" },
        "actions"
      ],
      items: [],
      subdivisineed: [],
      userLogin: this.$store.state.auth.user[0].id_user
    };
  },
  computed: {
    ...mapState("nonrkat", {
      subdivisinon: state => state.subdivisinon,
      subdivisineedData: state => state.subdivisineedNonrkat
    })
  },
  mounted() {
    this.items = this.subdivisinon;
    this.subdivisineed = this.subdivisineedData;
  },
  methods: {
    ...mapActions("nonrkat", ["getSubdivisi"]),
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status_message === 0) return "table-success";
    }
  }
};
</script>

<style></style>
