<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
  <!-- ffa600 -->
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
    <div v-if="notUser">
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
          data-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <i class="fas fa-fw fa-cog"></i>
          <span>PENGAJUAN</span>
        </a>
        <div
          id="collapseOne"
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
              >Pengajuan</NuxtLink
            >
            <NuxtLink class="collapse-item" :to="'/pengajuan/subordinate/summary/' + userLogin"
              >Summary Pengajuan</NuxtLink
            >
            <NuxtLink
              class="collapse-item"
              v-show="fakultas || dirKeuangan || warek || rektor || sekniv"
              :to="'/pengajuan/supervisor/'"
              >Pengajuan Sub Divisi
            </NuxtLink>
            <NuxtLink
              class="collapse-item"
              v-show="warek2"
              :to="'/pengajuan/supervisor/summary'"
              >Summary
            </NuxtLink>
            <NuxtLink
              class="collapse-item"
              v-show="fakultas || dirKeuangan || warek || rektor || sekniv"
              :to="'/pengajuan/grafik/'"
              >Grafik Sub Divisi</NuxtLink
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
            <h6 class="collapse-header">Daftar Non RKAT</h6>
            <NuxtLink class="collapse-item" :to="'/nonrkat/subordinate/'"
              >Non RKAT
            </NuxtLink>
            <NuxtLink
              class="collapse-item"
              v-show="fakultas || dirKeuangan || warek || rektor || sekniv"
              :to="'/nonrkat/supervisor/'"
              >Non RKAT Sub Divisi
            </NuxtLink>
          </div>
        </div>
      </li> -->

      <li class="nav-item" v-show="sekniv">
        <NuxtLink class="nav-link" to="/user">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>User</span>
        </NuxtLink>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block" />
    </div>
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
      warek2: false,
      rektor: false,
      sekniv: false,
      userLogin: this.$store.state.auth.user[0].id_user,
      notUser: true,
    };
  },
  computed: {},
  methods: {},
  mounted() {
    if (this.userLogin == 120) {
      this.notUser = false;
    }
    if (this.userLogin == 121) {
      this.notUser = false;
    }
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
    }

    if (this.userLogin == 23) {
      this.warek2 = true;
    }
  },
};
</script>

<style></style>
