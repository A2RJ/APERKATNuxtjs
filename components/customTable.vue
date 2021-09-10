<template>
  <b-container fluid>
    <b-row>
      <b-col lg="6" class="my-1">
        <span v-for="action in actions" :key="action.name">
          <NuxtLink
            v-if="action.type == 'link'"
            :class="action.color"
            :to="action.link"
            >{{ action.name }}</NuxtLink
          >
          <button
            v-else
            :class="action.color"
            size="sm"
            @click="functionIndex(action.func, action.link)"
          >
            {{ action.name }}
          </button>
        </span>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Per page"
              label-for="per-page-select"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-6
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
      </b-col>
    </b-row>
    <b-table
      :items="items"
      :fields="fieldsTable"
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
      selectedVariant="success"
    >
      <template #head(selected)>
        <span aria-hidden="true">
          <b-form-checkbox v-model="selectAll" name="check-button" />
        </span>
      </template>
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <b-form-checkbox v-model="checked" disabled> </b-form-checkbox>
        </template>
      </template>
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template
        v-for="slot in Object.keys($scopedSlots)"
        v-slot:[toCellName(slot)]="props"
      >
        <slot v-bind="props" :name="slot" />
      </template>
    </b-table>
    <b-row>
      <b-col lg="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ["items", "fields", "html", "actions"],
  data() {
    return {
      transProps: {
        name: "flip-list",
      },
      id: this.html,
      fieldsTable: ["selected", { key: "index", label: "No." }],
      selectMode: "multi",
      selected: [],
      selectAll: false,
      checked: true,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 15, 20, 25, { value: 100, text: "Show a lot" }],
      filter: null,
    };
  },
  computed: {
    totalRows() {
      return this.items.length;
    },
  },
  mounted() {
    for (let index = 0; index < this.fields.length; index++) {
      this.fieldsTable.push(this.fields[index]);
    }
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    toCellName(slot) {
      return `cell(${slot})`;
    },
    functionIndex(func, link) {
      if (func == "add") {
        this.add(link);
      } else if (func == "reset") {
        this.reset(link);
      } else if (func == "print") {
        this.print(link);
      } else if (func == "selectAll") {
        this.selectAllRows();
      } else if (func == "clearSelected") {
        this.clearSelected();
      } else if (func == "deleteSelected") {
        this.deleteRows();
      } else if (func == "printSelected") {
        this.printSelectedRows();
      }
    },
    add(link) {
      console.log(link);
    },
    reset(link) {
      console.log(link);
    },
    print(link) {
      console.log(link);
    },
    deleteRows() {
      const a = [];
      for (let index = 0; index < this.selected.length; index++) {
        a.push(this.selected[index][this.id]);
      }
      this.selected = a;
    },
    printSelectedRows() {
      const a = [];
      for (let index = 0; index < this.selected.length; index++) {
        a.push(this.selected[index][this.id]);
      }
      this.selected = a;
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