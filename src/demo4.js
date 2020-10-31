import React, { Component } from "react";
// Make an Offer Button.
// goes into makebid on backend
// outcome comes from "viewtopbidder function" : show address of who won, don't disclose value
class Demo4 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
        <div>
          <h4>This form is to make an offer, enter the price you will offer and your secret value </h4>
          <form onSubmit={this.handleSubmit}>
            <label>
              <h4>Bid Value</h4>
              <input type="text" pattern = "/^\d{1,}(\.\d{0,4})?$/)" placeholder ="Enter Price in ETH" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
              <h4>Secret</h4>
              <input type="Uint32" pattern ="/^[5KL][1-9A-HJ-NP-Za-km-z]{50,51}$/" placeholder ="32byte Hex Value" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button onClick = {this.handleSubmit}>Submit</button>
          </form>
        </div>
    );
  }
}

export default Demo4;