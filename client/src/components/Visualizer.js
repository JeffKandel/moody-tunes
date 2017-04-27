import React, { Component } from 'react'
import * as V from 'victory'

const data = [
  { stanza: 1, sentiment: -0.5 },
  { stanza: 2, sentiment: 0.3 },
  { stanza: 3, sentiment: 0.8 },
  { stanza: 4, sentiment: 0.9 },
  { stanza: 5, sentiment: -0.2 }
]

const maxStanza = (arr) => {
  let max = 0
  arr.forEach(obj => {
    if (obj.stanza > max) max = obj.stanza
  })
  return max
}
const domainX = [ -1, maxStanza(data) ]
const domain = { x: domainX, y: [-1, 1] }

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
          <V.VictoryScatter
            data={data}
            x="stanza"
            y="sentiment"
            size={(datum, active) => active ? 5 : 3}
            domain={domain}
          />
          <V.VictoryLine
            data={data}
            x="stanza"
            y="sentiment"
            labels={datum => datum.y}
            labelComponent={<V.VictoryTooltip />}
            size={(datum, active) => active ? 5 : 3}
            interpolation="basis"
            domain={domain}
          />
        </V.VictoryChart>
      </div>
    )
  }
}
