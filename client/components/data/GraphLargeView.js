
import React from 'react'
import {
  XAxis,
  FlexibleWidthXYPlot,
  YAxis,
  VerticalBarSeries
} from 'react-vis'
import { relative } from 'path'


//once we have data to pass to props,we should
// move this inside the component and have it access props

class GraphLargeView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { time: null }
    this.timeDisplayStyle = {
      textAlign: 'center',
      color: '#a333c8',
      fontSize: '20px',
      minHeight: '30px',
      padding: '0',
      margin: '0 auto',
      width: '50%'
    }
    this.containerStyle = {
      position: relative,

      margin: '20px',
      marginBottom: '5px',
      maxWidth: '100%'
    }
    this.xLableStyle = {
      textAlign: 'center',
      fontSize: '20px',
      minHeight: '30px',
      padding: '0',
      margin: '0 auto',
      width: '50%'
    }

    this.showTime = this.showTime.bind(this)
    this.chart = this.chart.bind(this)
    this.mouseLeaveChart = this.mouseLeaveChart.bind(this)
    this.xTicksFormat = this.xTicksFormat.bind(this)
    this.msToMinSec = this.msToMinSec.bind(this)
  }
  xTicksFormat(val, i) {
    const { data } = this.props
    if (data[i] !== undefined) {
      return `${data[i].decimationLevel}`
    }
  }
  msToMinSec(val) {
    let seconds = Math.floor(val / 1000)
    const minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
    const output = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
    return output

  }
  chart(data) {
    let xTicksRange = []
    console.log('chart(data) data', data)
    for (let i = 0; i < data.length; i++) {
      // makes x match graph position
      data[i].x = i // eslint-disable-line id-length
      xTicksRange.push(i)
    }

    return (
      <FlexibleWidthXYPlot
        height={400}
        color="#a333c8">
        <YAxis
          tickFormat={this.msToMinSec}
          left={10} />
        <XAxis
          tickValues={xTicksRange}
          tickFormat={this.xTicksFormat}
          tickPadding={5} width={1} />
        <VerticalBarSeries
          xDomain={[0, data.length - 1]}
          data={data}
          onNearestX={this.showTime}
          color="#bbbbbb"
          stroke="#a333c8" />
      </FlexibleWidthXYPlot>
    )
  }
  mouseLeaveChart(event) {
    event.stopPropagation()
    this.setState({ time: null })
  }

  showTime(event) {
    const time = this.msToMinSec(event.y)
    this.setState({ time })
    // console.log('showTime event', e)
  }
  render() {
    const { data, xLabel, unsavedDataPoint } = this.props
    let chart
    if (unsavedDataPoint) {
      unsavedDataPoint.x = data.length //eslint-disable-line id-length
      chart = this.chart([...data, unsavedDataPoint])
    } else {
      chart = this.chart(data)
    }

    return (
      <div style={this.containerStyle} onMouseLeave={this.mouseLeaveChart}>
        <h3>GraphLargeView - remove after complete</h3>
        {
          <div style={this.timeDisplayStyle}> {
            this.state.time === null ?
              (<p><i className="clock icon" /></p>) :
              (<div>{this.state.time}</div>)
          }
          </div>
        }
        <div style={this.chartStyle}>
          {
            chart
          }
        </div>
        <p style={this.xLableStyle}>{xLabel}</p>
      </div>

    )
  }
}

export default GraphLargeView
