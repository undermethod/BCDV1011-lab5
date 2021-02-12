# BCDV1011-serversignedtx
## Design Patterns Lab 5

1. Spin up Ganache or ganache-cli -d (deterministric beacuse of hardcoded EOA, private key and first contract deploy), and change "/express/index.js:3" from 8545 to 7545 if needed
2. Compile SimpleStorage.sol with solc v0.7.1 and deploy
3. Note that SimpleStorage get() returns default 0 value, can be set() to 10, and get() will return 10
3. cd into "/express" and "npm i", then perform "node index"
5. Navigate to http://localhost:2999 to execute server-signed transaction
6. Note that SimpleStorage get() returns the value sent over express (as per "/express/index.js:27", value of 9001)
