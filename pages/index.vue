<template>
  <div class="row">
    <div class="col-lg-3 mb-4">
      <div class="card bg-primary text-white shadow">
        <div class="card-body">
          Total Anggaran
          <div class="text-white-50 small">{{ 69696969 | numFormat }}</div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 mb-4">
      <div class="card bg-success text-white shadow">
        <div class="card-body">
          Sisa Anggaran
          <div class="text-white-50 small">{{ 69696969 | numFormat }}</div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 mb-4">
      <div class="card bg-info text-white shadow">
        <div class="card-body">
          Pengajuan diproses
          <div class="text-white-50 small">{{ 1 | numFormat }}</div>
        </div>
      </div>
    </div>
    <div class="col-lg-3 mb-4">
      <div class="card bg-warning text-white shadow">
        <div class="card-body">
          Pengajuan diterima
          <div class="text-white-50 small">{{ 2 | numFormat }}</div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-8 col-lg-7">
          <div class="row">
            <div class="col-lg-12">
              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Info</h6>
                </div>
                <div class="card-body"></div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-3 mb-4">
                  <div class="card bg-primary text-white shadow">
                    <div class="card-body">
                      Pengajuan I
                      <div class="text-white-50 small">#4e73df</div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 mb-4">
                  <div class="card bg-success text-white shadow">
                    <div class="card-body">
                      Pengajuan II
                      <div class="text-white-50 small">#1cc88a</div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 mb-4">
                  <div class="card bg-info text-white shadow">
                    <div class="card-body">
                      Pengajuan III
                      <div class="text-white-50 small">#33b9cc</div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 mb-4">
                  <div class="card bg-warning text-white shadow">
                    <div class="card-body">
                      Pengajuan IV
                      <div class="text-white-50 small">#f3c23e</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">History Pengajuan</h6>
            </div>
            <div class="card-body">
              <ul>
                <li>History I</li>
                <li>History II</li>
                <li>History III</li>
                <li>History IV</li>
                <li>History V</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>