import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
    new HtmlWebpackPlugin({
            // Leemos el index.html original y reemplazamos la referencia a index.js
            // por la ruta del bundle que genera webpack. El archivo original
            // en la carpeta del proyecto queda intacto.
            templateContent: ({ htmlWebpackPlugin }) => {
                const raw = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
                return raw.replace(/<script\s+src="index\.js"(\s+type="module")?\s*><\/script>/i, '<script src="<%= htmlWebpackPlugin.files.js[0] %>"></script>');
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
        open: true
    }
};