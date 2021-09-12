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
      <template #head(index)>
        <span aria-hidden="true">
          <b-form-checkbox v-model="selectAll" name="check-button"
            >No.</b-form-checkbox
          >
        </span>
      </template>
      <template #cell(index)="data">
        <b-form-checkbox v-if="data.rowSelected" v-model="checked" disabled>
          {{ data.index + 1 }}
        </b-form-checkbox>
        <span v-else aria-hidden="true">{{ data.index + 1 }}</span>
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
          :total-rows="
            countRows !== 0 && countRows < totalRows ? countRows : totalRows
          "
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
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  props: ["items", "fields", "html", "actions"],
  data() {
    return {
      transProps: {
        name: "flip-list",
      },
      id: this.html,
      fieldsTable: ["index"],
      selectMode: "multi",
      selected: [],
      selectAll: false,
      checked: true,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 15, 20, 25, { value: 100, text: "Show a lot" }],
      filter: null,
      countRows: 0,
    };
  },
  computed: {
    totalRows() {
      return this.items.length;
    },
    ...mapState("customTable", {
      success: (state) => state.success,
      errors: (state) => state.errors,
    }),
  },
  mounted() {
    for (let index = 0; index < this.fields.length; index++) {
      this.fieldsTable.push(this.fields[index]);
    }
  },
  methods: {
    ...mapActions("customTable", ["action"]),

    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
      this.selectAll = true;
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
      this.selectAll = false;
    },
    onFiltered(filteredItems) {
      this.countRows = filteredItems.length;
      this.currentPage = 1;
    },
    toCellName(slot) {
      return `cell(${slot})`;
    },
    functionIndex(func, link) {
      console.log("functionIndex");

      if (func == "reset") {
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
    reset(link) {
      this.$swal({
        title: "Warning!",
        text: "Yakin menghapus data?",
        icon: "warning",
        width: 300,
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.action(Object.assign({ route: "GET", link: link }))
            .then(() => {
              this.$swal({
                width: 300,
                icon: "success",
                title: "Congrats!",
                text: "Data berhasil dihapus",
              });
              this.$nuxt.refresh();
            })
            .catch(() => {
              this.$swal({
                width: 300,
                icon: "error",
                title: "Oops...",
                text: "Periksa jaringan anda!",
              });
            });
        }
      });
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
    items: function () {
      console.log(this.items.length);
    },
  },
};
</script>

<style>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
</style>