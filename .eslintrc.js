module.exports = {
  'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'project': './tsconfig.json'
    },
    'env': {
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript',
        'plugin:prettier/recommended'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'plugins': [
        '@typescript-eslint', "import", "prettier"
    ],
    'settings': {
      'import/resolver': {
        'node': {
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        },
        'alias': {
          'map': [
            ['@config', './src/config'],
            ['@controllers', './src/controllers'],
            ['@routes', './src/routes'],
            ['@middlewares', './src/middlewares'],
            ['@models', './src/models/'],
            ['@services', './src/services'],
            ['@utils', './src/utils/'],
            ['@interfaces', './src/interfaces/']
          ],
          'extensions': ['.ts']
        }
      }
    },
    'rules': {
    
      'prettier/prettier':'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-unresolved': ['error', {commonjs:true}],
      'indent': [
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'never'
      ]
    }
}
