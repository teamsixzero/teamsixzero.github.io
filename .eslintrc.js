const objectPattern = {
  minProperties: 2,
  multiline: true,
  consistent: true,
};

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
  ],
  rules: {
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 0,
      }
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: objectPattern,
        // ObjectExpression: 'always',
        ImportDeclaration: objectPattern,
        ExportDeclaration: 'always',
      },
    ],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
      }
    ]
  },
};
