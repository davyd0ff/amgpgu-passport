module.exports = {
  displayName: 'PASSPORT VUE TESTS',
  preset: '@vue/cli-plugin-unit-jest',
  rootDir: 'resources/js',
  collectCoverage: false,
  //moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "vue"],
  testMatch: ['<rootDir>/__tests__/**/*.spec.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
