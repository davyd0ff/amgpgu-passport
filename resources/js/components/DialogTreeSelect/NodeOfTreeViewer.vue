<style scoped>
.tree-node {
  position: relative;
}

.tree-node .chevron.shown {
  transform: rotate(-90deg);
}

.tree-node .chevron {
  margin: 0 0 0 0;
  transition: transform 0.2s;
  cursor: pointer;
}

.tree-node > label > a > i.material-icons {
  position: absolute;
  right: -10px;
  height: 24px;
  line-height: 1;
  width: 24px;
  color: rgba(0, 0, 0, 0.54);
}
</style>

<template>
  <div v-if="isDisplayed">
    <div v-bind:style="{ ...styles, paddingLeft: `${20}px` }">
      <p class="tree-node">
        <label>
          <input
            type="checkbox"
            class="filled-in"
            v-bind:checked="currentChecked"
            v-on:change="checkboxClicked"
          />
          <span style="color: #212121">{{ node | title }}</span>
          <a
            v-if="nodes.length > 0"
            style="color: #212121"
            v-on:click.stop.prevent="onShowChildren"
          >
            <i
              class="material-icons chevron"
              v-bind:class="{ shown: isShownNodes }"
              >chevron_left</i
            >
          </a>
        </label>
      </p>
      <!-- todo develop: трабла следующая: 2. Если ФЛ будет в нескольких группах, то как его уведомлять? -->
      <!-- допустим в ГруппаА и в ГруппаБ будет СтудентМ -->
      <!-- Если выделить ГруппуА, а затем выделить ГруппуБ и снять выделение с ГруппыА-->
      <!-- то если массив выделенных ФЛ будт distinct то, СтудентМ не попадет в набор -->
      <!-- решение - делать distinct перед отправкой на сервер -->
      <p class="tree-nodes" v-bind:class="`children-select-${level}`">
        <node-of-tree-viewer
          v-for="(node, index) in nodes"
          v-bind:key="`${level}${index}`"
          v-bind:level="level + 1"
          v-bind:node="node"
          v-bind:is-displayed="isShownNodes"
          v-bind:parent-checked="currentChecked"
          v-bind:depth-displayed="depthDisplayed"
          v-bind:styles="styles"
          v-bind:toggle="toggle"
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NodeOfTreeViewer',
  props: {
    level: { type: Number, default: 0 },
    depthDisplayed: { type: Number, default: 0 },
    isDisplayed: { type: Boolean, default: false },
    parentChecked: { type: Boolean, default: false },
    node: { type: Object, default: null },
    styles: { type: Object, default: () => ({}) },
    toggle: { type: Function, default: (m, a) => {} },
  },
  data() {
    return {
      currentChecked: this.parentChecked,
      isShownNodes: this.level + 1 <= this.depthDisplayed,
    };
  },
  computed: {
    nodes() {
      return this.node?.nodes ?? [];
    },
  },
  watch: {
    parentChecked() {
      this.currentChecked = this.parentChecked;
    },
    currentChecked(value) {
      if (this.node && this.node.member) {
        this.toggle(this.node.member, value);
      }
    },
  },
  filters: {
    title(node) {
      if (node.name) {
        return node.name;
      }
      if (node.member && node.member.name) {
        return node.member.name;
      }

      return 'Empty';
    },
  },
  methods: {
    checkboxClicked() {
      this.currentChecked = !this.currentChecked;
    },
    onShowChildren() {
      this.isShownNodes = !this.isShownNodes;
    },
  },
};
</script>
