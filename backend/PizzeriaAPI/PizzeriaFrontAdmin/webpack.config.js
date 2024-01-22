const path = require('path');
// const fs = require('fs');
// const fileNames = fs.readdirSync('./Src').reduce((acc, v) => ({ ...acc, [v]: `./Src/${v}` }), {});

module.exports = {
  watch: true,
  // entry: fileNames,
  entry: {
    keyvalue: { import: "./Src/keyvalue.tsx", dependOn: "common" },
    pictures: { import: "./Src/pictures.tsx", dependOn: "common" },
    banners: { import: "./Src/banners.tsx", dependOn: "common" },
    categories: { import: "./Src/categories.tsx", dependOn: "common" },
    contactInfo: { import: "./Src/contactInfo.tsx", dependOn: "common" },
    gallery: { import: "./Src/gallery.tsx", dependOn: "common" },
    informationTab: { import: "./Src/informationTab.tsx", dependOn: "common" },
    menu: { import: "./Src/menu.tsx", dependOn: "common" },
    products: { import: "./Src/products.tsx", dependOn: "common" },
    sliders: { import: "./Src/sliders.tsx", dependOn: "common" },
    socialMedia: { import: "./Src/socialMedia.tsx", dependOn: "common" },
    teamMember: { import: "./Src/teamMember.tsx", dependOn: "common" },
    testimonials: { import: "./Src/testimonials.tsx", dependOn: "common" },
    aboutUs: { import: "./Src/aboutUs.tsx", dependOn: "common" },
    pages: { import: "./Src/pages.tsx", dependOn: "common" },
    homePage: { import: "./Src/homePage.tsx", dependOn: "common" },
    role: { import: "./Src/role.tsx", dependOn: "common" },
    tabSlider: { import: "./Src/tabSlider.tsx", dependOn: "common" },
    common: "./Src/common.tsx"
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