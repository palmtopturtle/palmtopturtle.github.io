import React from "react";
import styles from "./accordion.module.scss";

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      maxHeight: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleClick() {
    this.setState({
      isOpened: !this.state.isOpened,
      maxHeight: this.divElement.scrollHeight
    });
  }

  handleResize() {
    if (this.state.maxHeight !== this.divElement.scrollHeight) {
      this.setState({ maxHeight: this.divElement.scrollHeight });
    }
  }

  render() {
    const bodyStyles = {
      maxHeight: this.state.isOpened ? this.state.maxHeight : 0,
      overflow: "hidden"
    };

    return (
      <div className={styles["accordion-container"]}>
        <button
          onClick={this.handleClick}
          className={this.state.isOpened ? [styles.header, styles.active].join(" ") : styles.header}
          input="button"
        >
          {this.props.header}
        </button>
        <div
          ref={divElement => (this.divElement = divElement)}
          style={bodyStyles}
          className={styles.body}
          onTransitionEnd={this.handleResize}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Accordion;
