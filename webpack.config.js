const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const createInnerJsxTransformer = require('typescript-plugin-inner-jsx').default;

const env = process.env.NODE_ENV || 'development';
const develop = env === 'development';
const test = env === 'test';
const production = env === 'production';
const port = process.env.PORT || 9000;

const dist = path.join(__dirname, 'dist', 'umd');
const src = path.join(__dirname, 'src');

const innerJsxTransformer = createInnerJsxTransformer();

function getEntrySources(sources = []) {
  if (develop) {
    sources.push(`webpack-dev-server/client?http://0.0.0.0:${port}`);
  }

  return sources;
}

function getFileName() {
  const name = develop ? 'dev' : 'min';
  return `precise-ui.${name}.js`;
}

function getExternals(libs = []) {
  libs.push('react', 'react-dom', 'styled-components');
  return libs;
}

module.exports = {
  devtool: (develop || test) && 'source-map',

  entry: {
    main: getEntrySources([path.join(src, 'index.ts')]),
  },

  mode: production ? 'production' : 'development',

  output: {
    path: dist,
    filename: getFileName(),
    library: 'precise',
    libraryTarget: 'umd',
    publicPath: '/',
  },

  externals: getExternals(),

  devServer: {
    port,
    historyApiFallback: true,
    contentBase: dist,
    hot: true,
    inline: true,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'precise-ui': path.resolve('./src'),
    },
  },

  module: {
    rules: [
      {
        test: /node_modules[\/\\]((date-fns|ansi-styles|strip-ansi|ansi-regex|react-dev-utils|chalk|typescript-plugin-inner-jsx)[\/\\]).*/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: 11,
                    esmodules: true,
                  },
                  modules: 'commonjs',
                },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          getCustomTransformers: () => ({ before: [innerJsxTransformer] }),
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          silent: true
        }
      },
      {
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],
};
