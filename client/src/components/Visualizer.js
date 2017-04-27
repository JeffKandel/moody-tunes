import React, { Component } from 'react'
import * as V from 'victory'

const data = [
  { stanza: 1, sentiment: -0.5 },
  { stanza: 2, sentiment: 0.3 },
  { stanza: 3, sentiment: 0.8 },
  { stanza: 4, sentiment: 0.9 }
]

const domain = { x: [0, 10], y: [-1, 1] }

export default class Visualizer extends Component {
  render() {
    return (
      <div>
        <h2>sentimentagram</h2>
        <V.VictoryChart
          domainPadding={20}
          theme={V.VictoryTheme.material}
          containerComponent={<V.VictoryVoronoiContainer />}
        >
          <V.VictoryAxis
          />
          <V.VictoryAxis
            dependentAxis
          />
          <V.VictoryLine
            data={data}
            x="stanza"
            y="sentiment"
            interpolation="basis"
            domain={domain}
          />
        </V.VictoryChart>
      </div>
    )
  }
}
