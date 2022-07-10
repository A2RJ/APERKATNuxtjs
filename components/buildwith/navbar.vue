<template>
  <section
    style="
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      background-color: #ffffff;
    "
  >
    <nav
      class="navbar navbar-expand-lg navbar-light p-4 px-md-4 mb-3 bg-body border-bottom"
      style="font-family: Poppins, sans-serif"
    >
      <div class="container">
        <a class="navbar-brand" href="#"> APERKAT </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link px-md-4 active" aria-current="page" href="#"
                >Features</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link px-md-4" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-md-4" href="#">Contacts</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-md-4" href="#">Teams</a>
            </li>
            <li class="nav-item">
              <a class="nav-link px-md-4" href="#">Review</a>
            </li>
          </ul>
          <div class="d-flex">
            <a class="btn btn-get-started btn-get-started-blue" href="#"
              >Get Started</a
            >
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.navbar-light .navbar-nav .nav-link {
  color: #092a33;
}
.navbar-light .navbar-nav .nav-link.active {
  font-weight: 500;
}
.btn-get-started {
  border-radius: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 30px;
  padding-right: 30px;
  font-weight: 500;
}

.btn-get-started-blue {
  background-color: #0ec8f8;
  color: #fff;
}
.btn-get-started-blue:hover {
  background-color: #3ad8ff;
  color: #fff;
}
</style>