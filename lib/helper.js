/**
 * @param {Array} arr
 * @param {Array} shuffleArrayFactor
 * @returns {Array}
 */
module.exports.shuffleArray = (arr, shuffleArrayFactor) => arr.map((r, i) => arr[shuffleArrayFactor[i]]);

const getPseudoRandom = (min, max, factor) => factor / 0xffff * (max - min) + min;
module.exports.getPseudoRandom = getPseudoRandom;

module.exports.getPseudoRandomInt = (min, max, factor) => Math.round(getPseudoRandom(min, max, factor));
