module.exports = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^react',
    '^@/components/(.*)$',
    '^@/hooks/(.*)$',
    '^@/utils/(.*)$',
    '^@/types/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
