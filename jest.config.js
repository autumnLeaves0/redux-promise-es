export default {
  transform: {},
  collectCoverage: true,
  coverageThreshold: {
    './src/index.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
