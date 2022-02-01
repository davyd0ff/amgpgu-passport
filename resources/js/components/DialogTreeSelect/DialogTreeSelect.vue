<template>
  <dialog-window v-bind:is-opened="isOpened" v-on:on-close="select">
    <template v-slot:header>
      <div class="input-field">
        <input
          id="filter"
          type="text"
          placeholder="TREE_FILTER"
          v-model="filter"
        />
      </div>
    </template>
    <template v-slot:content>
      <Loader v-if="isLoading" />
      <div v-else class="row">
        <div
          class="col s12"
          v-bind:class="`m${Math.floor(12 / cssColumnsCount)}`"
          v-for="node in nodes"
          v-bind:key="node.name"
        >
          <node-of-tree-viewer
            v-bind:node="node"
            v-bind:depth-displayed="3"
            v-bind:is-displayed="true"
            v-bind:styles="{
              maxWidth: cssColumnsCount === 1 ? '500px' : '100%',
            }"
            v-bind:toggle="toggle"
          />
        </div>
      </div>
    </template>
  </dialog-window>
</template>

<script>
import NodeOfTreeViewer from './NodeOfTreeViewer';
import DialogWindow from '@/components/DialogWindow';
import Loader from '@/components/Loader';
import Stack from '@/utils/Stack';

export default {
  name: 'DialogTreeSelect',
  components: { Loader, NodeOfTreeViewer, DialogWindow },
  props: {
    // tree: { type: Array, default: () => [] },
    tree: { type: Object, default: () => ({}) },
    loadTree: { type: Function, default: () => Promise.resolve({}) },
    isOpened: { type: Boolean, default: false },
  },
  data() {
    return {
      isLoading: false,
      filter: '',
    };
  },
  computed: {
    filteredTree() {
      if (this.filter.length <= 3) {
        return this.tree;
      }

      const stack = new Stack();

      const dfs = (node, filter) => {
        const nameContainsFilter = (node, filter) =>
          node?.name?.toLowerCase().includes(filter.toLowerCase()) ||
          node?.member?.name.toLowerCase().includes(filter.toLowerCase());

        const result = { nodes: [] };
        stack.push(node);

        while (stack.isNotEmpty()) {
          const node = stack.pop();
          if (nameContainsFilter(node, filter)) {
            result.nodes.push(node);
          } else {
            node?.nodes?.forEach((child) => {
              stack.push(child);
            });
          }
        }

        return result;
      };

      return dfs(this.tree, this.filter);
    },
    nodes() {
      return this.filteredTree?.nodes || [];
    },
    cssColumnsCount() {
      return 1; // this.nodes.length || 1;
    },
  },
  methods: {
    select: function () {
      this.$emit('select', this.checkedMembers);
    },
    toggle: function (member, added) {
      if (added) {
        this.checkedMembers = [...this.checkedMembers, member];
      } else {
        const index = this.checkedMembers.findIndex(
          (_member) => _member.code === member.code
        );
        if (index !== -1) {
          this.checkedMembers = [
            ...this.checkedMembers.slice(0, index),
            ...this.checkedMembers.slice(index + 1, this.checkedMembers.length),
          ];
        }
      }
      // this.$emit('change', this.checkedMembers);
    },
  },

  beforeCreate() {
    this.checkedMembers = [];
  },
  created() {
    this.checkedMembers = [];
  },
  mounted() {
    this.isLoading = true;
    this.loadTree()
      .catch((error) => {
        this.$error(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>
