const path = require('path');
// const fs = require('fs');
// const fileNames = fs.readdirSync('./Src').reduce((acc, v) => ({ ...acc, [v]: `./Src/${v}` }), {});

module.exports = {
    watch: true,
    // entry: fileNames,
    entry: {
        mainPage: { import: "./Src/mainPage.tsx", dependOn: ["common", "commonElements"] },
        aboutPage: { import: "./Src/aboutPage.tsx", dependOn: ["common", "commonElements"] },
        page: { import: "./Src/pages.tsx", dependOn: ["common", "commonElements"] },
        categoryPage: { import: "./Src/categoryPage.tsx", dependOn: ["common", "commonElements"] },
        galleryPage: { import: "./Src/galleryPage.tsx", dependOn: ["common", "commonElements"] },
        common: "./Src/common.tsx",
        commonElements: "./Src/commonElements.tsx"
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, 'wwwroot/app')
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.js$/, loader: "source-map-loader" }
        ],

    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\/]node_modules[\/]/,
                    name: 'common',
                    chunks: 'all'
                }
            }
        }
    },
}