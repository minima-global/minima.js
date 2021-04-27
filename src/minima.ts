/**
* Minima JS lib for MiniDAPPs..
*
* Includes the Decimal.js lib for precise Maths.
*
* @spartacusrex
*/
export interface Token {
	tokenid: string;
	token: string;
	total: string;
	sendable: string;
	unconfirmed: string;
	confirmed: string;
	decimals: string;
	mempool: string;
	coinid?: string;
	totalamount?: string;
	scale?: string;
	description?: string;
	icon?: string;
	proof?: string;
	script?: string;
}
export interface NetworkStatus {
	version: string;
	time: string;
	uptime: string;
	conf: string;
	host: string;
	minimaport: number;
	rpcport: number;
	websocketport: number;
	minidappserver: number;
	automine: boolean;
	root: string;
	tip: string;
	total: string;
	lastblock: number;
	lasttime: string;
	cascade: string;
	difficulty: string;
	txpowdb: number;
	ram: string;
	mempooltxn: number;
	mempoolcoins: number;
	chainspeed: number;
	chainlength: number;
	chainweight: string;
	connections: number;
	txpowfiles?: string;
	txpowfolder?: string;
	IBD?: string;
}
export interface Address {
	script: string;
	hexaddress: string;
	miniaddress: string;
}
export interface Coin {
	coinid: string;
	address: string;
	mxaddress: string;
	amount: string;
	tokenid: string;
	floating: boolean;
	storestate: boolean
}
export interface MMRProof {
	blocktime: string;
	entry: string;
	data: {
			hashonly: boolean;
			value: string;
			finalhash: string;
			spent: boolean;
			coin: Coin;
	};
	inblock: string;
	prevstate: [];
}
interface SignatureWitnessProof {
	data: string;
	hashbits: number;
	proofchain: [];
	chainsha: string;
	finalhash: string;
}
interface SignatureWitness {
	signature: string;
	proof: SignatureWitnessProof;
}
interface Script {
	script: string;
	proof: Proof;
}
interface Proof {
	data: string;
	hashbits: number;
	proofchain: [];
	chainsha: string;
	finalhash: string;
}
interface Witness {
	signatures: SignatureWitness[];
	mmrproofs: MMRProof[];
	tokens: [];
	scripts: Script[];
}
interface Magic {
	prng: string;
	maxtxpow: number;
	maxtxn: number;
	maxkissvm: number;
}
interface WitnessBurn {
	signatures: [];
	mmrproofs: [];
	tokens: [];
	scripts: [];
}
interface TransactionBurn {
	inputs: [];
	outputs: [];
	state: [];
	linkhash: string;
}
interface TransactionInput {
	coinid: string;
	address: string;
	mxaddress: string;
	amount: string;
	tokenid: string;
	floating: boolean;
	storestate: boolean;
}
interface TransactionOutput {
	coinid: string;
	address: string;
	mxaddress: string;
	amount: string;
	tokenid: string;
	floating: boolean;
	storestate: boolean;
}
interface Transaction {
	inputs: TransactionInput[];
	outputs: TransactionOutput[];
	state: State[];
	linkhash: string;
	tokengen?: TokenGenerator;
}
interface TransactionBody {
	txndiff: string;
	txn: Transaction;
	witness: Witness;
	burntxn: TransactionBurn;
	burnwitness: WitnessBurn;
	txnlist: [];
	magic: Magic;
}
interface SuperParents {
	difficulty: number;
	count: number;
	parent: string;
}
interface TransactionHeader {
	block: string;
	blkdiff: string;
	cascadelevels: number;
	superparents: SuperParents[];
	chainid: string;
	parentchainid: string;
	mmr: string;
	total: string;
	mmrpeaks: string;
	nonce: string;
	timemilli: string;
	date: string;
}
interface Txpow {
	txpowid: string;
	isblock: boolean;
	istransaction: boolean;
	superblock: number;
	size: number;
	header: TransactionHeader;
	hasbody: boolean;
	body: TransactionBody;
}
export interface Value {
	token: string;
	name: any;
	amount: string;
}
interface TokenGenerator {
	tokenid: string;
	token: string;
	description: string;
	icon: string;
	proof: string;
	total: string;
	decimals: string;
	script: string;
	coinid: string;
	totalamount: string;
	scale: string;
}
export interface CompleteTransaction {
	txpow: Txpow;
	values: Value[];
}
export interface History {
 history: CompleteTransaction[];
}
interface Listen {
  port: string
  callback: Callback
}

interface CallBackResponse {
  status: boolean
  message: string
  minifunc: string
}

interface State {
  port: string
	data: string
	keeper: string
}

type Callback = (jsonresp: any) => void

/**
 * The MAIN Minima Callback function
 */
let MINIMA_MAIN_CALLBACK: Callback;

/**
 * The MiniDAPP interfce Callback function
 */
let MINIMA_MINIDAPP_CALLBACK: Callback;

/**
 * The Web Socket Host for PUSH messages
 */
let MINIMA_WEBSOCKET: WebSocket;

/**
 * GET or POST request parameters
 */
let MINIMA_PARAMS: any;

/**
 * NET socket port and functions
 */
const MINIMA_SERVER_LISTEN: Listen[] = [];
const MINIMA_USER_LISTEN: Listen[]  = [];

/**
 * Notification control
 */
let TOTAL_NOTIFICATIONS     = 0;
let TOTAL_NOTIFICATIONS_MAX = 0;

/**
 * Main MINIMA Object for all interaction
 */
const Minima = {

	/**
	 * Current Minima Block Height
	 */
	block : 0,

	/**
	 * The Full TxPoW Top Block
	 */
	txpow : {},

	/**
	 * Current Balance of this User
	 */
	balance : [] as Token[],

	/**
	 * The MiniDAPP ID
	 */
	minidappid : "0x00",

	//Web Host for the MinDAPP System
	webhost : "http://127.0.0.1:9004",

	//RPC Host for Minima
	rpchost : "http://127.0.0.1:9002",

	//Web Socket Host for Minima
	wshost : "ws://127.0.0.1:9003",

	//Show RPC commands
	logging : false,

	//Are we in DEBUG mode - if so don't touch the host settings..
	debug : false,

	//Show mining messages - can be dealt with by the MiniDAPP
	showmining : false,

	/**
	 * Minima Startup - with the callback function used for all Minima messages
	 */
	init : function (callback: Callback): void {
		//Log a little..
		Minima.log("Initialising..");

		//Calculate MiniDAPP ID given HREF location
		const startid = window.location.href.indexOf("/minidapps");
		const endid   = window.location.href.indexOf("/",startid+11);
		if (startid!=-1 && endid!=-1) {
			//Get it..
			Minima.minidappid = window.location.href.substring(startid+11,endid);
			Minima.log("MiniDAPP ID set : "+Minima.minidappid);
		} else {
			Minima.log("Not running on /minidapps URL.. MiniDAPP ID remains unchanged : "+Minima.minidappid);
		}

		//Store the callback
		if (callback) {
			MINIMA_MAIN_CALLBACK = callback;
		} else {
			Minima.log("No Main Minima Callback specified..");
		}

		//Are we running via a server - otherwise leave as is
		if (!Minima.debug) {
			if (window.location.protocol.startsWith("http")) {
				//The Port determives the WebSocket and RPC port..
        const rpcPort: number = +window.location.port-2
        const wsPort: number = +window.location.port-1
				Minima.webhost = "http://"+window.location.hostname+":"+(window.location.port);
				Minima.rpchost = "http://"+window.location.hostname+":"+rpcPort;
				Minima.wshost  = "ws://"+window.location.hostname+":"+wsPort;
			}
		}

		//Info..
		Minima.log("WEBHOST : "+Minima.webhost);
		Minima.log("RPCHOST : "+Minima.rpchost);
		Minima.log("WCHOST  : "+Minima.wshost);

		//Any Parameters..
		const paramstring = Minima.webhost+"/params";
		httpGetAsync(paramstring, function (jsonresp: any) {
			//Set it..
			MINIMA_PARAMS = jsonresp;
		});

		//Do the first call..
		Minima.cmd("topblock;balance", function (json: any) {
			if (json[0].status) {
				//Store this..
					Minima.block  = parseInt(json[0].response.txpow.header.block,10);
					Minima.txpow  = json[0].response.txpow;

				if (json[1].status) {
					//Status is first..
					Minima.balance = json[1].response.balance;
				}
			} else {
				Minima.log("Initial CMD calls failed.. Minima still starting up / busy ?");
			}

				//Start Listening for messages..
			MinimaWebSocketListener();
		});
	},

	/**
	 * Log some data with a timestamp in a consistent manner to the console
	 */
	log : function (output: string): void {
		console.log("Minima @ "+new Date().toLocaleString()+" : "+output);
	},

	/**
	 * Notify the user with a Pop up message
	 */
	notify : function (message: string, bgcolor: string): void {
		//Log it..
		Minima.log("Notify : "+message);

		//Show a little popup across the screen..
		if (bgcolor) {
			MinimaCreateNotification(message,bgcolor);
		} else {
			MinimaCreateNotification(message);
		}
	},

	/**
	 * Runs a function on the Minima Command Line
	 */
	cmd : function (minifunc: string, callback: Callback): void {
		MinimaRPC("cmd",minifunc,callback);
	},

	/**
	 * Run SQL
	 */
	sql : function (query: string, callback: Callback): void {
		MinimaRPC("sql",query,callback);
	},

	/**
	 * NETWORK Functions
	 */
	net : {
		//SERVER FUNCTIONS
		onInbound : function (port: string, onReceivecallback: Callback): void {
			MINIMA_SERVER_LISTEN.push({ "port":port, "callback":onReceivecallback });
		},

		start : function (port: string): void {
			MinimaRPC("net","listen "+port);
		},

		stop : function (port: string): void {
			MinimaRPC("net","stop "+port);
		},

		broadcast : function (port: string, text: string): void {
			MinimaRPC("net","broadcast "+port+" "+text);
		},

		//USER FUNCTIONS
		onOutbound : function (hostport: string, onReceivecallback: Callback): void {
			MINIMA_USER_LISTEN.push({ "port":hostport, "callback":onReceivecallback });
		},

		connect : function (hostport: string): void {
			MinimaRPC("net","connect "+hostport);
		},

		disconnect : function (UID: string): void {
			MinimaRPC("net","disconnect "+UID);
		},

		send : function (UID: string, text: string): void {
			MinimaRPC("net","send "+UID+" "+text);
		},

		//Resend all the connection information
		info : function (): void {
			MinimaRPC("net","info");
		},

		//Receive all info in the callback
		stats : function (callback: Callback): void {
			MinimaRPC("net","stats",callback);
		},

		//GET an URL
		GET : function (url: string, callback: Callback): void {
			MinimaRPC("net","get "+url,callback);
		},

		//POST params to an URL
		POST : function (url: string, params: string, callback: Callback): void {
			MinimaRPC("net","post "+url+" "+params,callback);
		}

	},

	/**
	 * FILE Functions - no spaces allowed in filenames
	 */
	file : {

		//Save & Load Text to a file
		save : function (text: string, file: string, callback: Callback): void {
			MinimaRPC("file","save "+file+" "+text,callback);
		},

		load : function (file: string, callback: Callback): void {
			MinimaRPC("file","load "+file,callback);
		},

		//Save and Load as HEX.. Strings with 0x..
		saveHEX : function (hextext: string, file: string, callback: Callback): void {
			MinimaRPC("file","savehex "+file+" "+hextext,callback);
		},

		loadHEX : function (file: string, callback: Callback): void {
			MinimaRPC("file","loadhex "+file,callback);
		},

		//Copy file..
		copy : function (file: string, newfile: string, callback: Callback): void {
			MinimaRPC("file","copy "+file+" "+newfile,callback);
		},

		//Rename a file in your folder
		move : function (file: string, newfile: string, callback: Callback): void {
			MinimaRPC("file","move "+file+" "+newfile,callback);
		},

		//List the files in a directory
		list : function (file: string, callback: Callback): void {
			MinimaRPC("file","list "+file,callback);
		},

		//Delete a File
		delete : function (file: string, callback: Callback): void {
			MinimaRPC("file","delete "+file,callback);
		}

	},

	/**
	 * Form GET / POST parameters..
	 */
	form : {

		//BOTH POST and GET parameters.. and any files are uploaded to /upload folder
		//must set POST form to multipart/form-data to work..
		params : function (paramname: string): void {
			return MINIMA_PARAMS[paramname];
		},

		//Return the GET parameter by scraping the location..
		getParams : function (parameterName: string): string | null {
					let result = null;
					let tmp = [];
					const items = location.search.substr(1).split("&");
					for (let index = 0; index < items.length; index++) {
							tmp = items[index].split("=");
							//console.log("TMP:"+tmp);
							if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
					}
					return result;
		}
	},

	/**
	 * Intra MiniDAPP communication
	 */
	minidapps : {
		//List the currently installed minidapps
		list : function (callback: Callback): void {
			Minima.cmd("minidapps list",callback);
		},

		//Function to call when an Intra-MiniDAPP message is received
		listen : function (onReceivecallback: Callback): void {
			MINIMA_MINIDAPP_CALLBACK = onReceivecallback;
		},

		//Send a message to a specific minidapp
		send : function (minidappid: string, message: string, callback: Callback): void {
			Minima.cmd("minidapps post:"+minidappid+" \""+message+"\"",callback);
		},

		//The replyid is in the original message
		reply : function (replyid: string, message: string): void {
			//Reply to a POST message..
			const replymsg = { "type":"reply", "message": message, "replyid" : replyid };
			MINIMA_WEBSOCKET.send(JSON.stringify(replymsg));
		}
	},

	/**
	 * UTILITY FUNCTIONS
	 */
	util : {
			//Get the Balance string for a Tokenid..
			getBalance : function (tokenid: string): string {
				const ballen = Minima.balance.length;
				for(let balloop=0;balloop<ballen;balloop++) {
					if (Minima.balance[balloop].tokenid == tokenid) {
						const bal     = Minima.balance[balloop].confirmed;
						const balsend = Minima.balance[balloop].sendable;
						const balun   = Minima.balance[balloop].unconfirmed;
						const mempool = Minima.balance[balloop].mempool;

						//Is there unconfirmed money coming..
						if (balun !== "0" || mempool !== "0" || balsend !== bal) {
							return balsend+" ("+bal+") / "+balun+" / "+mempool;
						} else {
							return ""+bal;
						}
					}
				}

				//Not found..
				return "0";
			},

			checkAllResponses : function (responses: CallBackResponse[]): boolean {
				const len = responses.length;
				for(let i=0;i<len;i++) {
					if (responses[i].status != true) {
						alert(responses[i].message+"\n\nERROR @ "+responses[i].minifunc);
						Minima.log("ERROR in Multi-Command ["+i+"] "+JSON.stringify(responses[i],null,2));
						return false;
					}
				}

				return true;
			},

			getStateVariable : function (statelist: State[], port: string): string | null {
				const pslen = statelist.length;
				for(let psloop=0;psloop<pslen;psloop++) {
					if (statelist[psloop].port == port) {
						return statelist[psloop].data;
					}
				}

				//Not found
				return null;
			}
	}

}

/**
 * POST the RPC call - can be cmd/sql/file/net
 */
function MinimaRPC(type: string, data: string, callback: (jsonresp: any) => void = () => {}): void {
	//And now fire off a call saving it
	httpPostAsync(Minima.rpchost+"/"+type+"/"+Minima.minidappid, encodeURIComponent(data), callback);
}

/**
 * Post a message to the Minima Event Listeners
 */
function MinimaPostMessage(event: string, info: any): void {
	//Create Data Object
	const data = { "event": event, "info" : info };

	//And dispatch
	if (MINIMA_MAIN_CALLBACK) {
		MINIMA_MAIN_CALLBACK(data);
	}
}

/**
 * Start listening for PUSH messages
 */
function MinimaWebSocketListener(): void {
	Minima.log("Starting WebSocket Listener @ "+Minima.wshost);

	//Check connected
	if (MINIMA_WEBSOCKET) {
		MINIMA_WEBSOCKET.close();
	}

	//Open up a websocket to the main MINIMA proxy..
	MINIMA_WEBSOCKET = new WebSocket(Minima.wshost);

	MINIMA_WEBSOCKET.onopen = function () {
		//Connected
		Minima.log("Minima WS Listener Connection opened..");

		//Now set the MiniDAPPID
		const uid = { "type":"minidappid", "minidappid": Minima.minidappid };

		//Send your name.. set automagically but can be hard set when debugging
		MINIMA_WEBSOCKET.send(JSON.stringify(uid));

		//Send a message
		MinimaPostMessage("connected", "success");
	};

	MINIMA_WEBSOCKET.onmessage = function (evt) {
		//Convert to JSON
		const jmsg = JSON.parse(evt.data);
		let info = {};

		if (jmsg.event == "newblock") {
			//Set the new status
			Minima.block   = parseInt(jmsg.txpow.header.block,10);
			Minima.txpow   = jmsg.txpow;

			//What is the info message
			info = { "txpow" : jmsg.txpow };

			//Post it
			MinimaPostMessage("newblock", info);

		} else if (jmsg.event == "newtransaction") {
			//What is the info message
			info = { "txpow" : jmsg.txpow, "relevant" : jmsg.relevant };

			//New Transaction
			MinimaPostMessage("newtransaction", info);

		} else if (jmsg.event == "newtxpow") {
			//What is the info message
			info = { "txpow" : jmsg.txpow };

			//New TxPoW
			MinimaPostMessage("newtxpow", info);

		} else if (jmsg.event == "newbalance") {
			//Set the New Balance
			Minima.balance = jmsg.balance;

			//What is the info message
			info = { "balance" : jmsg.balance };

			//Post it..
			MinimaPostMessage("newbalance", info);

		} else if (jmsg.event == "network") {
			//What type of message is it..
			if ( jmsg.details.action == "server_start" ||
				jmsg.details.action == "server_stop"  ||
				jmsg.details.action == "server_error") {

				sendCallback(MINIMA_SERVER_LISTEN, jmsg.details.port, jmsg.details);

			} else if ( jmsg.details.action == "client_new"  ||
						jmsg.details.action == "client_shut" ||
						jmsg.details.action == "message") {

				if (!jmsg.details.outbound) {
					sendCallback(MINIMA_SERVER_LISTEN, jmsg.details.port, jmsg.details);
				} else {
					sendCallback(MINIMA_USER_LISTEN, jmsg.details.hostport, jmsg.details);
				}
			} else if ( jmsg.details.action == "post") {
				//Call the MiniDAPP function..
				if (MINIMA_MINIDAPP_CALLBACK) {
					MINIMA_MINIDAPP_CALLBACK(jmsg.details);
				} else {
					Minima.minidapps.reply(jmsg.details.replyid, "ERROR - no minidapp interface found");
				}

			} else {
				Minima.log("UNKNOWN NETWORK EVENT : "+evt.data);
			}

		} else if (jmsg.event == "txpowstart") {
			info = { "transaction" : jmsg.transaction };
			MinimaPostMessage("miningstart", info);

			if (Minima.showmining) {
				Minima.notify("Mining Transaction Started..","#55DD55");
			}

		} else if (jmsg.event == "txpowend") {
			info = { "transaction" : jmsg.transaction };
			MinimaPostMessage("miningstop", info);

			if (Minima.showmining) {
				Minima.notify("Mining Transaction Finished","#DD5555");
			}
		}
	};

	MINIMA_WEBSOCKET.onclose = function () {
		Minima.log("Minima WS Listener closed... reconnect attempt in 10 seconds");

		//Start her up in a minute..
		setTimeout(function () { MinimaWebSocketListener(); }, 10000);
	};

	MINIMA_WEBSOCKET.onerror = function (error) {
		//let err = JSON.stringify(error);
		const err = JSON.stringify(error, ["message", "arguments", "type", "name", "data"])

		// websocket is closed.
			Minima.log("Minima WS Listener Error ... "+err);
	};
}

function sendCallback(list: Listen[], port: string, msg: string): void {
	const funclen = list.length;
	for(let i=0;i<funclen;i++) {
		if (list[i].port == port) {
			list[i].callback(msg);
			return;
		}
	}
}

/**
 * Utility function for GET request
 *
 * @param theUrl
 * @param callback
 * @param params
 * @returns
 */
function httpPostAsync(theUrl: string, params: string, callback: Callback): void {

	const xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
		//Do we log it..
				if (Minima.logging) {
					Minima.log("RPC:"+theUrl+"\nPARAMS:"+params+"\nRESPONSE:"+xmlHttp.responseText);
				}

				//Send it to the callback function..
				if (callback) {
					callback(JSON.parse(xmlHttp.responseText));
				}
			}
	}
	xmlHttp.open("POST", theUrl, true); // true for asynchronous
	xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttp.send(params);
}

/**
 * Utility function for GET request (UNUSED for now..)
 *
 * @param theUrl
 * @param callback
 * @returns
 */
function httpGetAsync(theUrl: string, callback: (jsonresp: any) => void, logenabled: boolean = false): void {
		const xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					//Always a JSON ..
					const rpcjson = JSON.parse(xmlHttp.responseText);

					//Do we log it..
					if (Minima.logging && logenabled) {
						const logstring = JSON.stringify(rpcjson, null, 2).replace(/\\n/g,"\n");
						Minima.log(theUrl+"\n"+logstring);
					}

					//Send it to the callback function..
					if (callback) {
						callback(rpcjson);
					}
				}
		}
		xmlHttp.open("GET", theUrl, true); // true for asynchronous
		xmlHttp.send(null);
}

/**
 * Notifications
 */
function MinimaCreateNotification(text: string, bgcolor: string = "#bbbbbb"): void {
	//First add the total overlay div
	const notifydiv = document.createElement('div');

	//Create a random ID for this DIV..
	const notifyid = (Math.floor(Math.random()*1000000000)).toString();

	//Details..
	notifydiv.id  = notifyid;
	notifydiv.style.position 	 = "absolute";

	notifydiv.style.top 		 = (20 + TOTAL_NOTIFICATIONS_MAX * 110).toString();
	TOTAL_NOTIFICATIONS++;
	TOTAL_NOTIFICATIONS_MAX++;

	notifydiv.style.right 		 = "0";
	notifydiv.style.width 	     = "400";
	notifydiv.style.height 	     = "90";

	//Regular or specific color
	if (bgcolor) {
		notifydiv.style.background   = bgcolor;
	} else {
		notifydiv.style.background   = "#bbbbbb";
	}

	notifydiv.style.opacity 	 = "0";
	notifydiv.style.borderRadius = "10px";
	notifydiv.style.border = "thick solid #222222";

	//Add it to the Page
	document.body.appendChild(notifydiv);

	//Create an HTML window
	const notifytext = "<table border=0 width=400 height=90><tr>" +
	"<td style='width:400;height:90;font-size:16px;font-family:monospace;color:black;text-align:center;vertical-align:middle;'>"+text+"</td></tr></table>";

	//Now get that element
	const elem = document.getElementById(notifyid);
  if ( elem ) {

    //Set the Text..
  	elem.innerHTML = notifytext;

  	//Fade in..
  	elem.style.transition = "all 1s";

  	// reflow
  	elem.getBoundingClientRect();

  	// it transitions!
  	elem.style.opacity = "0.8";
  	elem.style.right   = "40";

  	//And create a timer to shut it down..
  	setTimeout(function () {
  		TOTAL_NOTIFICATIONS--;
  		if (TOTAL_NOTIFICATIONS<=0) {
  			TOTAL_NOTIFICATIONS=0;
  			TOTAL_NOTIFICATIONS_MAX=0;
  		}

      const displayObject = document.getElementById(notifyid);
      if ( displayObject ) {

      		displayObject.style.display = "none";
      }
  	}, 4000);

  }
}

export { Minima }
