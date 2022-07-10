<template>
  <section
    style="
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      background-color: #ffffff;
    "
  >
    <div
      class="main-empty-2-1 container mx-auto d-flex align-items-center justify-content-center flex-column"
      style="font-family: 'Poppins', sans-serif"
    >
      <img
        class="main-img-empty-2-1 img-fluid"
        src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState2/Empty-2-1.png"
        alt=""
      />

      <div class="text-center w-100">
        <h1 class="title-text-empty-2-1" style="color: #272e35">
          Opss! Something Missing
        </h1>
        <p
          class="lg-show-empty-2-1 title-caption-empty-2-1"
          style="color: #9c9c9c"
        >
          The page you’re looking for isn’t found. We<br />
          suggest you Back to Homepage.
        </p>
        <p
          class="lg-hide-empty-2-1 title-caption-empty-2-1"
          style="color: #9c9c9c"
        >
          The page you’re looking for isn’t found. We suggest you Back to
          Homepage.
        </p>
        <div class="d-flex justify-content-center">
          <button
            class="btn btn-empty-2-1 d-inline-flex"
            style="background: #ff7c57; font-family: 'Poppins', sans-serif"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.main-empty-2-1 {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 4rem;
  padding-bottom: 2rem;
}
.main-img-empty-2-1 {
  object-fit: cover;
  object-position: center;
  margin-bottom: 3rem;
  width: 83.333333%;
}
.title-text-empty-2-1 {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
}
.title-caption-empty-2-1 {
  margin-bottom: 4rem;
  letter-spacing: 0.025em;
  line-height: 1.75rem;
}
.btn-empty-2-1 {
  color: #ffffff;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
  line-height: 1.75rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  border-radius: 0.75rem;
}
.btn-empty-2-1:hover {
  color: #ffffff;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
@media (min-width: 425px) {
  .title-text-empty-2-1 {
    font-size: 40px;
  }
}
@media (min-width: 576px) {
  .main-empty-2-1 {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 5rem;
    padding-bottom: 4rem;
  }
  .main-img-empty-2-1 {
    margin-bottom: 4rem;
    width: auto;
  }
}
@media (min-width: 768px) {
  .main-empty-2-1 {
    padding-left: 4rem;
    padding-right: 4rem;
  }
  .lg-show-empty-2-1 {
    display: block;
  }
  .lg-hide-empty-2-1 {
    display: none;
  }
}
@media (min-width: 992px) {
  .main-empty-2-1 {
    padding-left: 6rem;
    padding-right: 6rem;
  }
}
@media (max-width: 768px) {
  .lg-show-empty-2-1 {
    display: none;
  }
  .lg-hide-empty-2-1 {
    display: block;
  }
}
</style>