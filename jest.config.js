const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/src/**/**/services/*.ts'],
	coverageDirectory: 'coverage',
	coverageReporters: ['text-summary', 'lcov'],
	globalSetup: './jest.setup.js',
	globalTeardown: './jest.teardown.js',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src/',
	}),
	preset: 'ts-jest',
	roots: ['src'],
	testEnvironment: 'node',
	testMatch: ['**/*.(int-)?spec.ts'],
};
