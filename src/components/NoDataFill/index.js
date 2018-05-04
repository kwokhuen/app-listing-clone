import React from 'react'

class NoDataFill extends React.Component {
  render () {
    const {fillText, height} = this.props
    return (
      <div className='no-data-fill' style={{height}}>
        {this.props.fillText}
      </div>
    )
  }
}

export default NoDataFill
