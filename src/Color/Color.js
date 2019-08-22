import React, { Component } from "react";
import "./Color.scss";

class Color extends Component {
  state = {
    hex: "",
    locked: false
  };

  toggleLock = () => {
    this.setState({ locked: !this.state.locked });
  };

  render() {
    const classString = `color-${this.state.locked && "locked"}`;
    const lockedStatus = classString === "card-locked" ? "Unlock" : "Lock";

    return (
      <article style={{ "backgroundColor": `#${this.props.hex}` }}>
        <p>COLOR!!!!!!!</p>
        <button className={classString} onClick={() => this.toggleLock}>
          {lockedStatus}
        </button>
      </article>
    );
  }
}

export default Color;
