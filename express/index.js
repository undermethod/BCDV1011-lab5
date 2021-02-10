const HOSTNAME = "localhost";
const PORT_EXPRESS = 2999;
const PORT_GANACHE = 8545;
const contractAddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab";
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const Web3 = require("web3");
const express = require("express");
const url = require("url");
const cors = require("cors");
const Tx = require("ethereumjs-tx").Transaction;

const web3 = new Web3(new Web3.providers.HttpProvider(`http://${HOSTNAME}:${PORT_GANACHE}`));
let accounts;
web3.eth.getAccounts().then(acc => accounts = acc);

const app = new express();
app.use(cors());
server = app.listen(PORT_EXPRESS, HOSTNAME, () => console.log(`Server running at http://${HOSTNAME}:${PORT_EXPRESS}/`));

const init = (_res) => {
  let contractInstance = new web3.eth.Contract(abi, contractAddress);
  const account = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1";
  const privateKey = Buffer.from("4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d", "hex");
  const _data = contractInstance.methods.set(9001).encodeABI();
  
  web3.eth.getTransactionCount(account)
    .then(nonce => {
      let rawTx = {
        nonce: `0x${nonce}`,
        gasPrice: '0x20000000000',
        gasLimit: '0x27511',
        to: contractAddress,
        value: 0,
        data: _data
      };
      let tx = new Tx(rawTx);
      tx.sign(privateKey);
      let serializedTx = tx.serialize();
      web3.eth.sendSignedTransaction("0x" + serializedTx.toString("hex"))
        .on("receipt", (data) => {
					console.log(data);
					_res.status = 200; // OK
					_res.send(`Transaction hash: ${data.transactionHash}`);
				})
      ;
    })
  ;
};

app.get("/", (req, res, next) => {
  init(res);
});

module.exports = app;
