/* global module __dirname */

let config = {
    devtool: '',
    entry: {
        worker: __dirname + '/app/src/js/entries/worker.tsx',
        admin: __dirname + '/app/src/js/entries/admin.tsx',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/app/dist/js/',
    },
    performance: {
        hints: false,
    },
    resolve: {
        // changed from extensions: [".js", ".jsx"]
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: {loader: 'awesome-typescript-loader'},
            },
        ],
    },
};

module.exports = (env /* : Object */, argv /* : Object */) => {
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};
