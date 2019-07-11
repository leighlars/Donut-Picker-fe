import React, { Component } from 'react';
import Project from '../Project/Project';
import { Link } from 'react-router-dom';
const shortid = require("shortid");


class Projects extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      palettes: []
    }
  }

  handleChange = e => {
    const { value } = e.target
    this.setState({name: value})
  }

  postProject = () => {
    let option = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name
      })
    }
    fetch("https://donut-picker-be.herokuapp.com/api/v1/projects", option)
    .then(response => response.json())
    .then(result => console.log(result))
  }

  componentDidMount = () => {
    this.gatherPalettes()
  }

  gatherPalettes =() => {
    fetch("https://donut-picker-be.herokuapp.com/api/v1/palettes")
    .then(response => response.json())
    .then(result => this.setState({palettes: result}))
  }

  render () {
    const displayProjects = this.props.projects.map(project => <Project projects={this.props.projects} palettes={this.state.palettes} key={shortid.generate()} className="indiv-project" {...project} />)
    return (
      <section className="Projects">
      <Link className="home-btn" to='/'>
        <button><i className="fas fa-long-arrow-alt-left"></i> Home</button>
      </Link>
      <h4 className="project-header">My Projects</h4>
      <div className="new-project">
        <input type="text" onChange={this.handleChange} placeholder="My New Project" value={this.state.name} />
        <button onClick={this.postProject} className="add-new-project"> + </button>
      </div>
        <section className="all-projects">
        {this.props.projects.length ? displayProjects : (<h4 className="project-alert">Please create a new project!</h4>)}
        </section>
      </section>
    )
  }
}

export default Projects;