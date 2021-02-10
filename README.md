# BCDV1011-serversignedtx
## Design Patterns Lab 5

1. cd into "/express" and "npm i"
2. Spin up Ganache or ganache-cli -d (deterministric beacuse of hardcoded EOA, private key and first contract deploy), and change index.js:3 from 8545 to 7545 if needed
3. Compile SimpleStorage.sol with solc v0.7.1 and deploy
4. Perform "node index"
5. Navigate to http://localhost:2999 to execute server-signed transaction
6. Invoke SimpleStorage "get()" to see value has changed from default 0 value
