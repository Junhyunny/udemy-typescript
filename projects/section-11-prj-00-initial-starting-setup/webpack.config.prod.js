const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/app.ts",
    output: {
        // webpack automatically make content hash
        // filename: "bundle.[contenthash].js",
        filename: "bundle.js",
        // webpack wants full path
        path: path.resolve(__dirname, "dist"),
        // publicPath: "dist",
    },
    // devtool: "inline-source-map",
    devtool: false,
    // 적용 per file level
    module: {
        rules: [
            {
                // regex
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    // devServer: {
    //     // ...
    //     devMiddleware: { publicPath: "/dist/" },
    //     static: { directory: path.resolve(__dirname) },
    // },
    plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
