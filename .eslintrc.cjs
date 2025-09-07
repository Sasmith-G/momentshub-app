/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // For the new JSX transform from React 17
    'plugin:react-hooks/recommended',
    'prettier', // This must be the last item to override other configs
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
  plugins: ['react'],
  rules: {
    // You can add custom rules here if needed
  },
};

