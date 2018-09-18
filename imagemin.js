const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

imagemin(['src/mock/**/*.{jpg,png,gif,svg}'], {
  plugins: [
    imageminMozjpeg({
      quality: 90
    }),
    imageminPngquant({
      quality: 90
    }),
    imageminGifsicle(),
    imageminSvgo()
  ],
  replaceOutputDir: output => {
    return output.replace(/src\/mock\//, './mock/')
  }
}).then(() => {
  console.log('Images optimized');
});