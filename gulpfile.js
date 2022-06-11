const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
// const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const gulpif = require('gulp-if')
const browserSync = require('browser-sync').create()

let isProd = false; //dev by default

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'))
}

const styles = () => {
  return src('src/styles/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(autoprefixes({
      cascade: false
    }))
    .pipe(gulpif(isProd, cleanCSS({
      level: 2
    })))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(gulpif(isProd, browserSync.stream()))
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(gulpif(isProd, htmlMin({
      collapseWhitespace: true,
    })))
    .pipe(dest('dist'))
    .pipe(gulpif(isProd, browserSync.stream()))
}

// const svgSprites = () => {
//   return src('src/images/svg/**/*.svg')
//     .pipe(svgSprite({
//       mode: {
//         stack: {
//           sprite: '../sprite.svg'
//         }
//       }
//     }))
//     .pipe(dest('dist/images'))
// }

const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/main.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    .pipe(gulpif(isProd, uglify({
      toplevel: true
    }).on('error', notify.onError())))
    .pipe(gulpif(!isProd, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(gulpif(isProd, browserSync.stream()))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/**/*.jpeg',
    'src/img/*.svg',
  ])
    .pipe(image())
    .pipe(dest('dist/img'))
}

const toProd = (done) => {
  isProd = true;
  done();
};

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
// watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)

exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, htmlMinify, scripts, styles, images, watchFiles)
exports.build = series(toProd, clean, resources, htmlMinify, scripts, styles, images, watchFiles)
