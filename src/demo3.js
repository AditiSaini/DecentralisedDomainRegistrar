// This page details the two buttons that will be displayed onclick Bid.
//Add logic, if unavailable, make this button "freeze"
import React, { Component, useState } from "react";
//Need to import two sub-buttons.
import Demo1 from "./demo1"; // To freeze when unavailable.
import Demo4 from "./demo4"; // Make Offer Button
import Demo6 from "./demo6"; // View Outcome Button


class Demo3 extends Component {
    constructor() {
        super();
        this.state = {
            name: "React",
            value : '', //
            showHideInputPrice: false,
            showHideViewOutcome: false,
        };
        this.hideComponent = this.hideComponent.bind(this);
        this.onChange = this.onChange.bind(this); //
        this.add = this.add.bind(this); //

    }
    ///
    add() {
        this.props.onButtonClick(this.state.value);
        this.setState({ value: '' });
    }
    ///
    onChange(e) {
        this.setState({ value: e.target.value });
    }

    hideComponent (name){
        console.log(name);
        switch (name){
            case "showHideInputPrice":
                this.setState({ showHideInputPrice: !this.state.showHideInputPrice });
                break;
            case "showHideViewOutcome":
                this.setState({ showHideViewOutcome: !this.state.showHideViewOutcome });
                break;
        }
    }

    render() {
        const { showHideInputPrice, showHideViewOutcome } = this.state;
        return (
            <div>
                <button onClick={() => this.hideComponent("showHideInputPrice")}>
                    Make Offer
                </button>
                <button onClick = {()=> this.hideComponent("showHideViewOutcome")}>
                    View Outcome
                </button>
                <div>
                    {showHideInputPrice && <Demo4 />}
                    <hr />
                    {showHideViewOutcome && <Demo6 bidStatus={this.props.bidStatus}/>}
                    <hr />
                </div>
            </div>
        );
    }
}

export default Demo3;