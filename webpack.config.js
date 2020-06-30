const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//App dir
const appDirectory = fs.realpathSync(process.cwd());

//absolute path
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';



module.exports = {

    //environment mode
    mode: "development",

    //app entry point
    entry: resolveAppPath("src"),


    output: {
        // Development filename output
        filename: 'static/js/bundle.js',
    },

    devServer: {

        // Serve index.html as the base
        contentBase: resolveAppPath('public'),
    
        // Enable compression
        compress: true,
    
        // Enable hot reloading
        hot: true,
    
        host,
    
        port: 1337,
    
        // Public path is root of content base
        publicPath: '/',
    
      },

    plugins: [
        // Re-generate index.html with injected script tag.
        // The injected script tag contains a src value of the
        // filename output defined above.
        new HtmlWebpackPlugin({
          inject: true,
          template: resolveAppPath('public/index.html'),
        }),
    ],


    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                include: resolveAppPath("src"),
                loader: "babel-loader",
                options: {
                    presets: [
                        require.resolve("babel-preset-react-app")
                    ]
                }
            }
            
        ]
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
    },

      

};