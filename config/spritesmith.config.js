/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const SpritesmithPlugin = require('webpack-spritesmith');

const config = {
  spriteSrc: '../src/public/sprites',
  spriteImgDest: '../public/images',
  spriteScssDest: '../src/public/scss/sprite',
  imgName: 'sp_[folder].png',
  cssName: '_sp_[folder].scss',
  cssSpritesheetName: 'sp_[folder]',
  cssTemplate: '../src/public/handlebars/sprite_template.hbs',
  spriteMapsDest: '../src/public/scss/common/_sprites_maps.scss',
  spriteMapsTemplate: '../src/public/handlebars/sprite_maps_template.hbs',
  ratio: 2,
};

const srcPath = path.join(__dirname, config.spriteSrc);
const destImgPath = path.join(__dirname, config.spriteImgDest);
const destScssPath = path.join(__dirname, config.spriteScssDest);

const getRelativePath = (path1, path2) => {
  const chunks1 = path.resolve(path1).split('/');
  const chunks2 = path.resolve(path2).split('/');
  let chunk1;
  let chunk2;
  let pathDiffers = false;
  const relativePath = [];
  while (((chunk1 = chunks1.shift()) !== undefined) | ((chunk2 = chunks2.shift()) !== undefined)) {
    if (pathDiffers) {
      if (typeof chunk2 === 'string') {
        relativePath.unshift('..');
      }
    }
    if (!pathDiffers && chunk1 !== chunk2) {
      pathDiffers = true;
    }
    if (pathDiffers) {
      if (typeof chunk1 === 'string') {
        relativePath.push(chunk1);
      }
    }
  }
  return relativePath.join('/');
};

const folders = fs.readdirSync(srcPath)
  .filter(folder => fs.statSync(path.join(srcPath, folder)).isDirectory());

// webpack에 적용 할 SpritesmithPlugin 설정을 생성한다.
const plugins = folders
  .map(folder => new SpritesmithPlugin({
    src: {
      cwd: path.resolve(srcPath, folder),
      glob: '*.png',
    },
    target: {
      image: path.resolve(destImgPath, config.imgName.replace(/\[folder\]/g, folder)),
      css: [[path.resolve(destScssPath, config.cssName.replace(/\[folder\]/g, folder)), {
        spritesheetName: config.cssSpritesheetName.replace(/\[folder\]/g, folder),
        format: 'handlebars_based_template',
      }]],
    },
    apiOptions: {
      cssImageRef: `${config.spriteImgDest}/${config.imgName.replace(/\[folder\]/g, folder)}`,
    },
    customTemplates: {
      handlebars_based_template: path.join(__dirname, config.cssTemplate),
    },
  }));

const sprites = folders
  .map(folder => ({
    css_file_name: config.cssName.replace(/\[folder\]/g, folder),
    spritesheet_name: config.cssSpritesheetName.replace(/\[folder\]/g, folder),
  }));

const content = fs.readFileSync(path.join(__dirname, config.spriteMapsTemplate), 'utf8');

// 각각의 sprite 파일을 모두 import 하는 파일을 scss 파일을 생성
fs.writeFileSync(path.join(__dirname, config.spriteMapsDest), handlebars.compile(content)({
  path: getRelativePath(config.spriteScssDest, config.spriteMapsDest),
  sprites,
  ratio: config.ratio,
}), 'utf8');

module.exports = { plugins };
