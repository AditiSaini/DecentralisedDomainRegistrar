// This page details the two buttons that will be displayed onclick Bid.
//Add logic, if unavailable, make this button "freeze"
import React, { Component, useState } from "react";
import Demo4 from "./demo4"; // Make Offer Button
import Demo6 from "./demo6"; // View Outcome Button


class Demo3 extends Component {
    render() {
        const showHideInputPrice = this.props.showHideInputPrice;
        const showHideViewOutcome= this.props.showHideViewOutcome;
        return (
            <div>
                <button onClick={() => this.props.hideComponent("showHideInputPrice")}>
                    Make Offer
                </button>
                <button onClick = {()=> this.props.hideComponent("showHideViewOutcome")}>
                    View Outcome
                </button>
                <div>
                    {showHideInputPrice && <Demo4
                        makeOffer = {this.props.makeOffer}
                        priceOffered = {this.props.priceOffered}
                        secretOffered={ this.props.secretOffered}
                        handleOfferedPrice = {this.props.handleOfferedPrice}
                        handleOfferedSecret = {this.props.handleOfferedSecret}
                        handleFakePrice = {this.props.handleFakePrice}
                        fakePriceOffered = {this.props.fakePriceOffered}
                    />}
                    <hr />
                    {showHideViewOutcome && <Demo6
                        handleClaimedPrice = {this.props.handleClaimedPrice}
                        handleClaimedSecret = {this.props.handleClaimedSecret}
                        viewBidOutcome = {this.props.viewBidOutcome}
                        bidStatus = {this.props.bidStatus}
                        priceOffered = {this.props.priceOffered}
                        secretOffered = {this.props.secretOffered}
                        viewBidStatus={this.props.viewBidStatus}
                        showHideBidStatus = {this.props.showHideBidStatus}
                    />}
                    <hr />
                </div>
            </div>
        );
    }
}

export default Demo3;