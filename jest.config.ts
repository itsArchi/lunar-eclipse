import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig: Config = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/pages/(.*)$": "<rootDir>/pages/$1",
        "^@/utils/(.*)$": "<rootDir>/utils/$1",
    },
    testMatch: [
        "**/__tests__/**/*.test.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
        "!**/pages/**/*.test.[jt]s?(x)",
    ],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx,ts,tsx}",
        "!**/*.d.ts",
        "!**/node_modules/**",
        "!**/.next/**",
        "!**/coverage/**",
        "!**/jest.config.{js,ts}",
        "!**/jest.setup.{js,ts}",
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};

module.exports = createJestConfig(customJestConfig);
