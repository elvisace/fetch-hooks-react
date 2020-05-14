module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageReporters: ["json", "lcov", "html"],
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ]
};