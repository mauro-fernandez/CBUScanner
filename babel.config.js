module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanOCR', '__scanCodes', '__scanFaces'],
      },
    ],
  ],
};

/*
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],


    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanOCR'],
      },
    ],

    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanFaces'],
      },
    ],


    */