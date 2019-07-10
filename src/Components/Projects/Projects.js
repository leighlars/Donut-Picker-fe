import React, { Component } from 'react';
import Project from '../Project/Project';
import { Link } from 'react-router-dom';
const shortid = require("shortid");


class Projects extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
  }

  handleChange = e => {
    const { value } = e.target
    this.setState({name: value})
  }

  postProject = () => {
    
  }

  render () {
    const displayProjects = this.props.projects.map(project => <Project key={shortid.generate()} className="indiv-project" {...project} />)
    return (
      <section className="Projects">
      <Link to='/'>
      <button><i class="fas fa-long-arrow-alt-left"></i> Home</button>
      </Link>
      <h4 className="project-header">My Projects</h4>
        <section className="all-projects">
        {this.props.projects.length ? displayProjects : (<h4 className="project-alert">Please create a new project!</h4>)}
        </section>
        <div className="new-project">
          <input type="text" onChange={this.handleChange} placeholder="My New Project" />
          <button onClick={this.postProject} className="add-new-project"> + </button>
        </div>
      </section>
    )
  }
}

export default Projects;