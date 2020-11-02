import React, { Component } from "react";

//Make bid button
class Demo4 extends Component {
  render() {
    return (
        <div>
          <h4>This form is to make an offer, enter the price you will offer and your secret value </h4>
            <label>
              <h4>Bid Value</h4>
              <input type="text" placeholder ="Enter Price in ETH" value={this.props.priceOffered} onChange={this.props.handleOfferedPrice} />
            </label>
            <label>
              <h4>Secret</h4>
              <input type="text" placeholder ="Enter your secret (in hex)" value={this.props.secretOffered} onChange={this.props.handleOfferedSecret} />
            </label>
            <button onClick={() => {this.props.makeOffer()}}>
              Make Offer
            </button>
        </div>
    );
  }

}

export default Demo4;