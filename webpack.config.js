const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output:{
	  filename: 'bundle-todoist.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    open: true,
    port: 5046,
	 
  },
};