module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        'brian',
    ],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
    rules: {
    },
}
