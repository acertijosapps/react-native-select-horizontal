module.exports = {
    root: true,
    extends: 'expo',
    plugins: ['simple-import-sort'],
    ignorePatterns: ['node_modules', '.expo'],
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
        '@typescript-eslint/no-explicit-any': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
    },
};
