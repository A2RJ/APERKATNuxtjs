<template>
  <div class="row">
    <div class="col-xl-12 col-lg-12" v-if="this.$route.params.id">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Status</h6>
        </div>
        <div class="card-body">
          <ul
            v-for="(status, index) in status"
            :key="index"
          >
            <li
              :class="status.status ? 'text-success' : 'text-warning'"
              style="
                display: block;
                flex: 0 1 auto; /* Default */
                list-style-type: none;
              "
            >
              {{ status.nama_struktur }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      :class="
        this.$route.params.id ? 'col-xl-8 col-lg-7' : 'col-xl-12 col-lg-12'
      "
    >
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Pengajuan</h6>
        </div>
        <div class="card-body">
          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Kode RKAT"
            label-for="kode_rkat"
          >
            <b-form-input
              v-model="form.kode_rkat"
              id="kode_rkat"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="target capaian"
            label-for="target_capaian"
          >
            <b-form-input
              v-model="form.target_capaian"
              id="target_capaian"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="bentuk pelaksanaan program"
            label-for="bentuk_pelaksanaan_program"
          >
            <b-form-input
              v-model="form.bentuk_pelaksanaan_program"
              id="bentuk_pelaksanaan_program"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="tempat program"
            label-for="tempat_program"
          >
            <b-form-input
              v-model="form.tempat_program"
              id="tempat_program"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="tanggal"
            label-for="tanggal"
          >
            <b-form-input
              v-model="form.tanggal"
              id="tanggal"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="bidang terkait"
            label-for="bidang_terkait"
          >
            <b-form-input
              v-model="form.bidang_terkait"
              id="bidang_terkait"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="IKU"
            label-for="id_iku_parent"
          >
            <b-form-input
              v-model="form.id_iku_parent"
              id="id_iku_parent"
              size="sm"
            ></b-form-input>
            <!-- <b-form-select
              v-model="selected"
              :options="iku"
              size="sm"
              class="mt-3"
            ></b-form-select> -->
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label=""
            label-for="id_iku_child1"
          >
            <b-form-input
              v-model="form.id_iku_child1"
              id="id_iku_child1"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label=""
            label-for="id_iku_child2"
          >
            <b-form-input
              v-model="form.id_iku_child2"
              id="id_iku_child2"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="biaya program"
            label-for="biaya_program"
          >
            <b-form-input
              v-model="form.biaya_program"
              id="biaya_program"
              size="sm"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="No.Rek Penerima"
            label-for="norek"
          >
            <b-form-input
              v-model="form.norek"
              id="norek"
              size="sm"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="rab"
            label-for="rab"
          >
            <b-form-input v-model="form.rab" id="rab" size="sm"></b-form-input>
          </b-form-group>

          <button
            class="btn-sm btn-info float-right"
            v-show="button"
            @click="submit"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div class="col-xl-4 col-lg-5" v-if="this.$route.params.id">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">History</h6>
        </div>
        <div class="card-body">
          <ul v-for="(history, index) in history" :key="index">
            <li :class="history.status_validasi ? 'text-primary' : 'text-info'">
              {{ history.created_at }}
              {{ history.status_validasi == 0 ? "Proccess" : "Approved" }} -
              {{ history.message }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  created() {
    if (this.$route.name == "pengajuan-subordinate-edit-id") {
      this.form = {
        kode_rkat: this.forms.kode_rkat,
        target_capaian: this.forms.target_capaian,
        bentuk_pelaksanaan_program: this.forms.bentuk_pelaksanaan_program,
        tempat_program: this.forms.tempat_program,
        tanggal: this.forms.tanggal,
        bidang_terkait: this.forms.bidang_terkait,
        id_iku_parent: this.forms.id_iku_parent,
        id_iku_child1: this.forms.id_iku_child1,
        id_iku_child2: this.forms.id_iku_child2,
        biaya_program: this.forms.biaya_program,
        rab: this.forms.rab,
        status_pengajuan: "progress",
        id_user: this.form.id_user,
      };
    } else if (this.$route.name == "pengajuan-supervisor-edit-id") {
      this.button = false;
      this.form = {
        kode_rkat: this.forms.kode_rkat,
        target_capaian: this.forms.target_capaian,
        bentuk_pelaksanaan_program: this.forms.bentuk_pelaksanaan_program,
        tempat_program: this.forms.tempat_program,
        tanggal: this.forms.tanggal,
        bidang_terkait: this.forms.bidang_terkait,
        id_iku_parent: this.forms.id_iku_parent,
        id_iku_child1: this.forms.id_iku_child1,
        id_iku_child2: this.forms.id_iku_child2,
        biaya_program: this.forms.biaya_program,
        rab: this.forms.rab,
        status_pengajuan: "progress",
        id_user: this.form.id_user,
      };
      for (let index = 0; index < status.length; index++) {
        if (status[index]['id_user'] == this.form.id_user) {
          
        }
      }
    } 
  },
  data() {
    return {
      form: {
        kode_rkat: null,
        target_capaian: null,
        bentuk_pelaksanaan_program: null,
        tempat_program: null,
        tanggal: null,
        bidang_terkait: null,
        id_iku_parent: null,
        id_iku_child1: null,
        id_iku_child2: null,
        biaya_program: null,
        rab: null,
        status_pengajuan: "progress",
        id_user: this.$store.state.auth.user[0].id_user,
      },
      button: true,
      selected: null,
      options: this.iku,
    };
  },
  computed: {
    ...mapState("subordinate", {
      forms: (state) => state.data,
      status: (state) => state.status,
      history: (state) => state.history,
      errors: (state) => state.errors,
      iku: (state) => state.iku,
    }),
  },
  methods: {
    ...mapActions("subordinate", [
      "storepengajuan",
      "getpengajuanID",
      "updatepengajuan",
    ]),
    ...mapMutations(["SET_STATUS", "SET_HISTORY"]),
    submit() {
      if (this.$route.name === "pengajuan-subordinate-edit-id") {
        let form = Object.assign({ id: this.$route.params.id }, this.form);
        this.updatepengajuan(form).then(() => {
          this.$router.push(
            "/pengajuan/subordinate/" + this.$store.state.auth.user[0].id_user
          );
        });
      } else if (this.$route.name === "pengajuan-supervisor-edit-id") {
        let form = Object.assign({ id: this.$route.params.id }, this.form);
        this.updatepengajuan(form).then(() => {
          this.$router.push(
            "/pengajuan/supervisor/" + this.$store.state.auth.user[0].id_user
          );
        });
      } else {
        this.storepengajuan(this.form).then(() => {
          this.$router.push(
            "/pengajuan/subordinate/" + this.$store.state.auth.user[0].id_user
          );
        });
      }
    },
  },
};
</script>

<style>
</style>