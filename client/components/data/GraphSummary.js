
// import React from 'react'
// import {
//   HorizontalGridLines,
//   VerticalGridLines,
//   XAxis,
//   XYPlot,
//   YAxis,
//   VerticalBarSeries
// } from 'react-vis'

// const data = [
//   { x: 0, y: 112342 },
//   { x: 1, y: 223412 },
//   { x: 2, y: 158923 },
//   { x: 2, y: 160932 },
//   { x: 3, y: 123495 },
//   {
//     x: 4, y: 134495
//   }
// ]

// function msToMinSec(val) {
//   let seconds = Math.floor(val / 1000)
//   const minutes = Math.floor(seconds / 60)
//   seconds = seconds % 60

//   const output = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`
//   return output
// }


// class GraphSummary extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { time: null }
//     this.timeDisplayStyle = {
//       // position: 'relative',
//       textAlign: 'center',
//       color: '#a333c8',
//       margin: '0px',
//       size: '1.3em'
//     }
//     this.containerStyle = {
//       margin: '20px',
//       marginBottom: '5px',
//       position: 'relative',
//       maxWidth: '250px'
//     }
//     // this.chartStyle = {
//     //   YAxisPadding: '15px'
//     // }
//     this.showTime = this.showTime.bind(this)
//     this.chart = this.chart.bind(this)
//     this.mouseLeaveChart = this.mouseLeaveChart.bind(this)
//   }
//   chart(data) {
//     return (<XYPlot width={200} height={170} color="#a333c8">
//       <XAxis />
//       <YAxis tickFormat={msToMinSec} left={10} />
//       <HorizontalGridLines />
//       <VerticalGridLines />
//       <VerticalBarSeries data={data} onNearestX={this.showTime} />
//     </XYPlot>)
//   }
//   mouseLeaveChart(e) {
//     e.stopPropagation()
//     this.setState({ time: null })
//   }

//   showTime(e) {
//     const time = msToMinSec(e.y)
//     this.setState({ time })
//     console.log('showTime event', e)
//   }
//   render() {
//     //   <h3 style={{ color: '#a333c8', textAlign: 'center' }}> Previous Times</h3>
//     const chart = this.chart(data)
//     return (
//       <div style={this.containerStyle} onMouseLeave={this.mouseLeaveChart}>
//         <h3>GraphSummary</h3>
//         {
//           <div style={this.timeDisplayStyle}> {
//             this.state.time === null ?
//               (<i aria-hidden="true" className="clock large icon" />) :
//               (<div style={this.timeDisplayStyle}>{this.state.time} </div>)}
//           </div>
//         }
//         <div style={this.chartStyle}>
//           {chart}
//         </div>
//       </div>

//     )
//   }
// }

// export default GraphSummary
