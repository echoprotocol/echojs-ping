const sha1 = require('sha1');

class NameNumbers {

	constructor(name) {
		const hash = sha1(name);
		this.theme = parseInt(hash.substring(0, 4), 16) > 0xffff / 2 ? 1 : 0;
		this.shaffleArrayFactor = [0, 1, 2]
			.map((i) => [i, parseInt(hash.substring(4 + 2 * i, 6 + 2 * i), 16)])
			.sort((a, b) => (a[1] > b[1] ? 1 : -1))
			.map((e) => e[0]);

		this.colorFactors = [
			parseInt(hash.substring(10, 14), 16),
			parseInt(hash.substring(14, 18), 16),
			parseInt(hash.substring(18, 22), 16),
		];
		this.angleFactors = [
			parseInt(hash.substring(22, 26), 16),
			parseInt(hash.substring(26, 30), 16),
			parseInt(hash.substring(30, 34), 16),
			parseInt(hash.substring(34, 38), 16),
		];
	}

}

module.exports = NameNumbers;
