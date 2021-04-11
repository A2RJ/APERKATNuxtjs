<template>
  <div class="card-body">
    
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="id rkat"
      label-for="id_rkat"
    >
      <b-form-input
        v-model="form.id_rkat"
        id="id_rkat"
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
    </b-form-group>
    
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="iku child1"
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
      label="iku child2"
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
      label="rab"
      label-for="rab"
    >
      <b-form-input
        v-model="form.rab"
        id="rab"
        size="sm"
      ></b-form-input>
    </b-form-group>

    {{ status }}
    {{ history }}
    <button class="btn-sm btn-info float-right" @click="submit">Save</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    if (this.$route.name === "pengajuan-subordinate-edit-id") {
      this.form = {
        id_rkat: this.forms.id_rkat,
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
        token: this.$store.state.auth.user.token
      };
    }
  },
  data() {
    return {
      form: {
        id_rkat: null,
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
        token: this.$store.state.auth.user.token
      },
    };
  },
  computed: {
    ...mapState("subordinate", {
      forms: (state) => state.data,
      status: (state) => state.status,
      history: (state) => state.history,
      errors: (state) => state.errors,
    }),
  },
  methods: {
    ...mapActions("subordinate", [
      "storepengajuan",
      "getpengajuanID",
      "updatepengajuan",
    ]),
    submit() {
      if (this.$route.name === "pengajuan-subordinate-edit-id") {
        let form = Object.assign({ id: this.$route.params.id }, this.form);
        this.updatepengajuan(form).then(() => {
          this.$router.push("/pengajuan/subordinate/" + this.$store.state.auth.user.id_user);
        });
      } else {
        this.storepengajuan(this.form).then(() => {
          this.$router.push("/pengajuan/subordinate/" + this.$store.state.auth.user.id_user);
        });
      }
    },
  },
};
</script>

<style>
</style>