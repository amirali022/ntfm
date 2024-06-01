const axios = require( "axios");

const sendSms = ( text, to, bodyId) => {
	const data = {
		username: process.env[ "SMS_USER"],
		password: process.env[ "SMS_PASS"],
		text,
		to,
		bodyId
	};

	return new Promise( ( resolve, reject) => {
		axios( {
			method: "post",
			url: process.env[ "SMS_SHARED_API"],
			headers: {
				"content-type": "application/json",
				"accept": "application/json"
			},
			data
		}).then( ( response) => {
			if( response.status !== 200)
				throw response.data;
	
			const { Value, RetStatus, StrRetStatus} = response.data;
	
			if( RetStatus !== 1)
				throw new Error( `SMS Send Failed: { Value: ${ Value}, RetStatus: ${ RetStatus}, StrRetStatus: ${ StrRetStatus}}`);
	
			resolve();
		}).catch( err => {
			reject( err);
		});
	});
};

module.exports = sendSms;