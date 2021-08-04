<template>
  <div class="container">
    <b-form-file
      size="sm"
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      ref="file"
      accept=".xls, .xlsx"
      v-on:change="handleFileUpload()"
    ></b-form-file>
    <b-progress-bar
      class="my-1"
      :value="uploadPercentage"
      :max="100"
      variant="info"
      key="info"
      show-progress
      animated
    ></b-progress-bar>
    <button class="btn btn-sm btn-outline-primary" v-on:click="submitFile()">
      Import
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: "",
      data: null,
      file1: null,
      uploadPercentage: 0,
    };
  },
  methods: {
    handleFileUpload() {
      this.file1 = this.$refs.file.files[0];
    },
    async submitFile() {
      /**
       * Submits the file to the server
       * Initialize the form data
       * Add the form data we need to submit
       * Make the request to the POST /single-file URL
       */
      let formData = new FormData();
      formData.append("file", this.file1);

      await this.$axios
        .post("/rkat/uploadRKAT", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          }.bind(this),
        })
        .then((res) => {
          this.data = res.data;
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>