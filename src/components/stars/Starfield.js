import React from "react";

class Starfield extends React.Component {
  componentDidUpdate() {
    const canvas = this.canvasRef,
      ctx = canvas.getContext("2d");

    canvas.width = this.props.width;
    canvas.height = this.props.height;

    for (let i = 0; i < this.props.starsData.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.props.starsData[i].color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.props.starsData[i].color;
      ctx.arc(
        this.props.starsData[i].x,
        this.props.starsData[i].y,
        this.props.starsData[i].r,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.closePath();
    }
  }

  render() {
    return <canvas ref={canvasRef => (this.canvasRef = canvasRef)} />;
  }
}

export default Starfield;
