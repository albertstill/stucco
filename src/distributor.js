import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import chalk from 'chalk';
import fs from 'fs';
import { getStuccorcJSON } from './util';

function handleFatalError(err) {
  console.log(chalk.red('Failed with error:'));
  console.log(err);
}

function handleSoftErrors(errors) {
  console.log(chalk.red('Failed with error:'));
  errors.forEach(err => console.log(err));
}

function handleWarnings(warnings) {
  console.log(chalk.yellow('Encountered warnings:'));
  warnings.forEach(warn => console.log(warn));
}

export default function distribute() {
  let outputName;
  try {
    outputName = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'))).name;
  } catch (e) {
    outputName = 'bundle';
  }

  const stuccoEntry = getStuccorcJSON().dist;
  if (!stuccoEntry) {
    throw new Error('No `dist` field found in .stuccorc');
  }
  const stuccoEntryPath = path.join(process.cwd(), stuccoEntry);
  const outputFolder = './dist';
  const cssFileName = `${outputName}.min.css`;
  const jsFileName = `${outputName}.min.js`;

  const compiler = webpack({
    entry: [
      stuccoEntryPath,
    ],
    output: {
      filename: jsFileName,
      path: outputFolder,
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015'],
          },
        },
        {
          test: /(\.css|\.scss)$/,
          loader: ExtractTextPlugin.extract(
            'style',
            'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'
          ),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin(cssFileName),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
    sassLoader: {
      includePaths: ['node_modules'],
    },
  });

  compiler.run((err, stats) => {
    if (err) {
      return handleFatalError(err);
    }

    const jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0) {
      return handleSoftErrors(jsonStats.errors);
    }

    if (jsonStats.warnings.length > 0) {
      handleWarnings(jsonStats.warnings);
    }

    return console.log(
      `Successfully compiled to ${outputFolder}/${cssFileName} and ${outputFolder}/${jsFileName}`
    );
  });
}
