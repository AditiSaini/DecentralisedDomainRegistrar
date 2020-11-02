import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import artifact from "./NtuDNR.json";

// *** Declare local addressses ***

export const ntuDNRContractAddress = "0x084A2C96E6Cd9d8bf4fE7b9B69FF60C2d7758620"; //Change :local from migrate
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); //change: local change to HTTP
const contract = new web3.eth.Contract(artifact.abi, ntuDNRContractAddress);

// *** Connector functions ***

// Function 1
export const updateDomainTaken = async (targetDomain) => {
   console.log("Running contract...");
   console.log(contract);
   const result = await contract.methods.searchDomain(targetDomain).call();
   return result;
};

// Function 2
export const makeBid = async (deposit,targetDomain, hashBid) => {
   const provider = await detectEthereumProvider();
   let ethereum = window.ethereum;
   await ethereum.request({ method: 'eth_requestAccounts' });
   if (provider) {
      console.log("sending transactions...");

      await ethereum.request({
         method: "eth_sendTransaction",
         params: [
            {
               from: ethereum.selectedAddress,
               to: ntuDNRContractAddress,
               value: web3.utils.toHex(web3.utils.toWei(deposit)),
               data: web3.eth.abi.encodeFunctionCall(
                   {
                      name: "makeBid",
                      type: "function",
                      inputs: [
                         {
                            type: "string",
                            name: "targetDomain",
                         },
                         {
                            type: "bytes32",
                            name: "_blindBid",
                         },
                      ],
                   },
                   [
                       targetDomain,
                       hashBid,
                   ]
               ),
            },
         ],
      }).then((result) => {
            console.log(result);
         // The result varies by by RPC method.
         // For example, this method will return a transaction hash hexadecimal string on success.
      })
          .catch((error) => {
            console.log(error);
          });
      }
   else {
      console.log("Please install MetaMask!");
   }

};

//function 3
export const viewOutcome = async (targetDomain,claimedValue,claimedSecret) => {
    console.log("Revealing transaction...");
    const provider = await detectEthereumProvider();
    let ethereum = window.ethereum;
    await ethereum.request({ method: 'eth_requestAccounts' });
    try {
        console.log("Deposit/ Checked value/ Orig value:");
        console.log(await contract.methods.viewBidDeposit(targetDomain,ethereum.selectedAddress).call());
        console.log(await contract.methods.checkHashValue(claimedValue, false, claimedSecret).call());
        console.log(await contract.methods.checkOrigHashValue(ethereum.selectedAddress,targetDomain).call());
        await contract.methods.reveal(targetDomain,claimedValue,false,claimedSecret).send({from: ethereum.selectedAddress,gas: 6721975, gasPrice: '300000000'});
        console.log(await contract.methods.viewTopBidder().call());

    }
    catch (error){
        console.log(error);
    }

    //const result = await contract.methods.searchDomain(web3.eth.abi.encodeParameter(string, targetDomain)).call();
};

//function 4
export const hashInputSecret = async(input, secret) =>{
    const result = await contract.methods.checkHashValue(input, false, secret).call();
    return result;
}

//Function 5
export const viewTopBidder = async () => {
    console.log("___Top bidder results___");
    const topBidder = await contract.methods.viewTopBidder().call();
    console.log(topBidder)
    return topBidder;
}

//Function 6
export const updateBidStatus = async () => {
    const provider = await detectEthereumProvider();
    let ethereum = window.ethereum;
    let currentAddress=web3.utils.toChecksumAddress(ethereum.selectedAddress);
    console.log("___Update bid status___"+currentAddress);
    const bidStatus = await contract.methods.viewBidStatus(currentAddress).call();
    console.log(bidStatus)
    return bidStatus;
}
//Function 7
export const viewDomainOfAddress = async (targetAddress) => {
    const result = await contract.methods.viewDomainOfAddress(targetAddress).call();
    return result;
}
//function 8
export const sendEtherToAddress = async (amount,recipient) => {
    const provider = await detectEthereumProvider();
    let ethereum = window.ethereum;
    console.log("from:"+ethereum.selectedAddress);
    console.log(amount+"ethers");
    console.log("to:"+recipient);
    await ethereum.request({ method: 'eth_requestAccounts' });
    if (provider) {
        console.log("sending transactions to top bidder address..");

        await ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: recipient,
                    value: web3.utils.toHex(web3.utils.toWei(amount)),
                },
            ],
        }).then((result) => {
            console.log(result);
            // The result varies by by RPC method.
            // For example, this method will return a transaction hash hexadecimal string on success.
        })
            .catch((error) => {
                console.log(error);
            });
    }
    else {
        console.log("Please install MetaMask!");
    }
}
