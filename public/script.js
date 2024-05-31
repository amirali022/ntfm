const button = document.getElementById( "btn")
const paragraph = document.getElementById( "prg");
let timer;
let interval;

button.addEventListener( "click", () => {
	notifySMS();
});

const changeParagraph = ( text = "", withTimer = true) => {
	paragraph.innerText = text;
	
	if( withTimer) {
		timer = setTimeout( () => {
			paragraph.innerText = "";
			timer = undefined;
		}, 3000);
	}
};

const pendingParagraph = ( text = "waiting") => {
	if( interval) return;

	changeParagraph( text, false);

	interval = setInterval( () => {
		text = text.concat( ".")
		changeParagraph( text, false);
	}, 1000);
};

const notifySMS = () => {
	if( timer) return;

	pendingParagraph();

	axios( {
		method: "get",
		url: "/notify-sms"
	})
	.then( () => {
		changeParagraph( "Sent!");
	})
	.catch( err => {
		changeParagraph( `Failed, ${ err.message}`);
		console.error( err);
	})
	.finally( () => {
		clearInterval( interval);
		interval = undefined;
	})
}