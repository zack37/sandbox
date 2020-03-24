const sharp = require('sharp');
const fs = require('fs');

console.time('sharp');
sharp('/Users/Zach/Downloads/3S7A4082-1.jpg')
  .resize(256)
  .jpeg({
    // quality: 100,
    // progressive: true,
  })
  .toFile('output.jpg')
  // .png({
  //   compressionLevel: 9,
  //   progressive: true,
  //   adaptiveFiltering: true,
  // })
  // .toFile('output.png')
  .then(info => {
    console.timeEnd('sharp');
    console.log(info);
  })
  .catch(console.error);
