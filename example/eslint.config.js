const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ['dist/*', '.expo/*', 'node_modules/*'],
    },
    {
        plugins: { 'simple-import-sort': simpleImportSort },
        rules: {
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        ['^\\u0000'],
                        ['^react\\u0000?$', '^react-native(/|$)'],
                        ['^@?\\w'],
                        ['^\\.'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
            'import/order': 'off',
            'no-empty': ['error', { allowEmptyCatch: true }],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
]);
