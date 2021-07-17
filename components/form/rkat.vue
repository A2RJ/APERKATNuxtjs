<template>
  <div class="card-body">
    <b-button
      v-if="this.$route.params.id"
      variant="outline-success btn-sm mb-3"
      @click="download"
      >Download RKAT</b-button
    >
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Fakultas/Unit Pelaksana"
      label-for="id_user"
      :class="{ 'form-group--error': $v.form.id_user.$error }"
    >
      <!-- :state="$v.form.id_user.required" -->
      <b-form-select
        v-model.trim="$v.form.id_user.$model"
        :options="options"
        size="sm"
        class="mt-3"
        name="unit"
      ></b-form-select>
      <b-form-text id="id_user" v-if="!$v.form.id_user.required">
        <i class="text-danger">Fakultas/Unit Pelaksana is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Kode RKAT"
      label-for="kode_rkat"
      :class="{ 'form-group--error': $v.form.kode_rkat.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.kode_rkat.$model"
        id="kode_rkat"
        size="sm"
      ></b-form-input>
      <b-form-text id="kode_rkat" v-if="!$v.form.kode_rkat.required">
        <i class="text-danger">Kode RKAT harus diisi</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="sasaran strategi"
      label-for="sasaran_strategi"
      :class="{ 'form-group--error': $v.form.sasaran_strategi.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.sasaran_strategi.$model"
        id="sasaran_strategi"
        size="sm"
      ></b-form-input>
      <b-form-text
        id="sasaran_strategi"
        v-if="!$v.form.sasaran_strategi.required"
      >
        <i class="text-danger">Sasaran strategi is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="indikator sasaran strategi"
      label-for="indikator_sasaran_strategi"
      :class="{
        'form-group--error': $v.form.indikator_sasaran_strategi.$error,
      }"
    >
      <b-form-input
        v-model.trim="$v.form.indikator_sasaran_strategi.$model"
        id="indikator_sasaran_strategi"
        size="sm"
      ></b-form-input>
      <b-form-text
        id="indikator_sasaran_strategi"
        v-if="!$v.form.indikator_sasaran_strategi.required"
      >
        <i class="text-danger">Indikator sasaran strategi is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="nama program"
      label-for="nama_program"
      :class="{ 'form-group--error': $v.form.nama_program.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.nama_program.$model"
        id="nama_program"
        size="sm"
      ></b-form-input>
      <b-form-text id="nama_program" v-if="!$v.form.nama_program.required">
        <i class="text-danger">Nama program is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="program kerja"
      label-for="program_kerja"
      :class="{ 'form-group--error': $v.form.program_kerja.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.program_kerja.$model"
        id="program_kerja"
        size="sm"
      ></b-form-input>
      <b-form-text id="program_kerja" v-if="!$v.form.program_kerja.required">
        <i class="text-danger">Program kerja is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="deskripsi"
      label-for="deskripsi"
      :class="{ 'form-group--error': $v.form.deskripsi.$error }"
    >
      <b-form-textarea
        v-model.trim="$v.form.deskripsi.$model"
        id="textarea"
        placeholder="Enter something..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-form-text id="deskripsi" v-if="!$v.form.deskripsi.required">
        <i class="text-danger">Deskripsi is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="tujuan"
      label-for="tujuan"
      :class="{ 'form-group--error': $v.form.tujuan.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.tujuan.$model"
        id="tujuan"
        size="sm"
      ></b-form-input>
      <b-form-text id="tujuan" v-if="!$v.form.tujuan.required">
        <i class="text-danger">Tujuan is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="mulai program"
      label-for="mulai_program"
      :class="{ 'form-group--error': $v.form.mulai_program.$error }"
    >
      <b-form-datepicker
        id="mulai_program"
        v-model.trim="$v.form.mulai_program.$model"
        class="mb-2"
        size="sm"
        today-button
        reset-button
        close-button
        locale="IDN"
      ></b-form-datepicker>
      <b-form-text id="mulai_program" v-if="!$v.form.mulai_program.required">
        <i class="text-danger">Mulai program is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="selesai program"
      label-for="selesai_program"
      :class="{ 'form-group--error': $v.form.selesai_program.$error }"
    >
      <b-form-datepicker
        id="selesai_program"
        v-model.trim="$v.form.selesai_program.$model"
        class="mb-2"
        size="sm"
        today-button
        reset-button
        close-button
        locale="IDN"
      ></b-form-datepicker>
      <b-form-text
        id="selesai_program"
        v-if="!$v.form.selesai_program.required"
      >
        <i class="text-danger">Selesai program is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="tempat"
      label-for="tempat"
      :class="{ 'form-group--error': $v.form.tempat.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.tempat.$model"
        id="tempat"
        size="sm"
      ></b-form-input>
      <b-form-text id="tempat" v-if="!$v.form.tempat.required">
        <i class="text-danger">Tempat is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="sumber anggaran"
      label-for="sumber_anggaran"
      :class="{ 'form-group--error': $v.form.sumber_anggaran.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.sumber_anggaran.$model"
        id="sumber_anggaran"
        size="sm"
      ></b-form-input>
      <b-form-text
        id="sumber_anggaran"
        v-if="!$v.form.sumber_anggaran.required"
      >
        <i class="text-danger">Sumber anggaran is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="rencara anggaran"
      label-for="rencara_anggaran"
      :class="{ 'form-group--error': $v.form.rencara_anggaran.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.rencara_anggaran.$model"
        v-on:keyup="numberFormatRencanaAnggaran"
        id="rencara_anggaran"
        size="sm"
      ></b-form-input>
      <b-form-text
        id="rencara_anggaran"
        v-if="!$v.form.rencara_anggaran.required"
      >
        <i class="text-danger">Rencara anggaran is required</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="total anggaran"
      label-for="total_anggaran"
      :class="{ 'form-group--error': $v.form.total_anggaran.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.total_anggaran.$model"
        v-on:keyup="numberFormatTotalAnggaran"
        id="total_anggaran"
        size="sm"
      ></b-form-input>
      <b-form-text id="total_anggaran" v-if="!$v.form.total_anggaran.required">
        <i class="text-danger">Total anggaran is required</i>
      </b-form-text>
    </b-form-group>
    <button
      class="btn btn-sm btn-primary float-right"
      v-show="button"
      @click="submit"
    >
      Simpan RKAT
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  created() {
    if (this.$route.name === "rkat-edit-id") {
      if (this.$store.state.auth.user[1].level !== "sekniv") {
        this.button = false;
      }
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
        sisa_anggaran: this.forms.sisa_anggaran,
      };
      this.numberFormatRencanaAnggaran();
      this.numberFormatTotalAnggaran();
    }
  },
  data() {
    return {
      form: {
        id_user: "",
        kode_rkat: "",
        sasaran_strategi: "",
        indikator_sasaran_strategi: "",
        nama_program: "",
        program_kerja: "",
        deskripsi: "",
        tujuan: "",
        mulai_program: "",
        selesai_program: "",
        tempat: "",
        sumber_anggaran: "",
        rencara_anggaran: "",
        total_anggaran: "",
        sisa_anggaran: 0,
      },
      selected: null,
      options: null,
      button: true,
    };
  },
  validations: {
    form: {
      id_user: {
        required,
      },
      kode_rkat: {
        required,
      },
      sasaran_strategi: {
        required,
      },
      indikator_sasaran_strategi: {
        required,
      },
      nama_program: {
        required,
      },
      program_kerja: {
        required,
      },
      deskripsi: {
        required,
      },
      tujuan: {
        required,
      },
      mulai_program: {
        required,
      },
      selesai_program: {
        required,
      },
      tempat: {
        required,
      },
      sumber_anggaran: {
        required,
      },
      rencara_anggaran: {
        required,
      },
      total_anggaran: {
        required,
      },
    },
  },
  mounted() {
    this.options = this.rkatUser;
  },
  computed: {
    ...mapState("rkat", {
      forms: (state) => state.data,
      errors: (state) => state.errors,
      rkatUser: (state) => state.rkatUser,
    }),
  },
  methods: {
    ...mapActions("rkat", ["storerkat", "getrkatID", "updaterkat"]),
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.failed("Pastikan semua fields diisi!");
      } else {
        this.form.rencara_anggaran = this.form.rencara_anggaran.replaceAll(".", "");
        this.form.total_anggaran = this.form.total_anggaran.replaceAll(".", "");
        if (this.$route.name === "rkat-edit-id") {
          let form = Object.assign({ id: this.$route.params.id }, this.form);
          this.updaterkat(form)
            .then(() => {
              this.success("Data telah disimpan");
              this.$router.push("/rkat");
            })
            .catch((e) => {
              this.failed("Pastikan semua fields diisi!");
            });
        } else {
          this.storerkat(this.form)
            .then(() => {
              this.success("Data telah disimpan");
              this.$router.push("/rkat");
            })
            .catch((e) => {
              this.failed("Pastikan semua fields diisi!");
            });
        }
      }
    },
    success(params) {
      this.$swal({
        width: 300,
        icon: "success",
        title: "Congrats!",
        text: params,
      });
    },
    failed(params) {
      this.$swal({
        width: 300,
        icon: "error",
        title: "Oops...",
        text: params,
      });
    },
    download() {
      this.$axios
        .get(`/rkat/pdf_kode_rkat/${this.form.kode_rkat}`, {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "RKAT.pdf");
          document.body.appendChild(link);
          link.click();
          this.success("RKAT telah dihapus");
        })
        .catch(() => {
          this.failed("Cek server atau koneksi anda");
        });
    },
    numberFormatRencanaAnggaran() {
      this.form.rencara_anggaran = this.$formatRupiah(
        this.form.rencara_anggaran
      );
    },
    numberFormatTotalAnggaran() {
      this.form.total_anggaran = this.$formatRupiah(this.form.total_anggaran);
    },
  },
};
</script>

<style>
</style>