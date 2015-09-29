(function iife() {
    "use strict";

    var gulp = require("gulp");

    var glp = require("gulp-load-plugins")({lazy: true});

    var config = require("./gulp.config")();


    gulp.task("vet", function vetFn() {
        return gulp
            .src(config.alljs)
            .pipe(glp.jscs())
            .pipe(glp.jshint())
            .pipe(glp.jshint.reporter("jshint-stylish", {verbose: true}))
            .pipe(glp.jshint.reporter("fail"));
    });

    gulp.task("inject", ["vet"], function() {
        return gulp
            .src(config.index)
            .pipe(glp.inject(gulp.src(config.css)))
            .pipe(glp.inject(gulp.src(config.js)))
            .pipe(gulp.dest(config.client));
    });

    gulp.task("serve-dev", ["inject"], function() {
        var nodeOptions = {
            script: config.nodeServer,
            delayTime: 1,
            env: {
                "PORT": config.defaultPort
            },
            watch: [config.server]
        };

        return glp.nodemon(nodeOptions);
    });
})();
