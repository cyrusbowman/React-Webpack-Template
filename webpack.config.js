var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');

var config = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/main.jsx'
    ],
    output: {
        path: __dirname + '/build/',
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['react-hot', 'babel-loader'], exclude: [ /node_modules/, /bower_components/ ] },
            { test: /\.jsx$/, loaders: ['react-hot', 'babel-loader'], exclude: [ /node_modules/, /bower_components/ ] },
            { test: /\.less$/, loader: 'style!css!less-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader?module&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss-loader' },
            { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }, // inline base64 URLs for <=8k images, direct URLs for the rest
            { test: /\.json$/, loader: 'json-loader' }
        ]
    },
    resolve: {
        // you can now require('file') instead of require('file.json')
        extensions: ['', '.js', '.jsx', '.json', '.css', '.less'] 
    },
    postcss: {
        // packs to use with post css
        defaults: [autoprefixer]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    externals: { config: "config" }
};

process.argv.forEach(function(val, index, array) {
    if(val == "--release") {
        console.log("Building application for release.");
        config.output.path = __dirname + '/release/';
        config.output.publicPath = '/release/';
        config.plugins = [  new webpack.optimize.UglifyJsPlugin({minimize: true}) ];
        config.entry = ['./src/main.jsx'];
        config.target = 'web';
        config.postcss.defaults = [autoprefixer, csswring]; //Minifiy css
    }
});

module.exports = config;