<style scoped>
.notifications-title .caption {
  margin: 0;
  padding: 0;
  width: 150px;
  overflow: hidden;
  float: left;
}

.notifications-title a {
  width: 100px;
  overflow: hidden;
}
</style>

<template>
  <div id="notification-dropdown" class="dropdown-content notifications">
    <div class="notifications-title" tabindex="0">
      <p class="caption">
        {{ 'NAVBAR_NOTIFICATIONS_DROPDOWN_TITLE' | localize }}
      </p>
      <a
        class="clear-notifications"
        href="/#"
        v-on:click.prevent.stop="onClearClick"
      >
        {{ 'NAVBAR_NOTIFICATIONS_DROPDOWN_BUTTON_CLEAR' | localize }}
      </a>
      <router-link to="/notifications">
        {{ 'NAVBAR_NOTIFICATIONS_DROPDOWN_BUTTON_SHOW_ALL' | localize }}
      </router-link>
    </div>

    <slot>
      <notifications-drop-down-empty-card />
    </slot>
  </div>
</template>

<script>
import NotificationsDropDownEmptyCard from './NotificationsDropDownEmptyCard';

export default {
  name: 'NotificationDropDownContent',
  components: { NotificationsDropDownEmptyCard },
  methods: {
    onClearClick() {
      this.$emit('clear');
    },
  },
};
</script>
