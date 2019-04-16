/* eslint-disable global-require,no-undef,import/no-dynamic-require */

const window = require('svgdom');
const assert = require('assert');

const { svgAvatar } = require('../lib/ping');

describe('check generation', () => {

	it('check clear', () => {
		const svg1 = svgAvatar('test', 100, window);
		const svg2 = svgAvatar('test', 100, window);
		const svg3 = svgAvatar('test', 100, window);

		assert.equal(svg1, svg2);
		assert.equal(svg2, svg3);
	});
});
