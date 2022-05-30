<template lang="">
  <div>
    <h1>Hello world!</h1>

    <p>{{ data.fullname }}</p>
    <p>{{ data.email }}</p>
    <!-- loop rkat ul li -->
    <ul>
      <li v-for="(item, index) in data.rkat">
        <p>{{ item.kode_rkat }}</p>
        <p>{{ item.id_pengajuan }}</p>
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
        .get("/pengajuan/summary/" + this.$route.params.id)
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
