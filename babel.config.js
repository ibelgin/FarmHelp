module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@src/*': './src/*',
          '@components': './src/app/components',
          '@components/*': './src/app/components/*',
          '@pages/*': './src/app/pages/*',
          '@locales/*': './src/locales/*',
          '@routes/*': './src/routes/*',
          '@store/*': './src/store/*',
          '@style/*': './src/style/*',
          '@types/*': './src/types/*',
          '@assets/*': './src/app/assets/*',
          '@utils/*': './src/utils/*',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
