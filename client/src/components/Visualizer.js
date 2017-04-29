import React, { Component } from 'react'
import { VictoryChart, VictoryTheme, VictoryVoronoiContainer, VictoryAxis, VictoryScatter, VictoryLine, VictoryTooltip } from 'victory'

class Visualizer extends Component {
  constructor() {
    super()
    this.docLength = this.docLength.bind(this)
    this.domainX = this.domainX.bind(this)
    this.domain = this.domain.bind(this)
  }
  docLength(arr) {
    let max = 0
    arr.forEach(obj => {
      if (obj.x > max) max = obj.x
    })
    return max
  }
  domainX() {
    return [-1, this.docLength(this.props.data.sentences)]
  }
  domain() {
    return {
      x: this.props.data.sentences ? this.domainX() : [-1, 10],
      y: [-1, 1]
    }
  }
  render() {
    return (
      <div className="flexcontainer-vertical" id="visualizerBlock">
        <div>
          <h3 className="center text-center text-bottom">sentimentagram</h3>
        </div>
        <div>
          <VictoryChart
            domainPadding={5}
            theme={VictoryTheme.material}
            width={500}
            height={300}
            padding={{top: 20, bottom: 50, left: 30, right: 30}}
            containerComponent={<VictoryVoronoiContainer />}
            domain={this.domain()}
            animate={{ duration: 500 }}
          >
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryScatter
              data={this.props.data.sentences && this.props.data.sentences}
              // x="sentenceOffset"
              // y="sentiment"
              size={(datum, active) => active ? 5 : 3}
            />
            <VictoryLine
              data={this.props.data.sentences && this.props.data.sentences}
              // x="sentenceOffset"
              // y="sentiment"
              labels={datum => `'${datum.sentenceStub}' \n ${datum.y}`}
              labelComponent={<VictoryTooltip />}
              interpolation="basis"
            />
          </VictoryChart>
        </div>
      </div>
    )
  }
}

/* ----- IMPORT CONTAINER DEPENDENCIES ----- */

import { connect } from 'react-redux'

/* ----- CONTAINER ----- */

const mapStateToProps = (store, ownProps) => {
  return {
    data: store.data
  }
}

const mapDispatchToProps = (dispatch, getState) => {}

export default connect(mapStateToProps)(Visualizer)
