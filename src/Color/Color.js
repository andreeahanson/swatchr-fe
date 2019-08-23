import React, { Component } from "react";
import "./Color.scss";

class Color extends Component {
  state = {
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
    return (
      <article
        className="color"
        style={{ backgroundColor: `#${this.props.hex}` }}
      >
        <p>#{this.props.hex}</p>
        {this.state.locked && (
          <img
            onClick={this.toggleLock}
            className="lock-icon"
            src="./lock.svg"
            alt="unlocked padlock icon"
          />
        )}
        {!this.state.locked && (
          <img
            onClick={this.toggleLock}
            className="lock-icon"
            src="./unlock.svg"
            alt="locked padlock icon"
          />
        )}
      </article>
    );
  }
}

export default Color;