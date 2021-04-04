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
          <Nuxt />
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->
      <!-- Footer -->
      <Footer />
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      isAuth: false,
    };
  },
  components: {
    Sidebar: Sidebar,
    Topbar: Topbar,
    Footer: Footer,
  },
  mounted() {
    !(function (t) {
      "use strict";
      t("#sidebarToggle, #sidebarToggleTop").on("click", function (o) {
        t("body").toggleClass("sidebar-toggled"),
          t(".sidebar").toggleClass("toggled"),
          t(".sidebar").hasClass("toggled") &&
            t(".sidebar .collapse").collapse("hide");
      }),
        t(window).resize(function () {
          t(window).width() < 768 && t(".sidebar .collapse").collapse("hide");
        }),
        t("body.fixed-nav .sidebar").on(
          "mousewheel DOMMouseScroll wheel",
          function (o) {
            if (768 < t(window).width()) {
              var e = o.originalEvent,
                l = e.wheelDelta || -e.detail;
              (this.scrollTop += 30 * (l < 0 ? 1 : -1)), o.preventDefault();
            }
          }
        ),
        t(document).on("scroll", function () {
          100 < t(this).scrollTop()
            ? t(".scroll-to-top").fadeIn()
            : t(".scroll-to-top").fadeOut();
        }),
        t(document).on("click", "a.scroll-to-top", function (o) {
          var e = t(this);
          t("html, body")
            .stop()
            .animate(
              { scrollTop: t(e.attr("href")).offset().top },
              1e3,
              "easeInOutExpo"
            ),
            o.preventDefault();
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
