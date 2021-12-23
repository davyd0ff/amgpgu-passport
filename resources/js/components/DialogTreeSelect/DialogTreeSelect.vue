<template>
  <dialog-window v-bind:is-opened="isOpened" v-on:on-close="select">
    <template v-slot:header>
      <div class="input-field">
        <input id="filter" type="text" placeholder="TREE_FILTER" />
      </div>
    </template>
    <template v-slot:content>
      <Loader v-if="isLoading" />
      <div v-else class="row">
        <div
          class="col s12"
          v-bind:class="`m${Math.floor(12 / cssColumnsCount)}`"
          v-for="node in tree.nodes"
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
    tree: { type: Array, default: () => [] },
    loadTree: { type: Function, default: () => Promise.resolve({}) },
    isOpened: { type: Boolean, default: false },
  },
  data: function () {
    return {
      isLoading: false,
      filter: '',
    };
  },
  computed: {
    filteredTree: function () {
      const stack = new Stack();

      const dfs = (node, filter) => {
        console.log(node);
        console.log(filter);
        const result = { nodes: [] };
        stack.push(node);

        while (stack.isNotEmpty()) {
          const node = stack.pop();
          if (node && node.name && node.name.includes(filter)) {
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
    cssColumnsCount: function () {
      // tree.nodes - это очка и заочка
      return (this.tree && this.tree.nodes && this.tree.nodes.length) || 1;
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
