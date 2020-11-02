*********Pre-requisite installations*********

- node v8.9.4 or later: 
https://nodejs.org/en/

- npm or yarn (you can test by running npm -v or yarn -v): https://www.npmjs.com/get-npm

- MetaMask Extension (leave at setup page):
https://metamask.io/download.html

- truffle:
In project terminal, run $npm install truffle -g

*********Run the project*********

_______Part 1: Compile and Migrate_______

1. In the project terminal, run $truffle compile
2. Copy build/contracts/NtuDNR.json to /src (replace the original one)
3. Open Ganache, and set “new workspace”with following parameters:
WORKSPACE NAME: Dadika
TRUFFLE PROJECTS (add project): path to Dadika/truffle-config.js
4. Save workspace
5. In the same project terminal, run “truffle migrate”
6. Copy the contract address of "NtuDNR" and paste it to src/NtuDNR.js “ntuDNRContractAddress” (line 7) and save

_______Part 2: Set up Metamask_______

1. Open metamask, choose "Import Wallet"
2. Copy the seed phrase on the Ganache Mnemonic to "seed phrase" field in Metamask
4. Set your password and click "Import"
5. From metamask network button, choose “custom RPC”
6. Set the Network Name to be “ganache”,  Network ID (http://xxxxx) to be RPC Server from Ganache Accounts page (e.g. http://127.0.0.1:7545)
7. Save and in metamask to browser. 

_______Part 3: Start Localhost_______

1. In the same terminal, run $npm install react-scripts
2. In the same terminal, run $npm start
3. Go to the browser and key in "http://localhost:3000" and you should see the webapp coming up!

_______Notes_______

1. You can import accounts from Ganache using private keys for testing purposes.
2. You can choose a domain name from 'ntulearn', 'intu123', 'blockchain',
'CZ4153' for testing
3. Under Bid section, "Secret" field can only allow input starting with "0x"
4. When "Searching Address", the search input box must be an address