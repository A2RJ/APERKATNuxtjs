<template>
  <div>
    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Nama Lengkap"
      label-for="fullname"
    >
      <b-form-input
        v-model="form.fullname"
        id="fullname"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Password"
      label-for="password"
    >
      <b-form-input
        v-model="form.password"
        id="password"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Struktur"
      label-for="id_struktur"
    >
      <b-form-select
        v-model="form.id_struktur"
        :options="strukturOptions"
        @change="getSub1"
        size="sm"
        class="mt-3"
        name="unit"
      ></b-form-select>
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
    >
      <b-form-input v-model="form.email" id="email" size="sm"></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="nomor_wa"
      label-for="nomor_wa"
    >
      <b-form-input
        v-model="form.nomor_wa"
        id="nomor_wa"
        size="sm"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="bank"
      label-for="bank"
    >
      <b-form-input v-model="form.bank" id="bank" size="sm"></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="Atas Nama Penerima"
      label-for="atn"
    >
      <b-form-input v-model="form.atn" id="atn" size="sm"></b-form-input>
    </b-form-group>

    <b-form-group
      label-cols="4"
      label-cols-lg="2"
      label-size="sm"
      label="No.Rekening"
      label-for="no_rek"
    >
      <b-form-input v-model="form.no_rek" id="no_rek" size="sm"></b-form-input>
    </b-form-group>

    <button class="btn-sm btn-info float-right" @click="submit">Save</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    if (this.$route.name === "user-edit-id") {
      this.form = {
        fullname: this.userID.fullname,
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
    };
  },
  mounted() {
    this.$axios.get(`user/struktur`).then((res) => {
      this.strukturOptions = res.data.data;
    });
  },
  methods: {
    ...mapActions("user", ["getuserID", "storeuser", "updateuser"]),

    submit() {
      if (this.$route.name === "user-edit-id") {
        let form = Object.assign({ id: this.$route.params.id }, this.form);
        this.updateuser(form).then(() => {
          this.$router.push("/user");
        });
      } else {
        this.storeuser(this.form).then(() => {
          this.$router.push("/user");
        });
      }
    },
    getSub1() {
      this.$axios
        .get(`user/sub_struktur/${this.form.id_struktur}`)
        .then((res) => {
          this.sub1Options = res.data.data;
          if (this.sub1Options.length == 0) {
            this.sub2Options = []
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