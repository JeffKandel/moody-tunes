import React, { Component } from 'react'
import { VictoryChart, VictoryTheme, VictoryVoronoiContainer, VictoryAxis, VictoryScatter, VictoryLine, VictoryTooltip, Flyout } from 'victory'

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
        <div className="text-center">
          <h3>sentimentagram</h3>
          <p>Here, the sentiment of the lyrics of your song is plotted over progression through the text.</p>
          <p>Hover over a dot to see its sentiment score and a snippet of the line that generated it.</p>
        </div>
        <div>
          <VictoryChart
            domainPadding={5}
            theme={VictoryTheme.material}
            width={400}
            height={200}
            padding={{ top: 20, bottom: 50, left: 30, right: 30 }}
            containerComponent={<VictoryVoronoiContainer />}
            domain={this.domain()}
            animate={{ duration: 500 }}
          >
            <VictoryAxis />
            <VictoryAxis
              dependentAxis
              tickFormat={tick => {
                const yAxis = this.domain().y
                if (yAxis.indexOf(tick) > -1) {
                  return tick === -1 ? '-1 (neg)' : '1 (pos)'
                } else {
                  return tick
                }
              }}
            />
            <VictoryScatter
              data={this.props.data.sentences && this.props.data.sentences}
              size={(datum, active) => active ? 5 : 3}
            />
            <VictoryLine
              data={this.props.data.sentences && this.props.data.sentences}
              labels={datum => `'${datum.sentenceStub}' \n ${datum.y}`}
              labelComponent={
                <VictoryTooltip
                  // flyoutComponent={
                  //   <Flyout
                  //     style={}
                  //   />
                  // }
                />
              }
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

const mapStateToProps = (store, ownProps) => ({ data: store.data })

export default connect(mapStateToProps)(Visualizer)
