import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  rootDir: 'src',
    moduleNameMapper: {
    '@components/(.*)$': ['<rootDir>/components/$1'],
    '@contexts/(.*)$': ['<rootDir>/contexts/$1'],
    '@hooks/(.*)$': ['<rootDir>/hooks/$1'],
    '@styles/(.*)$': ['<rootDir>/styles/$1'],
    '@utils/(.*)$': ['<rootDir>/utils/$1'],
    '@modules/(.*)$': ['<rootDir>/modules/$1'],
    '@character/(.*)$': ['<rootDir>/modules/character/$1'],
    '@shared/(.*)$': ['<rootDir>/modules/shared/$1']
  },
}
 
export default createJestConfig(config)