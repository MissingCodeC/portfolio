import tseslint from 'typescript-eslint';
import missingCodec from '@missingcodec/eslint-config-ts';

export default tseslint.config({
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
        parserOptions: {
            ecmaVersion: 'latest',
            projectService: true,
            tsconfigRootDir: import.meta.dirname
        }
    },
    extends: [missingCodec],
    rules: {
        'no-console': 'off',
        '@typescript-eslint/no-unsafe-type-assertion': 'off'
    }
});
