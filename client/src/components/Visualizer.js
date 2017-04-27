import React, { Component } from 'react'
import * as V from 'victory'

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
]

const tickValues = [1, 2, 3, 4]
const tickFormat = ["Stanza 1", "Stanza 2", "Stanza 3", "Stanza 4"]

export default class Visualizer extends Component {
  render() {
    return (
      <div>
        <h2>sentimentagram</h2>
        <V.VictoryChart
          domainPadding={20}
          theme={V.VictoryTheme.material}
        >
          <V.VictoryAxis
            tickValues={tickValues}
            tickFormat={tickFormat}
          />
          <V.VictoryAxis
            dependentAxis
            tickFormat={x => (`$${x / 1000}k`)}
          />
          <V.VictoryLine
            data={this.props.data}
            x="quarter"
            y="earnings"
            interpolation="basis"
          />
        </V.VictoryChart>
      </div>
    )
  }
}
