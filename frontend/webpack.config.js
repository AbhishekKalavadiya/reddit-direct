const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env',
                '@babel/preset-react'
            ],
            plugins: [
                '@babel/transform-runtime'
            ]
        }
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                modules: true
            }
            }
        ],
        include: /\.module\.css$/
    },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ],
        exclude: /\.module\.css$/
    },
    { 
        test: /\.txt$/, 
        use: 'raw-loader' 
    },
    {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=10000&name=img/[name].[ext]'
    }
]

module.exports = {
    entry:   ['./src/index.js'],
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        contentBase: path.join(__dirname,'src')
    },

    module: {rules},

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Reddit-Direct',
            template: path.join(__dirname,'src','index.html')
            // filename: 'index.html'
        })
    ]
}