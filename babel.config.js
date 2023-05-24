module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [   // this plugins part
      [
        'module-resolver',
        {
          alias: {
            '@app': '.' // if app files is inside "app/" folder, replace with "./app"
          }
        }
      ]
    ]
  };
};
