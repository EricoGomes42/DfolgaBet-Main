const sharp = require('sharp');
const path = require('path');

const inputDir = './public/assets/articles/capas';

const files = [
  'capa_alice_polyana_final%20(1).webp',
  'capa_caliari_bannon_ufc.webp',
  'capa_flamengo_fluminense_fem.webp'
];

async function optimize() {
  for (const file of files) {
    const input = path.join(inputDir, file);

    const output = input.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    await sharp(input)
      .resize({ width: 1400 })
      .webp({ quality: 78 })
      .toFile(output);

    console.log(`OK: ${output}`);
  }
}

optimize();