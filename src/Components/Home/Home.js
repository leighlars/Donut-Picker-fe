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
      favorites: [],
      donutIndex: []
    };
  }

  freshPalette = () => {
    let contents = this.state.numbers.map(index => {
      if (this.state.donutIndex.includes(index)) {
        return (
          <Donut
            key={shortid.generate()}
            saveFavorites={this.saveFavorites}
            index={index}
            fill={
              this.state.favorites.find(donut => donut.index === index).color
            }
          />
        );
      } else {
        return (
          <Donut
            key={shortid.generate()}
            saveFavorites={this.saveFavorites}
            index={index}
            fill={this.randomColorGen()}
          />
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
  };

  savePalette = (palette, project) => {
    let option = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: palette.name, 
        project_id: project,
        color_1: this.state.contents[0],
        color_2: this.state.contents[1], 
        color_3: this.state.contents[2], 
        color_4: this.state.contents[3], 
        color_5: this.state.contents[4], 
        color_6: this.state.contents[5] 
      })
    };
    fetch("http://localhost:3001/api/v1/palettes", option)
    .then(response =>  response.json())
    .then(result => console.log(result))
}

findProject = (palette, project) => {
  let foundProject;
  fetch(`http://localhost:3001/api/v1/projects/${project.name}`)
  .then(response => response.json())
  .then(result => foundProject = result)
  this.savePalette(palette, foundProject)
}

  componentDidMount = () => {
    this.freshPalette();
  };

  render() {
    return (
      <div className="App">
        <Container
          savePalette={this.findProject}
          donuts={this.state.contents}
          freshPalette={this.freshPalette}
        />
      </div>
    );
  }
}
