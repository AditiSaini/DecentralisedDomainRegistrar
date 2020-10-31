import React, { Component } from "react";
// Details Button
// Need to pull value from Availability button (demo1) for Availability.
// Need to call mapping function queryAddresses to check for address under "Owned By".


class Demo2 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return <div>
      <h4><b>Owned By: </b></h4>
      {this.props.topBidder}
      <button className= ".sendetherbutton">Send ETH to address </button>
    </div>;
  }
}

export default Demo2;