<template>
  <div>
    <b-col class="my-1 float-right">
      <b-form-group
        label="Filter"
        label-for="filter-input"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-form-datepicker
          id="filter1"
          v-model="filter1"
          class="mb-2"
          size="sm"
          today-button
          reset-button
          close-button
          locale="IDN"
        ></b-form-datepicker>
        <b-form-datepicker
          id="filter2"
          v-model="filter2"
          class="mb-2"
          size="sm"
          today-button
          reset-button
          close-button
          locale="IDN"
        ></b-form-datepicker>
      </b-form-group>
    </b-col>
    <b-table :items="items" :fields="fields" show-empty>
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  // created() {
  //   console.log(this.pengajuanDir);
  // },
  mounted() {
    this.load();
  },
  data() {
    return {
      data: [],
      filter1: null,
      filter2: null,
      fields: [
        "index",
        { key: "name", stickyColumn: true, label: "Name" },
        { key: "department", label: "Department" },
        { key: "age", label: "Age" },
        { key: "dateOfBirth", label: "Date Of Birth" },
        { key: "edit", label: "" },
      ],
      items: [
        {
          age: 40,
          name: "Dickerson",
          department: "Development",
          dateOfBirth: "2021-09-01",
        },
        {
          age: 21,
          name: "Larsen",
          department: "Marketing",
          dateOfBirth: "2021-08-01",
        },
        {
          age: 89,
          name: "Geneva",
          department: "HR",
          dateOfBirth: "2021-07-01",
        },
        {
          age: 38,
          name: "Jami",
          department: "Accounting",
          dateOfBirth: "2021-06-01",
        },
        {
          age: 38,
          name: "Jami",
          department: "Accounting",
          dateOfBirth: "2021-05-01",
        },
      ],
      itemsCadangan: [
        {
          age: 40,
          name: "Dickerson",
          department: "Development",
          dateOfBirth: "2021-09-01",
        },
        {
          age: 21,
          name: "Larsen",
          department: "Marketing",
          dateOfBirth: "2021-08-01",
        },
        {
          age: 89,
          name: "Geneva",
          department: "HR",
          dateOfBirth: "2021-07-01",
        },
        {
          age: 38,
          name: "Jami",
          department: "Accounting",
          dateOfBirth: "2021-06-01",
        },
        {
          age: 38,
          name: "Jami",
          department: "Accounting",
          dateOfBirth: "2021-05-01",
        },
      ],
    };
  },
  methods: {
    load() {
      this.$axios
        .get('/pengajuan/pengajuanSelesai/')
        .then((response) => {
          this.data = response.data.data.data
        })
        .catch((error) => {
          console.error(error);
        });
    },
    filter() {
      if (this.filter1 && this.filter2) {
        var startDate = new Date(this.filter1),
          endDate = new Date(this.filter2),
          result = [];

        if (this.items.length > this.itemsCadangan.length) {
          var result = this.items;
        } else {
          var result = this.itemsCadangan;
        }

        result = result.filter(
          (a) =>
            new Date(a.dateOfBirth) >= startDate &&
            new Date(a.dateOfBirth) <= endDate
        );
        this.items = result;
      } else {
        this.reset();
      }
    },
    reset() {
      this.items = this.itemsCadangan;
    },
  },
  watch: {
    filter1: function () {
      this.filter();
    },
    filter2: function () {
      this.filter();
    },
  },
};
</script>

<style>
</style>