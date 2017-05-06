let source =            require("vinyl-source-stream");
let gulp =              require("gulp");
let browserify =        require("browserify");
let babelify =          require("babelify");
let watchify =          require("watchify");
let del =               require("del");
let useref =            require("gulp-useref");
let cleanCSS =          require("gulp-clean-css");
let buffer =            require("vinyl-buffer");
let concatCSS =         require("gulp-concat-css");
let envify =            require("gulp-envify");
let uglify =            require("gulp-uglify");
let collapse =          require("bundle-collapser/plugin");
let babel =             require("babel-core/register");


gulp.task("default", ["clean", "js", "css"], function() {
    gulp.watch("src/**/*.js", ["js"]);
    gulp.watch("docs/dev/**/*.js", ["js"]);
    gulp.watch("docs/dev/**/*.css", ["css"]);
});


gulp.task("css", function(){
    return gulp.src("docs/dev/**/*.css")
        .pipe(useref())
        .pipe(concatCSS("style.min.css"))
        .pipe(cleanCSS())
        .pipe(gulp.dest("docs/include/"))
});
gulp.task("js", function(){
    return browserify({
        entries: "./docs/dev/index.js",
        debug: false,
        plugin: [collapse]
    })
        .transform("babelify", {
            presets: ["es2015", "react"],
            plugins: ["transform-class-properties"]
        })
        .bundle()
        .pipe(source("bundle.min.js"))
        .pipe(buffer())
        .pipe(envify({
            NODE_ENV: "production"
        }))
        .pipe(uglify({
            beautify: true,
            comments: true,
            sourceMap: true,
            mangle: true
        }))
        .pipe(gulp.dest("docs//include/"));
});


gulp.task("clean", function() {
    return del.sync("docs/include/**");
});