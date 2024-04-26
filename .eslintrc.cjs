module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
    settings: {
        react: {version: '18.2'},
        'import/resolver': {
            alias: {
                map: [
                    ['@', '/src'],
                    ['@components', '/src/components'],
                    ['@pages', '/src/pages'],
                    ['@assets', '/src/assets'],
                    ['@store', '/src/store'],
                    ['@hooks', '/src/hooks'],
                    ['@utils', '/src/utils'],
                    ['@interceptors', '/src/interceptors'],
                ],
            },
        },
    },
    plugins: ['react-refresh'],
    rules: {
        'react/jsx-no-target-blank': 'off',
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
    },
}