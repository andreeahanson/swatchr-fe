import React, { Component } from "react";
import "./Color.scss";

class Color extends Component {
  state = {
    // hex: "",
    locked: false
  };

  toggleLock = async (e) => {
    e.preventDefault();
    await this.setState({ locked: !this.state.locked });
    const colorObj = {
      hex: this.props.hex,
      locked: this.state.locked
    }
    this.props.toggleLockedColor(colorObj)
  };

  render() {
    const classString = `color-${this.state.locked && "locked"}`;
    const lockedStatus = classString === "card-locked" ? "Unlock" : "Lock";

    return (
      <article className="color" style={{ "backgroundColor": `#${this.props.hex}` }}>
        <p>#{this.props.hex}</p>
        <button className={`lock-btn ${classString}`} onClick={this.toggleLock}>
          {lockedStatus}
        </button>
      </article>
    );
  }
}

export default Color;