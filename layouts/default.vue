<template>
  <!-- Page Wrapper -->
  <div id="wrapper">
    <!-- Sidebar -->
    <Sidebar v-if="isAuth"></Sidebar>
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <!-- Topbar -->
        <Topbar v-if="isAuth"></Topbar>
        <!-- Begin Page Content -->
        <div class="container-fluid">
          <!-- Page Heading -->
          <!-- <h6>{{ isAuth }} {{ token }} {{ ardi }}</h6> -->
          <!-- <button @click="logout">Logout</button> -->
          <KeepAlive>
            <Nuxt />
          </KeepAlive>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->
      <!-- Footer -->
      <Footer></Footer>
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      // isAuth: this.$auth.loggedIn
    };
  },
  computed: {
    ...mapState(["isAuth", "token", "ardi"]),
  },
  methods: {
    ...mapMutations(["SET_IS_AUTH", "SET_API_TOKEN", "SET_USER_DATA"]),
  },
  components: {
    Sidebar: Sidebar,
    Topbar: Topbar,
    Footer: Footer,
  },
  mounted() {
    if (this.$store.state.auth.loggedIn) {
      this.SET_IS_AUTH(this.$store.state.auth.loggedIn);
      this.SET_USER_DATA(this.$store.state.auth.user);
      this.SET_API_TOKEN(this.$store.state.auth.user.token);
    } else {
      this.SET_IS_AUTH(false)
      this.SET_USER_DATA(null)
      this.SET_API_TOKEN(null)
      this.$router.push("/login");
    }
    !(function (t) {
      "use strict";
      t("#sidebarToggle, #sidebarToggleTop").on("click", function (o) {
        t("body").toggleClass("sidebar-toggled"),
          t(".sidebar").toggleClass("toggled"),
          t(".sidebar").hasClass("toggled") &&
            t(".sidebar .collapse").collapse("hide");
      });
    })(jQuery);
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
