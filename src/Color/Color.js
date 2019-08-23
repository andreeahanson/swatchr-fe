import React, { Component } from "react";
import "./Color.scss";

class Color extends Component {
  state = {
    // hex: "",
    locked: false
  };

  toggleLock = () => {
    this.setState({ locked: !this.state.locked });
  };

  render() {
    const classString = `color-${this.state.locked && "locked"}`;
    const lockedStatus = classString === "card-locked" ? "Unlock" : "Lock";

    return (
      <article className="color" style={{ "backgroundColor": `#${this.props.hex}` }}>
        <p>#{this.props.hex}</p>
        <button className={`lock-btn ${classString}`} onClick={() => this.toggleLock}>
          {lockedStatus}
        </button>
      </article>
    );
  }
}

export default Color;