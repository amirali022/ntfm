const button = document.getElementById( "btn")
const paragraph = document.getElementById( "status");

let timer;
let interval;

button.addEventListener( "click", () => {
	notifySMS();
});

const changeParagraph = ( text = "", withTimer = true, status = "text-primary") => {
	paragraph.innerText = text;
	paragraph.setAttribute( "class", status);

	if( withTimer) {
		timer = setTimeout( () => {
			paragraph.innerText = "";
			paragraph.setAttribute( "class", "");
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
		changeParagraph( "Sent!", true, "text-success");
	})
	.catch( err => {
		changeParagraph( `Failed, ${ err.message}`, true, "text-danger");
		console.error( err);
	})
	.finally( () => {
		clearInterval( interval);
		interval = undefined;
	});
};