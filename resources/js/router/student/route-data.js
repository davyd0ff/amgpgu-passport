export const STUDENT_INFO_INDEX_ROUTE_DATA = {
  path: '/student',
  meta: {
    title: 'STUDENT__INFO_INDEX_PAGE_TITLE',
    auth: true
  }
};

export const STUDENT_SPECIALITY_ROUTE_DATA = {
  path: '/student/info/:academicPlanCode',
  props: true,
  meta: {
    title: 'STUDENT__SPECIALITY_INFO_PAGE_TITLE',
    auth: true
  },
};

export const STUDENT_GRADES_ROUTE_DATA = {
  path: '/student/grades/:academicPlanCode',
  props: true,
  meta: {
    title: 'STUDENT__GRADES_PAGE_TITLE',
    auth: true,
  },
};

export const STUDENT_ACADEMIC_PERFORMANCE_ROUTE_DATA = {
  path: '/student/academic-performance/:academicPlanCode',
  props: true,
  meta: {
    title: 'STUDENT__CURRENT_ACADEMIC_PERFORMANCE_PAGE_TITLE',
    auth: true,
  }
};

export const STUDENT_ORDERS_ROUTE_DATA = {
  path: '/student/orders/:academicPlanCode',
  props: true,
  meta: {
    title: 'STUDENT__ORDERS_PAGE_TITLE',
    auth: true,
  }
};

export const STUDENT_DEFAULT_ROUTE_DATA = {
  path: '/student/:path',
  meta: {
    title: (route) => `STUDENT__${route.params.path.replace('-', '_').toUpperCase()}_PAGE_TITLE`,
    auth: true,
  },
  props: (route) => ({
    context: route.path.slice(1).replace('/', '.').replace('-', '')
  })
};