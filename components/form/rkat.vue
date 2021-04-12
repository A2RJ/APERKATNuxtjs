<template>
  <div class="card-body">
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Fakultas/Unit Pelaksana"
      label-for="id_user"
    >
      <b-form-input
        v-model="form.id_user"
        id="id_user"
        size="sm"
      ></b-form-input>
    </b-form-group>

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
      label="sasaran strategi"
      label-for="sasaran_strategi"
    >
      <b-form-input
        v-model="form.sasaran_strategi"
        id="sasaran_strategi"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="indikator sasaran strategi"
      label-for="indikator_sasaran_strategi"
    >
      <b-form-input
        v-model="form.indikator_sasaran_strategi"
        id="indikator_sasaran_strategi"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="nama program"
      label-for="nama_program"
    >
      <b-form-input
        v-model="form.nama_program"
        id="nama_program"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="program kerja"
      label-for="program_kerja"
    >
      <b-form-input
        v-model="form.program_kerja"
        id="program_kerja"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="deskripsi"
      label-for="deskripsi"
    >
      <b-form-input
        v-model="form.deskripsi"
        id="deskripsi"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="tujuan"
      label-for="tujuan"
    >
      <b-form-input v-model="form.tujuan" id="tujuan" size="sm"></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="mulai program"
      label-for="mulai_program"
    >
      <b-form-input
        v-model="form.mulai_program"
        id="mulai_program"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="selesai program"
      label-for="selesai_program"
    >
      <b-form-input
        v-model="form.selesai_program"
        id="selesai_program"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="tempat"
      label-for="tempat"
    >
      <b-form-input v-model="form.tempat" id="tempat" size="sm"></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="sumber anggaran"
      label-for="sumber_anggaran"
    >
      <b-form-input
        v-model="form.sumber_anggaran"
        id="sumber_anggaran"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="rencara anggaran"
      label-for="rencara_anggaran"
    >
      <b-form-input
        v-model="form.rencara_anggaran"
        id="rencara_anggaran"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="total anggaran"
      label-for="total_anggaran"
    >
      <b-form-input
        v-model="form.total_anggaran"
        id="total_anggaran"
        size="sm"
      ></b-form-input>
    </b-form-group>
    <!-- {{ errors }} -->
    <button class="btn-sm btn-info float-right" @click="submit">Save</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    if (this.$route.name === "rkat-edit-id") {
      this.form = {
        id_user: this.forms.id_user,
        kode_rkat: this.forms.kode_rkat,
        sasaran_strategi: this.forms.sasaran_strategi,
        indikator_sasaran_strategi: this.forms.indikator_sasaran_strategi,
        nama_program: this.forms.nama_program,
        program_kerja: this.forms.program_kerja,
        deskripsi: this.forms.deskripsi,
        tujuan: this.forms.tujuan,
        mulai_program: this.forms.mulai_program,
        selesai_program: this.forms.selesai_program,
        tempat: this.forms.tempat,
        sumber_anggaran: this.forms.sumber_anggaran,
        rencara_anggaran: this.forms.rencara_anggaran,
        total_anggaran: this.forms.total_anggaran,
        token: this.$store.state.auth.user[0].token
      };
    }
  },
  data() {
    return {
      form: {
        id_user: null,
        kode_rkat: null,
        sasaran_strategi: null,
        indikator_sasaran_strategi: null,
        nama_program: null,
        program_kerja: null,
        deskripsi: null,
        tujuan: null,
        mulai_program: null,
        selesai_program: null,
        tempat: null,
        sumber_anggaran: null,
        rencara_anggaran: null,
        total_anggaran: null,
        token: this.$store.state.auth.user[0].token
      },
    };
  },
  computed: {
    ...mapState("rkat", {
      forms: (state) => state.data,
      errors: (state) => state.errors,
    }),
  },
  methods: {
    ...mapActions("rkat", ["storerkat", "getrkatID", "updaterkat"]),
    submit() {
      if (this.$route.name === "rkat-edit-id") {
        let form = Object.assign({ id: this.$route.params.id }, this.form);
        this.updaterkat(form).then(() => {
          this.$router.push("/rkat");
        });
      } else {
        this.storerkat(this.form).then(() => {
          this.$router.push("/rkat");
        });
      }
    },
  },
};
</script>

<style>
</style>