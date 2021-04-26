<template>
  <div>
    <!-- Page Wrapper -->
    <div id="wrapper" v-if="isAuth">
      <!-- Sidebar -->
      <Sidebar></Sidebar>
      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <Topbar></Topbar>
          <!-- Begin Page Content -->
          <div class="container-fluid">
            <!-- Page Heading -->
            <KeepAlive>
              <Nuxt />
            </KeepAlive>
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->
        <!-- Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>

    <div v-else>
      <Nuxt />
    </div>
    <!-- End of Page Wrapper -->
  </div>
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
    ...mapState(["isAuth","ardi", "level"]),
  },
  methods: {
    ...mapMutations([
      "SET_IS_AUTH",
      "SET_USER_DATA",
      "SET_LEVEL",
    ]),
  },
  components: {
    Sidebar: Sidebar,
    Topbar: Topbar,
    Footer: Footer,
  },
  mounted() {
    if (this.$store.state.auth.loggedIn) {
      this.SET_IS_AUTH(this.$store.state.auth.loggedIn);
      this.SET_USER_DATA(this.$store.state.auth.user[0]);
      this.SET_LEVEL(this.$store.state.auth.user[1].level);
    } else {
      this.SET_IS_AUTH(false);
      this.SET_USER_DATA(null);
      this.SET_LEVEL(null);
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
