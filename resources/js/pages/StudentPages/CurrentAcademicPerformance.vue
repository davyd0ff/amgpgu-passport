<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <span v-if="performance.length > 0" class="card-title">{{
            performance[0].semester
          }}</span>
          <span v-else class="card-title">{{
            'PERFORMANCE_THERE_IS_NO_DATA' | localize
          }}</span>
          <academic-performance-table
            v-if="performance.length > 0"
            v-bind:performance="performance"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AcademicPerformanceTable from '@/components/AcademicPerformanceTable';

export default {
  name: 'CurrentAcademicPerformance',
  components: { AcademicPerformanceTable },
  props: {
    academicPlanCode: String,
  },
  computed: {
    performance() {
      return (
        this.$store.getters.planEducation(this.academicPlanCode)
          ?.partOfAcademicPerformance || []
      );
    },
  },
};
</script>

<style scoped></style>
