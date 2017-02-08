const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom');

Promise.promisifyAll(fs);

if(module === require.main) {
	 const fontsDir = path.resolve(__dirname, '../resources/assets/fonts');
	 return xmlsToJsons(fontsDir);
}

function xmlsToJsons(path) {
	return fs.readdirAsync(path)
		.then(files => {
			const fileNames = _.uniq(files.map(f => f.split('.')[0]));
			return Promise.map(fileNames, fileName => xmlToJson(`${path}/${fileName}`));
		});
}

function xmlToJson(path) {
	return fs.readFileAsync(`${path}.xml`)
		.then(xmlBuffer => {
			const json = { chars: {} };

			const xml = xmlBuffer.toString();
			const doc = new DOMParser().parseFromString(xml);
			const fontDoc = doc.getElementsByTagName('Font')[0];
			const charsDoc = fontDoc.getElementsByTagName('Char');

			_.each(fontDoc.attributes, attr => {
				json[attr.name] = parseInt(attr.value, 10) || attr.value;
			});

			_.each(charsDoc, charDoc => {
				const charCode = charDoc.getAttribute('code');
				const char = json.chars[charCode] = {
					rect: rect = {},
					offset: offset = {},
					width: parseInt(charDoc.getAttribute('width'), 10)
				};

				[ rect.x, rect.y, rect.width, rect.height ] = extractIntegers(charDoc.getAttribute('rect'));
				[ offset.x, offset.y ] = extractIntegers(charDoc.getAttribute('offset'));
			});

			return JSON.stringify(json, null, 2);
		})
		.then(json => fs.writeFileAsync(path + '.json', json))
		.then(() => console.log(`Font ${path} has been successfully parsed...`));
}

function extractIntegers(source) {
	return source.split(' ').map(x => parseInt(x, 10));
}

module.exports = {
	xmlToJson,
	xmlsToJsons
};
