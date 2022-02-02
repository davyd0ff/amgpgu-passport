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
      <a href="/#" v-on:click.prevent.stop="onClearClick" v-on:click.prevent>
        {{ 'NAVBAR_NOTIFICATIONS_DROPDOWN_BUTTON_CLEAR' | localize }}
      </a>
      <router-link to="/notifications">
        {{ 'NAVBAR_NOTIFICATIONS_DROPDOWN_BUTTON_SHOW_ALL' | localize }}
      </router-link>
    </div>

    <fragment v-if="hasNotifications">
      <notifications-drop-down-card
        v-for="notification in notifications"
        v-bind:key="notification.id"
        v-bind:notification="notification"
        v-bind:click="onNotificationClick"
      />
    </fragment>
    <notifications-drop-down-empty-card v-if="!hasNotifications" />
  </div>
</template>

<script>
import NotificationsDropDownCard from './NotificationsDropDownCard';
import NotificationsDropDownEmptyCard from './NotificationsDropDownEmptyCard';

export default {
  name: 'NotificationDropDownContent',
  components: { NotificationsDropDownEmptyCard, NotificationsDropDownCard },
  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    hasNotifications() {
      return this.notifications.length !== 0;
    },
  },
  methods: {
    onNotificationClick(id) {
      this.$emit('notification-click', id);
    },
    onClearClick() {
      this.$emit('clear');
    },
  },
};
</script>
