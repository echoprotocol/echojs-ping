const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const window = require('svgdom');

const {
	LINE_WIDTH_PERCENT,
	SC_PERCENT,
	MC_PERCENT,
	BC_PERCENT,
	FC_PERCENT,
} = require('./consts');
const { getPseudoRandom } = require('./helper');
const IconColor = require('./icon.color');
const NameNumbers = require('./name.numbers');

class Ping {

	constructor(accountName, size = 100) {
		registerWindow(window, window.document);
		this.userNumbers = new NameNumbers(accountName);
		this.iconSize = size;


		this.color = new IconColor(this.userNumbers);

		this.smallCircleRadius = this.iconSize * SC_PERCENT / 2;
		this.circleLineWidth = this.iconSize * LINE_WIDTH_PERCENT;

		this.smallCircleCenter = this._getSmallCircleCenter();

		this.mediumCircleRadius = this.iconSize * MC_PERCENT / 2;
		this.mediumCircleCenter = null;
		this.mediumCircleAngle = null;
		this._getMediumCircleCenter();

		this.bigCircleRadius = this.iconSize * BC_PERCENT / 2;
		this.bigCircleCenter = null;
		this.bigCircleAngle = null;
		this._getBigCircleCenter();

		this.fadeCircleRadius = this.iconSize * FC_PERCENT / 2;
		this.fadeCircleCenter = null;
		this.fadeCircleAngle = null;
		this._getFadeCircleCenter();
	}

	_getSmallCircleCenter() {
		return {
			x: getPseudoRandom(this.iconSize * 0.1, this.iconSize * 0.9, this.userNumbers.angleFactors[0]),
			y: getPseudoRandom(this.iconSize * 0.1, this.iconSize * 0.9, this.userNumbers.angleFactors[0]),
		};
	}

	_getMediumCircleCenter() {
		const offset = this.mediumCircleRadius - this.smallCircleRadius;
		const range = this._getAngleRange(this.iconSize, offset * 2, this.smallCircleCenter);
		this.mediumCircleAngle = getPseudoRandom(range[0], range[1], this.userNumbers.angleFactors[1]);
		this.mediumCircleCenter = {
			x: Math.cos(this.mediumCircleAngle) * offset + this.smallCircleCenter.x,
			y: Math.sin(this.mediumCircleAngle) * offset + this.smallCircleCenter.y,
		};
	}

	_getBigCircleCenter() {
		const offset = this.bigCircleRadius - this.smallCircleRadius;
		const range = this._getAngleRange(this.iconSize, offset, this.smallCircleCenter);
		this.bigCircleAngle = getPseudoRandom(range[0], range[1], this.userNumbers.angleFactors[2]);

		let angleDiff = Math.abs(this.mediumCircleAngle > this.bigCircleAngle
			? this.mediumCircleAngle - this.bigCircleAngle
			: this.bigCircleAngle - this.mediumCircleAngle);
		if (angleDiff > Math.PI) {
			angleDiff = Math.PI * 2 - angleDiff;
		}

		if (angleDiff < Math.PI / 4) {
			const needAdd = Math.PI / 4 - angleDiff;
			if (this.bigCircleAngle > this.mediumCircleAngle) {
				this.bigCircleAngle += needAdd;
			} else {
				this.bigCircleAngle -= needAdd;
			}
		}

		this.bigCircleCenter = {
			x: Math.cos(this.bigCircleAngle) * offset + this.smallCircleCenter.x,
			y: Math.sin(this.bigCircleAngle) * offset + this.smallCircleCenter.y,
		};
	}

	_getFadeCircleCenter() {
		const offset = this.fadeCircleRadius - this.smallCircleRadius;
		const range = this._getAngleRange(this.iconSize, offset * 0.7, this.smallCircleCenter);
		this.fadeCircleAngle = getPseudoRandom(range[0], range[1], this.userNumbers.angleFactors[3]);

		this.fadeCircleCenter = {
			x: Math.cos(this.fadeCircleAngle) * offset + this.smallCircleCenter.x,
			y: Math.sin(this.fadeCircleAngle) * offset + this.smallCircleCenter.y,
		};
	}

	_getAngleRange(squareWidth, r, center) {
		const result = [0, 4 * Math.PI];

		if (squareWidth - center.x < r) {
			const alpha = Math.acos((squareWidth - center.x) / r);
			result[0] = alpha;
			result[1] = Math.PI * 2 - alpha;
		}

		if (squareWidth - center.y < r) {
			const alpha = Math.acos((squareWidth - center.y) / r);
			result[0] = Math.max(result[0], Math.PI / 2 + alpha);
			result[1] = Math.min(result[1], 5 * Math.PI / 2 - alpha);
		}

		if (center.x < r) {
			const alpha = Math.acos(center.x / r);
			result[0] = Math.max(Math.PI + alpha, result[0]);
			result[1] = Math.min(3 * Math.PI - alpha, result[1]);
		}

		if (center.y < r) {
			const alpha = Math.acos(center.y / r);
			if (squareWidth - center.x >= r) {
				result[0] = Math.max(Math.PI * 3 / 2 + alpha, result[0]);
			}
			if (result[1] < Math.PI * 2) result[1] += Math.PI * 2;
			result[1] = Math.min(Math.PI * 7 / 2 - alpha, result[1]);
		}
		if (result[0] < result[1] - Math.PI * 2) result[1] -= Math.PI * 2;
		return result;
	}

	getSvg() {
		this.canvas = SVG(window.document.documentElement).size(this.iconSize, this.iconSize);
		this.canvas.clear();
		this.canvas.rect(this.iconSize, this.iconSize).fill(this.color.RGB);
		this.canvas.circle(this.smallCircleRadius * 2).fill('none').stroke({
			color: this.color.lineRGB,
			width: this.circleLineWidth,
		}).center(this.smallCircleCenter.x, this.smallCircleCenter.y);

		this.canvas.circle(this.mediumCircleRadius * 2).fill('none').stroke({
			color: this.color.lineRGB,
			width: this.circleLineWidth,
		}).center(this.mediumCircleCenter.x, this.mediumCircleCenter.y);

		this.canvas.circle(this.fadeCircleRadius * 2)
			.fill(this.color.lineRGB)
			.stroke({
				color: this.color.lineRGB,
				width: this.circleLineWidth,
			})
			.opacity(0.7)
			.center(this.fadeCircleCenter.x, this.fadeCircleCenter.y);

		this.canvas.circle(this.bigCircleRadius * 2).fill('none').stroke({
			color: '#fff',
			width: this.circleLineWidth,
		}).center(this.bigCircleCenter.x, this.bigCircleCenter.y);

		return this.canvas.svg();
	}

}

const getSvg = (accountName, size) => new Ping(accountName, size).getSvg();

module.exports = getSvg;
