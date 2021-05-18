<template>
  <div class="row">
    <div class="col-xl-12 col-lg-12" v-if="this.$route.params.id">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Status Pengajuan</h6>
        </div>
        <div class="container-timeline pl-3 pt-3">
          <ul>
            <li
              v-for="(status, index) in status"
              :key="index"
              :class="status.status ? 'approve' : 'decline'"
            >
              <p class="h6 fw-bold">{{ status.nama_struktur }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="col-xl-12 col-lg-12"
      v-show="
        formPencairan ||
        formLPJ ||
        option ||
        form.pencairan ||
        form.lpj_keuangan ||
        form.lpj_kegiatan
      "
    >
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Aksi</h6>
        </div>
        <div class="card-body">
          <button class="btn btn-sm btn-outline-success m-1" @click="print">
            Print pengajuan
          </button>
          <a
            :href="'../../../' + form.pencairan"
            target="_blank"
            v-show="form.pencairan"
          >
            <button class="btn btn-sm btn-outline-success m-1">
              Bukti Pencairan
            </button>
          </a>
          <a
            v-show="form.lpj_keuangan"
            :href="'../../../' + form.lpj_keuangan"
            target="_blank"
          >
            <button class="btn btn-sm btn-outline-success m-1">
              LPJ Keuangan
            </button>
          </a>
          <a
            v-show="form.lpj_kegiatan"
            :href="'../../../' + form.lpj_kegiatan"
            target="_blank"
          >
            <button class="btn btn-sm btn-outline-success m-1">
              LPJ Kegiatan
            </button>
          </a>
          <br />
          <div v-show="formPencairan" class="m-3">
            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              label-size="sm"
              label="Pencairan"
              label-for="Pencairan"
            >
              <b-form-file
                id="Pencairan"
                v-model="pencairan"
                :state="Boolean(pencairan)"
                ref="pencairan"
                @change="onSelectPencairan"
                placeholder="Choose or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
            <div>
              <button
                class="btn btn-sm btn-outline-success float-right"
                @click="buktiTF"
              >
                Upload Bukti Transfer
              </button>
            </div>
          </div>
          <div v-show="formLPJ" class="m-3">
            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              label-size="sm"
              label="LPJ Keuangan"
              label-for="LPJKeuangan"
            >
              <b-form-file
                id="LPJKeuangan"
                v-model="LPJKeuangan"
                :state="Boolean(LPJKeuangan)"
                ref="LPJKeuangan"
                @change="onSelectLPJKeuangan"
                placeholder="Choose or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
            <button
              class="btn btn-sm btn-outline-success float-right"
              @click="uploadLPJKeuangan"
            >
              LPJ Keuangan
            </button>
          </div>
          <br />
          <div v-show="formLPJ" class="m-3">
            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              label-size="sm"
              label="LPJ Kegiatan"
              label-for="LPJKegiatan"
            >
              <b-form-file
                id="LPJKegiatan"
                v-model="LPJKegiatan"
                :state="Boolean(LPJKegiatan)"
                ref="LPJKegiatan"
                @change="onSelectLPJKegiatan"
                placeholder="Choose or drop it here..."
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </b-form-group>
            <button
              class="btn btn-sm btn-outline-success float-right"
              @click="uploadLPJKegiatan"
            >
              LPJ Kegiatan
            </button>
          </div>
          <div v-show="option" class="m-3">
            <b-form-group
              label-cols="4"
              label-cols-lg="2"
              label-size="sm"
              label="Pesan"
              label-for="message"
            >
              <b-form-input
                id="message"
                size="sm"
                class="mb-3"
                v-model="message"
              ></b-form-input>
              <div class="float-right">
                <button class="btn btn-sm btn-outline-danger" @click="tolak">
                  Tolak
                </button>
                <button class="btn btn-sm btn-outline-success" @click="terima">
                  Terima
                </button>
              </div>
            </b-form-group>
          </div>
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
            :class="{ 'form-group--error': $v.form.kode_rkat.$error }"
          >
            <b-form-select
              v-model.trim="$v.form.kode_rkat.$model"
              :options="options"
              size="sm"
              class="mt-3"
              name="unit"
            ></b-form-select>
            <b-form-text id="kode_rkat" v-if="!$v.form.kode_rkat.required">
              <i class="text-danger">Kode RKAT harus diisi</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="target capaian"
            label-for="target_capaian"
            :class="{ 'form-group--error': $v.form.target_capaian.$error }"
          >
            <b-form-input
              v-model.trim="$v.form.target_capaian.$model"
              id="target_capaian"
              size="sm"
            ></b-form-input>
            <b-form-text
              id="target_capaian"
              v-if="!$v.form.target_capaian.required"
            >
              <i class="text-danger">target_capaian harus diisi</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="bentuk pelaksanaan program"
            label-for="bentuk_pelaksanaan_program"
            :class="{
              'form-group--error': $v.form.bentuk_pelaksanaan_program.$error,
            }"
          >
            <b-form-input
              v-model.trim="$v.form.bentuk_pelaksanaan_program.$model"
              id="bentuk_pelaksanaan_program"
              size="sm"
            ></b-form-input>
            <b-form-text
              id="bentuk_pelaksanaan_program"
              v-if="!$v.form.bentuk_pelaksanaan_program.required"
            >
              <i class="text-danger">bentuk_pelaksanaan_program harus diisi</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="tempat program"
            label-for="tempat_program"
            :class="{ 'form-group--error': $v.form.tempat_program.$error }"
          >
            <b-form-input
              v-model.trim="$v.form.tempat_program.$model"
              id="tempat_program"
              size="sm"
            ></b-form-input>
            <b-form-text
              id="tempat_program"
              v-if="!$v.form.tempat_program.required"
            >
              <i class="text-danger">tempat_program harus diisi</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="tanggal"
            label-for="tanggal"
            :class="{ 'form-group--error': $v.form.tanggal.$error }"
          >
            <b-form-datepicker
              id="tanggal"
              v-model.trim="$v.form.tanggal.$model"
              class="mb-2"
              size="sm"
              today-button
              reset-button
              close-button
              locale="IDN"
            ></b-form-datepicker>
            <b-form-text id="tanggal" v-if="!$v.form.tanggal.required">
              <i class="text-danger">tanggal harus diisi</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="bidang terkait"
            label-for="bidang_terkait"
            :class="{ 'form-group--error': $v.form.bidang_terkait.$error }"
          >
            <b-form-input
              v-model.trim="$v.form.bidang_terkait.$model"
              id="bidang_terkait"
              size="sm"
            ></b-form-input>
            <b-form-text
              id="bidang_terkait"
              v-if="!$v.form.bidang_terkait.required"
            >
              <i class="text-danger">bidang_terkait harus diisi</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="IKU"
            label-for="id_iku_parent"
            :class="{ 'form-group--error': $v.form.id_iku_parent.$error }"
          >
            <b-form-select
              id="id_iku_parent"
              v-model.trim="$v.form.id_iku_parent.$model"
              :options="parent"
              size="sm"
              class="mt-3"
              name="unit"
              @change="getIku1(form.id_iku_parent)"
            ></b-form-select>
            <b-form-text
              id="id_iku_parent"
              v-if="!$v.form.id_iku_parent.required"
            >
              <i class="text-danger">id_iku_parent harus diisi</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label=""
            label-for="id_iku_child1"
            :class="{ 'form-group--error': $v.form.id_iku_child1.$error }"
          >
            <b-form-select
              id="id_iku_child1"
              v-model.trim="$v.form.id_iku_child1.$model"
              :options="child1"
              size="sm"
              class="mt-3"
              name="unit"
              @change="getIku2(form.id_iku_child1)"
            >
              <template #first v-if="this.$route.params.id">
                <b-form-select-option :value="selectChild1.value">{{
                  selectChild1.name
                }}</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-text
              id="id_iku_child1"
              v-if="!$v.form.id_iku_child1.required"
            >
              <i class="text-danger">id_iku_child1 harus diisi</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label=""
            label-for="id_iku_child2"
            :class="{ 'form-group--error': $v.form.id_iku_child2.$error }"
          >
            <b-form-select
              id="id_iku_child2"
              v-model.trim="$v.form.id_iku_child2.$model"
              :options="child2"
              size="sm"
              class="mt-3"
              name="unit"
            >
              <template #first v-if="this.$route.params.id">
                <b-form-select-option :value="selectChild2.value">{{
                  selectChild2.name
                }}</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-text
              id="id_iku_child2"
              v-if="!$v.form.id_iku_child2.required"
            >
              <i class="text-danger">id_iku_child2 harus diisi</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="biaya program"
            label-for="biaya_program"
            :class="{ 'form-group--error': $v.form.biaya_program.$error }"
          >
            <b-form-input
              v-model.trim="$v.form.biaya_program.$model"
              id="biaya_program"
              size="sm"
            ></b-form-input>
            <b-form-text
              id="biaya_program"
              v-if="!$v.form.biaya_program.required"
            >
              <i class="text-danger">Nama lengkap harus diisi</i>
            </b-form-text>
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
            <b-form-file
              v-model="file"
              :state="Boolean(file)"
              ref="file"
              @change="onSelect"
              placeholder="Choose or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <!-- accept=".xls, .xlsx, .doc, .docx, .jpg, .png" -->
            <div class="mt-3">
              Current file:
              <a v-if="rab" :href="'../../../' + rab" target="_blank">RAB </a>
            </div>
          </b-form-group>
          <p :class="warnaStatus + ' float-right'" v-if="submitStatus">
            {{ submitStatus }}
          </p>
          <br />
          <br />
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
            <li
              :class="history.status_validasi ? 'text-success' : 'text-warning'"
            >
              {{ history.created_at }}
              {{ history.status_validasi ? "Diterima" : "Ditolak" }} -
              {{ history.message }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  created() {
    if (this.$route.params.id) {
      this.$axios
        .get(`iku/child1ByID/${this.forms.id_iku_child1}`)
        .then((res) => {
          (this.selectChild1.value = res.data.data.value),
            (this.selectChild1.name = res.data.data.text);
        });

      this.$axios
        .get(`iku/child2ByID/${this.forms.id_iku_child2}`)
        .then((res) => {
          (this.selectChild2.value = res.data.data.value),
            (this.selectChild2.name = res.data.data.text);
        });

      this.form = {
        kode_rkat: this.forms.kode_rkat,
        id_user: this.forms.id_user,
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
        pencairan: this.forms.pencairan,
        id_atasan: this.$store.state.auth.user[0].id_user,
        lpj_keuangan: this.forms.lpj_keuangan,
        lpj_kegiatan: this.forms.lpj_kegiatan,
      };
    }
  },
  data() {
    return {
      form: {
        kode_rkat: null,
        id_user: this.$store.state.auth.user[0].id_user,
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
        pencairan: null,
        id_atasan: null,
        lpj_keuangan: null,
        lpj_kegiatan: null,
      },
      button: true,
      selected: null,
      options: null,
      parent: null,
      child1: null,
      child2: null,
      option: false,
      redirects:
        "/pengajuan/subordinate/" + this.$store.state.auth.user[0].id_user,
      selectChild1: {
        name: "",
        value: "",
      },
      selectChild2: {
        name: "",
        value: "",
      },
      file: [],
      rab: false,
      message: "",
      formPencairan: false,
      pencairan: [],
      formLPJ: false,
      LPJKeuangan: [],
      LPJKegiatan: [],
      view: {
        pencairan: false,
        keuangan: false,
        kegiatan: false,
      },
      submitStatus: null,
      warnaStatus: null,
    };
  },
  validations: {
    form: {
      kode_rkat: {
        required,
      },
      id_user: {
        required,
      },
      target_capaian: {
        required,
      },
      bentuk_pelaksanaan_program: {
        required,
      },
      tempat_program: {
        required,
      },
      tanggal: {
        required,
      },
      bidang_terkait: {
        required,
      },
      id_iku_parent: {
        required,
      },
      id_iku_child1: {
        required,
      },
      id_iku_child2: {
        required,
      },
      biaya_program: {
        required,
      },
      rab: {
        required,
      },
    },
  },
  computed: {
    ...mapState("subordinate", {
      forms: (state) => state.data,
      status: (state) => state.status,
      history: (state) => state.history,
      errors: (state) => state.errors,
      kodeRKAT: (state) => state.kodeRKAT,
      approve: (state) => state.approve,
      decline: (state) => state.decline,
      ikuParent: (state) => state.ikuParent,
      ikuChild1: (state) => state.ikuChild1,
      ikuChild2: (state) => state.ikuChild2,
    }),
  },
  mounted() {
    this.load();

    this.options = this.kodeRKAT.data;
    this.parent = this.ikuParent.data;
    this.rab = this.form.rab;
  },
  methods: {
    ...mapActions("subordinate", [
      "storepengajuan",
      "getpengajuanID",
      "updatepengajuan",
      "approved",
      "declined",
      "getIkuChild1",
      "getIkuChild2",
    ]),

    load() {
      if (this.$route.name == "pengajuan-supervisor-edit-id") {
        this.form.id_user = this.$store.state.auth.user[0].id_user;
        this.button = false;
        for (let index = 0; index < this.status.length; index++) {
          if (
            this.status[index]["id_user"] ==
            this.$store.state.auth.user[0].id_user
          ) {
            if (index != 0) {
              if (
                this.status[index - 1]["status"] == false ||
                this.status[index - 1]["status"] == "0" ||
                this.status[index - 1]["status"] == null
              ) {
                this.option = false;
              } else if (this.status[index]["status"]) {
                this.option = false;
              } else {
                this.option = true;
              }
            }
          }
          if (
            this.status[index]["nama_struktur"] == "Rektor" &&
            this.status[index]["status"] == "1" &&
            this.$store.state.auth.user[0].id_user == 7
          ) {
            this.formPencairan = true;
            return;
          }
        }
      } else if (this.$route.name == "pengajuan-subordinate-edit-id") {
        this.$axios
          .get(`/pengajuan/validasi/${this.$route.params.id}`)
          .then((res) => {
            if (res.data) {
              this.button = false;
            } else {
              this.button = true;
            }
          });
      }
      for (let index = 0; index < this.status.length; index++) {
        if (
          this.status[index]["nama_struktur"] == "Sekniv" &&
          this.status[index]["status"] !== 1 &&
          this.status[index - 1]["status"]
        ) {
          if (
            this.status[0]["id_user"] == this.$store.state.auth.user[0].id_user
          ) {
            this.formPencairan = false;
            this.formLPJ = true;
          }
        }
        if (
          this.status[index]["nama_struktur"] == "Rektor" &&
          this.status[index]["status"] == 1 &&
          this.$store.state.auth.user[0].id_user == this.status[0]["id_user"]
        ) {
          this.formPencairan = true;
        }
      }
    },
    onSelect() {
      const file = this.$refs.file.files[0];
      this.file = file;
    },
    onSelectPencairan() {
      const pencairan = this.$refs.pencairan.files[0];
      this.pencairan = pencairan;
    },
    onSelectLPJKeuangan() {
      this.LPJKeuangan = this.$refs.LPJKeuangan.files[0];
    },
    onSelectLPJKegiatan() {
      this.LPJKegiatan = this.$refs.LPJKegiatan.files[0];
    },
    terima() {
      let form = Object.assign(
        { id: this.$route.params.id, message: this.message },
        this.form
      );
      this.approved(form).then(() => {
        this.$router.push(
          "/pengajuan/supervisor/" + this.$store.state.auth.user[0].id_user
        );
      });
    },
    tolak() {
      let form = Object.assign(
        { id: this.$route.params.id, message: this.message },
        this.form
      );
      this.declined(form).then(() => {
        this.$router.push(
          "/pengajuan/supervisor/" + this.$store.state.auth.user[0].id_user
        );
      });
    },
    getIku1(params) {
      this.getIkuChild1(params).then(() => {
        this.child1 = this.ikuChild1.data;
      });
    },
    getIku2(params) {
      this.getIkuChild2(params).then(() => {
        this.child2 = this.ikuChild2.data;
      });
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.warnaStatus = "text-danger";
        this.submitStatus = "ERROR: Semua harus diisi";
      } else {
        // do your submit logic here
        this.submitStatus = "Sedang menyimpan data";
        this.warnaStatus = "text-info";
        setTimeout(() => {}, 1500);
        if (this.$route.name === "pengajuan-subordinate-edit-id") {
          if (this.file.length != 0) {
            await this.upload();
          }
          let form = Object.assign(
            { id: this.$route.params.id, message: "Update pengajuan" },
            this.form
          );
          await this.updatepengajuan(form).catch((e) => {
            this.warnaStatus = "text-danger";
            this.submitStatus = "ERROR: Pastikan semua fields harus diisi";
          });
          this.warnaStatus = "text-success";
          this.submitStatus = "Thanks for your submission!";
          setTimeout(() => {}, 1500);
          this.$router.push(this.redirects);
        } else {
          await this.upload();
          let form = Object.assign({ message: "Input pengajuan" }, this.form);
          await this.storepengajuan(form).catch((e) => {
            this.warnaStatus = "text-danger";
            this.submitStatus = "ERROR: Pastikan semua fields harus diisi";
          });
          this.warnaStatus = "text-success";
          this.submitStatus = "Thanks for your submission!";
          setTimeout(() => {}, 1500);
          this.$router.push(this.redirects);
        }
      }
    },
    async upload() {
      const form = new FormData();
      form.append("file", this.file);
      try {
        await this.$axios.post("/pengajuan/upload", form).then((res) => {
          this.form.rab = res.data;
        });
      } catch (e) {
        console.log("Whoops Server Error");
      }
    },
    async buktiTF() {
      await this.uploadBuktiTF();
      let form = Object.assign(
        { id: this.$route.params.id, message: "Sudah dilakukan pencairan" },
        this.form
      );
      await this.updatepengajuan(form);
      this.$router.push(
        "/pengajuan/supervisor/" + this.$store.state.auth.user[0].id_user
      );
    },
    async uploadBuktiTF() {
      const form = new FormData();
      form.append("file", this.pencairan);
      try {
        await this.$axios.post("/pengajuan/upload", form).then((res) => {
          this.form.pencairan = res.data;
          this.form.id_atasan = this.$store.state.auth.user[0].id_user;
          this.form.id_user = this.forms.id_user;
        });
      } catch (e) {
        console.log("Whoops Server Error");
      }
    },
    uploadLPJKeuangan() {
      if (this.LPJKeuangan.length != 0) {
        const form = new FormData();
        form.append("file", this.LPJKeuangan);
        try {
          this.$axios.post("/pengajuan/upload", form).then((res) => {
            this.form.lpj_keuangan = res.data;
            let form = Object.assign(
              { id: this.$route.params.id, message: "Upload LPJ Keuangan" },
              this.form
            );
            this.updatepengajuan(form);
            this.$router.push(
              "/pengajuan/subordinate/" + this.$store.state.auth.user[0].id_user
            );
          });
        } catch (e) {
          console.log("Whoops Server Error");
        }
      }
    },
    uploadLPJKegiatan() {
      if (this.LPJKegiatan.length != 0) {
        const form = new FormData();
        form.append("file", this.LPJKegiatan);
        try {
          this.$axios.post("/pengajuan/upload", form).then((res) => {
            this.form.lpj_kegiatan = res.data;
            let form = Object.assign(
              { id: this.$route.params.id, message: "Upload LPJ Kegiatan" },
              this.form
            );
            this.updatepengajuan(form);
            this.$router.push(
              "/pengajuan/subordinate/" + this.$store.state.auth.user[0].id_user
            );
          });
        } catch (e) {
          console.log("Whoops Server Error");
        }
      }
    },
    print() {
      console.log("Printing");
    },
  },
};
</script>

<style>
/* Timeline */
.container-timeline {
  position: relative;
}

.container-timeline ul {
  margin: 0;
  padding: 0;
  padding-left: 20px;
  display: inline-block;
  counter-reset: wa-process-counter;
}

.container-timeline ul li {
  list-style: none;
  margin: 0;
  border-left: 1px solid rgb(0, 0, 0);
  padding: 0 0 30px 40px;
  position: relative;
  counter-increment: wa-process-counter;
}

.container-timeline ul li:last-child {
  border: 0;
}

.approve::before {
  position: absolute;
  border: 1px solid rgb(14, 182, 14);
  border-radius: 50px;
  height: 41px;
  width: 41px;
  text-align: center;
  line-height: 41px;
  left: -21px;
  top: 0;
  content: " ";
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUwNy4yIDUwNy4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDcuMiA1MDcuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojMzJCQTdDOyIgY3g9IjI1My42IiBjeT0iMjUzLjYiIHI9IjI1My42Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMEFBMDZFOyIgZD0iTTE4OC44LDM2OGwxMzAuNCwxMzAuNGMxMDgtMjguOCwxODgtMTI3LjIsMTg4LTI0NC44YzAtMi40LDAtNC44LDAtNy4yTDQwNC44LDE1MkwxODguOCwzNjh6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI2MCwzMTAuNGMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMjMuMiwyMy4yYy0xMS4yLDExLjItMzAuNCwxMS4yLTQxLjYsMEw5My42LDI3Mi44DQoJCWMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZsMjMuMi0yMy4yYzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwTDI2MCwzMTAuNHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM0OC44LDEzMy42YzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwbDIzLjIsMjMuMmMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMTc2LDE3NS4yDQoJCWMtMTEuMiwxMS4yLTMwLjQsMTEuMi00MS42LDBsLTIzLjItMjMuMmMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZMMzQ4LjgsMTMzLjZ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==");
}

.decline::before {
  position: absolute;
  border: 1px solid rgb(243, 90, 30);
  border-radius: 50px;
  height: 41px;
  width: 41px;
  text-align: center;
  line-height: 41px;
  left: -21px;
  top: 0;
  content: " ";
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxlbGxpcHNlIHN0eWxlPSJmaWxsOiNFMjFCMUI7IiBjeD0iMjU2IiBjeT0iMjU2IiByeD0iMjU2IiByeT0iMjU1LjgzMiIvPg0KPGc+DQoJDQoJCTxyZWN0IHg9IjIyOC4wMjEiIHk9IjExMy4xNDMiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MSAtMC43MDcxIDAuNzA3MSAwLjcwNzEgLTEwNi4wMTc4IDI1Ni4wMDUxKSIgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHdpZHRoPSI1NS45OTEiIGhlaWdodD0iMjg1LjY2OSIvPg0KCQ0KCQk8cmVjdCB4PSIxMTMuMTY0IiB5PSIyMjcuOTY4IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjcwNzEgLTAuNzA3MSAwLjcwNzEgMC43MDcxIC0xMDYuMDEzNCAyNTUuOTg4NSkiIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiB3aWR0aD0iMjg1LjY2OSIgaGVpZ2h0PSI1NS45OTEiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K");
}

.waiting::before {
  position: absolute;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 50px;
  height: 41px;
  width: 41px;
  text-align: center;
  line-height: 41px;
  left: -21px;
  top: 0;
  content: " ";
  background: rgb(255, 255, 255);
  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cmVjdCB4PSIyMjYiIHN0eWxlPSJmaWxsOiNBQkVDRUM7IiB3aWR0aD0iNjAiIGhlaWdodD0iMTIwIi8+CgkKCQk8cmVjdCB4PSI4Ny40MSIgeT0iNTcuNDExIiB0cmFuc2Zvcm09Im1hdHJpeCgtMC43MDcxIDAuNzA3MSAtMC43MDcxIC0wLjcwNzEgMjgzLjQ1MTUgMTE3LjQxMDYpIiBzdHlsZT0iZmlsbDojQUJFQ0VDOyIgd2lkdGg9IjU5Ljk5OSIgaGVpZ2h0PSIxMTkuOTk5Ii8+CjwvZz4KPGc+Cgk8cmVjdCB5PSIyMjYiIHN0eWxlPSJmaWxsOiM0MkM4QzY7IiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIi8+CgkKCQk8cmVjdCB4PSI1Ny40MDYiIHk9IjM2NC41ODQiIHRyYW5zZm9ybT0ibWF0cml4KC0wLjcwNzEgMC43MDcxIC0wLjcwNzEgLTAuNzA3MSA0NzkuNDM2MiA1OTAuNTc5KSIgc3R5bGU9ImZpbGw6IzQyQzhDNjsiIHdpZHRoPSIxMTkuOTk5IiBoZWlnaHQ9IjU5Ljk5OSIvPgo8L2c+CjxnPgoJPHJlY3QgeD0iMjI2IiB5PSIzOTIiIHN0eWxlPSJmaWxsOiMwMkFDQUI7IiB3aWR0aD0iNjAiIGhlaWdodD0iMTIwIi8+CgkKCQk8cmVjdCB4PSIzNjQuNTc5IiB5PSIzMzQuNTkxIiB0cmFuc2Zvcm09Im1hdHJpeCgtMC43MDcxIDAuNzA3MSAtMC43MDcxIC0wLjcwNzEgOTUyLjYwNiAzOTQuNTk3NykiIHN0eWxlPSJmaWxsOiMwMkFDQUI7IiB3aWR0aD0iNTkuOTk5IiBoZWlnaHQ9IjExOS45OTkiLz4KPC9nPgo8cmVjdCB4PSIzOTIiIHk9IjIyNiIgc3R5bGU9ImZpbGw6IzAyNzM3MjsiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==");
}

@media (min-width: 1200px) {
  .container-timeline ul {
    display: flex;
    padding-left: 0;
    padding-top: 20px;
  }

  .container-timeline ul li {
    flex: 1 1 0;
    border-left: 0;
    border-top: 1px solid rgb(1, 7, 1);
    padding: 50px 2em 0 0;
  }

  .container-timeline ul li::before {
    left: 0;
    top: -21px;
  }
}
</style>