/**
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */
module.exports.getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * @param {Array} arr
 * @returns {Array}
 */
module.exports.shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);
