import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: {
    main: ['./index.js', './index.css']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: () => {
        // Leer el HTML original
        const raw = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
        // Reemplazar la etiqueta script y actualizar la ruta del CSS
        return raw
          .replace(
            /<script\s+src=["']index\.js["'][^>]*><\/script>/i,
            '<script src="bundle.js"></script>'
          )
          .replace(
            /<link\s+rel=["']stylesheet["']\s+href=["']index\.css["'][^>]*>/i,
            '' // Removemos el link al CSS ya que webpack lo incluirá en el bundle
          );
      },
      inject: false
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    historyApiFallback: true,
    compress: true,
    port: 3001,
    hot: true,
    open: true,
  },
};
