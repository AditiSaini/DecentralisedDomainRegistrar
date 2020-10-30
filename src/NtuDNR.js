import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import artifact from "./NtuDNR.json";
import { useState, useRef, useEffect } from "react";

// *** Declare local addressses ***

const myAddress = "0x184654B0dfe1Cc0290c32Cb564f670F9FF9fe4Bb"; //Change
export const ntuDNRContractAddress = "0x7fbfdfa9B60C691F820F972B4904Ae1A054Bb852"; //Change
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const contract = new web3.eth.Contract(artifact.abi, ntuDNRContractAddress);

// *** Connector functions ***
// Function 1
export const updateDomainTaken = async (targetDomain) => {
   console.log("___123___");
   const result = await contract.methods.searchDomain(targetDomain).call();
   return result;
};

// Function 2
export const makeBid = async (amount) => {
   // Using MetaMask API to send transaction
   //
   // please read: https://docs.metamask.io/guide/ethereum-provider.html#ethereum-provider-api
   console.log("--------");
   const provider = await detectEthereumProvider();
   console.log("123" + provider);
   if (provider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      window.ethereum.request({
         method: "eth_sendTransaction",
         params: [
            {
               from: window.ethereum.selectedAddress,
               to: ntuDNRContractAddress,
               value: web3.utils.toHex(web3.utils.toWei(amount)), // have to convert to hexdemical for big number
               /*data: web3.eth.abi.encodeFunctionCall(
                   {
                      name: "deposit",
                      type: "function",
                      inputs: [],
                   },
                   []
               ),*/ // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall
               //chainId: 1, // ropsten
            },
         ],
      });
   } else {
      console.log("Please install MetaMask!");
   }

};

/*
import detectEthereumProvider from "@metamask/detect-provider";
// NOTE: be aware of this: https://flaviocopes.com/parcel-regeneratorruntime-not-defined/
import Web3 from "web3";

// importing a compiled contract artifact which contains function signature etc. to interact
import artifact from "../build/contracts/Bank.json";

const myAddress = "0xcc6b9a2Ef844002c413d992B980EeB7b08899A10"; // PLEASE CHANGE IT TO YOURS
const infuraWSS = `wss://ropsten.infura.io/ws/v3/dfe7b73d377740b69fefd0ed7a8b104d`; // PLEASE CHANGE IT TO YOURS

export const BankContractAddress = "0xB280Db02eFdb0c940926d7B92F9Fc24aBffaa9C2"; // PLEASE CHANGE IT TO YOURS
export const Testnet = "ropsten"; // PLEASE CHANGE IT TO YOURS

const web3 = new Web3(
    Web3.currentProvider || new Web3.providers.WebsocketProvider(infuraWSS)
);
// doc here: https://web3js.readthedocs.io/en/v1.2.11/web3.html#providers
const contract = new web3.eth.Contract(artifact.abi, BankContractAddress);

export const updateDeposit = async (addr) => {
    // doc here: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-call
    const newBalance = await contract.methods.balance().call({ from: addr });
    return { address: addr, deposit: newBalance };
};


export const newDeposit = async (amount) => {
    // Using MetaMask API to send transaction
    //
    // please read: https://docs.metamask.io/guide/ethereum-provider.html#ethereum-provider-api
    const provider = await detectEthereumProvider();
    if (provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: ethereum.selectedAddress,
                    to: BankContractAddress,
                    value: web3.utils.toHex(web3.utils.toWei(amount)), // have to convert to hexdemical for big number
                    data: web3.eth.abi.encodeFunctionCall(
                        {
                            name: "deposit",
                            type: "function",
                            inputs: [],
                        },
                        []
                    ), // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-abi.html#encodefunctioncall
                    chainId: 3, // ropsten
                },
            ],
        });
    } else {
        console.log("Please install MetaMask!");
    }
};

 */