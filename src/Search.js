// This is the file that takes care of Search alone, and simply displays buttons for other functionalities.
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { detailsdata } from "./NameDetails"; // t
//Demo files are each to detail functionality of each button.
import Demo1 from "./demo1"; // Availability Button
import Demo2 from "./demo2"; // Details Button
import Demo3 from "./demo3"; // Bid Button
import { render } from '@testing-library/react';
import {
    updateDomainTaken,
    makeBid,
    viewTopBidder, 
    updateBidStatus
} from "./NtuDNR";

// Section that searches are made.
class Search extends Component {
    constructor() {
        super();
        this.state = {
            //currently using a fixed list of names (this is going to be changed)
            //this is where we will call the true/false "isdomainregistered" function.
            names: [
                'dnwang',
                'krithika',
                'aditi',
                'dadika'
            ],
            searchTerm: '',
            name: "React",
            showHideAvailability: false,
            showHideDetails: false,
            showHideBid: false,
            domainTaken: "Please input a domain",
            matchedNames: [],
            showHideDomainRelated: true,
            addressToDomain: "",
            topBidder: "xxxxxxxxx", 
            bidStatus: ""
        }

        this.editSearchTerm = this.editSearchTerm.bind(this);
        this.dynamicSearch = this.dynamicSearch.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddressClick = this.handleAddressClick.bind(this);
        this.hideComponent = this.hideComponent.bind(this);
        this.updateDomainTaken = this.updateDomainTaken.bind(this);
    }

    editSearchTerm = (e) =>
    {
        this.setState({searchTerm:e.target.value})
    }

    dynamicSearch = () => {
        return this.state.names.filter(names=>names.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    hideComponent(name){
        console.log(name);
        switch (name){
            case "showHideAvailability":
                this.setState({ showHideAvailability: !this.state.showHideAvailability });
                break;
            case "showHideDetails":
                this.setState({ showHideDetails: !this.state.showHideDetails });
                break;
            case "showHideBid":
                console.log("Bidding...")
                this.setState({ showHideBid: !this.state.showHideBid });
                break;
        }
    }

    updateDomainTaken = async() =>{
        let targetDomain = this.state.searchTerm;
        let result = await updateDomainTaken(targetDomain);
        if (result == true) {this.setState({domainTaken: "This domain is available"})}
        else{this.setState({domainTaken: "This domain has been taken"})}

        // await makeBid("1");
    } // to be implemented with the back end

    viewTopBidder = async() => {
        let topBidder = await viewTopBidder(); 
        if (topBidder!= "0x0000000000000000000000000000000000000000"){
            this.setState({topBidder});
        }
        console.log("Top bidder function outputs: " + topBidder);
    }

    viewBidStatus = async() => {
        let bidStatus = await updateBidStatus(); 
        let result;
        if (bidStatus==true) {
            result = "Won"
        } else {
            result = "Lost"
        }
        this.setState({bidStatus: result}); 
        console.log("Bid status: " + result);
    }

    handleClick = async() =>{
        this.setState({matchedNames: await this.dynamicSearch()});
        if (!this.state.showHideDomainRelated) {this.setState({showHideDomainRelated: !this.state.showHideDomainRelated})}
    }
    handleAddressClick (){
        if (this.state.showHideDomainRelated) {this.setState({showHideDomainRelated: !this.state.showHideDomainRelated})};
        // Implement back-end address to domain here
        this.setState({addressToDomain: "dnwang.ntu"});
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
                {(!this.state.showHideDomainRelated)&& <h4>Resolved domain name: {this.state.addressToDomain}</h4>}
                {this.state.showHideDomainRelated && <NameContainer names = {this.state.matchedNames}/>}
                {this.state.showHideDomainRelated &&
                <Demo
                    hideComponent={this.hideComponent}
                    updateDomainTaken={this.updateDomainTaken}
                    viewTopBidder={this.viewTopBidder}
                    topBidder={this.state.topBidder}
                    domainTaken={this.state.domainTaken}
                    viewBidStatus={this.viewBidStatus}
                    bidStatus={this.state.bidStatus}
                    targetDomain={this.state.searchTerm}
                    showHideAvailability={this.state.showHideAvailability}
                    showHideDetails={this.state.showHideDetails}
                    showHideBid={this.state.showHideBid}
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

// Suggestions for search and match.
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

// Button Options Container : Availability, Details and Bid (Layer 1)
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
                <button onClick = {()=> {this.props.viewBidStatus(); this.props.hideComponent("showHideBid")}}>
                    Bid
                </button>
                {this.props.showHideAvailability && <Demo1 domainTaken={this.props.domainTaken}/>}
                <hr />
                {this.props.showHideDetails && <Demo2 topBidder={this.props.topBidder}/>}
                <hr />
                {this.props.showHideBid && <Demo3 bidStatus={this.props.bidStatus}/>}
                <hr />
            </div>
        );
    }
}

//render(<Demo />, document.getElementById("root"));



export default Search;
