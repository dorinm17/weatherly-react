import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Use ts-jest for transforming TypeScript
  testEnvironment: "jest-environment-jsdom", // Necessary for testing React components
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest", // Transform .tsx and .ts files with ts-jest
      {
        tsconfig: "<rootDir>/tsconfig.app.json", // Point to your tsconfig.app.json
      },
    ],
    "^.+\\.jsx?$": "babel-jest", // Transform .jsx and .js files with babel-jest (for JS/React)
    "^.+\\.(svg|png|jpg|jpeg|gif|webp)$": "jest-transform-stub", // Transform static assets like SVG
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "svg"], // Support for JS, JSX, TS, TSX, and SVG extensions
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Alias for Vite src folder (adjust if needed)
    "\\.(css|less|sass|scss)$": "identity-obj-proxy", // Mock CSS imports
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transformIgnorePatterns: [
    "/node_modules/(?!(your-esm-package|other-package)/)", // ESM compatibility for specific node_modules
  ],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"], // Collect coverage from these files
};

export default config;
