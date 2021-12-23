<style scoped>
.modal.open {
  display: flex !important;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  position: relative;
}

.modal-header .input-field {
  margin: 10px;
  margin-bottom: 0;
}

.modal-content {
  overflow: auto;
  position: relative;
}

.modal-footer {
  position: relative;
}
</style>

<template>
  <div
    ref="modal"
    id="dialog-window"
    class="modal"
    v-bind:class="{ open: isOpened }"
  >
    <div class="modal-header">
      <slot name="header" />
    </div>
    <div class="modal-content">
      <slot name="content" />
    </div>
    <div class="modal-footer">
      <a
        href="#!"
        class="modal-close waves-effect waves-green btn"
        v-on:click.prevent
      >
        {{ 'DIALOG_TREE_SELECT' | localize }}
      </a>
      <!-- <slot name="footer" /> -->
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api';
import M from 'materialize-css';

export default {
  name: 'DialogWindow',
  props: {
    isOpened: { type: Boolean, default: false },
  },
  // watch: {
  //   isOpened: function (value) {
  //     if (value && this.$modal) {
  //       this.$modal.open();
  //     }
  //   },
  // },
  mounted() {
    this.$modal = M.Modal.init(this.$refs.modal, {
      onCloseStart: this.onClose,
    });
    this.openDialog();
  },
  beforeUpdate() {
    this.openDialog();
  },
  beforeDestroy() {
    if (this.$modal) {
      this.$modal.destroy();
    }
  },
  methods: {
    openDialog: function () {
      if (this.isOpened && this.$modal) {
        this.$modal.open();
      }
    },
    onClose: function () {
      this.$emit('on-close');
    },
  },
};
</script>
