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
      <div class="sidebar-brand-text mx-3">APRKAT</div>
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

    <li class="nav-item">
      <NuxtLink class="nav-link" to="/rkat">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>RKAT</span>
      </NuxtLink>
    </li>

    <!-- <li class="nav-item" v-show="this.$store.state.auth.user[0]">
      <NuxtLink class="nav-link" :to="'/pengajuan/subordinate/'+ this.$store.state.auth.user[0].id_user">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>PENGAJUAN</span>
      </NuxtLink>
    </li> -->

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
          <NuxtLink
            class="collapse-item"
            v-show="fakultas"
            :to="
              '/pengajuan/supervisor/' + this.$store.state.auth.user[0].id_user
            "
            >Pengajuan Supervisor</NuxtLink
          >
          <NuxtLink
            class="collapse-item"
            :to="
              '/pengajuan/subordinate/' + this.$store.state.auth.user[0].id_user
            "
            >Pengajuan Subordinate</NuxtLink
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <NuxtLink class="nav-link" to="/user">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>USER</span>
      </NuxtLink>
    </li>
    <li class="nav-item" v-show="fakultas">
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
      fakultas: false,
    };
  },
  computed: {},
  methods: {},
  mounted() {
    if (this.$store.state.auth.loggedIn) {
      let data = this.$store.state.auth.user[1].level;
      console.log(data);
      if (data != "prodi") {
        this.fakultas = true;
      }
    }
  },
};
</script>

<style>
</style>