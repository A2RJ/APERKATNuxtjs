<template>
  <div>
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-4 col-xl-4">
        <b-table responsive :items="items" :fields="fields">
          <template #cell(name)="data">
            <b-form-input
              v-if="selectedRow[data.index]"
              type="text"
              v-model="items[data.index].name"
            ></b-form-input>
            <span v-else>{{ data.value }}</span>
          </template>
          <template #cell(edit)="data">
            <b-button @click="handleEditRow(data)">
              <span v-if="!selectedRow[data.index]">Edit</span>
              <span v-else>Done</span>
            </b-button>
          </template>
        </b-table>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xl-4 ">
        <b-table responsive :items="items" :fields="fields1">
          <template #cell(name)="data">
            <b-form-input
              v-if="selectedRow[data.index]"
              type="text"
              v-model="items[data.index].name"
            ></b-form-input>
            <span v-else>{{ data.value }}</span>
          </template>
          <template #cell(department)="data">
            <b-form-select
              v-if="selectedRow[data.index]"
              v-model="items[data.index].department"
              :options="['Development', 'Marketing', 'HR', 'Accounting']"
              class="form-control"
            ></b-form-select>
            <span v-else>{{ data.value }}</span>
          </template>
          <template #cell(edit)="data">
            <b-button @click="handleEditRow(data)">
              <span v-if="!selectedRow[data.index]">Edit</span>
              <span v-else>Done</span>
            </b-button>
          </template>
        </b-table>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xl-4 ">
        <b-table responsive :items="items" :fields="fields2">
          <template #cell(name)="data">
            <b-form-input
              v-if="selectedRow[data.index]"
              type="text"
              v-model="items[data.index].name"
            ></b-form-input>
            <span v-else>{{ data.value }}</span>
          </template>
          <template #cell(department)="data">
            <b-form-select
              v-if="selectedRow[data.index]"
              v-model="items[data.index].department"
              :options="['Development', 'Marketing', 'HR', 'Accounting']"
              class="form-control"
            ></b-form-select>
            <span v-else>{{ data.value }}</span>
          </template>
          <template #cell(edit)="data">
            <b-button @click="handleEditRow(data)">
              <span v-if="!selectedRow[data.index]">Edit</span>
              <span v-else>Done</span>
            </b-button>
          </template>
        </b-table>
      </div>
    </div>
    <!-- <pre>
      {{ items }}
    </pre> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: "name", label: "Name" },
        { key: "edit", label: "" },
      ],
      fields1: [
        { key: "name", label: "Name" },
        { key: "department", label: "Department" },
        { key: "edit", label: "" },
      ],
      fields2: [
        { key: "name", label: "Name" },
        { key: "department", label: "Department" },
        { key: "edit", label: "" },
      ],
      items: [
        { name: "Dickerson", department: "Development" },
        { name: "Larsen", department: "Marketing" },
        { name: "Geneva", department: "HR" },
        { name: "Jami", department: "Accounting" },
      ],
      selectedRow: {},
    };
  },
  methods: {
    handleEditRow(data) {
      this.selectedRow = {
        [data.index]: !this.selectedRow[data.index],
      };
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  margin: 60px;
}
thead,
tbody,
tfoot,
tr,
td,
th {
  text-align: left;
  width: 100px;
  vertical-align: middle;
}
pre {
  text-align: left;
  color: #d63384;
}
</style>