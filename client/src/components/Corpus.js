import React, { Component } from 'react'

export default class Corpus extends Component {
  render() {
    return (<div>
      <form
        onSubmit={this.props.handleSubmit}
      >
        <label>
          Corpus stuff goes here
        </label>
        <textarea
          name="corpus"
        />
        <button>Submit</button>
      </form>
    </div>)
  }
}
