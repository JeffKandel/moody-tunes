import React, { Component } from 'react'
import * as V from 'victory'

export default class Visualizer extends Component {
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
          <V.VictoryChart
            domainPadding={5}
            theme={V.VictoryTheme.material}
            width={500}
            height={300}
            padding={{top: 20, bottom: 50, left: 30, right: 30}}
            containerComponent={<V.VictoryVoronoiContainer />}
            domain={this.domain()}
            animate={{ duration: 500 }}
          >
            <V.VictoryAxis />
            <V.VictoryAxis dependentAxis />
            <V.VictoryScatter
              data={this.props.data.sentences && this.props.data.sentences}
              // x="sentenceOffset"
              // y="sentiment"
              size={(datum, active) => active ? 5 : 3}
            />
            <V.VictoryLine
              data={this.props.data.sentences && this.props.data.sentences}
              // x="sentenceOffset"
              // y="sentiment"
              labels={datum => `'${datum.sentenceStub}' \n ${datum.y}`}
              labelComponent={<V.VictoryTooltip />}
              interpolation="basis"
            />
          </V.VictoryChart>
        </div>
      </div>
    )
  }
}
