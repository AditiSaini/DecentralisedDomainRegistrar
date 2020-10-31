import React, { Component } from "react";
import Demo1 from "./demo1";

// View Outcome button
// Add (maybe) : hash value, isfake, and other params.
class Demo6 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return <div>
      <h4>This form is to view the outcome of your bid, enter the price you offered and your secret value </h4>
      <form onSubmit={this.handleSubmit}>
        <label>
          <h4>Price offered</h4>
          <input type="text" pattern = "/^\d{1,}(\.\d{0,4})?$/)" placeholder ="Enter Price in ETH" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          <h4>Secret</h4>
          <input type="Uint32"  pattern ="/^[5KL][1-9A-HJ-NP-Za-km-z]{50,51}$/" placeholder ="32bytes Hex value" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button onClick = {this.handleSubmit}>Submit</button>
      </form>
      <h4><b>Bid Status: {this.props.bidStatus}</b></h4> 


      {/* bid status can be : Bid Won, Bid Still Underprocess*/}
      {/* if won: display text:
        <h6> Send "input bid price" to ETH address to confirm domain.</h6>}
      then update status to domain successfully registered.*/}
    </div>
  }
}

export default Demo6;