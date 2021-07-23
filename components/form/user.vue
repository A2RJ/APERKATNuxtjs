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
        <i class="text-danger">Nama lengkap is required</i>
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
        :type="types"
        v-on:keyup="cek"
        v-model.trim="$v.form.password.$model"
        id="password"
        size="sm"
      ></b-form-input>
      <b-form-text id="password" v-if="!$v.form.password.required">
        <i class="text-danger">Password is required</i>
      </b-form-text>
      <b-form-text id="password" v-if="!$v.form.password.minLength">
        <i class="text-danger">Password min length is 8</i>
      </b-form-text>
      <b-form-text id="password" v-if="this.$route.params.id">
        <i class="text-black">Optional</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Repeat Password"
      label-for="repeatPassword"
      :class="{ 'form-group--error': $v.form.repeatPassword.$error }"
    >
      <b-form-input
        :type="types"
        v-on:keyup="cek"
        v-model.trim="$v.form.repeatPassword.$model"
        id="repeatPassword"
        size="sm"
      ></b-form-input>
      <b-form-text id="repeatPassword" v-if="!$v.form.repeatPassword.required">
        <i class="text-danger">Repeat Password is required</i>
      </b-form-text>
      <b-form-text
        id="repeatPassword"
        v-if="!$v.form.repeatPassword.sameAsPassword"
      >
        <i class="text-danger">Repeat Password is not matches</i>
      </b-form-text>
      <b-form-text id="repeatPassword" v-if="error">
        <i class="text-danger">{{ error }}</i>
      </b-form-text>
      <b-form-text id="password" v-if="this.$route.params.id">
        <i class="text-black">Optional</i>
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
      >
        <template #first>
          <b-form-select-option :value="0"
            >-- Please select an option --</b-form-select-option
          >
        </template>
      </b-form-select>
      <b-form-text id="id_struktur" v-if="!$v.form.id_struktur.required">
        <i class="text-danger">Struktur is required</i>
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
      >
        <template #first>
          <b-form-select-option :value="0"
            >-- Please select an option --</b-form-select-option
          >
        </template>
      </b-form-select>
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
      >
        <template #first>
          <b-form-select-option :value="0"
            >-- Please select an option --</b-form-select-option
          >
        </template>
      </b-form-select>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Email"
      label-for="email"
      :class="{ 'form-group--error': $v.form.email.$error }"
    >
      <b-form-input v-model.trim="$v.form.email.$model" id="email" size="sm">
      </b-form-input>
      <b-form-text id="email" v-if="!$v.form.email.required">
        <i class="text-danger">email is required</i>
      </b-form-text>
      <b-form-text id="email" v-if="!$v.form.email.email">
        <i class="text-danger">please input a valid email</i>
      </b-form-text>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Nomor WA"
      label-for="nomor_wa"
      :class="{ 'form-group--error': $v.form.nomor_wa.$error }"
    >
      <b-form-input
        v-model.trim="$v.form.nomor_wa.$model"
        id="nomor_wa"
        size="sm"
      ></b-form-input>
      <b-form-text
        id="nomor_wa"
        v-if="!$v.form.nomor_wa.required || !$v.form.nomor_wa.numeric || !$v.form.nomor_wa.maxLength"
      >
        <i class="text-danger">Nomor WA is required, numeric and max length is 15</i>
      </b-form-text>
    </b-form-group>
    <button class="btn btn-sm btn-primary float-right" @click="submit">Simpan User</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  required,
  sameAs,
  email,
  minLength,
  maxLength,
  numeric,
  requiredIf,
} from "vuelidate/lib/validators";

export default {
  created() {
    if (this.$route.name === "user-edit-id") {
      this.form = {
        fullname: this.userID.fullname,
        email: this.userID.email,
        id_struktur: this.userID.id_struktur,
        id_struktur_child1: this.userID.id_struktur_child1,
        id_struktur_child2: this.userID.id_struktur_child2,
        nomor_wa: this.userID.nomor_wa,
      };
      this.getSub1();
      this.getSub2();
    }
  },
  data() {
    return {
      form: {
        fullname: "",
        email: "",
        password: "default",
        repeatPassword: "default",
        id_struktur: "",
        id_struktur_child1: 0,
        id_struktur_child2: 0,
        nomor_wa: "",
      },
      strukturOptions: [],
      sub1Options: [],
      sub2Options: [],
      types: "password",
      error: false,
    };
  },
  validations: {
    form: {
      fullname: {
        required,
      },
      password: {
        minLength: minLength(8),
        required: requiredIf(function () {
          this.$route.name === "user-add";
        }),
      },
      repeatPassword: {
        sameAsPassword: sameAs("password"),
        required: requiredIf(function () {
          this.$route.name === "user-add";
        }),
      },
      email: {
        required,
        email,
      },
      id_struktur: {
        required,
      },
      nomor_wa: {
        required,
        numeric,
        maxLength: maxLength(15)
      },
    },
  },
  mounted() {
    this.$axios.get(`user/struktur`).then((res) => {
      this.strukturOptions = res.data.data;
    });
  },
  computed: {
    ...mapState("user", {
      forms: (state) => state.user,
      userID: (state) => state.userID,
      errors: (state) => state.errors,
    }),
  },
  methods: {
    ...mapActions("user", ["getuserID", "storeuser", "updateuser"]),

    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.failed("Pastikan semua fields diisi!");
      } else {
        if (this.$route.name === "user-edit-id") {
          if (
            this.form.password !== "" &&
            this.form.password !== this.form.repeatPassword
          ) {
            if (
              this.form.password.length < 8 &&
              this.form.password.repeatPassword < 8
            ) {
              this.error = "Repeat Password is not matches and min 8";
            }
            this.failed("Pastikan semua fields diisi!");
          } else {
            this.error = false;
            let form = Object.assign({ id: this.$route.params.id }, this.form);
            this.updateuser(form)
              .then(() => {
                this.success("Data telah disimpan");
                if (
                  this.$store.state.auth.user[0].id_user ==
                  this.$route.params.id
                ) {
                  this.$router.push(
                    `/user/edit/${this.$store.state.auth.user[0].id_user}`
                  );
                } else {
                  this.$router.push("/user");
                }
              })
              .catch((e) => {
                this.failed("Pastikan semua fields diisi!");
              });
          }
        } else {
          this.storeuser(this.form)
            .then(() => {
              this.success("Data telah disimpan");
              this.$router.push("/user");
            })
            .catch((e) => {
              this.failed("Pastikan semua fields diisi!");
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
    cek() {
      if (this.$route.name === "user-edit-id") {
        if (
          this.form.password !== "" &&
          this.form.password !== this.form.repeatPassword
        ) {
          if (
            this.form.password.length < 8 &&
            this.form.password.repeatPassword < 8
          ) {
            this.error = "Repeat Password is not matches and min 8";
          }
        } else {
          this.error = false;
        }
      }
    },
  },
};
</script>

<style>
</style>