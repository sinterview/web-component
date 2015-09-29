"use strict";

module.exports = function nodeExportsFn() {
    var client = "./src/client/";
    var clientJS = client + "js/";
    var clientCSS = client + "css/";
    var server = "./src/server/";

    var config = {

        // all javascript to vet
        alljs: [
            "./src/**/*.js",
            "./*.js"
        ],
        client: client,
        index: client + "index.html",
        css: clientCSS + "style.css",
        js: [
            clientJS + "**/.main.js",
            clientJS + "**/*.js",
            "!" + clientJS + "**/*.test.js"
        ],
        server: server,
        nodeServer: server + "app.js",
        defaultPort: 7203
    };

    return config;
};
