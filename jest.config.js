module.exports = {
    testEnvironment: 'node',  
    roots: ['<rootDir>/server/tests'], 
    transform: {
      '^.+\\.js$': 'babel-jest', 
    },
    testMatch: ['**/*.test.js'], 
  };
  