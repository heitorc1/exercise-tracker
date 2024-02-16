module.exports = {
  root: true,
  extends: ["custom"],
  ignorePatterns: [
    "routeTree.gen.ts",
    "**/ui/*.tsx",
    "playwright.config.ts",
    "tests/*.spec.ts",
  ],
};
