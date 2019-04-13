const { shuffleArray, getPseudoRandomInt } = require('./helper');
const { COLOR_CONFIG } = require('./consts');

class IconColor {

	/**
	 * @param {NameNumbers} nameNumbers
	 */
	constructor(nameNumbers) {
		this.base = { r: 0, g: 0, b: 0 };
		this.lines = { r: 0, g: 0, b: 0 };
		this.type = nameNumbers.themeFactor === 0 ? 'DARK' : 'LIGHT';
		this.config = COLOR_CONFIG[this.type];
		this._generateMainColor(nameNumbers);
	}

	/**
	 * @param {NameNumbers} nameNumbers
	 * @private
	 */
	_generateMainColor(nameNumbers) {
		const colors = shuffleArray(['r', 'g', 'b'], nameNumbers.shuffleArrayFactor);

		this.base[colors[0]] = getPseudoRandomInt(
			this.config.BASE_COLOR_INTERVAL_MIN,
			this.config.BASE_COLOR_INTERVAL_MAX,
			nameNumbers.colorFactors[0],
		);

		const secondColorOffset = getPseudoRandomInt(
			this.config.BASE_COLOR_SECOND_OFFSET_MIN,
			this.config.BASE_COLOR_SECOND_OFFSET_MAX,
			nameNumbers.colorFactors[1],
		);
		this.base[colors[1]] = Math.max(0, this.base[colors[0]] - secondColorOffset);
		const thirdColorOffset = getPseudoRandomInt(
			0,
			this.base[colors[0]] - this.config.BASE_COLOR_THIRD_OFFSET_MIN,
			nameNumbers.colorFactors[2],
		);
		this.base[colors[2]] = Math.max(0, thirdColorOffset);

		this.lines[colors[0]] = Math.max(0, this.base[colors[0]] + this.config.SECOND_COLOR_OFFSET);
		this.lines[colors[1]] = Math.max(0, this.base[colors[1]] + this.config.SECOND_COLOR_OFFSET);
		this.lines[colors[2]] = Math.max(0, this.base[colors[2]] + this.config.SECOND_COLOR_OFFSET);
	}

	get RGB() {
		return `rgb(${this.base.r},${this.base.g},${this.base.b})`;
	}

	get lineRGB() {
		return `rgb(${this.lines.r},${this.lines.g},${this.lines.b})`;
	}

}

module.exports = IconColor;
