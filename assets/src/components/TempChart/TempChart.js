/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/* eslint max-len:0 */

import React, { Component } from 'react'

import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Baseline,
  Resizable
} from 'react-timeseries-charts'
import { TimeSeries, TimeRange } from 'pondjs'

// Data
// const data = require('./test.json')
// const points = data.widget[0].data.reverse()
// const series2 = new TimeSeries({
//   name: 'USD_vs_EURO',
//   columns: ['time', 'value'],
//   points
// })

const style = {
  value: {
    stroke: '#a02c2c',
    opacity: 0.4
  }
}

const baselineStyle = {
  line: {
    stroke: 'steelblue',
    strokeWidth: 1
  }
}

const baselineStyleLite = {
  line: {
    stroke: 'steelblue',
    strokeWidth: 1,
    opacity: 0.5
  }
}

class TempChart extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }
  componentWillMount () {
    console.log('mount')

    let dataArray = this.props.series

    let temperatures = dataArray.map(entry => {
      let unix = parseInt(
        (new Date(entry.createdAt).getTime() / 1000).toFixed(0)
      )
      return [unix, entry.temperature]
    })

    function Comparator (a, b) {
      if (a[0] < b[0]) return -1
      if (a[0] > b[0]) return 1
      return 0
    }

    let points = temperatures.sort(Comparator)

    console.log(temperatures)
    let series = new TimeSeries({
      name: 'Temps',
      columns: ['time', 'value'],
      points
    })

    console.log('range:', series.range().toString(), this.props.range)
    this.setState({ series })
  }

  render () {
    console.log(this.state.series)
    return (
      <Resizable>
        <ChartContainer
          timeRange={new TimeRange(this.props.range)}
          format="%b '%y"
        >
          <h1>test</h1>
          <ChartRow height='150'>
            <YAxis
              id='temperature'
              label='Temperature (°C)'
              min={this.state.series.min()}
              max={this.state.series.max()}
              width='60'
              format='.2f'
            />
            <Charts>
              <LineChart
                axis='temperature'
                series={this.state.series}
                style={style}
              />
              <Baseline
                axis='price'
                style={baselineStyleLite}
                value={this.state.series.max()}
                label='Max'
                position='right'
              />
              <Baseline
                axis='price'
                style={baselineStyleLite}
                value={this.state.series.min()}
                label='Min'
                position='right'
              />
              <Baseline
                axis='price'
                style={baselineStyleLite}
                value={this.state.series.avg() - this.state.series.stdev()}
              />
              <Baseline
                axis='price'
                style={baselineStyleLite}
                value={this.state.series.avg() + this.state.series.stdev()}
              />
              <Baseline
                axis='price'
                style={baselineStyle}
                value={this.state.series.avg()}
                label='Avg'
                position='right'
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
    )
  }
}

export default TempChart
