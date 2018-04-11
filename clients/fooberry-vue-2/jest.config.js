module.exports = {
  projects: [
    {
      displayName: "test",
      moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
      ],
      transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.jsx?$': 'babel-jest'
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      },
      snapshotSerializers: [
        'jest-serializer-vue'
      ],
    },
    {
      runner: 'jest-runner-eslint',
      displayName: 'lint',
      testMatch: ['<rootDir>/src/**/__tests__/*.js'],
    }
  ]


}