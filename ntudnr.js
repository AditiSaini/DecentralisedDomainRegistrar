const ntuDNR = artifacts.require("NtuDNR");

contract("NtuDNR Tests", async (accounts) => {
    // accounts are the list of account created by the Truffle (i.e. 10 key pair)
    // by default, the first account will deploy the contract
    it("Should make deployer the owner", async () => {
        let ntudnr = await ntuDNR.deployed(); //
        let owner = await ntudnr.owner(); // call the getter on public state variable, https://solidity.readthedocs.io/en/v0.7.1/contracts.html#getter-functions
        assert.equal(owner, accounts[0]);
    });

    it ("Search for an unregistered domain", async () =>{
        let ntudnr = await ntuDNR.deployed();
        let test_domain = "dnwang.ntu";
        let result = await ntudnr.searchDomain.call(test_domain);
        assert.equal(result,true)

    });
/*
    it("Can create an unregistered domain for an address", async () => {
        let ntudnr = await ntuDNR.deployed();
        let receiver_1 = accounts[1];
        let test_domain = "dnwang.ntu";
        await ntudnr.createDomain(receiver_1,test_domain, {from:accounts[0]});
        let target_domain = await ntudnr.queryDomain.call(receiver_1);
        console.log(target_domain);
        assert.equal(target_domain, test_domain);
    });
*/
    it("Query an empty domain", async () =>{
        let ntudnr = await ntuDNR.deployed();
        let test_addr = accounts[0];
        let result = await ntudnr.queryDomain.call(test_addr);
        assert.equal(result.valueOf(), "");
    });

    it("First user can make a bid", async() =>{
        let ntudnr = await ntuDNR.deployed();
        await ntudnr.makeBid("0xd7146442058b5aadbcc239a52d5989a8369cdfdd83bb31bf88e29893823a7a52",
            {from:accounts[0], value: 5});  // Hash value of 1 ether
        let result = await ntudnr.viewBidDeposit.call(accounts[0]);
        assert.equal(result, 5);
    });

    it("Second user can make a higher bid", async() =>{
        let ntudnr = await ntuDNR.deployed();
        await ntudnr.makeBid("0xbe5cf62c4764fd2cfb9867d4cf56f14b6e14a9c0cf6cfb102ea36f9ba47725c9",
            {from:accounts[1],value:5}); // Hash value of 3 ethers
        let result = await ntudnr.viewBidDeposit.call(accounts[1]);
        assert.equal(result, 5);
    });

    it("First user pass in an invalid value and should not get refund", async() =>{
        let ntudnr = await ntuDNR.deployed();
        let result = await ntudnr.reveal.call(0,false,"0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
            {from: accounts[0]});
        assert.equal(result, 0);
    });

    it ("First user pass in a valid value and check the correct hash value", async() => {
        let ntudnr = await ntuDNR.deployed();
        let result = await ntudnr.checkHashValue.call(1, false, "0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
            {from: accounts[0]});
        assert.equal(result,"0xd7146442058b5aadbcc239a52d5989a8369cdfdd83bb31bf88e29893823a7a52");
    })

    it ("Can return correct blindBid made by user 1", async() =>{
        let ntudnr = await ntuDNR.deployed();
        let result = await ntudnr.checkOrigHashValue.call(accounts[0]);
        assert.equal(result, "0xd7146442058b5aadbcc239a52d5989a8369cdfdd83bb31bf88e29893823a7a52")
    })

    it ("Both users pass in correct values and should return the correct top bid", async() =>{
        let ntudnr = await ntuDNR.deployed();
        let result_0 = await ntudnr.reveal(1,false,"0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
                {from:accounts[0]});
        let result_1 = await ntudnr.reveal(3,false,"0x2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de",
            {from:accounts[1]});
        let result = await ntudnr.viewTopBidValue.call();
        assert.equal(result, 3);

    });

    /*
    it("First user pass in correct values and should return correct refund" , async() =>{
        let ntudnr = await ntuDNR.deployed();
        let result= await ntudnr.reveal(1,false,"0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
            {from:accounts[0]});
        assert.equal(result.valueOf(), "0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6");

    });

        it("can withdraw less than despoited", async () => {
            let bank = await Bank.deployed();
            await bank.deposit({
                from: accounts[0],
                value: web3.utils.toWei("3"),
            });
            await bank.withdraw(web3.utils.toWei("2.9"), { from: accounts[0] });

            let deposited = await bank.balance({ from: accounts[0] });
            assert.equal(deposited.toString(), web3.utils.toWei("0.1"));
        });
    */
});
