const ntuDNR = artifacts.require("NtuDNR");

contract("NtuDNR Tests", async (accounts) => {
    // accounts are the list of account created by the Truffle (i.e. 10 key pair)
    // by default, the first account will deploy the contract
    it("Should make deployer the owner", async () => {
        let ntudnr = await ntuDNR.deployed(); //
        let owner = await ntudnr.owner(); // call the getter on public state variable, https://solidity.readthedocs.io/en/v0.7.1/contracts.html#getter-functions
        assert.equal(owner, accounts[0]);
    });

    it ("Search for an unregistered domain and should return nothing", async () =>{
        let ntudnr = await ntuDNR.deployed();
        let test_domain = "dnwang.ntu";
        let result = await ntudnr.searchDomain.call(test_domain);
        assert.equal(result,true)

    });

    it("Query an empty domain and should return empty string", async () =>{
        let ntudnr = await ntuDNR.deployed();
        let test_addr = accounts[0];
        let result = await ntudnr.queryDomain.call(test_addr);
        assert.equal(result.valueOf(), "");
    });

    it("First user can make a bid", async() =>{
        let ntudnr = await ntuDNR.deployed();
        let domain = "dnwang.ntu";
        let bidValue = await ntudnr.valueInWei.call(5);
        await ntudnr.makeBid(domain, "0xd7146442058b5aadbcc239a52d5989a8369cdfdd83bb31bf88e29893823a7a52",
            {from:accounts[0], value: bidValue});  // Hash value of 1 ether
        let result = await ntudnr.viewBidDeposit.call(domain, accounts[0]);
        assert.equal(result, 5*(10**18));
    });

    it("Second user can make a higher bid for the same domain", async() =>{
        let ntudnr = await ntuDNR.deployed();
        let domain = "dnwang.ntu";
        let bidValue = await ntudnr.valueInWei.call(5);
        await ntudnr.makeBid(domain, "0xbe5cf62c4764fd2cfb9867d4cf56f14b6e14a9c0cf6cfb102ea36f9ba47725c9",
            {from:accounts[1],value:bidValue}); // Hash value of 3 ethers
        let result = await ntudnr.viewBidDeposit.call(domain,accounts[1]);
        assert.equal(result, 5*(10**18));
    });

    it ("First user pass in a valid value and he should be authenticated", async() => {
        let ntudnr = await ntuDNR.deployed();
        let domain = "dnwang.ntu";
        let result = await ntudnr.checkHashValue.call(1, false, "0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
            {from: accounts[0]});
        let originalHash = await ntudnr.checkOrigHashValue.call(accounts[0],domain);
        assert.equal(result,originalHash);
    });

    it ("Can return correct blindBid made by user 1", async() =>{
        let ntudnr = await ntuDNR.deployed();
        let domain = "dnwang.ntu";
        let result = await ntudnr.checkOrigHashValue.call(accounts[0],domain);
        assert.equal(result, "0xd7146442058b5aadbcc239a52d5989a8369cdfdd83bb31bf88e29893823a7a52")
    })

    it ("Both users pass in correct values and should return the correct top bid", async() =>{
        let ntudnr = await ntuDNR.deployed();
        let domain = "dnwang.ntu";
        await ntudnr.reveal(domain,1,false,"0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
                {from:accounts[0]});
        await ntudnr.reveal(domain,3,false,"0x2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de",
            {from:accounts[1]});
        let result = await ntudnr.viewTopBidValue.call();
        assert.equal(result, 3*(10**18));

    });

    it ("Able to query the correct top bid address from a domain name", async() =>{
        let ntudnr = await ntuDNR.deployed();
        let domain = "dnwang.ntu";
        let result = await ntudnr.queryAddress.call(domain);
        assert.equal(result,accounts[1]);
    });

    it ("Domain should belong to user 2", async() =>{
        let ntudnr = await ntuDNR.deployed();
        let domain = "dnwang.ntu";
        let result = await ntudnr.viewDomainOfAddress.call(accounts[1]);
        assert.equal(result,domain);
    });

});
