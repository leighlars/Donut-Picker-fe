import React, { Component } from "react";
import Container from "../Container/Container";
import Donut from "../Donut/Donut";
const shortid = require("shortid");

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      numbers: [0, 1, 2, 3, 4, 5],
      contents: [],
      projects: false,
      favorites: [],
      donutIndex: []
    };
  }

  freshPalette = () => {
    let contents = this.state.numbers.map(index => {
      if (this.state.donutIndex.includes(index)) {
        return (
         <div className="palette-donut">
            <Donut
            key={shortid.generate()}
            saveFavorites={this.saveFavorites}
            index={index}
            fill={
              this.state.favorites.find(donut => donut.index === index).color
            }
          />
          <h4 className="donut-fill"><i className="fas fa-lock"></i>{index.fill}</h4>
         </div>
        );
      } else {
        return (
          <div className="palette-donut">
            <Donut
            key={shortid.generate()}
            saveFavorites={this.saveFavorites}
            index={index}
            fill={this.randomColorGen()}
          />
          </div>
        );
      }
    });
    this.setState({ contents });
  };

  randomColorGen = () => {
    let fill = "#000000".replace(/0/g, () => {
      return (~~(Math.random() * 16)).toString(16);
    });
    return fill;
  };

  saveFavorites = (color, index) => {
    let newColor = { color, index };
    let favorites = this.state.favorites;
    let indexValue = this.state.donutIndex;
    indexValue.push(index);
    favorites.push(newColor);
    this.setState({ donutIndex: indexValue });
    this.setState({ favorites });
    console.log(this.state.favorites);
  };

  componentDidMount = () => {
    this.freshPalette();
  };

  render() {
    return (
      <div className="Home">
        <Container
          savePalette={this.props.savePalette}
          donuts={this.state.contents}
          freshPalette={this.freshPalette}
          projects={this.props.projects}
        />
      </div>
    );
  }
}
