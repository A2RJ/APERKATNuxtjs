<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
              </div>
              <form class="user" @submit.prevent="login">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control form-control-user"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email Address..."
                    v-model="auth.email"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control form-control-user"
                    id="exampleInputPassword"
                    placeholder="Password"
                    v-model="auth.password"
                  />
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox small">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck"
                    />
                    <label class="custom-control-label" for="customCheck"
                      >Remember Me</label
                    >
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary btn-user btn-block"
                >
                  Submit
                </button>
                <hr />
                <a href="/" class="btn btn-google btn-user btn-block">
                  <i class="fab fa-google fa-fw"></i> Login with Google
                </a>
                <a href="/" class="btn btn-facebook btn-user btn-block">
                  <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                </a>
              </form>
              <hr />
              <div class="text-center">
                <a class="small" href="forgot-password.html"
                  >Forgot Password?</a
                >
              </div>
              <div class="text-center">
                <a class="small" href="register.html">Create an Account!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  auth: false,
  data() {
    return {
      auth: {
        email: null,
        password: null,
      },
    };
  },
  mounted() {
    if (this.$auth.$state.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapMutations(["SET_IS_AUTH", "SET_API_TOKEN", "SET_USER_DATA"]),
    async login() {
      try {
        await this.$auth
          .loginWith("laravelJWT", {
            data: {
              email: this.auth.email,
              password: this.auth.password,
            },
          })
          .then(() => {
            this.SET_IS_AUTH(this.$store.state.auth.loggedIn);
            this.SET_USER_DATA(this.$store.state.auth.user);
            this.SET_API_TOKEN(this.$store.state.auth.user.token);
            this.$router.push("/");
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>