<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <button
          class="btn btn-sm-outline btn-info"
          size="sm"
          @click="selectAllRows"
        >
          Select All
        </button>
        <button
          class="btn btn-sm-outline btn-info"
          size="sm"
          @click="clearSelected"
        >
          Clear selected
        </button>
        <button
          class="btn btn-sm-outline btn-info"
          size="sm"
          @click="deleteRows"
        >
          Delete rows
        </button>
        <button
          class="btn btn-sm-outline btn-info"
          size="sm"
          @click="deleteRows"
        >
          Reset
        </button>
        <button
          class="btn btn-sm-outline btn-info"
          size="sm"
          @click="deleteRows"
        >
          Export All
        </button>
        <button
          class="btn btn-sm-outline btn-info"
          size="sm"
          @click="deleteRows"
        >
          Export selected
        </button>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      responsive
      head-variant="light"
      id="table-transition-example"
      :tbody-transition-props="transProps"
      hover
      show-empty
      ref="selectableTable"
      selectable
      @filtered="onFiltered"
      @row-selected="onRowSelected"
    >
      <template #head(selected)>
        <span aria-hidden="true">
          <b-form-checkbox v-model="selectAll" name="check-button" />
        </span>
      </template>
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <b-form-checkbox
            v-model="checked"
            :indeterminate.sync="indeterminate"
          >
          </b-form-checkbox>
        </template>
        <template v-else>
          <span aria-hidden="true"><input type="checkbox" /></span>
        </template>
      </template>
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="fill"
      size="sm"
      class="my-0"
    ></b-pagination>
  </b-container>
</template>

<script>
export default {
  props: ["items", "fields"],
  data() {
    return {
      transProps: {
        name: "flip-list",
      },
      selectMode: "multi",
      selected: [],
      selectAll: false,
      indeterminate: true,
      checked: true,
      // Pagination
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [15, 20, 25, { value: 100, text: "Show a lot" }],
      filter: null,
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    onRowSelected(items) {
      this.indeterminate = !this.indeterminate;
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    deleteRows() {
      this.selected = this.selected.map((r) => r.first_name);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  watch: {
    selectAll: function () {
      if (this.selectAll) {
        this.selectAllRows();
      } else {
        this.clearSelected();
      }
    },
  },
};
</script>

<style>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
</style>