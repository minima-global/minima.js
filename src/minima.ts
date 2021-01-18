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
	coindb: number;
	txpowdb: number;
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
	remainder: boolean;
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
	proof: Proof;
	tokens: [];
	scripts: Script[];
}
interface Magic {
	prng: string;
	maxtxpow: number;
	maxtxn: number;
	maxkissvm: string;
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
	amount: number;
	tokenid: string;
	floating: boolean;
	remainder: boolean;
}
interface TransactionOutput {
	coinid: string;
	address: string;
	amount: string;
	tokenid: string;
	floating: boolean;
	remainder: boolean;
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
	nonce: string;
	timesecs: string;
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
	script: string;
	coinid: string;
	totalamount: string;
	scale: string;
	scalefactor: string;
}
export interface CompleteTransaction {
	txpow: Txpow;
	values: Value[];
}
interface HistoryTransaction {
	history?: CompleteTransaction[];
}
interface HistoryResponse {
	response?: HistoryTransaction;
}
export declare type History = CallBackResponse & HistoryResponse;
interface CallBackResponse {
	status: boolean;
	message: string;
	minifunc: string;
}
interface State {
	port: string;
	data: string;
	keeper: string;
}
declare type Callback = (jsonresp: any) => void;
/**
* Main MINIMA Object for all interaction
*/
declare const Minima: {
	/**
	 * Current Minima Block Height
	 */
	block: number;
	/**
	 * The Full TxPoW Top Block
	 */
	txpow: {};
	/**
	 * Current Balance of this User
	 */
	balance: Token[];
	/**
	 * The MiniDAPP ID
	 */
	minidappid: string;
	webhost: string;
	rpchost: string;
	wshost: string;
	logging: boolean;
	debug: boolean;
	showmining: boolean;
	/**
	 * Minima Startup - with the callback function used for all Minima messages
	 */
	init: (callback: Callback) => void;
	/**
	 * Log some data with a timestamp in a consistent manner to the console
	 */
	log: (output: string) => void;
	/**
	 * Notify the user with a Pop up message
	 */
	notify: (message: string, bgcolor: string) => void;
	/**
	 * Runs a function on the Minima Command Line
	 */
	cmd: (minifunc: string, callback: Callback) => void;
	/**
	 * Run SQL
	 */
	sql: (query: string, callback: Callback) => void;
	/**
	 * NETWORK Functions
	 */
	net: {
			onInbound: (port: string, onReceivecallback: Callback) => void;
			start: (port: string) => void;
			stop: (port: string) => void;
			broadcast: (port: string, text: string) => void;
			onOutbound: (hostport: string, onReceivecallback: Callback) => void;
			connect: (hostport: string) => void;
			disconnect: (UID: string) => void;
			send: (UID: string, text: string) => void;
			info: () => void;
			stats: (callback: Callback) => void;
			GET: (url: string, callback: Callback) => void;
			POST: (url: string, params: string, callback: Callback) => void;
	};
	/**
	 * FILE Functions - no spaces allowed in filenames
	 */
	file: {
			save: (text: string, file: string, callback: Callback) => void;
			load: (file: string, callback: Callback) => void;
			saveHEX: (hextext: string, file: string, callback: Callback) => void;
			loadHEX: (file: string, callback: Callback) => void;
			copy: (file: string, newfile: string, callback: Callback) => void;
			move: (file: string, newfile: string, callback: Callback) => void;
			list: (file: string, callback: Callback) => void;
			delete: (file: string, callback: Callback) => void;
	};
	/**
	 * Form GET / POST parameters..
	 */
	form: {
			params: (paramname: string) => void;
			getParams: (parameterName: string) => string | null;
	};
	/**
	 * Intra MiniDAPP communication
	 */
	minidapps: {
			list: (callback: Callback) => void;
			listen: (onReceivecallback: Callback) => void;
			send: (minidappid: string, message: string, callback: Callback) => void;
			reply: (replyid: string, message: string) => void;
	};
	/**
	 * UTILITY FUNCTIONS
	 */
	util: {
			getBalance: (tokenid: string) => string;
			checkAllResponses: (responses: CallBackResponse[]) => boolean;
			getStateVariable: (statelist: State[], port: string) => string | null;
	};
};
export { Minima };
//# sourceMappingURL=minima.d.ts.map