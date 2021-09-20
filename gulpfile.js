let project_folder = require('path').basename(__dirname);
let source_folder = '#src';

let fs = require('fs');

let path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    php: project_folder + '/php',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/',
  },
  src: {
    html: [source_folder + '/*.html', '!'+source_folder + '/_*.html'],
    php: source_folder + '/php/*.php',
    css: source_folder + '/scss/style.scss',
    js: source_folder + '/js/script.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp,json}',
    fonts: source_folder + '/fonts/*.{ttf,otf,woff,woff2}',
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    php: source_folder + '/php/**/*.php',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp,json}',
  },
  clean: './' + project_folder + '/'
}


let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  imagemin = require("gulp-imagemin"),
  svgSprite = require('gulp-svg-sprite'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fonter = require('gulp-fonter'),
  concat = require('gulp-concat'),
  iconfont = require('gulp-iconfont');

var runTimestamp = Math.round(Date.now()/1000);

function browserSync(params) {
  browsersync.init({
    server:{
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css(){
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(
      group_media()
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(
      uglify()
    )
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function php() {
  return src(path.src.php)
    .pipe(dest(path.build.php))
    .pipe(browsersync.stream())
}


function jsLibs() {
  return src(source_folder + '/js/libs.js')
    .pipe(fileinclude())
    .pipe(
      uglify()
    )
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}


function images() {
  return src(path.src.img)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [
          {removeViewBox: false}
        ],
        interlaced: true,
        optimizationLevel: 6
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}


function fonts () {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
};


gulp.task('otf2ttf', function() {
  return src([source_folder + '/fonts/*.otf'])
  .pipe(fonter({
    formats: ['ttf']
  }))
  .pipe(dest(source_folder + '/fonts/'))
})

function fontsStyle(params) {
  let file_content = fs.readFileSync(source_folder + '/scss/base/fonts.scss');
  if (file_content == '') {
    fs.writeFile(source_folder + '/scss/base/fonts.scss', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(source_folder + '/scss/base/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
         }
       }
    })
  }
}

function cb() {

}

function watchFiles(params) {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.php], php)
  gulp.watch([source_folder + '/js/libs.js'], jsLibs)
  gulp.watch([path.watch.img], images)
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, php, jsLibs, css, html, images, fonts), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.jsLibs = jsLibs;
exports.js = js;
exports.php = php;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
