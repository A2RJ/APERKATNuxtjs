<template>
  <div>
    <custom-table :items="items" :fields="fields" :html="key" :actions="actions">
      <template v-slot:age="data">
        <b class="text-info">{{ data.value }}</b>
      </template>
      <template v-slot:first_name="data">
        <b class="text-info">{{ data.value | capitalize }}</b>
      </template>
    </custom-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: "id",
      actions: [
        { name: "Tambah", type: "link", link: "user/add", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Reset", type: "func", func: "reset", link: "Reset", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Print", type: "func", func: "print", link: "Print", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Import", type: "func", func: "importRKAT", link: "Print", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Select All", type: "func", func: "selectAll", link: "Select All", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Clear Selected", type: "func", func: "clearSelected", link: "Clear Selected", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Delete Selected", type: "func", func: "deleteSelected", link: "Delete Selected", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
        { name: "Print Selected", type: "func", func: "printSelected", link: "Print Selected", color: "btn btn-sm btn-outline-primary mt-1 ml-2" },
      ],
      fields: [
        { key: "first_name", label: "Nama awal", sortable: true },
        { key: "last_name", label: "Nama akhir", sortable: true },
        { key: "age", label: "Age", sortable: true },
      ],
      items: [
        { id: 1, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { id: 2, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { id: 3, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { id: 4, age: 38, first_name: "Jami", last_name: "Carney" },
        { id: 5, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { id: 6, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { id: 7, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { id: 8, age: 38, first_name: "Jami", last_name: "Carney" },
        { id: 9, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { id: 10, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { id: 11, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { id: 12, age: 38, first_name: "Jami", last_name: "Carney" },
        { id: 13, age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { id: 14, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { id: 15, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { id: 16, age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
};
</script>

<style>
</style>