const postcss = require('rollup-plugin-postcss');
const ts = require('@wessberg/rollup-plugin-ts');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    config.plugins = config.plugins.map((plugin) => {
      if (plugin && plugin.name === 'rpt2') {
        return ts({
          transpileOnly: false
        });
      }
      return plugin;
    });
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: true,
        extract: !!options.writeMeta,
        less: true,
      })
    );
    return config;
  },
};
