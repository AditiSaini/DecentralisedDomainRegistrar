// This is the file that takes care of Search alone, and simply displays buttons for other functionalities.
import React, { Component } from "react";
import Demo1 from "./demo1"; // Availability Button
import Demo2 from "./demo2"; // Details Button
import Demo3 from "./demo3"; // Bid Button
import {
    updateDomainTaken,
    makeBid,
    viewOutcome,
    hashInputSecret,
    viewTopBidder,
    updateBidStatus,
    viewDomainOfAddress,
    sendEtherToAddress,
} from "./NtuDNR";

class Search extends Component {
    constructor() {
        super();
        this.state ={
            names: [
                'ntulearn',
                'intu123',
                'blockchain',
                '4153'
            ],
            searchTerm: '',
            name: "React",
            showHideAvailability: false,
            showHideDetails: false,
            showHideBid: false,
            domainTaken: "Please input a domain",
            matchedNames: [],
            showHideDomainRelated: false,
            showHideAddressRelated:false,
            showHideInputPrice: false,
            showHideViewOutcome: false,
            showHideBidStatus: false,
            addressToDomain: "",
            priceOffered:"",
            fakePriceOffered: "",
            secretOffered:"",
            claimedPrice:"",
            claimedSecret:"",
            bidStatus:"",
            topBidder: "xxxxxxxxx",
            amountForTopBidder: "",
        }

        this.editSearchTerm = this.editSearchTerm.bind(this);
        this.dynamicSearch = this.dynamicSearch.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddressClick = this.handleAddressClick.bind(this);
        this.hideComponent = this.hideComponent.bind(this);
        this.updateDomainTaken = this.updateDomainTaken.bind(this);
        this.makeOffer = this.makeOffer.bind(this);
        this.handleClaimedPrice = this.handleClaimedPrice.bind(this);
        this.handleClaimedSecret = this.handleClaimedSecret.bind(this);
        this.handleOfferedPrice = this.handleOfferedPrice.bind(this);
        this.handleOfferedSecret = this.handleOfferedSecret.bind(this);
        this.sendEtherToAddress = this.sendEtherToAddress.bind(this);
        this.editAmountForTopBidder = this.editAmountForTopBidder.bind(this);
    }

    //___FUNCTIONS___
    makeOffer = async() =>{ // """Need hash value function over here"""
        const hashBid = await hashInputSecret(this.state.priceOffered, this.state.secretOffered);
        console.log(hashBid);
        await makeBid(this.state.fakePriceOffered,this.state.searchTerm, hashBid);
    }

    viewBidOutcome = async() =>{
        await viewOutcome(this.state.searchTerm,this.state.claimedPrice, this.state.claimedSecret);
    }

    editSearchTerm = (e) =>
    {
        this.setState({searchTerm:e.target.value});
    }

    editAmountForTopBidder = (e) =>
    {
        this.setState({amountForTopBidder: e.target.value});
    }

    dynamicSearch = () => {
        return this.state.names.filter(names=>names.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    hideComponent(name){
        console.log(name);
        switch (name){
            case "showHideInputPrice":
                this.setState({ showHideInputPrice: !this.state.showHideInputPrice });
                break;
            case "showHideViewOutcome":
                this.setState({ showHideViewOutcome: !this.state.showHideViewOutcome });
                if(!this.state.showHideViewOutcome){this.setState({showHideBidStatus: false})};
                break;
            case "showHideAvailability":
                this.setState({ showHideAvailability: !this.state.showHideAvailability });
                break;
            case "showHideDetails":
                this.setState({ showHideDetails: !this.state.showHideDetails });
                break;
            case "showHideBid":
                this.setState({ showHideBid: !this.state.showHideBid });
                break;

        }
    }

    updateDomainTaken = async() =>{
        let targetDomain = this.state.searchTerm;
        let result = await updateDomainTaken(targetDomain);
        //console.log(result);
        if (result == true) {this.setState({domainTaken: "This domain is available"})}
        else{this.setState({domainTaken: "This domain has been taken"})}
        //await makeBid("0.0001",this.state.searchTerm,"0xd7146442058b5aadbcc239a52d5989a8369cdfdd83bb31bf88e29893823a7a52");
    } // to be implemented with the back end

    viewTopBidder = async() => {
        let topBidder = await viewTopBidder(); 
        if (topBidder!= "0x0000000000000000000000000000000000000000"){
            this.setState({topBidder});
        }
        console.log("Top bidder function outputs: " + topBidder);
    }

    viewBidStatus = async() => {
        this.setState({showHideBidStatus: true})
        let bidStatus = await updateBidStatus();
        let result;
        if (bidStatus==true) {
            result = "You Won"
        } else {
            result = "You Lost"
        }
        this.setState({bidStatus: result});
    }

    sendEtherToAddress = async() => {
        await sendEtherToAddress(this.state.amountForTopBidder,this.state.topBidder);
    }

    handleClick = async() =>{
        this.setState({matchedNames: await this.dynamicSearch()});
        if (this.state.searchTerm==""){}
        else {if (!this.state.showHideDomainRelated) {this.setState({showHideDomainRelated: !this.state.showHideDomainRelated})}}
    }
    handleAddressClick = async() =>{
        this.setState({showHideDomainRelated: false});
        this.setState({showHideAddressRelated: !this.state.showHideAddressRelated});
        // Implement back-end address to domain here
        if (this.state.searchTerm != ""){
            let result = await viewDomainOfAddress(this.state.searchTerm);
            this.setState({addressToDomain: result});
        }
    }

    handleClaimedPrice = (e) =>
    {
        this.setState({claimedPrice: e.target.value});
    }
    handleClaimedSecret = (e) =>
    {
        this.setState({claimedSecret: e.target.value});
    }

    handleFakePrice = (e) => {
        console.log("::::::Handling fake price: " + e.target.value+ "::::::"); 
        this.setState({fakePriceOffered: e.target.value});
    }

    handleOfferedPrice = (e) =>
    {
        this.setState({priceOffered: e.target.value});
    }

    handleOfferedSecret = (e) =>
    {
        this.setState({secretOffered:e.target.value});
    }


    render() {
        return(
            <div>
                <header></header>
                <h1> Find a ".ntu" domain that works for you! </h1>
                <input type="text" value = {this.state.searchTerm} onChange = {this.editSearchTerm} placeholder ="Search for domain name/address"/>
                <br></br>
                <button onClick = {this.handleClick} >Search Domain</button>
                <button onClick = {this.handleAddressClick} > Search Address </button> {/*queryAddress function*/}
                {(!this.state.showHideDomainRelated)&&(!this.state.showHideAddressRelated)&&<h4>Enter to search domain/address</h4>}
                {(this.state.showHideAddressRelated)&& <h4>Resolved domain for this address: "{this.state.addressToDomain}.ntu"</h4>}
                {this.state.showHideDomainRelated && <NameContainer names = {this.state.matchedNames}/>}
                {this.state.showHideDomainRelated &&
                <Demo
                    hideComponent={this.hideComponent}
                    updateDomainTaken={this.updateDomainTaken}
                    domainTaken={this.state.domainTaken}
                    targetDomain={this.state.searchTerm}
                    showHideAvailability={this.state.showHideAvailability}
                    showHideDetails={this.state.showHideDetails}
                    showHideBid={this.state.showHideBid}
                    makeOffer = {this.makeOffer}
                    handleClaimedPrice = {this.handleClaimedPrice}
                    handleClaimedSecret = {this.handleClaimedSecret}
                    handleOfferedPrice = {this.handleOfferedPrice}
                    handleFakePrice = {this.handleFakePrice}
                    fakePriceOffered = {this.state.fakePriceOffered}
                    handleOfferedSecret = {this.handleOfferedSecret}
                    viewBidOutcome = {this.viewBidOutcome}
                    bidStatus = {this.state.bidStatus}
                    showHideInputPrice = {this.state.showHideInputPrice}
                    showHideViewOutcome= {this.state.showHideViewOutcome}
                    priceOffered = {this.state.priceOffered}
                    secretOffered = {this.state.secretOffered}
                    viewBidStatus={this.viewBidStatus}
                    viewTopBidder={this.viewTopBidder}
                    topBidder={this.state.topBidder}
                    showHideBidStatus = {this.state.showHideBidStatus}
                    sendEtherToAddress = {this.sendEtherToAddress}
                    amountForTopBidder = {this.state.amountForTopBidder}
                    editAmountForTopBidder={this.editAmountForTopBidder}
                />
                }
            </div>
        );

    }
}


class Name extends Component {
    render () {
        return (
            <div>{this.props.name}</div>
        )
    }
}

class NameContainer extends Component {
    render () {
        return (
            <div>
                <h4>Here are your matches (.ntu):</h4>
                {this.props.names.map(name=> <Name name = {name}/>)}
            </div>
        )
    }
}

class Demo extends Component {
    render() {
        return (
            <div>
                <button onClick={() => {this.props.updateDomainTaken();this.props.hideComponent("showHideAvailability")}}>
                    Availability
                </button>
                <button onClick={() => {this.props.viewTopBidder(); this.props.hideComponent("showHideDetails")}}>
                    Details
                </button>
                <button onClick={() => this.props.hideComponent("showHideBid")}>
                    Bid
                </button>
                {this.props.showHideAvailability && <Demo1 domainTaken={this.props.domainTaken}/>}
                <hr />
                {this.props.showHideDetails && <Demo2
                    topBidder={this.props.topBidder}
                    sendEtherToAddress={this.props.sendEtherToAddress}
                    amountForTopBidder = {this.props.amountForTopBidder}
                    editAmountForTopBidder = {this.props.editAmountForTopBidder}
                />}
                <hr />
                {this.props.showHideBid && <Demo3
                    targetDomain = {this.props.targetDomain}
                    makeOffer = {this.props.makeOffer}
                    handleClaimedPrice = {this.props.handleClaimedPrice}
                    handleClaimedSecret = {this.props.handleClaimedSecret}
                    handleOfferedPrice = {this.props.handleOfferedPrice}
                    handleOfferedSecret = {this.props.handleOfferedSecret}
                    viewBidOutcome = {this.props.viewBidOutcome}
                    bidStatus = {this.props.bidStatus}
                    showHideInputPrice = {this.props.showHideInputPrice}
                    showHideViewOutcome={this.props.showHideViewOutcome}
                    hideComponent = {this.props.hideComponent}
                    priceOffered = {this.props.priceOffered}
                    handleFakePrice = {this.props.handleFakePrice}
                    fakePriceOffered = {this.props.fakePriceOffered}
                    secretOffered = {this.props.secretOffered}
                    viewBidStatus={this.props.viewBidStatus}
                    showHideBidStatus = {this.props.showHideBidStatus}
                />}
                <hr />
            </div>
        );
    }
}

//render(<Demo />, document.getElementById("root"));



export default Search;
