const { randomInt, randomBytes} = require( "crypto");
const sendSms = require( "../utils/sms");
const { NUMBERS, BODYID} = require( "../config");

let timer;
let c = 0;

const notifySmsController = async ( req, res, next) => {
	try {
		c++;
		clearTimeout( timer);
		timer = undefined;

		timer = setTimeout( () => {
			c = 0;
		}, 1000 * 60 * 60);

		const text = [
			c.toString(),						// order num
			"یکساعت",							// duration (مدت در آینده)
			randomBytes( 4).toString( "hex"),	// discount code
			randomInt( 10, 25).toString()		// discount percentage
		].join( ";");

		const number = NUMBERS[ c % NUMBERS.length]

		await sendSms( text, number, BODYID)

		res.end();
	} catch( err) {
		next( err);
	}
};

module.exports = notifySmsController;
