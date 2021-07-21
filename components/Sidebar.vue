<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="/"
    >
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">APERKAT</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <NuxtLink class="nav-link" to="/">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Dashboard</span>
      </NuxtLink>
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Submission</div>

    <!-- Nav Item -->

    <li class="nav-item" v-show="sekniv">
      <NuxtLink class="nav-link" to="/rkat">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>RKAT</span>
      </NuxtLink>
    </li>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>PENGAJUAN</span>
        <b-badge v-if="badge != 0" pill variant="light">{{
          badge + badgeSelf
        }}</b-badge>
      </a>
      <div
        id="collapseTwo"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div
          class="bg-white py-2 collapse-inner rounded"
          v-if="this.$store.state.auth.user"
        >
          <h6 class="collapse-header">Daftar Pengajuan</h6>
          <NuxtLink class="collapse-item" :to="'/pengajuan/subordinate/'"
            >Pengajuan<b-badge v-if="badgeSelf != 0" pill variant="primary">{{
              badgeSelf
            }}</b-badge></NuxtLink
          >
          <NuxtLink
            class="collapse-item"
            v-show="fakultas || dirKeuangan || warek || rektor || sekniv"
            :to="'/pengajuan/supervisor/'"
            >Pengajuan Sub Divisi<b-badge
              v-if="badge != 0"
              pill
              variant="primary"
              >{{ badge }}</b-badge
            ></NuxtLink
          >
          <NuxtLink
            class="collapse-item"
            v-show="fakultas || dirKeuangan || warek || rektor || sekniv"
            :to="'/pengajuan/grafik/'"
            >Grafik Sub Divisi</NuxtLink
          >
        </div>
      </div>
    </li>

    <li class="nav-item" v-show="sekniv">
      <NuxtLink class="nav-link" to="/user">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>USER</span>
      </NuxtLink>
    </li>
    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
  <!-- End of Sidebar -->
</template>

<script>
export default {
  data() {
    return {
      prodi: false,
      fakultas: false,
      dirKeuangan: false,
      warek: false,
      rektor: false,
      sekniv: false,
      badge: 0,
      badgeSelf: 0,
    };
  },
  computed: {},
  methods: {
    interval() {
      // setInterval(() => {
        this.$axios
          .get(
            `/pengajuan/countMessage/${this.$store.state.auth.user[0].id_user}`
          )
          .then((response) => {
            this.badge = response.data.data;
          });
      // }, 1000);
    },
    intervalSelf() {
      // setInterval(() => {
        this.$axios
          .get(
            `/pengajuan/countMessageSelf/${this.$store.state.auth.user[0].id_user}`
          )
          .then((response) => {
            this.badgeSelf = response.data.data;
          });
      // }, 1000);
    },
  },
  mounted() {
    if (this.$store.state.auth.loggedIn) {
      let data = this.$store.state.auth.user[1].level;
      if (data == "prodi") {
        this.prodi = true;
      } else if (data == "fakultas") {
        this.fakultas = true;
      } else if (data == "dirKeuangan") {
        this.dirKeuangan = true;
      } else if (data == "warek") {
        this.warek = true;
      } else if (data == "rektor") {
        this.rektor = true;
      } else if (data == "sekniv") {
        this.sekniv = true;
      }

      if (data !== "prodi") {
        if (this.$store.state.auth.user[0].id_user) {
          this.interval();
        } else {
          // clearInterval(this.interval());
        }
      }
      if (data !== "prodi") {
        if (this.$store.state.auth.user[0].id_user) {
          this.intervalSelf();
        } else {
          // clearInterval(this.intervalSelf());
        }
      }
    }
  },
};
</script>

<style>
</style>