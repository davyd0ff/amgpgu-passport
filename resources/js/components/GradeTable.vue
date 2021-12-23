<template>
  <table class="highlight">
    <thead>
      <tr>
        <th>{{ 'GRADE_TABLE_COLUMN_SUBJECT' | localize }}</th>
        <th>{{ 'GRADE_TABLE_COLUMN_GRADES' | localize }}</th>
        <th>{{ 'GRADE_TABLE_COLUMN_REASON_NO_ATTESTATION' | localize }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="grade in grades" v-bind:key="grade">
        <td>{{ grade.subject }}</td>
        <td>{{ grade.valuation }}</td>
        <td>{{ grade.reasonForNoAttestation }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'GradeTable',
  props: {
    grades: { type: Array, default: () => [] },
  },
};
</script>

<style scoped></style>
