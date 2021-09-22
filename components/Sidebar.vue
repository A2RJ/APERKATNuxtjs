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
        <b-badge v-if="total != 0" pill variant="light">{{ total }}</b-badge>
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
          <NuxtLink
            class="collapse-item"
            v-show="dirKeuangan"
            :to="'/pengajuanSelesai'"
            >Pengajuan diterima</NuxtLink
          >
        </div>
      </div>
    </li>

    <!-- <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>NON RKAT</span>
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
          <NuxtLink class="collapse-item" :to="'/nonrkat/'"
            >Pengajuan</NuxtLink
          >
          <NuxtLink
            class="collapse-item"
            v-show="fakultas || dirKeuangan || warek || rektor || sekniv"
            :to="'/nonrkat/sub/'"
            >Pengajuan Sub Divisi</NuxtLink
          >
        </div>
      </div>
    </li> -->

    <li class="nav-item" v-show="sekniv">
      <NuxtLink class="nav-link" to="/user">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>User</span>
      </NuxtLink>
    </li>
    <!-- <li class="nav-item" v-show="sekniv">
      <NuxtLink class="nav-link" to="/user/struktur">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Struktur</span>
      </NuxtLink>
    </li> -->
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
      total: 0,
    };
  },
  computed: {},
  methods: {
    subMessage() {
      this.$axios
        .get(
          `/pengajuan/countMessage/${this.$store.state.auth.user[0].id_user}`
        )
        .then((response) => {
          this.badge = response.data.data;
          this.count();

          setTimeout(() => {
            this.subMessage();
          }, 1500);
        });
    },
    selfMessage() {
      this.$axios
        .get(
          `/pengajuan/countMessageSelf/${this.$store.state.auth.user[0].id_user}`
        )
        .then((response) => {
          this.badgeSelf = response.data.data;
          this.count();

          setTimeout(() => {
            this.selfMessage();
          }, 1500);
        });
    },
    count() {
      this.total = parseInt(this.badge) + parseInt(this.badgeSelf);
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
      // if (data == "prodi") {
      //   this.selfMessage();
      // } else {
      //   this.selfMessage();
      //   this.subMessage();
      // }
    }

    // setTimeout(async () => {
    //   if (this.$store.state.auth.loggedIn == false) {
    //     try {
    //     this.SET_IS_AUTH(false);
    //     this.SET_USER_DATA(null);
    //     window.location.href = "/login";
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   }
    // }, 10000);
  },
  // watch: {
  //   $route() {
  //   },
  // },
};
</script>

<style>
</style>