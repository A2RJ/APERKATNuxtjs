<template>
  <div>
    <button @click="filter">filter</button>
    <button @click="reset">reset</button>
    <b-table :items="items" :fields="fields">
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        "index",
        { key: "name", label: "Name" },
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
          dateOfBirth: "01-09-2015",
        },
        {
          age: 21,
          name: "Larsen",
          department: "Marketing",
          dateOfBirth: "01-08-2015",
        },
        {
          age: 89,
          name: "Geneva",
          department: "HR",
          dateOfBirth: "01-07-2015",
        },
        {
          age: 38,
          name: "Jami",
          department: "Accounting",
          dateOfBirth: "01-06-2015",
        },
        {
          age: 38,
          name: "Jami",
          department: "Accounting",
          dateOfBirth: "01-05-2015",
        },
      ],
      itemsCadangan: [
        {
          age: 40,
          name: "Dickerson",
          department: "Development",
          dateOfBirth: "01-09-2015",
        },
        {
          age: 21,
          name: "Larsen",
          department: "Marketing",
          dateOfBirth: "01-08-2015",
        },
        {
          age: 89,
          name: "Geneva",
          department: "HR",
          dateOfBirth: "01-07-2015",
        },
        {
          age: 38,
          name: "Jami",
          department: "Accounting",
          dateOfBirth: "01-06-2015",
        },
        {
          age: 38,
          name: "Jami",
          department: "Accounting",
          dateOfBirth: "01-05-2015",
        },
      ],
    };
  },
  methods: {
    filter() {
      var startDate = new Date("01-06-2015");
      var endDate = new Date("01-07-2015");

      var result = this.items.filter(
        (a) =>
          new Date(a.dateOfBirth) >= startDate &&
          new Date(a.dateOfBirth) <= endDate
      );
      this.items = result;
    },
    reset() {
      this.items = this.itemsCadangan;
    },
  },
};
</script>

<style>
</style>