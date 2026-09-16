module.exports = {
    root: true,
    extends: '@react-native',
    plugins: ['simple-import-sort'],
    ignorePatterns: ['lib', 'node_modules', 'example'],
    rules: {
        // Orden de imports (lib sin alias @/: react/native → terceros → relativos).
        'simple-import-sort/imports': [
            'error',
            {
                groups: [['^\\u0000'], ['^react', '^react-native'], ['^@?\\w'], ['^\\.']],
            },
        ],
        'simple-import-sort/exports': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'react/display-name': 'off',
    },
    overrides: [
        {
            // Las reglas de @typescript-eslint van acotadas a TS: a nivel raíz alcanzarían los
            // .js de config, donde el plugin no está registrado.
            files: ['*.ts', '*.tsx'],
            rules: {
                // Reglas duras de tipos (Code Style §10) — explícitas, no heredadas.
                '@typescript-eslint/no-explicit-any': 'error',
                // El `_event` posicional y el `catch` a propósito sin usar (Code Style §11).
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        argsIgnorePattern: '^_',
                        varsIgnorePattern: '^_',
                        caughtErrorsIgnorePattern: '^_',
                    },
                ],
                // Relajo declarado: inferencia adentro, anotación en las fronteras.
                '@typescript-eslint/explicit-function-return-type': 'off',
            },
        },
    ],
};
