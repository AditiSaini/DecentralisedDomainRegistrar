import React, { Component } from "react";

// View Outcome button
class Demo6 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React", 
      submit: false
    };
  }

  handleSubmit = () => {
    window.alert("Reveal successful!"); 
  }

  render() {
    return <div>
      <h4>This form is to view the outcome of your bid, enter the price you offered and your secret value </h4>
        <label>
          <h4>Price offered</h4>
          <input type="text"  placeholder ="Enter Price in ETH" value={this.state.value} onChange={this.props.handleClaimedPrice} />
        </label>
        <label>
          <h4>Secret</h4>
          <input type="text" placeholder ="Enter your secret (in hex)" value={this.state.value} onChange={this.props.handleClaimedSecret} />
        </label>
        <button onClick = {() => {this.handleSubmit(); this.props.viewBidOutcome()}}> Submit</button>
        <button onClick = {() => {this.props.viewBidStatus()}}> View Bid Status</button>
      <h4><b>Bid Status:</b></h4>
      {this.props.showHideBidStatus && <h4><b>{this.props.bidStatus} </b></h4>}
    </div>
  }
}
// pattern = "/^\d{1,}(\.\d{0,4})?$/)"
//Uint32"  pattern ="/^[5KL][1-9A-HJ-NP-Za-km-z]{50,51}$/"
export default Demo6;