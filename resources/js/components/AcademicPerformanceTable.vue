<template>
  <table v-if="performance.length > 0" class="highlight">
    <thead>
      <tr>
        <th>{{ 'PERFORMANCE_TABLE_COLUMN_SUBJECT' | localize }}</th>
        <th>{{ 'PERFORMANCE_TABLE_COLUMN_RATING' | localize }}</th>
        <th>{{ 'PERFORMANCE_TABLE_COLUMN_MAX_RATING' | localize }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in performance"
        v-bind:key="item.subject + item.rating + item.maxRating"
      >
        <td>{{ item.subject }}</td>
        <td>{{ item.rating }}</td>
        <td>{{ item.maxRating }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'AcademicPerformanceTable',
  props: {
    performance: Array,
  },
};
</script>

<style scoped></style>
