const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/app.ts",
    output: {
        // webpack automatically make content hash
        // filename: "bundle.[contenthash].js",
        filename: "bundle.js",
        // webpack wants full path
        path: path.resolve(__dirname, "dist"),
        publicPath: "dist",
    },
    devtool: "inline-source-map",
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
    devServer: {
        // ...
        devMiddleware: { publicPath: "/dist/" },
        static: { directory: path.resolve(__dirname) },
    },
};
