<template>
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div
          class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">Ubah Pengajuan</h6>
          <div class="dropdown no-arrow">
            <a
              class="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
              aria-labelledby="dropdownMenuLink"
              style=""
            >
              <div class="dropdown-header">Opsi:</div>
              <NuxtLink class="dropdown-item" to="/rkat/add">Add RKAT</NuxtLink>
              <NuxtLink class="dropdown-item" to="/rkat/reset"
                >Reset RKAT</NuxtLink
              >
              <!-- <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a> -->
              <!-- <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a> -->
            </div>
          </div>
        </div>
        <!-- Card Body -->
        <div class="card-body">
          <subordinate />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import subordinate from "~/components/form/subordinate.vue";

export default {
  async asyncData({ store, params }) {
    await Promise.all([store.dispatch("subordinate/getpengajuanID", params.id)]);
    return;
  },
    components: {
      'subordinate': subordinate
  },
    mounted() {
    this.SET_IS_AUTH(this.$store.state.auth.loggedIn);
    this.SET_USER_DATA(this.$store.state.auth.user);
    this.SET_API_TOKEN(this.$store.state.auth.user.token);
  },
  methods: {
    ...mapMutations(["SET_IS_AUTH", "SET_API_TOKEN", "SET_USER_DATA", "SET_STATUS", "SET_HISTORY"]),
    ...mapActions("subordinate", ["getpengajuanID"]),
  }
};
</script>

<style>
</style>