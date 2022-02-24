<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span class="card-title">{{ notification.title }}</span>
          {{ notification.message }}
          <files-list v-bind:files="notification.files" disable-delete-button />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilesList from '@/components/Files/FilesList';

export default {
  name: 'ViewNotification',
  components: { FilesList },
  props: {
    id: {},
  },
  computed: {
    notification() {
      return this.$store.getters.getNotification(parseInt(this.id));
    },
  },
};
</script>

<style scoped></style>
