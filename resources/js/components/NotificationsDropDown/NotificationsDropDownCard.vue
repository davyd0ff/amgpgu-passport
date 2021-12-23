<style scoped></style>

<template>
  <div class="card" tabindex="0">
    <div class="card-content">
      <span class="card-title">{{ notification.title }}</span>
      <p>{{ notification.message }}</p>
    </div>
    <div class="card-action">
      <a href="#" v-on:click.prevent="onClickAndTransmission(notification.id)">
        {{ 'NOTIFICATION_CARD_TO_OPEN' | localize }}
      </a>
      <a href="#" v-on:click.prevent="click(notification.id)">
        {{ 'NOTIFICATION_CARD_TO_SIGN_AS_SHOWED' | localize }}
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
    click: Function,
  },
  methods: {
    onClickAndTransmission: function (id) {
      setTimeout(() => {
        this.click(id);
      }, 0);

      this.$router.push(`/notifications/${id}`);
    },
  },
};
</script>
