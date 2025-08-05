module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
} 