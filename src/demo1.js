import React, { Component } from "react";
// Availiability Button
// Need to call value from Search.js to see if there is a match under isDomainRegistered.
class Demo1 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    //const {showHideAvailability} = this.props.showHideAvailability;
    //return <>{showHideAvailability && <div><h4><b>Availiability: {this.props.availability}</b></h4></div>}</>
    return <div><h4><b>Availability: {this.props.domainTaken}</b></h4></div>
  }
}

export default Demo1;