// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import 'dotenv/config';



const { NODE_ENV, WEB_ENV, LANGUAGE } = process.env;



if (NODE_ENV !== 'production' && NODE_ENV !== 'development')
{
	throw '';
}



if (WEB_ENV !== 'server' && WEB_ENV !== 'client')
{
	throw '';
}



if (LANGUAGE !== 'js' && LANGUAGE !== 'ts')
{
	throw '';
}



const WEBPACK_CONFIG = {

	mode: NODE_ENV,
	entry: `./src-${LANGUAGE}/${WEB_ENV}/index.${LANGUAGE}`,
	output: {
		filename: 'index.cjs',
		path: path.resolve(`./dist/${WEB_ENV}/`)
	},
	plugins: [
		// Add your plugins here
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	}
};



if (NODE_ENV === 'development')
{
	WEBPACK_CONFIG.devtool = 'inline-cheap-module-source-map';
}



if (WEB_ENV === 'server')
{
	WEBPACK_CONFIG.target = 'node';
}



if (LANGUAGE === 'ts')
{
	WEBPACK_CONFIG.module.rules.push(
	{
		test: /\.(ts|tsx)$/i,
		use: 'ts-loader',
		exclude: /node_modules/
	});

	WEBPACK_CONFIG.resolve.extensions.push('.ts', '.tsx');
}



export default WEBPACK_CONFIG;
