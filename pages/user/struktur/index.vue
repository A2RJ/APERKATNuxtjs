<template>
  <struktur />
</template>

<script>
import struktur from "../../../components/form/struktur.vue";
export default {
  middleware: ["roles/sekniv"],
  components: { struktur },
};
</script>

<style></style>
