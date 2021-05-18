<template>
  <div>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Nama Lengkap"
      label-for="fullname"
      :class="{ 'form-group--error': $v.form.fullname.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.fullname.$model"
        id="fullname"
        size="sm"
      ></b-form-input>
      <b-form-text id="fullname" v-if="!$v.form.fullname.required">
        <i class="text-danger">Nama lengkap harus diisi</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Password"
      label-for="password"
      :class="{ 'form-group--error': $v.form.password.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.password.$model"
        id="password"
        size="sm"
      ></b-form-input>
      <b-form-text id="password" v-if="!$v.form.password.required">
        <i class="text-danger">password harus diisi</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Struktur"
      label-for="id_struktur"
      :class="{ 'form-group--error': $v.form.id_struktur.$error }"
    >
      <b-form-select
        v-model.trim="$v.form.id_struktur.$model"
        :options="strukturOptions"
        @change="getSub1"
        size="sm"
        class="mt-3"
        name="unit"
      ></b-form-select>
      <b-form-text id="id_struktur" v-if="!$v.form.id_struktur.required">
        <i class="text-danger">id_struktur harus diisi</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Sub Struktur"
      label-for="id_struktur_child1"
    >
      <b-form-select
        v-model="form.id_struktur_child1"
        :options="sub1Options"
        @change="getSub2"
        size="sm"
        class="mt-3"
        name="unit"
      ></b-form-select>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Sub Sub Struktur"
      label-for="id_struktur_child2"
    >
      <b-form-select
        v-model="form.id_struktur_child2"
        :options="sub2Options"
        size="sm"
        class="mt-3"
        name="unit"
      ></b-form-select>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="email"
      label-for="email"
      :class="{ 'form-group--error': $v.form.email.$error }"
    >
      <b-form-input v-model.trim="$v.form.email.$model" id="email" size="sm">
      </b-form-input>
      <b-form-text id="email" v-if="!$v.form.email.required || !$v.form.email.email">
        <i class="text-danger">email harus diisi dan pastikan email valid</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="nomor_wa"
      label-for="nomor_wa"
      :class="{ 'form-group--error': $v.form.nomor_wa.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.nomor_wa.$model"
        id="nomor_wa"
        size="sm"
      ></b-form-input>
      <b-form-text id="nomor_wa" v-if="!$v.form.nomor_wa.required">
        <i class="text-danger">nomor_wa harus diisi</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="bank"
      label-for="bank"
      :class="{ 'form-group--error': $v.form.bank.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.bank.$model"
        id="bank"
        size="sm"
      ></b-form-input>
      <b-form-text id="bank" v-if="!$v.form.bank.required">
        <i class="text-danger">bank harus diisi</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Atas Nama Penerima"
      label-for="atn"
      :class="{ 'form-group--error': $v.form.atn.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.atn.$model"
        id="atn"
        size="sm"
      ></b-form-input>
      <b-form-text id="atn" v-if="!$v.form.atn.required">
        <i class="text-danger">atn harus diisi</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="No.Rekening"
      label-for="no_rek"
      :class="{ 'form-group--error': $v.form.no_rek.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.no_rek.$model"
        id="no_rek"
        size="sm"
      ></b-form-input>
      <b-form-text id="no_rek" v-if="!$v.form.no_rek.required">
        <i class="text-danger">no_rek harus diisi</i>
      </b-form-text>
    </b-form-group>
    <p :class="warnaStatus + ' float-right'" v-if="submitStatus">
      {{ submitStatus }}
    </p>
    <br />
    <br />
    <button class="btn-sm btn-info float-right" @click="submit">Save</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  created() {
    if (this.$route.name === "user-edit-id") {
      this.form = {
        password: this.userID.fullname,
        email: this.userID.email,
        password: this.userID.password,
        id_struktur: this.userID.id_struktur,
        id_struktur_child1: this.userID.id_struktur_child1,
        id_struktur_child2: this.userID.id_struktur_child2,
        nomor_wa: this.userID.nomor_wa,
        bank: this.userID.bank,
        atn: this.userID.atn,
        no_rek: this.userID.no_rek,
      };
      this.getSub1();
      this.getSub2();
    }
  },
  data() {
    return {
      form: {
        fullname: null,
        email: null,
        password: null,
        id_struktur: null,
        id_struktur_child1: null,
        id_struktur_child2: null,
        nomor_wa: null,
        bank: null,
        atn: null,
        no_rek: null,
      },
      strukturOptions: [],
      sub1Options: [],
      sub2Options: [],
      submitStatus: null,
      warnaStatus: null,
    };
  },
  validations: {
    form: {
      fullname: {
        required,
      },
      email: {
        required, email
      },
      password: {
        required,
      },
      id_struktur: {
        required,
      },
      nomor_wa: {
        required,
      },
      bank: {
        required,
      },
      atn: {
        required,
      },
      no_rek: {
        required,
      },
    },
  },
  mounted() {
    this.$axios.get(`user/struktur`).then((res) => {
      this.strukturOptions = res.data.data;
    });
  },
  methods: {
    ...mapActions("user", ["getuserID", "storeuser", "updateuser"]),

    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.warnaStatus = "text-danger";
        this.submitStatus = "ERROR: Semua harus diisi";
      } else {
        // do your submit logic here
        this.submitStatus = "Sedang menyimpan data";
        this.warnaStatus = "text-info";
        setTimeout(() => {}, 1500);
        if (this.$route.name === "user-edit-id") {
          let form = Object.assign({ id: this.$route.params.id }, this.form);
          this.updateuser(form)
            .then(() => {
              this.warnaStatus = "text-success";
              this.submitStatus = "Thanks for your submission!";
              setTimeout(() => {}, 1500);
              this.$router.push("/user");
            })
            .catch((e) => {
              this.warnaStatus = "text-danger";
              this.submitStatus = "ERROR: Pastikan semua fields harus diisi";
            });
        } else {
          this.storeuser(this.form)
            .then(() => {
              this.warnaStatus = "text-success";
              this.submitStatus = "Thanks for your submission!";
              setTimeout(() => {}, 1500);
              this.$router.push("/user");
            })
            .catch((e) => {
              this.warnaStatus = "text-danger";
              this.submitStatus = "ERROR: Pastikan semua fields harus diisi";
            });
        }
      }
    },
    getSub1() {
      this.$axios
        .get(`user/sub_struktur/${this.form.id_struktur}`)
        .then((res) => {
          this.sub1Options = res.data.data;
          if (this.sub1Options.length == 0) {
            this.sub2Options = [];
          }
        });
    },
    getSub2() {
      this.$axios
        .get(`user/sub_sub_struktur/${this.form.id_struktur_child1}`)
        .then((res) => {
          this.sub2Options = res.data.data;
        });
    },
  },
  computed: {
    ...mapState("user", {
      forms: (state) => state.user,
      userID: (state) => state.userID,
      errors: (state) => state.errors,
    }),
  },
};
</script>

<style>
</style>