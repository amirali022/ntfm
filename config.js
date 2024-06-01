const LIMIT_WIN = 2 * 60 * 1000;	// 2 Min
const LIMIT_CNT = 5

const NUMBERS = process.env[ "NUMBERS"].split( ",").map( n => n.trim()).filter( n => /^09\d{9,9}$/.test( n));

const BODYID = process.env[ "BODYID"];

module.exports = {
	LIMIT_WIN,
	LIMIT_CNT,
	NUMBERS,
	BODYID
};