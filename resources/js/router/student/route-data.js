export const INFO_INDEX = {
  path: '/student',
  component: () => import('@/pages/Student.vue'),
  meta: {
    title: 'STUDENT__INFO_INDEX_PAGE_TITLE',
    auth: true,
  },
};

export const SPECIALITY = {
  path: '/student/info/:academicPlanCode',
  component: () => import('@/pages/StudentPages/Info.vue'),
  props: true,
  meta: {
    title: 'STUDENT__SPECIALITY_INFO_PAGE_TITLE',
    auth: true,
  },
};

export const GRADES = {
  path: '/student/grades/:academicPlanCode',
  component: () => import('@/pages/StudentPages/Grades.vue'),
  props: true,
  meta: {
    title: 'STUDENT__GRADES_PAGE_TITLE',
    auth: true,
  },
};

export const ACADEMIC_PERFORMANCE = {
  path: '/student/academic-performance/:academicPlanCode',
  component: () =>
    import('@/pages/StudentPages/CurrentAcademicPerformance.vue'),
  props: true,
  meta: {
    title: 'STUDENT__CURRENT_ACADEMIC_PERFORMANCE_PAGE_TITLE',
    auth: true,
  },
};

export const ORDERS = {
  path: '/student/orders/:academicPlanCode',
  component: () => import('@/pages/StudentPages/Orders.vue'),
  props: true,
  meta: {
    title: 'STUDENT__ORDERS_PAGE_TITLE',
    auth: true,
  },
};

export const PRACTICE = {
  path: '/student/practice',
  component: () => import('@/pages/DefaultFileUploadPage.vue'),
  props: {
    context: 'student.practice',
  },
  meta: {
    title: 'STUDENT__PRACTICE_PAGE_TITLE',
    auth: true,
  },
};

export const COURSE_WORKS = {
  path: '/student/course-works',
  component: () => import('@/pages/DefaultFileUploadPage.vue'),
  props: {
    context: 'student.course-works',
  },
  meta: {
    title: 'STUDENT__COURSE_WORKS_PAGE_TITLE',
    auth: true,
  },
};

export const QUALIFYING_WORKS = {
  path: '/student/qualifying-works',
  component: () => import('@/pages/DefaultFileUploadPage.vue'),
  props: {
    context: 'student.qualifying-works',
  },
  meta: {
    title: 'STUDENT__QUALIFYING_WORKS_PAGE_TITLE',
    auth: true,
  },
};

export const PROFESSIONAL_ACHIEVEMENT = {
  path: '/student/professional-achievement',
  component: () => import('@/pages/DefaultFileUploadPage.vue'),
  props: {
    context: 'student.professional-achievement',
  },
  meta: {
    title: 'STUDENT__PROFESSIONAL_ACHIEVEMENT_PAGE_TITLE',
    auth: true,
  },
};

export const PUBLIC_LIFE = {
  path: '/student/public-life',
  component: () => import('@/pages/DefaultFileUploadPage.vue'),
  props: {
    context: 'student.public-life',
  },
  meta: {
    title: 'STUDENT__PUBLIC_LIFE_PAGE_TITLE',
    auth: true,
  },
};

export const UNIVERSITY_LIFE = {
  path: '/student/university-life',
  component: () => import('@/pages/DefaultFileUploadPage.vue'),
  props: {
    context: 'student.university-life',
  },
  meta: {
    title: 'STUDENT__UNIVERSITY_LIFE_PAGE_TITLE',
    auth: true,
  },
};

export const MY_PUBLICATIONS = {
  path: '/student/my-publications',
  component: () => import('@/pages/DefaultFileUploadPage.vue'),
  props: {
    context: 'student.my-publications',
  },
  meta: {
    title: 'STUDENT__MY_PUBLICATIONS_PAGE_TITLE',
    auth: true,
  },
};

export const MY_CERTIFICATES = {
  path: '/student/my-certificates',
  component: () => import('@/pages/DefaultFileUploadPage.vue'),
  props: {
    context: 'student.my-certificates',
  },
  meta: {
    title: 'STUDENT__MY_CERTIFICATES_PAGE_TITLE',
    auth: true,
  },
};

export const ADDITIONAL_EDUCATION = {
  path: '/student/additional-education',
  component: () => import('@/pages/DefaultFileUploadPage.vue'),
  props: {
    context: 'student.additional-education',
  },
  meta: {
    title: 'STUDENT__ADDITIONAL_EDUCATION_PAGE_TITLE',
    auth: true,
  },
};

// export const DEFAULT = {
//   path: '/student/:path',
//   component: () => import('@/pages/DefaultFileUploadPage.vue'),
//   meta: {
//     title: (route) =>
//       `STUDENT__${route.params.path
//         .replace('-', '_')
//         .toUpperCase()}_PAGE_TITLE`,
//     auth: true,
//   },
//   props: (route) => ({
//     context: route.path.slice(1).replace('/', '.').replace('-', ''),
//   }),
// };
