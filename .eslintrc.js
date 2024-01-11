module.exports = {
    'env': {
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'standart-with-typescript',
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
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint', "import", "prettier"
    ],
    'project':'./tsconfig.json',
    'rules': {
        'prettier/prettier':'error',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/no-unresolved': [
          'error',
          {
            'plugins':[
              'module-resolve',
              {
                'alias': {
                    '@config': './src/config',
                    '@controllers': './src/controllers',
                    '@routes': './src/routes',
                    '@middlewares':'./src/middleware',
                    '@models': './src/models/',
                    '@services': './src/services',
                    '@utils':'./src/utils/',
                    '@interfaces':'.src/interfaces/'
                }
              }
            ]
          }
        ],
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
