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
              <span v-if="status.lpj">
                <span v-for="(lpj, index) in status.lpj" :key="index">
                  <p :class="lpj.status ? 'text-success' : 'text-danger'">
                    {{ lpj.nama_struktur }}
                  </p>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-xl-12 col-lg-12" v-if="this.$route.params.id">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Aksi</h6>
        </div>
        <div class="card-body">
          <button class="btn btn-sm btn-outline-success m-1" @click="print">
            Print pengajuan
          </button>
          <p v-show="pencairan && pencairan.length > 0">Daftar pencairan:</p>
          <a
            v-for="(pencairan, index) in pencairanImg"
            :key="index"
            class="btn btn-sm btn-outline-success m-1 "
            :href="'../../../' + pencairan.images"
            target="_blank"
            rel="noopener noreferrer"
            >Pencairan {{ index + 1 }} RP. {{ pencairan.nominal | currency }}</a
          >
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
            <!-- input form -->
            <b-form-group
              label-cols-sm="4"
              label-cols-lg="2"
              label-size="sm"
              label="Nominal Pencairan"
              label-for="pencairanNominal"
            >
              <b-form-input
                id="pencairanNominal"
                v-model="pencairanNominal"
                :state="pencairanNominal ? true : false"
                :invalid-feedback="
                  pencairanNominal ? '' : 'Nominal pencairan tidak boleh kosong'
                "
                placeholder="Nominal pencairan"
                :required="true"
                v-on:keyup="formatPencairanNominal"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="4"
              label-cols-lg="2"
              label-size="sm"
              label="Pencairan"
              label-for="Pencairan"
            >
              <b-form-file
                id="Pencairan"
                v-model="pencairan"
                :state="Boolean(pencairanStatus)"
                v-on:change="pencairanStatusChange()"
                placeholder="Choose or drop it here..."
                drop-placeholder="Drop file here..."
                accept=".pdf"
              ></b-form-file>
            </b-form-group>
            <div class="float-right">
              <button
                class="btn btn-sm btn-outline-success mb-3"
                @click="buktiTF"
              >
                Upload Bukti Transfer
              </button>

              <button
                class="btn btn-sm btn-outline-success mb-3"
                @click="selesaiUpload"
              >
                Upload Bukti Transfer Selesai
              </button>
            </div>
          </div>
          <div>
            <div v-show="formLPJKeuangan" class="m-3">
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
                  placeholder="Choose or drop it here..."
                  drop-placeholder="Drop file here..."
                  accept=".pdf"
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
            <div v-show="formLPJKegiatan" class="m-3">
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
                  placeholder="Choose or drop it here..."
                  drop-placeholder="Drop file here..."
                  accept=".pdf"
                ></b-form-file>
              </b-form-group>
              <button
                class="btn btn-sm btn-outline-success float-right"
                @click="uploadLPJKegiatan"
              >
                LPJ Kegiatan
              </button>
            </div>
          </div>
          <br />
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
          <div v-show="aksiLPJKeuanganBoolean" class="m-3">
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
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="aksiLPJKeuangan('tolak')"
                >
                  Tolak LPJ Keuangan
                </button>
                <button
                  class="btn btn-sm btn-outline-success"
                  @click="aksiLPJKeuangan('terima')"
                >
                  Terima LPJ Keuangan
                </button>
              </div>
            </b-form-group>
          </div>
          <div v-show="aksiLPJKegiatanBoolean" class="m-3">
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
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="aksiLPJKegiatan('tolak')"
                >
                  Tolak LPJ Kegiatan
                </button>
                <button
                  class="btn btn-sm btn-outline-success"
                  @click="aksiLPJKegiatan('terima')"
                >
                  Terima LPJ Kegiatan
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
            label="Nama Kegiatan"
            label-for="nama_kegiatan"
            :class="{ 'form-group--error': $v.form.nama_kegiatan.$error }"
          >
            <b-form-input
              v-model.trim="$v.form.nama_kegiatan.$model"
              id="nama_kegiatan"
              size="sm"
            ></b-form-input>
            <b-form-text
              id="nama_kegiatan"
              v-if="!$v.form.nama_kegiatan.required"
            >
              <i class="text-danger">Nama kegiatan is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Latar belakang pelaksanaan kegiatan"
            label-for="latar_belakang"
            :class="{ 'form-group--error': $v.form.latar_belakang.$error }"
          >
            <b-form-textarea
              v-model.trim="$v.form.latar_belakang.$model"
              id="textarea"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
            <b-form-text
              id="latar_belakang"
              v-if="!$v.form.latar_belakang.required"
            >
              <i class="text-danger"
                >Latar belakang pelaksanaan kegiatan is required</i
              >
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Tujuan Kegiatan"
            label-for="tujuan"
            :class="{ 'form-group--error': $v.form.tujuan.$error }"
          >
            <b-form-textarea
              v-model.trim="$v.form.tujuan.$model"
              id="textarea"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
            <b-form-text id="tujuan" v-if="!$v.form.tujuan.required">
              <i class="text-danger">Tujuan is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Sasaran"
            label-for="sasaran"
            :class="{ 'form-group--error': $v.form.sasaran.$error }"
          >
            <b-form-input
              v-model.trim="$v.form.sasaran.$model"
              id="sasaran"
              size="sm"
            ></b-form-input>
            <b-form-text id="sasaran" v-if="!$v.form.sasaran.required">
              <i class="text-danger">Sasaran is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Target Capaian"
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
              <i class="text-danger">Target capaian is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Bentuk Pelaksanaan Program"
            label-for="bentuk_pelaksanaan_program"
            :class="{
              'form-group--error': $v.form.bentuk_pelaksanaan_program.$error
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
              <i class="text-danger">Bentuk pelaksanaan program is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Tempat Program"
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
              <i class="text-danger">Tempat program is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Tanggal"
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
              <i class="text-danger">Tanggal is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Bidang Terkait"
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
              <i class="text-danger">Bidang terkait is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="IKU"
            label-for="id_iku_parent"
            :class="{ 'form-group--error': $v.id_iku_parent.$error }"
          >
            <v-select
              v-model.trim="$v.id_iku_parent.$model"
              :options="parent"
              :value="id_iku_parent"
              @input="getIku1"
            ></v-select>
            <b-form-text id="id_iku_parent" v-if="!$v.id_iku_parent.required">
              <i class="text-danger">IKU is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label=""
            label-for="id_iku_child1"
            :class="{ 'form-group--error': $v.id_iku_child1.$error }"
          >
            <v-select
              v-model.trim="$v.id_iku_child1.$model"
              :options="child1"
              :value="id_iku_parent"
              @input="getIku2"
            ></v-select>
            <b-form-text id="id_iku_child1" v-if="!$v.id_iku_child1.required">
              <i class="text-danger">Sub IKU is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label=""
            label-for="id_iku_child2"
            :class="{ 'form-group--error': $v.id_iku_child2.$error }"
          >
            <v-select
              v-model.trim="$v.id_iku_child2.$model"
              :options="child2"
              :value="id_iku_child2"
              @input="getIku3"
            ></v-select>
            <b-form-text id="id_iku_child2" v-if="!$v.id_iku_child2.required">
              <i class="text-danger">Sub Sub is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Biaya Program"
            label-for="biaya_program"
            :class="{ 'form-group--error': $v.form.biaya_program.$error }"
          >
            <b-form-input
              v-model.trim="$v.form.biaya_program.$model"
              v-on:keyup="numberFormatBiayaProgram"
              id="biaya_program"
              size="sm"
            ></b-form-input>
            <b-form-text
              id="biaya_program"
              v-if="!$v.form.biaya_program.required"
            >
              <i class="text-danger">Biaya program is required</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Bank"
            label-for="bank"
            :class="{ 'form-group--error': $v.form.bank.$error }"
          >
            <b-form-input
              v-model.trim="$v.form.bank.$model"
              id="bank"
              size="sm"
            ></b-form-input>
            <b-form-text id="bank" v-if="!$v.form.bank.required">
              <i class="text-danger">Bank is required</i>
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
              <i class="text-danger">ATN is required</i>
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
              <i class="text-danger">No.Rekening is required</i>
            </b-form-text>
            <b-form-text id="no_rek" v-if="!$v.form.no_rek.numeric">
              <i class="text-danger">No.Rekening is numeric</i>
            </b-form-text>
          </b-form-group>

          <b-form-group
            label-cols="4"
            label-cols-lg="2"
            label-size="sm"
            label="Upload RAB"
            label-for="rab"
            :class="{ 'form-group--error': $v.file.$error }"
          >
            <!-- v-model="file" -->
            <b-form-file
              id="rab"
              v-model.trim="$v.file.$model"
              :state="Boolean(file)"
              ref="file"
              @change="onSelect"
              placeholder="Choose or drop it here..."
              drop-placeholder="Drop file here..."
              accept=".pdf"
            ></b-form-file>
            <b-form-text id="rab" v-if="!$v.file.required">
              <i class="text-danger">Upload file</i>
            </b-form-text>
            <div class="mt-3" v-if="rab">
              Current file:
              <a :href="'../../../' + rab" target="_blank">RAB </a>
            </div>
            <div class="mt-3" v-else>Ekstensi file harus .PDF</div>
          </b-form-group>
          <button
            class="btn btn-sm btn-primary float-right"
            v-show="button"
            @click="submit"
          >
            Simpan Pengajuan
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
              {{ history.status_validasi ? "Diterima" : "Ditolak" }} oleh
              {{ history.message }} ({{ history.created_at | convertDate }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import {
  required,
  numeric,
  maxLength,
  requiredIf
} from "vuelidate/lib/validators";

export default {
  async created() {
    if (this.$route.params.id) {
      this.history = this.nonRKATById.history;
      this.status = this.nonRKATById.status;
      this.doubleIKU(
        this.nonRKATById.data.id_iku_child1,
        this.nonRKATById.data.id_iku_child2
      );
      this.getIku4(this.nonRKATById.data.id_iku_child1);
      this.getIku5(this.nonRKATById.data.id_iku_child2);
      this.ikuParent.data
        .filter(el => el.code === 3)
        .forEach(el => (this.id_iku_parent = el.label));
      this.rab = this.nonRKATById.data.rab;

      this.form = {
        id_user: this.nonRKATById.data.id_user,
        nama_kegiatan: this.nonRKATById.data.nama_kegiatan,
        tujuan: this.nonRKATById.data.tujuan,
        latar_belakang: this.nonRKATById.data.latar_belakang,
        sasaran: this.nonRKATById.data.sasaran,
        target_capaian: this.nonRKATById.data.target_capaian,
        bentuk_pelaksanaan_program: this.nonRKATById.data
          .bentuk_pelaksanaan_program,
        tempat_program: this.nonRKATById.data.tempat_program,
        tanggal: this.nonRKATById.data.tanggal,
        bidang_terkait: this.nonRKATById.data.bidang_terkait,
        id_iku_parent: this.nonRKATById.data.id_iku_parent,
        id_iku_child1: this.nonRKATById.data.id_iku_child1,
        id_iku_child2: this.nonRKATById.data.id_iku_child2,
        biaya_program: this.$formatRupiah(this.nonRKATById.data.biaya_program),
        bank: this.nonRKATById.data.bank,
        atn: this.nonRKATById.data.atn,
        no_rek: this.nonRKATById.data.no_rek,
        rab: this.nonRKATById.data.rab,
        status_pengajuan: "progress",
        pencairan: this.nonRKATById.data.pencairan,
        lpj_keuangan: this.nonRKATById.data.lpj_keuangan,
        lpj_kegiatan: this.nonRKATById.data.lpj_kegiatan,
        validasi_status: this.nonRKATById.data.validasi_status,
        nama_status: this.nonRKATById.data.nama_status
      };
    }
  },
  data() {
    return {
      form: {
        id_user: this.$store.state.auth.user[0].id_user,
        latar_belakang: null,
        sasaran: null,
        nama_kegiatan: null,
        tujuan: null,
        target_capaian: null,
        bentuk_pelaksanaan_program: null,
        tempat_program: null,
        tanggal: null,
        bidang_terkait: null,
        id_iku_parent: null,
        id_iku_child1: null,
        id_iku_child2: null,
        biaya_program: null,
        bank: null,
        atn: null,
        no_rek: null,
        rab: null,
        status_pengajuan: "progress",
        pencairan: null,
        id_atasan: null,
        lpj_keuangan: null,
        lpj_kegiatan: null,
        validasi_status: null,
        nama_status: null,
        message: null
      },
      id_iku_parent: [],
      id_iku_child1: [],
      id_iku_child2: [],
      norek: null,
      button: true,
      selected: null,
      options: [],
      parent: [],
      child1: [],
      child2: [],
      option: [],
      redirects: "/nonrkat/subordinate/",
      selectChild1: {
        name: "",
        value: ""
      },
      selectChild2: {
        name: "",
        value: ""
      },
      file: [],
      rab: false,
      // message: "",
      formPencairan: false,
      pencairan: [],
      pencairanNominal: null,
      pencairanStatus: false,
      formLPJ: false,
      formLPJKeuangan: false,
      LPJKeuangan: [],
      formLPJKegiatan: false,
      LPJKegiatan: [],
      terimaLPJ: false,
      view: {
        pencairan: false,
        keuangan: false,
        kegiatan: false
      },
      number: null,
      message: null,
      status: null,
      next: null,
      userLogin: this.$store.state.auth.user[0].id_user,
      pencairanImg: [],
      aksiLPJKeuanganBoolean: false,
      aksiLPJKegiatanBoolean: false
    };
  },
  validations: {
    id_iku_parent: {
      required
    },
    id_iku_child1: {
      required
    },
    id_iku_child2: {
      required
    },
    form: {
      id_user: {
        required
      },
      nama_kegiatan: {
        required
      },
      latar_belakang: {
        required
      },
      tujuan: {
        required
      },
      sasaran: {
        required
      },
      target_capaian: {
        required
      },
      bentuk_pelaksanaan_program: {
        required
      },
      tempat_program: {
        required
      },
      tanggal: {
        required
      },
      bidang_terkait: {
        required
      },
      biaya_program: {
        required
      },
      bank: {
        required
      },
      atn: {
        required
      },
      no_rek: {
        required,
        numeric,
        maxLength: maxLength(20)
      }
    },
    file: {
      required: requiredIf(function() {
        return this.$route.name == "nonrkat-subordinate-add";
      })
    }
  },
  computed: {
    ...mapState("subordinate", {
      ikuParent: state => state.ikuParent
    }),
    ...mapState("nonrkat", {
      nonRKATById: state => state.nonRKATById,
      errors: state => state.errors
    })
  },
  mounted() {
    this.parent = this.ikuParent.data;
    console.log(this.parent);
    this.load();
  },
  methods: {
    ...mapActions("subordinate", ["getIkuChild1", "getIkuChild2"]),
    ...mapActions("nonrkat", [
      "storeNonRKAT",
      "updateNonRKAT",
      "approved",
      "declined"
    ]),
    load() {
      if (this.$route.params.id) {
        this.history = this.nonRKATById.history;
        this.status = this.nonRKATById.status;
        this.pencairanImg = this.nonRKATById.pencairan;

        // Ketentuan terima/tolak dari atasan
        this.button = false;
        this.option = false;
        // jika user login == pengaju dan dihalaman suboridnate maka button true
        if (this.status[0].id_user == this.userLogin) {
          this.$axios
            .get(`/nonrkat/getLastValidate/${this.$route.params.id}`)
            .then(res => {
              this.button = res.data.data;
            });
        }
        // this.status[index - 1].status // untuk mengecek pengajuan sebelumnya
        // jika user login == atasan && status belum diterima && status sebelumnya diterima maka option true
        for (let index = 1; index < this.status.length; index++) {
          if (
            this.status[index].id_user == this.userLogin &&
            this.status[index].status == false &&
            this.status[index - 1].status !== false &&
            this.status[index + 1].id_user !== 1111
          ) {
            this.option = true;
            this.next = this.status[index + 1].id_user;
          }
        }
        // jika dir keuangan maka upload pencairan
        // this.userLogin == 24 && // ubah kesini jika keuangan yg lakukan pencairan
        if (
          this.userLogin == 120 &&
          this.status[this.status.length - 4].status &&
          this.status[this.status.length - 3].status == false
        ) {
          this.form.lpj_keuangan && this.form.lpj_kegiatan
            ? (this.formPencairan = false)
            : ((this.formPencairan = true), (this.option = false));
        }
        // jika user login == pengaju && sudah pencairan maka formLPJ true
        if (
          this.status[0].id_user == this.userLogin &&
          this.status[this.status.length - 3].status &&
          this.status[this.status.length - 2].lpj[0].status == false
        ) {
          this.formLPJKeuangan = true;
          this.option = false;
        }
        if (
          this.status[0].id_user == this.userLogin &&
          this.status[this.status.length - 3].status &&
          this.status[this.status.length - 2].lpj[0].status &&
          this.status[this.status.length - 2].lpj[1].status == false
        ) {
          this.formLPJKegiatan = true;
          this.option = false;
        }
        // jika sekniv/dir keuangan maka tampilkan form terima/tolak lpj
        // (this.userLogin == 24 && // ubah kesini jika keuangan yg lakukan pencairan
        if (
          this.userLogin == 121 &&
          this.nonRKATById.data.lpj_keuangan &&
          this.status[this.status.length - 2].lpj[0].status == false
        ) {
          this.aksiLPJKeuanganBoolean = true;
        }

        if (
          this.userLogin == 21 &&
          this.nonRKATById.data.lpj_kegiatan &&
          this.status[this.status.length - 2].lpj[1].status == false
        ) {
          this.aksiLPJKegiatanBoolean = true;
        }
      }
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.failed("Pastikan semua fields diisi!");
      } else {
        this.loader("Menyimpan pengajuan");
        this.replace();

        if (this.$route.name === "nonrkat-subordinate-edit-id") {
          if (this.file.length != 0) {
            await this.upload();
          }

          this.form.validasi_status = "1";
          this.form.nama_status = this.$store.state.auth.user[0].fullname;
          this.form.message = "Revisi pengajuan";
          let form = Object.assign(
            {
              id: this.$route.params.id,
              next: this.nonRKATById.data.next,
              id_struktur: this.userLogin
            },
            this.form
          );
          this.updateNonRKAT(form)
            .then(() => {
              this.success("Data telah disimpan!");
              this.$router.push("/nonrkat/subordinate/");
            })
            .catch(() => {
              this.failed("Pastikan semua fields diisi!");
            });
        } else {
          if (this.file.length == 0 && this.file.size > 2097152) {
            this.failed("Upload RAB dan max size file 2MB");
          } else {
            const form = new FormData();
            form.append("file", this.file);
            try {
              await this.$axios.post("/pengajuan/upload", form).then(res => {
                this.form.rab = res.data;
                this.form.validasi_status = "1";
                this.form.nama_status = this.$store.state.auth.user[0].fullname;
                this.form.message = "Input pengajuan";

                this.storeNonRKAT(this.form)
                  .then(() => {
                    this.success("Data telah disimpan!");
                    this.$router.push("/nonrkat/subordinate/");
                  })
                  .catch(e => {
                    this.failed("Pastikan semua fields diisi!");
                  });
              });
            } catch (e) {
              this.failed("Whoops Server Error");
            }
          }
        }
      }
    },
    async upload() {
      if (this.file.length == 0 && this.file.size > 2097152) {
        this.failed("Upload RAB dan max size file 2MB");
      } else {
        const form = new FormData();
        form.append("file", this.file);
        try {
          await this.$axios.post("/pengajuan/upload", form).then(res => {
            this.form.rab = res.data;
          });
        } catch (e) {
          this.failed("Whoops Server Error");
        }
      }
    },
    terima() {
      this.$swal({
        title: "Warning!",
        text: "Setujui pengajuan ini?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then(result => {
        if (result.isConfirmed) {
          this.loader("loading...");
          this.replace();
          this.approved({
            id: this.$route.params.id,
            next: this.next,
            message: this.message,
            validasi_status: 2,
            id_struktur: this.userLogin,
            nama_status: this.$store.state.auth.user[0].fullname
          })
            .then(() => {
              this.success("Berhasil terima pengajuan");
              this.option = false;
              this.$router.push(this.redirects);
            })
            .catch(() => {
              this.failed("Whoops Server Error");
            });
        }
      });
    },
    tolak() {
      this.$swal({
        title: "Warning!",
        text: "Tolak pengajuan ini?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then(result => {
        if (result.isConfirmed) {
          this.loader("loading...");
          this.replace();
          this.declined({
            id: this.$route.params.id,
            next: this.userLogin,
            message: this.message,
            validasi_status: 0,
            id_struktur: this.userLogin,
            nama_status: this.$store.state.auth.user[0].fullname
          })
            .then(() => {
              this.success("Berhasil tolak pengajuan");
              this.option = true;
              this.$router.push(this.redirects);
            })
            .catch(() => {
              this.failed("Whoops Server Error");
            });
        }
      });
    },
    async buktiTF() {
      if (
        this.pencairan.length == 0 ||
        (this.pencairan.length != 0 && this.pencairan.size > 2097152)
      ) {
        this.failed("Ukuran file max 2MB");
      } else {
        this.loader("loading...");
        this.replace();
        const form = new FormData();
        form.append("file", this.pencairan);
        try {
          this.$axios.post("/pengajuan/upload", form).then(res => {
            // simpan data ke tabel pencairan non rkat
            this.$axios
              .post("/nonrkat/upload", {
                nonrkat_id: this.$route.params.id,
                nominal: this.pencairanNominal.replaceAll(".", ""),
                images: res.data
              })
              .then(() => {
                this.success("Berhasil upload bukti transfer");
                window.location.reload();
              })
              .catch(() => {
                this.failed("Whoops Server Error");
              });
          });
        } catch (e) {
          this.failed("Whoops Server Error");
        }
      }
    },
    async selesaiUpload() {
      this.$swal({
        title: "Warning!",
        text: "Selesai upload pencairan?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then(result => {
        if (result.isConfirmed) {
          this.loader("loading...");
          this.replace();

          this.approved({
            id: this.$route.params.id,
            next: 24,
            message: "Pencairan selesai",
            validasi_status: 3,
            id_struktur: 24,
            nama_status: this.$store.state.auth.user[0].fullname,
            pencairan: "selesai"
          })
            .then(() => {
              this.success("Berhasil terima pengajuan");
              window.location.reload();
            })
            .catch(() => {
              this.failed("Whoops Server Error");
            });
        }
      });
    },
    uploadLPJKeuangan() {
      if (
        this.LPJKeuangan.length == 0 ||
        (this.pencairan.length != 0 && this.LPJKeuangan.size > 2097152)
      ) {
        this.failed("Ukuran file max 2MB");
      } else {
        this.loader("Uploading...");
        const form = new FormData();
        form.append("file", this.LPJKeuangan);
        try {
          this.$axios.post("/pengajuan/upload", form).then(res => {
            this.replace();

            this.approved({
              id: this.$route.params.id,
              next: 24,
              message: "Upload LPJ Keuangan",
              validasi_status: 1,
              id_struktur: this.userLogin,
              nama_status: this.$store.state.auth.user[0].fullname,
              lpj_keuangan: res.data
            })
              .then(() => {
                this.success("Berhasil upload LPJ Keuangan");
                window.location.reload();
              })
              .catch(() => {
                this.failed("Pastikan semua fields diisi!");
              });
          });
        } catch (e) {
          this.failed("Whoops Server Error");
        }
      }
    },
    aksiLPJKeuangan(params) {
      // params = terima, tolak
      this.$swal({
        title: "Warning!",
        text: `${params} LPJ Keuangan ini?`,
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then(result => {
        if (result.isConfirmed) {
          this.loader("loading...");
          this.replace();
          this.approved({
            id: this.$route.params.id,
            next: params == "terima" ? 21 : 24,
            message: this.message,
            validasi_status: params == "terima" ? 4 : 0,
            id_struktur: 24,
            nama_status: "Direktur keuangan"
          })
            .then(() => {
              this.success(`Berhasil ${params} pengajuan`);
              this.option = false;
              this.$router.push(this.redirects);
            })
            .catch(() => {
              this.failed("Whoops Server Error");
            });
        }
      });
    },
    uploadLPJKegiatan() {
      if (
        this.LPJKegiatan.length == 0 ||
        (this.pencairan.length != 0 && this.LPJKegiatan.size > 2097152)
      ) {
        this.failed("Ukuran file max 2MB");
      } else {
        this.loader("Uploading...");
        const form = new FormData();
        form.append("file", this.LPJKegiatan);
        try {
          this.$axios.post("/pengajuan/upload", form).then(res => {
            this.replace();

            this.approved({
              id: this.$route.params.id,
              next: 24,
              message: "Upload LPJ Kegiatan",
              validasi_status: 1,
              id_struktur: this.userLogin,
              nama_status: this.$store.state.auth.user[0].fullname,
              lpj_kegiatan: res.data
            })
              .then(() => {
                this.success("Berhasil upload LPJ Kegiatan");
                window.location.reload();
              })
              .catch(() => {
                this.failed("Pastikan semua fields diisi!");
              });
          });
        } catch (e) {
          this.failed("Whoops Server Error");
        }
      }
    },
    aksiLPJKegiatan(params) {
      // params = terima, tolak
      this.$swal({
        title: "Warning!",
        text: `${params} LPJ Kegiatan ini?`,
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then(result => {
        if (result.isConfirmed) {
          this.loader("loading...");
          this.replace();
          this.approved({
            id: this.$route.params.id,
            next: params == "terima" ? 3333 : 21,
            message: this.message,
            validasi_status: params == "terima" ? 4 : 0,
            id_struktur: this.userLogin,
            nama_status: "Sekniv"
          })
            .then(() => {
              this.success(`Berhasil ${params} pengajuan`);
              this.option = false;
              this.$router.push(this.redirects);
            })
            .catch(() => {
              this.failed("Whoops Server Error");
            });
        }
      });
    },
    print() {
      this.$axios
        .get(`pengajuan/pdf_pengajuan/${this.$route.params.id}`, {
          responseType: "blob"
        })
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Pengajuan.pdf");
          document.body.appendChild(link);
          link.click();
          this.success("Pengajuan telah didownload!");
        })
        .catch(() => {
          this.failed("Whoops periksa koneksi anda");
        });
    },
    numberFormatBiayaProgram() {
      this.form.biaya_program = this.$formatRupiah(this.form.biaya_program);
    },
    formatPencairanNominal() {
      this.pencairanNominal = this.$formatRupiah(this.pencairanNominal);
    },
    pencairanStatusChange() {
      this.pencairanStatus = true;
    },
    success(params) {
      this.$swal({
        width: 300,
        icon: "success",
        title: "Congrats!",
        text: params
      });
    },
    failed(params) {
      this.$swal({
        width: 300,
        icon: "error",
        title: "Oops...",
        text: params
      });
    },
    loader(params) {
      this.$swal({
        title: "Please wait",
        width: 300,
        text: params,
        imageUrl: "/Rocket.gif",
        showConfirmButton: false,
        allowOutsideClick: true
      });
    },

    replace() {
      this.form.biaya_program = this.form.biaya_program.replaceAll(".", "");
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
    getIku1(value) {
      if (value) {
        this.form.id_iku_parent = value.code;
        this.$axios.get(`/iku/child1/${value.code}`).then(response => {
          this.child1 = response.data.data;
        });
        // this.getIkuChild1(value.code).then(() => {
        //   // this.child1 = this.ikuChild1.data;
        // });
      } else {
        this.child1 = [];
        this.child2 = [];
        this.id_iku_child1 = [];
        this.id_iku_child2 = [];
      }
    },
    getIku2(value) {
      if (value) {
        this.form.id_iku_child1 = value.code;
        this.$axios.get(`/iku/child2/${value.code}`).then(response => {
          this.child2 = response.data.data;
        });
        // this.getIkuChild2(value.code).then(() => {
        //   this.child2 = this.ikuChild2.data;
        // });
      } else {
        this.child2 = [];
        this.id_iku_child2 = [];
      }
    },
    getIku3(value) {
      if (value) {
        this.form.id_iku_child2 = value.code;
      }
    },
    getIku4(value) {
      this.getIkuChild1(value).then(() => {
        this.child1 = this.ikuChild1.data;
      });
    },
    getIku5(value) {
      this.getIkuChild2(value).then(() => {
        this.child2 = this.ikuChild2.data;
      });
    },
    async doubleIKU(params1, params2) {
      this.$axios.get(`iku/child1ByID/${params1}`).then(res => {
        this.id_iku_child1 = res.data.data.label;
      });

      this.$axios.get(`iku/child2ByID/${params2}`).then(res => {
        this.id_iku_child2 = res.data.data.label;
      });
    }
  }
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
  font-size: 14px;
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
