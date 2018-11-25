import React from "react";
import Starfield from "./Starfield";
import styles from "./starfield.module.scss";

class StarfieldAnimation extends React.Component {
  constructor() {
    super();
    this.state = {
      starsData: [],
      numStars: Math.floor(window.innerWidth / 15),
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.updateAnimation = this.updateAnimation.bind(this);
  }

  componentDidMount() {
    this.createStarsData();
    this.animate = requestAnimationFrame(this.updateAnimation);
  }

  componentWillUnmount() {
    this.animate = cancelAnimationFrame();
  }

  setWidth = () => {
    this.setState({
      width: window.innerWidth
    });
  };

  setHeight = () => {
    this.setState({
      height: window.innerHeight
    });
  };

  setNumStars = () => {
    this.setState({ numStars: Math.floor(window.innerWidth / 15) });
  };

  createStarsData = () => {
    let _starsData = [];

    /* Create "star" objects that have their own properties for drawing onto canvas */
    for (let i = 0; i < this.state.numStars; i++) {
      let star = {
        x: this.random(25, this.state.width - 25),
        y: this.random(25, this.state.height - 25),
        r: this.random(1, 3),
        color: `hsla(${Math.floor(this.random(0, 360))},90%,95%,${this.random(
          0.8,
          0.9
        )})`,
        rScale: this.random(0.005, 0.01) //How fast the radius changes during animation
      };
      _starsData.push(star);
    }
    this.setState({ starsData: _starsData });
  };

  updateAnimation() {
    /* If window is resized past a certain point, generate new starfield */
    if (this.state.width < window.innerWidth - 200) {
      this.setWidth();
      this.setNumStars();
      this.createStarsData();
    } else if (this.state.height < window.innerHeight - 200) {
      this.setHeight();
      this.createStarsData();
    }

    /* Cycle through stars and update radius, if necessary */
    let _starsData = [...this.state.starsData];
    for (let i = 0; i < _starsData.length; i++) {
      if (_starsData[i].r > 2.7 || _starsData[i].r < 1.5) {
        _starsData[i].rScale = -_starsData[i].rScale;
      }
      _starsData[i].r += _starsData[i].rScale;
    }
    this.setState({ starsData: _starsData });

    /* Recursion call */
    requestAnimationFrame(this.updateAnimation);
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  render() {
    return (
      <div className={styles.starfield}>
        <Starfield
          starsData={this.state.starsData}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }
}

export default StarfieldAnimation;
