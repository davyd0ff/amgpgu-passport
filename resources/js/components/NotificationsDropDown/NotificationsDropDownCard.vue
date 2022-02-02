<style scoped></style>

<template>
  <div class="card" tabindex="0">
    <div class="card-content">
      <span class="card-title">{{ notification.title }}</span>
      <p>{{ notification.message }}</p>
    </div>
    <div class="card-action">
      <a
        class="open-notification"
        href="#"
        v-on:click.prevent="onOpen(notification.id)"
      >
        {{ 'NOTIFICATION_CARD_TO_OPEN' | localize }}
      </a>
      <a
        class="read-notification"
        href="#"
        v-on:click.prevent="onRead(notification.id)"
      >
        {{ 'NOTIFICATION_CARD_TO_SIGN_AS_READ' | localize }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationsDropDownCard',
  props: {
    notification: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onRead(id) {
      this.$emit('read', id);
    },
    onOpen(id) {
      this.$emit('open', id);
    },
  },
};
</script>
