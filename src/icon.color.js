const { shuffleArray, getRandomInt } = require('./helper');

const COLOR_CONFIG = {
	DARK: {
		BASE_COLOR_INTERVAL_MIN: 50,
		BASE_COLOR_INTERVAL_MAX: 120,
		BASE_COLOR_SECOND_OFFSET_MIN: 40,
		BASE_COLOR_SECOND_OFFSET_MAX: 100,
		BASE_COLOR_THIRD_OFFSET_MIN: 100,
		SECOND_COLOR_OFFSET: 70,
	},
	LIGHT: {
		BASE_COLOR_INTERVAL_MIN: 180,
		BASE_COLOR_INTERVAL_MAX: 255,
		BASE_COLOR_SECOND_OFFSET_MIN: 60,
		BASE_COLOR_SECOND_OFFSET_MAX: 100,
		BASE_COLOR_THIRD_OFFSET_MIN: 100,
		SECOND_COLOR_OFFSET: -70,
	},
};

class IconColor {

	/**
	 * @param {NameNumbers} nameNumbers
	 */
	constructor(nameNumbers) {
		this.base = { r: 0, g: 0, b: 0 };
		this.lines = { r: 0, g: 0, b: 0 };
		this.type = type === 'dark' ? 'DARK' : 'LIGHT';
		this._generateMainColor();
	}

	_generateMainColor() {
		const colors = shuffleArray(['r', 'g', 'b']);
		this.base[colors[0]] = getRandomInt(COLOR_CONFIG[this.type].BASE_COLOR_INTERVAL_MIN, COLOR_CONFIG[this.type].BASE_COLOR_INTERVAL_MAX);
		this.base[colors[1]] = Math.max(0, this.base[colors[0]] - getRandomInt(COLOR_CONFIG[this.type].BASE_COLOR_SECOND_OFFSET_MIN, COLOR_CONFIG[this.type].BASE_COLOR_SECOND_OFFSET_MAX));
		this.base[colors[2]] = Math.max(0, getRandomInt(0, this.base[colors[0]] - COLOR_CONFIG[this.type].BASE_COLOR_THIRD_OFFSET_MIN));

		this.lines[colors[0]] = Math.max(0, this.base[colors[0]] + COLOR_CONFIG[this.type].SECOND_COLOR_OFFSET);
		this.lines[colors[1]] = Math.max(0, this.base[colors[1]] + COLOR_CONFIG[this.type].SECOND_COLOR_OFFSET);
		this.lines[colors[2]] = Math.max(0, this.base[colors[2]] + COLOR_CONFIG[this.type].SECOND_COLOR_OFFSET);
	}

	get RGB() {
		return `rgb(${this.base.r},${this.base.g},${this.base.b})`;
	}

	get lineRGB() {
		return `rgb(${this.lines.r},${this.lines.g},${this.lines.b})`;
	}

}

module.exports = IconColor;
