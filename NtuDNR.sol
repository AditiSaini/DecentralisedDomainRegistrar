pragma solidity ^0.5.16;

contract NtuDNR{
    // ---- Declarations ----

    // *** General section for domain inquiries ***
    mapping (address => string) public domainNames;
    mapping (string => address) public addresses;
    address payable public owner;

    // *** Bidding section ***
    uint _timeBidding = 2 minutes; //change bidding duration here
    uint _revealTime = 10 minutes; //change reveal period here

    struct Bid {
        bytes32 blindBid;
        uint256 deposit;
    }

    address payable public beneficiaryAddress;
    uint256 public endBidding;
    uint256 public endReveal;
    bool public hasEnded;

    mapping(address => Bid) public bid;

    address public topBidder;
    uint public topBid;

    //Allowed withdrawals of previous bids
    mapping(address => uint256) returnsPending;

    event AuctionComplete(address winner, uint256 topBid);

    modifier beforeOnly(uint256 _time) {
        require(now < _time);
        _;
    }
    modifier afterOnly(uint256 _time) {
        require(now > _time);
        _;
    }


    // ---- Functions ----

    constructor () public {
        owner = msg.sender;
        beneficiaryAddress = owner;
        endBidding = now + _timeBidding;
        endReveal = endBidding + _revealTime;
    }

    // *** General functions ***
    /*
    function createDomain(address receiver, string memory inputDomainName) public {

        bool createSuccess = this.searchDomain(inputDomainName); // TO-DO Check validity of input domain
        require(createSuccess, "Your domain has been taken.");
        domainNames[receiver] = inputDomainName; // Map input address to domain
        addresses[inputDomainName] = receiver; // Map domain to input address, assuming each address only has 1 address
    }
*/
    function searchDomain(string memory targetDomain) view public returns (bool success){
        if (addresses[targetDomain] != address(0)) return false; //Check if the domain is registered
        return true;
    }

    function queryDomain(address queryAddress) view public returns (string memory) {
        return domainNames[queryAddress]; // address as key
    }

    // *** Blind Auction functions ***
    function makeBid(bytes32 _blindBid) public payable beforeOnly(endBidding) {
        bid[msg.sender] = (Bid({blindBid: _blindBid, deposit: msg.value}));
    }

    /// Blinded bids are revealed. All invalid bids that were blinded
    /// correctly will be refunded and for every bid except for
    /// the total highest.

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //**** IMPLEMENT THIS WHEN DONE WITH TESTING PHASE ****
    //afterOnly(endBidding) beforeOnly(endReveal)
    function reveal(uint _values, bool _fake, bytes32 _secret) public returns(uint256){
        uint256 refund;
        Bid storage thisBid = bid[msg.sender];
        (uint valueBid, bool bidFake, bytes32 secret) = (
        _values,
        _fake,
        _secret
        );
        bytes32 check = checkHashValue(valueBid, bidFake, secret);
        bytes32 orig = checkOrigHashValue(msg.sender);
        if (orig != check) {
            //Bid was not properly revealed
            //Deposit is not refunded
            return refund;
        }
        refund += thisBid.deposit;
        //Reduce the refund amount for the top bidder by value bidded
        if (!bidFake && thisBid.deposit >= valueBid) {
            if (bidPlace(msg.sender, valueBid)) {
                refund -= valueBid;
            }
        }

        //Prevents sender from reclaiming the same deposit
        thisBid.blindBid = bytes32(0);
        msg.sender.transfer(refund);
        return refund;
    }

    // This function is "internal", meaning that it
    // may only be called from inside the contract itself (or from
    // contracts deriving from it).
    // Checks the bid value and re-verifies the top bidder
    function bidPlace(address bidder, uint valueBid)
    internal
    returns (bool success)
    {
        if (valueBid<= topBid) {
            return false;
        }

        if (topBidder!= address(0)){
            //Refund the previous top bidder
            returnsPending[topBidder] += topBid;
        }
        topBid = valueBid;
        topBidder = bidder;
        return true;
    }

    /// Withdraw an overbid bid.
    function withdrawBid() public {
        uint amount = returnsPending[msg.sender];
        if (amount > 0) {
            // It is crucial that this is set to zero since the recipient
            // can call this function repeatedly as part of the receiving call
            // before `transfer` is returned (see the remark above concerning
            // conditions -> effects -> interaction).
            returnsPending[msg.sender] = 0;
            msg.sender.transfer(amount);
        }
    }

    /// Auction is completed and the top bid is sent
    /// to the beneficiary's address.
    function auctionEnd() public afterOnly(endReveal) {
        require(!hasEnded);

        emit AuctionComplete(topBidder, topBid);
        hasEnded = true;
        beneficiaryAddress.transfer(topBid);
    }

    function viewBidDeposit(address queryAddress) public view returns (uint256 deposit){
        return bid[queryAddress].deposit;
    }

    function viewTopBidder() public view returns(address){
        return topBidder;
    }

    function viewTopBidValue() public view returns (uint){
        return topBid;
    }

    function checkHashValue(uint valueBid, bool bidFake, bytes32 secret) public pure returns (bytes32){
        return keccak256(abi.encodePacked(valueBid, bidFake, secret));
    }

    function checkOrigHashValue(address bidderAddress) public view returns (bytes32){
        Bid storage thisBid = bid[bidderAddress];
        return thisBid.blindBid;
    }

}
