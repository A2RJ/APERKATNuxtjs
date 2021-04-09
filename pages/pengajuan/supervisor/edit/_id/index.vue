<template>
  <div class="row">
    <!-- Area Chart -->
    <div class="col-xl-12 col-lg-12">
      <div class="card shadow mb-4">
        <!-- Card Header - Dropdown -->
        <div
          class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">Data RKAT</h6>
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
        <div class="card-body"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>