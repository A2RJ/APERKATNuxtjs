# COMPONENTS

**This directory is not required, you can delete it if you don't want to use it.**

The components directory contains your Vue.js Components.

_Nuxt.js doesn't supercharge these components._

// if (
      //   this.$route.name == "pengajuan-supervisor-edit-id" ||
      //   this.$route.name == "pengajuan-subordinate-edit-id"
      // ) {
      // }

      // if (this.$route.name == "pengajuan-supervisor-edit-id") {
      //   this.form.id_user = this.$store.state.auth.user[0].id_user;
      //   this.button = false;

      //   for (let index = 0; index < this.status.length; index++) {
      //     if (
      //       this.status[index]["id_user"] ==
      //       this.$store.state.auth.user[0].id_user
      //     ) {
      //       if (index != 0) {
      //         if (
      //           this.status[index - 1]["status"] == false ||
      //           this.status[index - 1]["status"] == "0" ||
      //           this.status[index - 1]["status"] == null
      //         ) {
      //           this.option = false;
      //         } else if (this.status[index]["status"]) {
      //           this.option = false;
      //         } else {
      //           this.option = true;
      //         }
      //       }
      //     }

      //     if (
      //       this.status[index]["nama_struktur"] == "Rektor" &&
      //       this.status[index]["status"] == "2" &&
      //       this.$store.state.auth.user[0].id_user == 7
      //     ) {
      //       this.formPencairan = true;
      //     }
      //   }
      //   if (
      //     this.status[this.status.length - 1]["id_user"] ==
      //     this.$store.state.auth.user[0].id_user
      //   ) {
      //     if (
      //       this.form.lpj_keuangan == null ||
      //       this.form.lpj_kegiatan == null
      //     ) {
      //       this.option = false;
      //     }
      //   }
      // } else if (this.$route.name == "pengajuan-subordinate-edit-id") {
      //   this.$axios
      //     .get(`/pengajuan/validasi/${this.$route.params.id}`)
      //     .then((res) => {
      //       if (res.data) {
      //         this.button = false;
      //       } else {
      //         this.button = true;
      //       }
      //     });
      // }
      // for (let index = 0; index < this.status.length; index++) {
      //   if (
      //     this.status[index]["id_user"] ==
      //     this.$store.state.auth.user[0].id_user
      //   ) {
      //     if (index != 0) {
      //       if (
      //         this.status[index - 1]["status"] == false ||
      //         this.status[index - 1]["status"] == "0" ||
      //         this.status[index - 1]["status"] == null
      //       ) {
      //         this.option = false;
      //       } else if (this.status[index]["status"]) {
      //         this.option = false;
      //       } else {
      //         this.option = true;
      //       }
      //     }
      //   }

      //   if (
      //     this.status[index]["nama_struktur"] == "Rektor" &&
      //     this.status[index]["status"] == "2" &&
      //     this.$store.state.auth.user[0].id_user == 7
      //   ) {
      //     this.formPencairan = true;
      //   }
      //   if (
      //     this.status[index]["nama_struktur"] == "Sekniv" &&
      //     this.status[index]["status"] !== 1 &&
      //     this.status[index - 1]["status"]
      //   ) {
      //     if (
      //       this.status[0]["id_user"] == this.$store.state.auth.user[0].id_user
      //     ) {
      //       this.formPencairan = false;
      //       this.formLPJ = true;
      //     }
      //   }

      //   if (
      //     this.status[index]["nama_struktur"] == "Rektor" &&
      //     this.status[index]["status"] == 1 &&
      //     this.$store.state.auth.user[0].id_user == this.status[0]["id_user"]
      //   ) {
      //     this.formPencairan = true;
      //   }
      //   if (
      //     this.status[this.status.length - 1]["id_user"] ==
      //     this.$store.state.auth.user[0].id_user
      //   ) {
      //     if (
      //       this.form.lpj_keuangan == null ||
      //       this.form.lpj_kegiatan == null
      //     ) {
      //       this.option = false;
      //     }
      //   }
      // }