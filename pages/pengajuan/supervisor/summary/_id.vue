<template lang="">
  <div>
    <h1>Hello world!</h1>
    <!-- loop  -->
    <ul v-for="item in data">
      <li>
        {{ item.fullname }}
        <ul v-for="item in item.rkat">
          <li>
            <div>
              {{ item.kode_rkat }}
              <div v-for="item in item.pengajuan" :key="item.id">
                {{ item.latar_belakang }}
              </div>
            </div>
          </li>
        </ul>
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
