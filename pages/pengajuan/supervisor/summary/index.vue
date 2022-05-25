<template>
  <div>
    <h1>Hello world!</h1>
    <button @click="onClick">Click me!</button>
    <!-- loop data with list -->
    <ul v-for="item in data">
      <li>
        <NuxtLink :to="'/pengajuan/supervisor/summary/'+ item.id_user">
          {{ item.fullname }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("/user")
        .then((response) => {
          this.data = response.data.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
    onClick() {
      this.getData();
    },
  },
};
</script>
